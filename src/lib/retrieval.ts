import knowledgeData from "@/content/knowledge.json";

export interface KnowledgeChunk {
  id: string;
  title: string;
  section: string;
  url: string;
  text: string;
  terms: string[];
  vector: number[];
}

export interface SearchResult {
  chunk: KnowledgeChunk;
  score: number;
}

// Tokenize text into normalized lowercase tokens
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

// Compute query pseudo-vector (matching build-knowledge.mjs)
function computeQueryVector(tokens: string[]): number[] {
  const dim = 64;
  const vector = new Array(dim).fill(0);
  for (const term of tokens) {
    let hash = 0;
    for (let i = 0; i < term.length; i++) {
      hash = (hash << 5) - hash + term.charCodeAt(i);
      hash |= 0;
    }
    const idx = Math.abs(hash) % dim;
    vector[idx] += 1;
  }
  const norm = Math.sqrt(vector.reduce((acc, v) => acc + v * v, 0)) || 1;
  return vector.map((v) => v / norm);
}

// Cosine similarity between two normalized vectors
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dot = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
  }
  return Math.max(0, Math.min(1, dot));
}

// Detect common prompt injection, off-topic, or jailbreak attempts
export function isInjectionOrOffTopic(query: string): boolean {
  const q = query.toLowerCase();
  const patterns = [
    "ignore previous instructions",
    "ignore your instructions",
    "print your system prompt",
    "reveal your prompt",
    "system prompt",
    "jailbreak",
    "dan mode",
    "act as",
    "pretend to be",
    "bypass",
    "weather",
    "forecast",
    "temperature in",
    "how much do you earn",
    "what is your salary",
    "tell me a joke",
    "recipe for",
  ];
  return patterns.some((pattern) => q.includes(pattern));
}

export function searchKnowledge(query: string, limit = 4): SearchResult[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const queryVector = computeQueryVector(queryTokens);
  const idfMap = knowledgeData.idf as Record<string, number>;
  const chunks = knowledgeData.chunks as KnowledgeChunk[];

  const scored: SearchResult[] = chunks.map((chunk) => {
    // 1. BM25-style keyword score
    let bm25 = 0;
    const chunkTermSet = new Set(chunk.terms);
    for (const term of queryTokens) {
      if (chunkTermSet.has(term)) {
        const idfVal = idfMap[term] || 0.8;
        bm25 += idfVal;
      }
    }

    // 2. Vector Cosine Similarity
    const cosine = cosineSimilarity(queryVector, chunk.vector);

    // Hybrid blended score (normalized [0..1])
    const combinedScore = Math.min(1, Number((cosine * 0.55 + Math.min(1, bm25 / 3.5) * 0.45).toFixed(3)));

    return {
      chunk,
      score: combinedScore,
    };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}
