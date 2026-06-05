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

const currentLang = document.documentElement.lang.toLowerCase();
const emptySearchCopy = {
  en: ["No results", "Try smooth movement, CooldownMs, recipes, teleport sound, or compatibility."],
  "pt-br": ["Sem resultados", "Tente movimento suave, CooldownMs, receitas, som de teleporte ou compatibilidade."],
  es: ["Sin resultados", "Prueba movimiento suave, CooldownMs, recetas, sonido de teletransporte o compatibilidad."]
};

function searchEntries(entries, query, limit = 8) {
  return entries
    .map((entry) => {
      const baseScore = scoreEntry(entry, query);
      return {
        entry,
        score: baseScore > 0 ? baseScore + (entry.lang.toLowerCase() === currentLang ? 1.5 : 0) : 0
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function resultMeta(entry) {
  return entry.lang.toUpperCase() + " - " + entry.category;
}

function noResultsHtml(className) {
  const copy = emptySearchCopy[currentLang] || emptySearchCopy.en;
  return '<div class="' + className + '"><strong>' + escapeHtml(copy[0]) + '</strong><p>' + escapeHtml(copy[1]) + '</p></div>';
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
    const matches = searchEntries(entries, query, 8);
    results.innerHTML = matches.length
      ? matches.map(({ entry }) => '<a class="search-result" href="' + entry.url + '"><span>' + escapeHtml(resultMeta(entry)) + '</span><strong>' + escapeHtml(entry.title) + '</strong><p>' + escapeHtml(excerpt(entry, query)) + '</p></a>').join("")
      : noResultsHtml("search-result");
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

const globalSearch = document.querySelector("[data-global-search]");
const globalSearchInput = globalSearch?.querySelector("[data-global-search-input]");
const globalSearchResults = globalSearch?.querySelector("[data-global-search-results]");

function defaultGlobalSearchHtml() {
  const copy = {
    en: ["Try a common query", "smooth movement, CooldownMs, recipes, teleport sound, compatibility"],
    "pt-br": ["Tente uma busca comum", "movimento suave, CooldownMs, receitas, som de teleporte, compatibilidade"],
    es: ["Prueba una busqueda comun", "movimiento suave, CooldownMs, recetas, sonido de teletransporte, compatibilidad"]
  }[currentLang] || ["Try a common query", "smooth movement, CooldownMs, recipes, teleport sound, compatibility"];
  return '<div class="search-empty"><strong>' + escapeHtml(copy[0]) + '</strong><p>' + escapeHtml(copy[1]) + '</p></div>';
}

async function renderGlobalSearch(query) {
  if (!globalSearchResults) return;
  if (query.length < 2) {
    globalSearchResults.innerHTML = defaultGlobalSearchHtml();
    return;
  }
  const entries = await loadSearchIndex();
  const matches = searchEntries(entries, query, 10);
  globalSearchResults.innerHTML = matches.length
    ? matches.map(({ entry }) => '<a class="search-dialog-result" href="' + entry.url + '"><span>' + escapeHtml(resultMeta(entry)) + '</span><strong>' + escapeHtml(entry.title) + '</strong><p>' + escapeHtml(excerpt(entry, query)) + '</p></a>').join("")
    : noResultsHtml("search-empty");
}

function openGlobalSearch(seed = "") {
  if (!globalSearch || !globalSearchInput) return;
  globalSearch.hidden = false;
  document.body.classList.add("search-open");
  globalSearchInput.value = seed;
  renderGlobalSearch(seed.trim());
  requestAnimationFrame(() => globalSearchInput.focus());
}

function closeGlobalSearch() {
  if (!globalSearch || !globalSearchInput) return;
  globalSearch.hidden = true;
  document.body.classList.remove("search-open");
  globalSearchInput.value = "";
  if (globalSearchResults) globalSearchResults.innerHTML = defaultGlobalSearchHtml();
}

qsAll("[data-global-search-open]").forEach((button) => {
  button.addEventListener("click", () => openGlobalSearch());
});

qsAll("[data-global-search-close]").forEach((button) => {
  button.addEventListener("click", closeGlobalSearch);
});

globalSearchInput?.addEventListener("input", () => {
  renderGlobalSearch(globalSearchInput.value.trim());
});

globalSearchResults?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeGlobalSearch();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".search-shell")) {
    qsAll("[data-search-results]").forEach((node) => node.classList.remove("open"));
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openGlobalSearch();
    return;
  }
  if (event.key === "Escape" && globalSearch && !globalSearch.hidden) {
    closeGlobalSearch();
  }
});
