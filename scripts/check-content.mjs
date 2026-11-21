import fs from "fs";
import path from "path";

console.log("=== CONTENT INTEGRITY AUDIT (docs/06_CONTENT.md) ===");

const BANNED_PATTERNS = [/\bTODO\b/i, /\bCONFIRM\b/i, /\blorem\b/i, /\bFIXME\b/i, /\[YOU\]/i];

let errors = [];

// Recursive file scanner
function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== "node_modules" && entry.name !== ".next" && entry.name !== "legacy" && entry.name !== "ansh-portfolio-antigravity-pack") {
        scanDir(fullPath);
      }
    } else if (entry.isFile()) {
      // Exclude check scripts and _todo.md
      if (
        (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx") || entry.name.endsWith(".js") || entry.name.endsWith(".jsx")) &&
        !entry.name.includes("check-")
      ) {
        const text = fs.readFileSync(fullPath, "utf-8");
        const lines = text.split("\n");
        lines.forEach((line, lineNum) => {
          for (const pattern of BANNED_PATTERNS) {
            if (pattern.test(line)) {
              errors.push(
                `Placeholder token found in ${fullPath}:${lineNum + 1}: "${line.trim()}"`
              );
            }
          }
        });
      }
    }
  }
}

// 1. Scan app, components, content
["src/app", "src/components", "src/content"].forEach(scanDir);

// 2. Validate metric references in projects.ts vs metrics.ts
try {
  const metricsFile = fs.readFileSync("src/content/metrics.ts", "utf-8");
  const projectsFile = fs.readFileSync("src/content/projects.ts", "utf-8");

  // Extract metric IDs from metrics.ts
  const metricIdMatches = [...metricsFile.matchAll(/id:\s*["']([^"']+)["']/g)].map(
    (m) => m[1]
  );
  const metricIds = new Set(metricIdMatches);

  // Extract referenced metricIds from projects.ts
  const referencedMetricMatches = [
    ...projectsFile.matchAll(/metricIds:\s*\[([^\]]+)\]/g),
  ];
  for (const match of referencedMetricMatches) {
    const ids = match[1]
      .split(",")
      .map((s) => s.trim().replace(/['"]/g, ""))
      .filter(Boolean);
    for (const id of ids) {
      if (!metricIds.has(id)) {
        errors.push(`Project references missing metric id: "${id}"`);
      }
    }
  }

  // Ensure every metric in metrics.ts has a non-empty method
  const methodMatches = [...metricsFile.matchAll(/method:\s*["']([^"']*)["']/g)];
  for (const m of methodMatches) {
    if (!m[1] || m[1].trim().length < 5) {
      errors.push(`Metric has empty or insufficient method documentation: "${m[0]}"`);
    }
  }
} catch (e) {
  errors.push(`Failed to audit metric files: ${e.message}`);
}

if (errors.length > 0) {
  console.error("FAILED: Content integrity violations detected:");
  errors.forEach((err) => console.error("  ✕", err));
  process.exit(1);
} else {
  console.log("✓ All content integrity checks passed with 0 placeholder violations.");
  process.exit(0);
}
