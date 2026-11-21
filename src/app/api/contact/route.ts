import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please provide a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
  honeypot: z.string().optional(),
});

// In-memory rate limiting map (IP -> timestamps)
const contactRateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes window
  const limit = 4; // 4 submissions per 10 minutes

  const timestamps = (contactRateLimitMap.get(ip) || []).filter(
    (t) => now - t < windowMs
  );
  if (timestamps.length >= limit) return false;

  timestamps.push(now);
  contactRateLimitMap.set(ip, timestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "localhost";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many messages sent. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || "Invalid input data";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { name, email, message, honeypot } = parsed.data;

    // Honeypot spam defense: bots fill invisible fields
    if (honeypot && honeypot.trim().length > 0) {
      console.warn(`[Spam caught by honeypot] IP: ${ip}, Email: ${email}`);
      // Return success silently so automated scrapers don't retry with alternate vectors
      return NextResponse.json({
        success: true,
        message: "Message received. Thank you.",
      });
    }

    // Log message for delivery tracking
    console.log(
      `[Contact Submission] From: ${name} <${email}>, Length: ${message.length} chars`
    );

    return NextResponse.json({
      success: true,
      message: "Message received. I will reply to you shortly.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to transmit message. Please email ansharora19102006@gmail.com directly." },
      { status: 500 }
    );
  }
}
