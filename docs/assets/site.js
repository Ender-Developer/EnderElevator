const basePath = "/EnderElevator";

function qsAll(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

qsAll("[data-menu-toggle]").forEach((button) => {
  const menu = document.querySelector("[data-mobile-menu]");
  button.addEventListener("click", () => {
    const open = !menu.classList.contains("open");
    menu.classList.toggle("open", open);
    button.setAttribute("aria-expanded", String(open));
  });
});

qsAll("[data-copy-code]").forEach((button) => {
  button.addEventListener("click", async () => {
    const block = button.closest("[data-code-block]");
    const code = block.querySelector("code").innerText;
    await navigator.clipboard.writeText(code);
    const label = button.querySelector("span");
    const previous = label.textContent;
    label.textContent = "Copied";
    setTimeout(() => { label.textContent = previous; }, 1200);
  });
});

let searchIndexPromise;
function loadSearchIndex() {
  if (!searchIndexPromise) {
    searchIndexPromise = fetch(basePath + "/assets/search-index.json").then((res) => res.json());
  }
  return searchIndexPromise;
}

function scoreEntry(entry, query) {
  const haystack = (entry.title + " " + entry.description + " " + entry.category + " " + entry.content).toLowerCase();
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  let score = 0;
  for (const term of terms) {
    if (entry.title.toLowerCase().includes(term)) score += 8;
    if (entry.description.toLowerCase().includes(term)) score += 4;
    if (haystack.includes(term)) score += 1;
  }
  return score;
}

function excerpt(entry, query) {
  const content = entry.content;
  const lower = content.toLowerCase();
  const firstTerm = query.toLowerCase().split(/\s+/).find(Boolean) || "";
  const index = firstTerm ? lower.indexOf(firstTerm) : -1;
  const start = Math.max(0, index - 70);
  const slice = content.slice(start, start + 190);
  return (start > 0 ? "..." : "") + slice + (start + 190 < content.length ? "..." : "");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

qsAll("[data-search-input]").forEach((input) => {
  const shell = input.closest(".search-shell");
  const results = shell.querySelector("[data-search-results]");
  input.addEventListener("input", async () => {
    const query = input.value.trim();
    if (query.length < 2) {
      results.classList.remove("open");
      results.innerHTML = "";
      return;
    }
    const entries = await loadSearchIndex();
    const matches = entries
      .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    results.innerHTML = matches.length
      ? matches.map(({ entry }) => '<a class="search-result" href="' + entry.url + '"><span>' + escapeHtml(entry.lang.toUpperCase() + " - " + entry.category) + '</span><strong>' + escapeHtml(entry.title) + '</strong><p>' + escapeHtml(excerpt(entry, query)) + '</p></a>').join("")
      : '<div class="search-result"><strong>No results</strong><p>Try smooth movement, CooldownMs, receitas, recipes, teleport sound, or Hytale.</p></div>';
    results.classList.add("open");
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      input.value = "";
      results.classList.remove("open");
      results.innerHTML = "";
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".search-shell")) {
    qsAll("[data-search-results]").forEach((node) => node.classList.remove("open"));
  }
});
