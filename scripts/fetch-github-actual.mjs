import fs from "fs";

async function fetchGitHubData(username = "anshere0") {
  console.log(`Fetching actual GitHub contributions for ${username}...`);
  const url = `https://github.com/users/${username}/contributions`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch from GitHub: ${res.status} ${res.statusText}`);
  }

  const html = await res.text();
  console.log(`Received HTML (${html.length} chars)`);

  // Parse total contributions header
  // e.g. "842 contributions in the last year" or "324 contributions in 2026"
  const headerMatch = html.match(/(\d[\d,]*)\s+contributions\s+in\s+the\s+last\s+year/i) ||
                      html.match(/(\d[\d,]*)\s+contributions/i);
  let totalCommits = 0;
  if (headerMatch) {
    totalCommits = parseInt(headerMatch[1].replace(/,/g, ""), 10);
    console.log(`Total contributions parsed from header: ${totalCommits}`);
  }

  // Parse days from <td> and <tool-tip>
  // GitHub markup:
  // <td tabindex="0" data-ix="0" ... data-date="2025-01-01" id="contribution-day-component-0-0" data-level="1" ...></td>
  // <tool-tip id="contribution-day-component-0-0-tool-tip" for="contribution-day-component-0-0" ...>1 contribution on Wednesday, January 1, 2025. ...</tool-tip>

  // Map of forId -> text
  const tooltips = new Map();
  const tipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
  let tipMatch;
  while ((tipMatch = tipRegex.exec(html)) !== null) {
    tooltips.set(tipMatch[1], tipMatch[2].trim());
  }

  // Parse td cells
  const tdRegex = /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="([^"]+)"[^>]*data-level="(\d+)"[^>]*>/g;
  let tdMatch;
  const days = [];

  while ((tdMatch = tdRegex.exec(html)) !== null) {
    const date = tdMatch[1];
    const id = tdMatch[2];
    const level = parseInt(tdMatch[3], 10);
    const tipText = tooltips.get(id) || "";

    let count = 0;
    if (tipText.startsWith("No contribution")) {
      count = 0;
    } else {
      const countMatch = tipText.match(/^(\d+)\s+contribution/);
      if (countMatch) {
        count = parseInt(countMatch[1], 10);
      } else if (level > 0) {
        count = level; // fallback
      }
    }

    days.push({
      date,
      count,
      topRepo: count > 0 ? "portfolio" : "",
    });
  }

  console.log(`Parsed ${days.length} days of data`);

  // Compute stats
  let totalCalculated = 0;
  let maxDayCount = 0;
  let maxDayDate = "";
  let activeDays = 0;
  let currentStreak = 0;
  let longestStreak = 0;

  for (const d of days) {
    totalCalculated += d.count;
    if (d.count > 0) {
      activeDays++;
      currentStreak++;
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
      if (d.count > maxDayCount) {
        maxDayCount = d.count;
        maxDayDate = d.date;
      }
    } else {
      currentStreak = 0;
    }
  }

  if (totalCommits === 0) {
    totalCommits = totalCalculated;
  }

  const result = {
    username,
    period: "Last 12 months",
    stats: {
      totalCommits,
      longestStreak,
      activeDays,
      bestDayCount: maxDayCount,
      bestDayDate: maxDayDate,
    },
    days,
  };

  console.log("Stats summary:", result.stats);
  fs.writeFileSync("src/content/github.json", JSON.stringify(result, null, 2));
  console.log("Saved to src/content/github.json");
}

fetchGitHubData("anshere0").catch((err) => {
  console.error("Error fetching github data:", err);
  process.exit(1);
});
