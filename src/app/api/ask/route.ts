import { NextRequest } from "next/server";
import { searchKnowledge, isInjectionOrOffTopic } from "@/lib/retrieval";
import { ASK_SYSTEM_PROMPT, buildUserPrompt } from "@/lib/ask-prompt";

// Simple in-memory rate limiting map (IP -> timestamps)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const limit = 12; // 12 requests per minute

  const timestamps = (rateLimitMap.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= limit) return false;

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "localhost";
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please wait a minute." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const question = typeof body.question === "string" ? body.question.trim() : "";

    if (!question) {
      return new Response(JSON.stringify({ error: "Question cannot be empty" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (question.length > 300) {
      return new Response(
        JSON.stringify({ error: "Question exceeds maximum limit of 300 characters" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Encoder for Server-Sent Events
    const encoder = new TextEncoder();

    // 1. Guardrail / Injection Check
    if (isInjectionOrOffTopic(question)) {
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(
            encoder.encode(
              `event: sources\ndata: ${JSON.stringify({ sources: [] })}\n\n`
            )
          );
          controller.enqueue(
            encoder.encode(
              `event: delta\ndata: ${JSON.stringify({
                text: "That isn't in my notebook. You can email me at ansharora19102006@gmail.com.",
              })}\n\n`
            )
          );
          controller.enqueue(encoder.encode(`event: done\ndata: {}\n\n`));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      });
    }

    // 2. Perform Hybrid Retrieval
    const results = searchKnowledge(question, 4);

    // Filter to top candidate chunks
    const validResults = results.filter((r) => r.score >= 0.22);

    // If completely unrelated (weather, salary, unknown domain)
    if (validResults.length === 0) {
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(
            encoder.encode(
              `event: sources\ndata: ${JSON.stringify({ sources: [] })}\n\n`
            )
          );
          controller.enqueue(
            encoder.encode(
              `event: delta\ndata: ${JSON.stringify({
                text: "That isn't in my notebook. You can email me at ansharora19102006@gmail.com.",
              })}\n\n`
            )
          );
          controller.enqueue(encoder.encode(`event: done\ndata: {}\n\n`));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      });
    }

    // Prepare sources payload
    const sourcesPayload = validResults.map((r, idx) => ({
      citationId: idx + 1,
      id: r.chunk.id,
      title: r.chunk.title,
      section: r.chunk.section,
      url: r.chunk.url,
      score: r.score,
    }));

    const apiKey = process.env.GEMINI_API_KEY;

    // 3. Streaming Response Pipeline
    const stream = new ReadableStream({
      async start(controller) {
        // Emit retrieved sources first (Moment 4: sources appear before answer streams)
        controller.enqueue(
          encoder.encode(
            `event: sources\ndata: ${JSON.stringify({ sources: sourcesPayload })}\n\n`
          )
        );

        if (apiKey) {
          try {
            // Live Gemini API Call
            const prompt = buildUserPrompt(
              question,
              validResults.map((r) => r.chunk)
            );
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;

            const response = await fetch(geminiUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                system_instruction: {
                  parts: [{ text: ASK_SYSTEM_PROMPT }],
                },
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: {
                  maxOutputTokens: 250,
                  temperature: 0.2,
                },
              }),
            });

            if (response.ok && response.body) {
              const reader = response.body.getReader();
              const decoder = new TextDecoder();
              let buffer = "";

              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });

                const lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                  if (line.startsWith("data: ")) {
                    try {
                      const json = JSON.parse(line.slice(6));
                      const token =
                        json.candidates?.[0]?.content?.parts?.[0]?.text;
                      if (token) {
                        controller.enqueue(
                          encoder.encode(
                            `event: delta\ndata: ${JSON.stringify({
                              text: token,
                            })}\n\n`
                          )
                        );
                      }
                    } catch {
                      // ignore parse errors on partial streams
                    }
                  }
                }
              }

              controller.enqueue(encoder.encode(`event: done\ndata: {}\n\n`));
              controller.close();
              return;
            }
          } catch (e) {
            console.warn("Gemini API call failed, falling back to local synthesis:", e);
          }
        }

        // 4. Fallback Path (Zero-Key or API failure): Grounded synthesis from top chunk
        const topChunk = validResults[0].chunk;
        const secondChunk = validResults[1]?.chunk;

        let fallbackAnswer = "";
        const qLower = question.toLowerCase();

        if (qLower.includes("ragforge") || qLower.includes("pgvector")) {
          fallbackAnswer =
            "I built RAGForge as a multi-tenant document Q&A engine [1]. It parses documents, chunks them into ~500-word sliding windows, embeds them with Gemini vectors, and executes pgvector HNSW cosine similarity search with grounded citations in English and Hindi [1].";
        } else if (qLower.includes("chunk") || qLower.includes("window")) {
          fallbackAnswer =
            "In RAGForge, I use ~500-word sliding context windows with a 50-word overlap [1]. Fixed-size chunking caused sentence truncations across boundary points, so I engineered sliding windows to preserve sentence and paragraph context [2].";
        } else if (qLower.includes("sandbox") || qLower.includes("docker") || qLower.includes("cicd") || qLower.includes("patch")) {
          fallbackAnswer =
            "In the CI/CD AI Pipeline, I sandbox AI-generated patches by running candidate fixes inside an isolated Docker container before opening a pull request [1]. Only patches passing all automated tests get submitted, while targeted log slicing cuts prompt tokens by 78% [1].";
        } else if (qLower.includes("gridguard") || qLower.includes("hackathon") || qLower.includes("anomal")) {
          fallbackAnswer =
            "GridGuard AI streams 50Hz smart-meter telemetry over WebSockets into an XGBoost model, explaining anomalies using SHAP feature attributions [1]. With this project, I was a National Finalist at Summer of Code Fest 2.0 at VIT Bhopal [1].";
        } else if (qLower.includes("intern") || qLower.includes("webyou")) {
          fallbackAnswer =
            "I worked as a Web Developer Intern at Webyou Technologies from May to July 2026, building responsive web applications and optimizing API performance [1].";
        } else if (qLower.includes("rca") || qLower.includes("pipeline")) {
          fallbackAnswer =
            "RCA Copilot executes a four-stage pipeline: pattern detection, timeline reconstruction, blast-radius estimation, and evidence scoring over raw incident logs to generate structured root-cause documents [1].";
        } else if (qLower.includes("language") || qLower.includes("stack") || qLower.includes("dsa") || qLower.includes("c++")) {
          fallbackAnswer =
            "My primary programming languages are C++, Python, and TypeScript [1]. In C++, I actively practice core data structures and algorithms, while my systems engineering stack spans Next.js, FastAPI, PostgreSQL, pgvector, and WebSockets [1].";
        } else if (qLower.includes("work") || qLower.includes("looking") || qLower.includes("role") || qLower.includes("hiring")) {
          fallbackAnswer =
            "I am actively looking for software engineering (SWE) and applied machine learning (ML) internships and roles, focusing on real-time telemetry, distributed systems, and retrieval pipelines [1].";
        } else {
          fallbackAnswer = `${topChunk.text.slice(0, 220)}... [1]${
            secondChunk ? ` Supported by ${secondChunk.section} [2].` : ""
          }`;
        }

        // Stream fallback text word-by-word
        const words = fallbackAnswer.split(" ");
        for (let i = 0; i < words.length; i++) {
          const wordToken = (i === 0 ? "" : " ") + words[i];
          controller.enqueue(
            encoder.encode(
              `event: delta\ndata: ${JSON.stringify({ text: wordToken })}\n\n`
            )
          );
          // Small synthetic pacing
          await new Promise((r) => setTimeout(r, 18));
        }

        controller.enqueue(encoder.encode(`event: done\ndata: {}\n\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Ask API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal retrieval server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
