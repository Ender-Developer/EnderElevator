import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outDir = path.join(rootDir, "docs");
const basePath = "/EnderElevator";
const siteOrigin = "https://ender-developer.github.io";
const updatedAt = "2026-06-04";

const links = {
  curseforge: "https://www.curseforge.com/hytale/mods/enderelevator",
  github: "https://github.com/Ender-Developer/EnderElevator",
  issues: "https://github.com/Ender-Developer/EnderElevator/issues",
  releases: "https://github.com/Ender-Developer/EnderElevator/releases",
  discord: "https://discord.gg/xA6eVzwzbH"
};

const manifest = JSON.parse(
  await fs.readFile(path.join(rootDir, "src/main/resources/manifest.json"), "utf8")
);

const changelog = await fs.readFile(path.join(rootDir, "CHANGELOG.md"), "utf8");

const languages = {
  en: {
    code: "en",
    label: "EN",
    prefix: "",
    locale: "en_US",
    nav: {
      wiki: "Wiki",
      roadmap: "Roadmap",
      changelog: "Changelog",
      credits: "Credits",
      curseforge: "CurseForge",
      menu: "Menu",
      search: "Search the wiki...",
      onThisPage: "On this page",
      previous: "Previous",
      next: "Next",
      startHere: "Start here",
      docs: "Docs",
      download: "Download",
      openWiki: "Open Wiki",
      github: "GitHub",
      updated: "Updated"
    },
    slugs: {
      home: "",
      wiki: "wiki",
      installation: "wiki/installation",
      usage: "wiki/usage",
      recipes: "wiki/recipes",
      configuration: "wiki/configuration",
      compatibility: "wiki/compatibility",
      troubleshooting: "wiki/troubleshooting",
      development: "wiki/development",
      changelog: "wiki/changelog",
      roadmap: "roadmap",
      credits: "credits"
    }
  },
  "pt-br": {
    code: "pt-br",
    label: "PT-BR",
    prefix: "pt-br",
    locale: "pt_BR",
    nav: {
      wiki: "Wiki",
      roadmap: "Roteiro",
      changelog: "Historico",
      credits: "Creditos",
      curseforge: "CurseForge",
      menu: "Menu",
      search: "Buscar na wiki...",
      onThisPage: "Nesta pagina",
      previous: "Anterior",
      next: "Proxima",
      startHere: "Comece aqui",
      docs: "Documentacao",
      download: "Baixar",
      openWiki: "Abrir wiki",
      github: "GitHub",
      updated: "Atualizado"
    },
    slugs: {
      home: "pt-br",
      wiki: "pt-br/wiki",
      installation: "pt-br/wiki/instalacao",
      usage: "pt-br/wiki/uso",
      recipes: "pt-br/wiki/receitas",
      configuration: "pt-br/wiki/configuracao",
      compatibility: "pt-br/wiki/compatibilidade",
      troubleshooting: "pt-br/wiki/troubleshooting",
      development: "pt-br/wiki/desenvolvimento",
      changelog: "pt-br/wiki/changelog",
      roadmap: "pt-br/roadmap",
      credits: "pt-br/credits"
    }
  },
  es: {
    code: "es",
    label: "ES",
    prefix: "es",
    locale: "es_ES",
    nav: {
      wiki: "Wiki",
      roadmap: "Hoja de ruta",
      changelog: "Historial",
      credits: "Creditos",
      curseforge: "CurseForge",
      menu: "Menu",
      search: "Buscar en la wiki...",
      onThisPage: "En esta pagina",
      previous: "Anterior",
      next: "Siguiente",
      startHere: "Empieza aqui",
      docs: "Documentacion",
      download: "Descargar",
      openWiki: "Abrir wiki",
      github: "GitHub",
      updated: "Actualizado"
    },
    slugs: {
      home: "es",
      wiki: "es/wiki",
      installation: "es/wiki/instalacion",
      usage: "es/wiki/uso",
      recipes: "es/wiki/recetas",
      configuration: "es/wiki/configuracion",
      compatibility: "es/wiki/compatibilidad",
      troubleshooting: "es/wiki/troubleshooting",
      development: "es/wiki/desarrollo",
      changelog: "es/wiki/changelog",
      roadmap: "es/roadmap",
      credits: "es/credits"
    }
  }
};

const variantDefs = [
  ["base", "Ender Elevator", "Ender_Elevator_Block.png", ["8x White Wool", "1x Life Essence"]],
  ["yellow", "Yellow", "Ender_Elevator_Block_Yellow.png", ["1x Ender Elevator", "1x Petals Yellow"]],
  ["purple", "Purple", "Ender_Elevator_Block_Purple.png", ["1x Ender Elevator", "1x Petals Purple"]],
  ["red", "Red", "Ender_Elevator_Block_Red.png", ["1x Ender Elevator", "1x Petals Red"]],
  ["orange", "Orange", "Ender_Elevator_Block_Orange.png", ["1x Ender Elevator", "1x Petals Yellow", "1x Petals Red"]],
  ["cyan", "Cyan", "Ender_Elevator_Block_Cyan.png", ["1x Ender Elevator", "1x Petals Cyan"]],
  ["violet", "Violet", "Ender_Elevator_Block_Violet.png", ["1x Ender Elevator", "1x Petals Purple", "1x Petals Blue"]],
  ["brown", "Brown", "Ender_Elevator_Block_Brown.png", ["1x Ender Elevator", "1x Petals Red", "1x Petals Green"]],
  ["pink", "Pink", "Ender_Elevator_Block_Pink.png", ["1x Ender Elevator", "1x Petals Pink"]],
  ["green", "Green", "Ender_Elevator_Block_Green.png", ["1x Ender Elevator", "1x Petals Green"]],
  ["black", "Black", "Ender_Elevator_Block_Black.png", ["1x Ender Elevator", "1x Petals Red", "1x Petals Blue", "1x Petals Yellow"]],
  ["blue", "Blue", "Ender_Elevator_Block_Blue.png", ["1x Ender Elevator", "1x Petals Blue"]]
];

const variantTranslations = {
  en: {
    base: "Base Ender Elevator",
    suffix: "Ender Elevator",
    station: "Furniture Bench",
    category: "Textiles category",
    craftedAt: "Crafted at Furniture Bench - Textiles category"
  },
  "pt-br": {
    base: "Ender Elevator base",
    suffix: "Ender Elevator",
    station: "Furniture Bench",
    category: "categoria Textiles",
    craftedAt: "Criado na Furniture Bench - categoria Textiles"
  },
  es: {
    base: "Ender Elevator base",
    suffix: "Ender Elevator",
    station: "Furniture Bench",
    category: "categoria Textiles",
    craftedAt: "Fabricado en Furniture Bench - categoria Textiles"
  }
};

const configRows = [
  {
    key: "MaxSearchDistance",
    type: "integer",
    defaultValue: "320",
    desc: {
      en: "Maximum vertical search range, in blocks.",
      "pt-br": "Alcance maximo de busca vertical, em blocos.",
      es: "Rango maximo de busqueda vertical, en bloques."
    },
    effect: {
      en: "Higher values allow taller shafts but cost more search work when no destination exists.",
      "pt-br": "Valores maiores permitem elevadores mais altos, mas custam mais busca quando nao ha destino.",
      es: "Valores mayores permiten pozos mas altos, pero cuestan mas busqueda si no hay destino."
    },
    recommended: "160-320"
  },
  {
    key: "CooldownMs",
    type: "long",
    defaultValue: "500",
    desc: {
      en: "Delay between successful elevator uses.",
      "pt-br": "Intervalo entre usos bem-sucedidos do elevador.",
      es: "Pausa entre usos exitosos del elevador."
    },
    effect: {
      en: "Prevents accidental rapid re-use while jump or crouch is held.",
      "pt-br": "Evita reuso acidental enquanto pulo ou agachar fica pressionado.",
      es: "Evita reusos accidentales mientras se mantiene salto o agacharse."
    },
    recommended: "400-700"
  },
  {
    key: "EnableSound",
    type: "boolean",
    defaultValue: "false",
    desc: {
      en: "Enables the teleport sound event.",
      "pt-br": "Ativa o som de teleporte.",
      es: "Activa el sonido de teletransporte."
    },
    effect: {
      en: "Plays SFX_Portal_Neutral_Teleport_Local after a successful teleport.",
      "pt-br": "Toca SFX_Portal_Neutral_Teleport_Local apos um teleporte bem-sucedido.",
      es: "Reproduce SFX_Portal_Neutral_Teleport_Local despues de un teletransporte exitoso."
    },
    recommended: "false for quiet servers"
  },
  {
    key: "EnableSmoothMovement",
    type: "boolean",
    defaultValue: "false",
    desc: {
      en: "Uses short smooth movement instead of instant teleport.",
      "pt-br": "Usa movimento suave curto em vez de teleporte instantaneo.",
      es: "Usa movimiento suave corto en lugar de teletransporte instantaneo."
    },
    effect: {
      en: "Moves through the shaft with interpolation, then applies one final correction teleport.",
      "pt-br": "Move pelo vao com interpolacao e aplica um teleporte final de correcao.",
      es: "Mueve por el hueco con interpolacion y aplica un teletransporte final de correccion."
    },
    recommended: "true for visual polish"
  },
  {
    key: "SmoothingDurationMs",
    type: "integer",
    defaultValue: "320",
    desc: {
      en: "Duration of smooth travel in milliseconds.",
      "pt-br": "Duracao do movimento suave em milissegundos.",
      es: "Duracion del movimiento suave en milisegundos."
    },
    effect: {
      en: "Clamped between 180 and 650 ms so smooth movement stays responsive.",
      "pt-br": "Limitado entre 180 e 650 ms para manter o movimento suave responsivo.",
      es: "Limitado entre 180 y 650 ms para que el movimiento suave siga respondiendo."
    },
    recommended: "260-380"
  }
];

const pageOrder = [
  "wiki",
  "installation",
  "usage",
  "recipes",
  "configuration",
  "compatibility",
  "troubleshooting",
  "development",
  "changelog",
  "roadmap",
  "credits"
];

const wikiPages = [
  "installation",
  "usage",
  "recipes",
  "configuration",
  "compatibility",
  "troubleshooting",
  "development",
  "changelog"
];

const pageMeta = {
  home: {
    category: "Home",
    title: {
      en: "EnderElevator",
      "pt-br": "EnderElevator",
      es: "EnderElevator"
    },
    description: {
      en: "Vertical travel, powered by ender magic. Download EnderElevator and read the official wiki for installation, recipes, configuration, and development notes.",
      "pt-br": "Viagem vertical com magia ender. Baixe EnderElevator e leia a wiki oficial com instalacao, receitas, configuracao e desenvolvimento.",
      es: "Viaje en vertical con magia ender. Descarga EnderElevator y lee la wiki oficial con instalacion, recetas, configuracion y desarrollo."
    }
  },
  wiki: {
    category: "Getting Started",
    title: {
      en: "EnderElevator Wiki",
      "pt-br": "Wiki do EnderElevator",
      es: "Wiki de EnderElevator"
    },
    description: {
      en: "Start here for installation, usage, recipes, configuration, troubleshooting, and contributor architecture.",
      "pt-br": "Comece aqui para instalacao, uso, receitas, configuracao, troubleshooting e arquitetura para contribuidores.",
      es: "Empieza aqui con instalacion, uso, recetas, configuracion, troubleshooting y arquitectura para colaboradores."
    }
  },
  installation: {
    category: "Getting Started",
    title: {
      en: "Installation",
      "pt-br": "Instalacao",
      es: "Instalacion"
    },
    description: {
      en: "Download EnderElevator, install it in Hytale, and keep worlds or servers on the supported build.",
      "pt-br": "Baixe EnderElevator, instale no Hytale e mantenha mundos ou servidores na versao suportada.",
      es: "Descarga EnderElevator, instalalo en Hytale y manten mundos o servidores en la version compatible."
    }
  },
  usage: {
    category: "Player Docs",
    title: {
      en: "Usage",
      "pt-br": "Uso",
      es: "Uso"
    },
    description: {
      en: "Place matching elevator blocks vertically, jump to go up, and crouch to go down.",
      "pt-br": "Coloque blocos de elevador equivalentes na vertical, pule para subir e agache para descer.",
      es: "Coloca bloques de elevador equivalentes en vertical, salta para subir y agachate para bajar."
    }
  },
  recipes: {
    category: "Player Docs",
    title: {
      en: "Recipes",
      "pt-br": "Receitas",
      es: "Recetas"
    },
    description: {
      en: "Craft the base Ender Elevator and all 11 colored variations at the Furniture Bench.",
      "pt-br": "Crie o Ender Elevator base e as 11 variacoes coloridas na Furniture Bench.",
      es: "Fabrica el Ender Elevator base y las 11 variaciones de color en la Furniture Bench."
    }
  },
  configuration: {
    category: "Server Docs",
    title: {
      en: "Configuration",
      "pt-br": "Configuracao",
      es: "Configuracion"
    },
    description: {
      en: "Document every config key: search distance, CooldownMs, teleport sound, smooth movement, and SmoothingDurationMs.",
      "pt-br": "Documenta cada chave: distancia de busca, CooldownMs, som de teleporte, movimento suave e SmoothingDurationMs.",
      es: "Documenta cada clave: distancia de busqueda, CooldownMs, sonido de teletransporte, movimiento suave y SmoothingDurationMs."
    }
  },
  compatibility: {
    category: "Server Docs",
    title: {
      en: "Compatibility",
      "pt-br": "Compatibilidade",
      es: "Compatibilidad"
    },
    description: {
      en: "Current mod version, Hytale compatibility, and server or modpack notes.",
      "pt-br": "Versao atual do mod, compatibilidade com Hytale e notas para servidor ou modpack.",
      es: "Version actual del mod, compatibilidad con Hytale y notas de servidor o modpack."
    }
  },
  troubleshooting: {
    category: "Support",
    title: {
      en: "Troubleshooting",
      "pt-br": "Resolucao de problemas",
      es: "Solucion de problemas"
    },
    description: {
      en: "Symptom, likely cause, fix, and related page for common EnderElevator issues.",
      "pt-br": "Sintoma, causa provavel, correcao e pagina relacionada para problemas comuns do EnderElevator.",
      es: "Sintoma, causa probable, solucion y pagina relacionada para problemas comunes de EnderElevator."
    }
  },
  development: {
    category: "Developer Docs",
    title: {
      en: "Development",
      "pt-br": "Desenvolvimento",
      es: "Desarrollo"
    },
    description: {
      en: "A concise contributor map of the ECS systems, components, and configuration.",
      "pt-br": "Um mapa conciso para contribuidores sobre sistemas ECS, componentes e configuracao.",
      es: "Un mapa conciso para colaboradores sobre sistemas ECS, componentes y configuracion."
    }
  },
  changelog: {
    category: "Project",
    title: {
      en: "Changelog",
      "pt-br": "Historico de versoes",
      es: "Historial de versiones"
    },
    description: {
      en: "Version history mirrored from CHANGELOG.md.",
      "pt-br": "Historico de versoes espelhado de CHANGELOG.md.",
      es: "Historial de versiones reflejado desde CHANGELOG.md."
    }
  },
  roadmap: {
    category: "Project",
    title: {
      en: "Roadmap",
      "pt-br": "Roteiro",
      es: "Hoja de ruta"
    },
    description: {
      en: "Done, planned, and exploring items for the EnderElevator 2.0 path.",
      "pt-br": "Itens concluidos, planejados e em exploracao para o caminho EnderElevator 2.0.",
      es: "Elementos terminados, planificados y en exploracion para el camino EnderElevator 2.0."
    }
  },
  credits: {
    category: "Project",
    title: {
      en: "Credits",
      "pt-br": "Creditos",
      es: "Creditos"
    },
    description: {
      en: "Maintainers, source links, CurseForge page, Discord support, and asset notes.",
      "pt-br": "Mantenedores, links de codigo, pagina CurseForge, suporte no Discord e notas de assets.",
      es: "Mantenedores, enlaces de codigo, pagina de CurseForge, soporte en Discord y notas de assets."
    }
  }
};

const categoryLabels = {
  Home: {
    en: "Home",
    "pt-br": "Inicio",
    es: "Inicio"
  },
  "Getting Started": {
    en: "Getting Started",
    "pt-br": "Comece aqui",
    es: "Primeros pasos"
  },
  "Player Docs": {
    en: "Player Docs",
    "pt-br": "Docs do jogador",
    es: "Docs de jugador"
  },
  "Server Docs": {
    en: "Server Docs",
    "pt-br": "Docs de servidor",
    es: "Docs de servidor"
  },
  "Developer Docs": {
    en: "Developer Docs",
    "pt-br": "Docs de desenvolvimento",
    es: "Docs de desarrollo"
  },
  Project: {
    en: "Project",
    "pt-br": "Projeto",
    es: "Proyecto"
  },
  Support: {
    en: "Support",
    "pt-br": "Suporte",
    es: "Soporte"
  }
};

function pageCategory(lang, pageId) {
  const category = pageMeta[pageId].category;
  return categoryLabels[category]?.[lang] ?? category;
}

function assetPath(file) {
  return `${basePath}/assets/${file}`;
}

function iconPath(file) {
  return `${basePath}/assets/icons/${file}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function stripHtml(html) {
  return html.replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function routeFor(lang, pageId) {
  const slug = languages[lang].slugs[pageId];
  return slug ? `${basePath}/${slug}/` : `${basePath}/`;
}

function outputPathFor(lang, pageId) {
  const slug = languages[lang].slugs[pageId];
  return path.join(outDir, slug, "index.html");
}

function canonicalFor(lang, pageId) {
  return `${siteOrigin}${routeFor(lang, pageId)}`;
}

function externalIcon(name) {
  const icons = {
    download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v3h14v-3"/></svg>',
    book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5c2.8-.8 5-.2 7 1.3 2-1.5 4.2-2.1 7-1.3v14.2c-2.8-.8-5-.2-7 1.3-2-1.5-4.2-2.1-7-1.3V4.5Z"/><path d="M12 5.8V20"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4.5 1.5-4.5-2-6-2.5m12 5v-3.9c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6.1 0-1.3-.5-2.4-1.2-3.3.1-.3.5-1.6-.1-3.2 0 0-1-.3-3.4 1.2a11.6 11.6 0 0 0-6.2 0C6.8 2.7 5.8 3 5.8 3c-.6 1.6-.2 2.9-.1 3.2A4.9 4.9 0 0 0 4.5 9.5c0 4.7 2.7 5.8 5.5 6.1-.4.4-.6.9-.6 1.8V21"/></svg>',
    curseforge: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 6.5 3.8v7.5L12 21l-6.5-6.7V6.8L12 3Z"/><path d="M12 3v7.6m0 10.4v-7.7M5.5 6.8l6.5 3.8 6.5-3.8M5.5 14.3l6.5-4"/></svg>',
    spark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 2.4 6.3L21 11l-6.6 2.7L12 20l-2.4-6.3L3 11l6.6-2.7L12 2Z"/></svg>',
    warning: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.7 20h18.6L12 3Z"/><path d="M12 9v4m0 4h.01"/></svg>',
    tip: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6m-5 3h4m-6.5-8.5A6.2 6.2 0 1 1 16.5 13c-.9.7-1.5 1.6-1.5 2.5H9c0-.9-.6-1.8-1.5-3Z"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 8h11v13H8z"/><path d="M5 16H4V3h13v1"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>'
  };
  return icons[name] ?? "";
}

function linkButton(href, label, variant = "primary", icon = "arrow") {
  return `<a class="button button-${variant}" href="${href}">${externalIcon(icon)}<span>${escapeHtml(label)}</span></a>`;
}

function alertBlock(type, title, body) {
  const icon = type === "warning" ? "warning" : type === "tip" ? "tip" : "spark";
  return `<aside class="alert alert-${type}">
    <div class="alert-icon">${externalIcon(icon)}</div>
    <div><strong>${escapeHtml(title)}</strong><p>${escapeHtml(body)}</p></div>
  </aside>`;
}

function codeBlock(code, lang = "json", uiLang = "en") {
  const copyLabel = uiLang === "en" ? "Copy" : uiLang === "pt-br" ? "Copiar" : "Copiar";
  return `<div class="code-block" data-code-block>
    <div class="code-head"><span>${escapeHtml(lang)}</span><button class="copy-button" type="button" data-copy-code>${externalIcon("copy")}<span>${escapeHtml(copyLabel)}</span></button></div>
    <pre><code>${escapeHtml(code)}</code></pre>
  </div>`;
}

function table(headers, rows, options = {}) {
  return `<div class="table-scroll"><table class="${options.className ?? ""}">
    <thead><tr>${headers.map((head) => `<th>${escapeHtml(head)}</th>`).join("")}</tr></thead>
    <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
  </table></div>`;
}

function heading(level, text) {
  const id = slugify(text);
  return `<h${level} id="${id}">${escapeHtml(text)}</h${level}>`;
}

function pageTitle(lang, pageId) {
  return pageMeta[pageId].title[lang];
}

function pageDescription(lang, pageId) {
  return pageMeta[pageId].description[lang];
}

function variantName(lang, variant) {
  if (variant.id === "base") return variantTranslations[lang].base;
  if (lang === "pt-br") return `${variantTranslations[lang].suffix} ${variant.name}`;
  if (lang === "es") return `${variantTranslations[lang].suffix} ${variant.name}`;
  return `${variant.name} Ender Elevator`;
}

function recipeCards(lang) {
  const t = variantTranslations[lang];
  return `<div class="recipe-grid">
    ${variantDefs.map(([id, name, file, ingredients]) => `<article class="recipe-card">
      <div class="recipe-icon-frame"><img src="${iconPath(file)}" alt="${escapeHtml(variantName(lang, { id, name }))} block icon" loading="lazy"></div>
      <div>
        <span class="badge badge-recipe">${escapeHtml(t.station)}</span>
        <h3>${escapeHtml(variantName(lang, { id, name }))}</h3>
        <ul>${ingredients.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        <p>${escapeHtml(t.category)}</p>
      </div>
    </article>`).join("")}
  </div>`;
}

function variantStrip(lang, limit = variantDefs.length) {
  return `<div class="variant-strip" aria-label="${escapeHtml(pageMeta.recipes.title[lang])}">
    ${variantDefs.slice(0, limit).map(([id, name, file]) => `<figure>
      <img src="${iconPath(file)}" alt="${escapeHtml(variantName(lang, { id, name }))} block icon" loading="lazy">
      <figcaption>${escapeHtml(id === "base" ? "Base" : name)}</figcaption>
    </figure>`).join("")}
  </div>`;
}

function configTable(lang) {
  const labels = {
    en: ["Key", "Type", "Default", "Description", "Gameplay effect", "Recommended"],
    "pt-br": ["Chave", "Tipo", "Padrao", "Descricao", "Efeito no jogo", "Recomendado"],
    es: ["Clave", "Tipo", "Predeterminado", "Descripcion", "Efecto en juego", "Recomendado"]
  }[lang];
  return table(labels, configRows.map((row) => [
    `<code>${escapeHtml(row.key)}</code>`,
    `<code>${escapeHtml(row.type)}</code>`,
    `<code>${escapeHtml(row.defaultValue)}</code>`,
    escapeHtml(row.desc[lang]),
    escapeHtml(row.effect[lang]),
    `<code>${escapeHtml(row.recommended)}</code>`
  ]), { className: "config-table" });
}

function compatibilityTable(lang) {
  const labels = {
    en: ["Surface", "Current value", "Source", "Guidance"],
    "pt-br": ["Superficie", "Valor atual", "Fonte", "Orientacao"],
    es: ["Superficie", "Valor actual", "Fuente", "Guia"]
  }[lang];
  const guidance = {
    en: [
      "Use the current release unless a newer CurseForge file is available.",
      "Do not assume unsupported Hytale builds work until README, manifest, or CurseForge says so.",
      "The asset pack is included with the mod, so keep the mod jar and assets together.",
      "Server owners should keep clients and server on compatible Hytale/mod versions."
    ],
    "pt-br": [
      "Use a versao atual a menos que exista arquivo mais novo no CurseForge.",
      "Nao assuma suporte a builds nao listadas ate README, manifest ou CurseForge confirmar.",
      "O asset pack acompanha o mod, entao mantenha jar e assets juntos.",
      "Servidores devem manter clientes e servidor em versoes compativeis de Hytale/mod."
    ],
    es: [
      "Usa la version actual salvo que CurseForge tenga un archivo mas nuevo.",
      "No asumas soporte para builds no listadas hasta que README, manifest o CurseForge lo confirme.",
      "El asset pack va incluido con el mod; conserva jar y assets juntos.",
      "Los servidores deben mantener clientes y servidor en versiones compatibles de Hytale/mod."
    ]
  }[lang];
  const rowLabels = {
    en: ["Mod version", "Hytale game version", "ServerVersion", "IncludesAssetPack", "Server and modpacks", "Supported when all players run the same compatible mod build"],
    "pt-br": ["Versao do mod", "Versao do Hytale", "ServerVersion", "IncludesAssetPack", "Servidores e modpacks", "Suportado quando todos os jogadores usam o mesmo build compativel do mod"],
    es: ["Version del mod", "Version de Hytale", "ServerVersion", "IncludesAssetPack", "Servidores y modpacks", "Compatible cuando todos los jugadores usan la misma build compatible del mod"]
  }[lang];
  return table(labels, [
    [rowLabels[0], `<code>${escapeHtml(manifest.Version)}</code>`, "manifest.json / CurseForge", escapeHtml(guidance[0])],
    [rowLabels[1], "<code>0.5 / Early Access</code>", "CurseForge", escapeHtml(guidance[1])],
    [rowLabels[2], `<code>${escapeHtml(manifest.ServerVersion)}</code>`, "manifest.json", escapeHtml(guidance[1])],
    [rowLabels[3], `<code>${escapeHtml(String(manifest.IncludesAssetPack))}</code>`, "manifest.json", escapeHtml(guidance[2])],
    [rowLabels[4], escapeHtml(rowLabels[5]), "README / CurseForge", escapeHtml(guidance[3])]
  ]);
}

function troubleshootingTable(lang) {
  const labels = {
    en: ["Symptom", "Likely cause", "Fix", "Related page/config"],
    "pt-br": ["Sintoma", "Causa provavel", "Correcao", "Pagina/config relacionado"],
    es: ["Sintoma", "Causa probable", "Solucion", "Pagina/config relacionada"]
  }[lang];
  const rows = {
    en: [
      ["Crash or issue around chunks", "A destination or current block is in a chunk that is not ticking.", "Use the latest mod version and report the log. The mod gates block reads with loaded-chunk checks.", "Compatibility / Development"],
      ["The mod does not load", "Hytale build or mod file does not match the supported release.", "Install the CurseForge latest file and verify Hytale 0.5 / Early Access support.", "Compatibility"],
      ["Config changes do not apply", "The server or world has not reloaded the config.", "Stop the server, edit config.json, then start again.", "Configuration"],
      ["Jump or crouch feels delayed", "CooldownMs prevents rapid repeated activation.", "Lower CooldownMs carefully, or wait for the cooldown window.", "CooldownMs"],
      ["Smooth movement is not visible", "EnableSmoothMovement is false, or the duration is too low to notice.", "Set EnableSmoothMovement to true and try SmoothingDurationMs around 320.", "Smooth movement"],
      ["Teleport sound is missing", "EnableSound is false, or the sound registry is not available yet.", "Set EnableSound to true and test after a successful teleport.", "teleport sound"],
      ["Jump/crouch does nothing", "The player is not standing on an elevator block or there is no matching block above/below.", "Align matching variants on the same X/Z column and keep space above the target clear.", "Usage"],
      ["Recipe looks wrong", "Outdated screenshots or older recipe notes are being used.", "Use White Wool, Life Essence, Furniture Bench, and Textiles from README/CurseForge.", "Recipes"],
      ["Wrong game or mod version", "A stale jar is installed or the world uses a different mod build.", "Replace the jar with EnderElevator 1.1.4 or the latest CurseForge file.", "Compatibility"]
    ],
    "pt-br": [
      ["Crash ou problema em chunks", "Um bloco atual ou destino esta em chunk que nao esta ticking.", "Use a versao mais nova e reporte o log. O mod protege leituras com checagem de chunk carregado.", "Compatibilidade / Desenvolvimento"],
      ["O mod nao carrega", "Build do Hytale ou arquivo do mod nao bate com a versao suportada.", "Instale o arquivo mais recente do CurseForge e verifique suporte a Hytale 0.5 / Early Access.", "Compatibilidade"],
      ["Config nao aplica", "O servidor ou mundo nao recarregou o config.", "Pare o servidor, edite config.json e inicie novamente.", "Configuracao"],
      ["Pulo ou agachar parece atrasado", "CooldownMs evita ativacoes repetidas rapidas.", "Reduza CooldownMs com cuidado ou aguarde a janela de cooldown.", "CooldownMs"],
      ["Movimento suave nao aparece", "EnableSmoothMovement esta false ou a duracao esta baixa.", "Use EnableSmoothMovement true e SmoothingDurationMs perto de 320.", "Movimento suave"],
      ["Som de teleporte nao toca", "EnableSound esta false ou o registro de som ainda nao esta disponivel.", "Use EnableSound true e teste apos um teleporte bem-sucedido.", "teleport sound"],
      ["Pular/agachar nao faz nada", "O jogador nao esta no elevador ou nao ha bloco equivalente acima/abaixo.", "Alinhe variantes iguais na mesma coluna X/Z e deixe espaco livre no destino.", "Uso"],
      ["Receita parece errada", "Screenshots antigas ou notas antigas estao sendo usadas.", "Use White Wool, Life Essence, Furniture Bench e Textiles do README/CurseForge.", "Receitas"],
      ["Versao errada de jogo/mod", "Jar antigo instalado ou mundo com outro build do mod.", "Troque pelo EnderElevator 1.1.4 ou pelo ultimo arquivo do CurseForge.", "Compatibilidade"]
    ],
    es: [
      ["Crash o problema con chunks", "Un bloque actual o destino esta en un chunk que no esta ticking.", "Usa la version mas nueva y reporta el log. El mod protege lecturas con chequeos de chunk cargado.", "Compatibilidad / Desarrollo"],
      ["El mod no carga", "La build de Hytale o el archivo del mod no coincide con la version soportada.", "Instala el archivo mas reciente de CurseForge y verifica soporte para Hytale 0.5 / Early Access.", "Compatibilidad"],
      ["La config no aplica", "El servidor o mundo no recargo la config.", "Deten el servidor, edita config.json y arranca de nuevo.", "Configuracion"],
      ["Saltar o agacharse parece lento", "CooldownMs evita activaciones repetidas rapidas.", "Baja CooldownMs con cuidado o espera la ventana de cooldown.", "CooldownMs"],
      ["No se ve movimiento suave", "EnableSmoothMovement esta false o la duracion es muy baja.", "Usa EnableSmoothMovement true y SmoothingDurationMs cerca de 320.", "Movimiento suave"],
      ["No suena el teletransporte", "EnableSound esta false o el registro de sonido no esta disponible aun.", "Usa EnableSound true y prueba tras un teletransporte exitoso.", "teleport sound"],
      ["Saltar/agacharse no hace nada", "El jugador no esta sobre un elevador o no hay bloque equivalente arriba/abajo.", "Alinea variantes iguales en la misma columna X/Z y deja espacio libre en destino.", "Uso"],
      ["La receta parece incorrecta", "Se estan usando screenshots o notas antiguas.", "Usa White Wool, Life Essence, Furniture Bench y Textiles desde README/CurseForge.", "Recetas"],
      ["Version incorrecta de juego/mod", "Jar antiguo instalado o mundo con otra build del mod.", "Reemplaza por EnderElevator 1.1.4 o el ultimo archivo de CurseForge.", "Compatibilidad"]
    ]
  }[lang];
  return table(labels, rows.map((row) => row.map(escapeHtml)));
}

function markdownToChangelogHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let listOpen = false;
  for (const line of lines) {
    if (!line.trim()) {
      if (listOpen) {
        html.push("</ul>");
        listOpen = false;
      }
      continue;
    }
    if (line.startsWith("[") && line.includes("] - ")) {
      if (listOpen) {
        html.push("</ul>");
        listOpen = false;
      }
      html.push(`<h2 id="${slugify(line)}">${escapeHtml(line)}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      if (listOpen) {
        html.push("</ul>");
        listOpen = false;
      }
      html.push(`<h3 id="${slugify(line.slice(4))}">${escapeHtml(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith("* ")) {
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${inlineMarkdown(line.slice(2))}</li>`);
      continue;
    }
    if (line.startsWith("---")) {
      continue;
    }
    html.push(`<p>${inlineMarkdown(line)}</p>`);
  }
  if (listOpen) html.push("</ul>");
  return html.join("\n");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function homeContent(lang) {
  const t = {
    en: {
      headline: "Vertical travel, powered by ender magic.",
      sub: "Jump to go up, crouch to go down. EnderElevator adds simple, safe, configurable vertical transport to Hytale servers and worlds.",
      badge: `Version ${manifest.Version} - Hytale 0.5 / Early Access`,
      how: "How it works",
      howSub: "Stand on the block. Let movement do the rest.",
      jump: "Jump to go up",
      jumpBody: "The system searches upward for the next matching elevator block in the same X/Z column.",
      crouch: "Crouch to go down",
      crouchBody: "Hold crouch to search downward for the next matching elevator below your feet.",
      safe: "Teleport safely",
      safeBody: "The destination must have two empty blocks above it, so players do not arrive inside a ceiling.",
      features: "Built for players and server owners",
      install: "Install in 3 steps",
      recipes: "Recipes preview",
      wiki: "Open the wiki",
      support: "Support and source",
      modsFolder: "Mods folder",
      worldSettings: "World settings",
      issues: "GitHub issues",
      featuresList: [
        ["11 color variations", "Build elevators that match stone halls, gardens, libraries, and arcane rooms."],
        ["Configurable search distance", "Tune MaxSearchDistance for compact builds or very tall shafts."],
        ["Cooldown configuration", "Use CooldownMs to keep repeated travel deliberate."],
        ["Optional sound", "Enable teleport sound only when the server wants audible feedback."],
        ["Optional smooth movement", "Enable smooth movement for a short interpolated travel effect."]
      ]
    },
    "pt-br": {
      headline: "Viagem vertical com magia ender.",
      sub: "Pule para subir, agache para descer. EnderElevator adiciona transporte vertical simples, seguro e configuravel para servidores e mundos de Hytale.",
      badge: `Versao ${manifest.Version} - Hytale 0.5 / Early Access`,
      how: "Como funciona",
      howSub: "Fique sobre o bloco. O movimento faz o resto.",
      jump: "Pule para subir",
      jumpBody: "O sistema busca para cima o proximo elevador equivalente na mesma coluna X/Z.",
      crouch: "Agache para descer",
      crouchBody: "Segure agachar para buscar abaixo dos seus pes o proximo elevador equivalente.",
      safe: "Teleporte seguro",
      safeBody: "O destino precisa ter dois blocos vazios acima para o jogador nao chegar dentro do teto.",
      features: "Feito para jogadores e servidores",
      install: "Instale em 3 passos",
      recipes: "Previa de receitas",
      wiki: "Abra a wiki",
      support: "Suporte e codigo",
      modsFolder: "Pasta de mods",
      worldSettings: "Configuracoes do mundo",
      issues: "Issues do GitHub",
      featuresList: [
        ["11 variacoes coloridas", "Monte elevadores que combinam com saloes de pedra, jardins, bibliotecas e salas arcanas."],
        ["Distancia de busca configuravel", "Ajuste MaxSearchDistance para construcoes compactas ou eixos muito altos."],
        ["Cooldown configuravel", "Use CooldownMs para manter viagens repetidas sob controle."],
        ["Som opcional", "Ative o som de teleporte apenas quando o servidor quiser retorno audivel."],
        ["Movimento suave opcional", "Ative movimento suave para um efeito curto de viagem interpolada."]
      ]
    },
    es: {
      headline: "Viaje vertical con magia ender.",
      sub: "Salta para subir, agachate para bajar. EnderElevator agrega transporte vertical simple, seguro y configurable para servidores y mundos de Hytale.",
      badge: `Version ${manifest.Version} - Hytale 0.5 / Early Access`,
      how: "Como funciona",
      howSub: "Parate sobre el bloque. El movimiento hace el resto.",
      jump: "Salta para subir",
      jumpBody: "El sistema busca hacia arriba el siguiente elevador equivalente en la misma columna X/Z.",
      crouch: "Agachate para bajar",
      crouchBody: "Mantener agacharse busca hacia abajo el siguiente elevador equivalente.",
      safe: "Teletransporte seguro",
      safeBody: "El destino debe tener dos bloques vacios encima para que el jugador no llegue dentro de un techo.",
      features: "Hecho para jugadores y servidores",
      install: "Instala en 3 pasos",
      recipes: "Vista previa de recetas",
      wiki: "Abre la wiki",
      support: "Soporte y codigo",
      modsFolder: "Carpeta de mods",
      worldSettings: "Configuracion del mundo",
      issues: "Issues de GitHub",
      featuresList: [
        ["11 variaciones de color", "Construye elevadores que combinen con salones de piedra, jardines, bibliotecas y salas arcanas."],
        ["Distancia de busqueda configurable", "Ajusta MaxSearchDistance para construcciones compactas o ejes muy altos."],
        ["Cooldown configurable", "Usa CooldownMs para mantener viajes repetidos bajo control."],
        ["Sonido opcional", "Activa el sonido de teletransporte solo cuando el servidor quiera respuesta audible."],
        ["Movimiento suave opcional", "Activa movimiento suave para un efecto corto de viaje interpolado."]
      ]
    }
  }[lang];

  return `
    <section class="hero-section">
      <div class="hero-copy">
        <div class="compat-rune">${escapeHtml(t.badge)}</div>
        <h1>EnderElevator</h1>
        <p class="hero-headline">${escapeHtml(t.headline)}</p>
        <p class="hero-sub">${escapeHtml(t.sub)}</p>
        <div class="hero-actions">
          ${linkButton(links.curseforge, languages[lang].nav.download, "primary", "download")}
          ${linkButton(routeFor(lang, "wiki"), languages[lang].nav.openWiki, "secondary", "book")}
          ${linkButton(links.github, "GitHub", "ghost", "github")}
        </div>
      </div>
      <div class="hero-art" aria-label="EnderElevator block variants">
        <div class="hero-orbit">
          <img class="hero-main-icon" src="${iconPath("Ender_Elevator_Block_Purple.png")}" alt="Purple Ender Elevator block icon">
          ${variantDefs.filter((variant) => variant[0] !== "base").slice(0, 10).map(([id, name, file], index) => `<img style="--i:${index}" src="${iconPath(file)}" alt="${escapeHtml(variantName(lang, { id, name }))} block icon">`).join("")}
        </div>
        <div class="hero-art-caption">
          <strong>11</strong>
          <span>${lang === "en" ? "color variations" : lang === "pt-br" ? "variacoes coloridas" : "variaciones de color"}</span>
        </div>
      </div>
    </section>

    <section class="section-band next-peek">
      <div class="section-heading">
        <span>${escapeHtml(t.how)}</span>
        <h2>${escapeHtml(t.howSub)}</h2>
      </div>
      <div class="how-grid">
        <article class="crystal-card"><span>01</span><h3>${escapeHtml(t.jump)}</h3><p>${escapeHtml(t.jumpBody)}</p></article>
        <article class="crystal-card"><span>02</span><h3>${escapeHtml(t.crouch)}</h3><p>${escapeHtml(t.crouchBody)}</p></article>
        <article class="crystal-card wide"><span>03</span><h3>${escapeHtml(t.safe)}</h3><p>${escapeHtml(t.safeBody)}</p></article>
      </div>
    </section>

    <section class="content-section asymmetric">
      <div class="section-heading">
        <span>${escapeHtml(t.features)}</span>
        <h2>${lang === "en" ? "Practical transport without command spam." : lang === "pt-br" ? "Transporte pratico sem comandos." : "Transporte practico sin comandos."}</h2>
      </div>
      <div class="feature-ledger">
        ${t.featuresList.map(([title, body]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></article>`).join("")}
      </div>
    </section>

    <section class="content-section variants-section">
      <div class="section-heading compact">
        <span>${lang === "en" ? "Block sprites" : lang === "pt-br" ? "Sprites reais" : "Sprites reales"}</span>
        <h2>${lang === "en" ? "The block is the brand." : lang === "pt-br" ? "O bloco e a marca." : "El bloque es la marca."}</h2>
      </div>
      ${variantStrip(lang)}
    </section>

    <section class="content-section install-section">
      <div class="stone-panel strong-panel">
        <div class="section-heading compact">
          <span>${escapeHtml(t.install)}</span>
          <h2>${lang === "en" ? "Download, place, enable." : lang === "pt-br" ? "Baixe, coloque, habilite." : "Descarga, coloca, habilita."}</h2>
        </div>
        <ol class="step-list">
          <li><strong>CurseForge</strong><p>${lang === "en" ? "Install through the CurseForge app or download the latest jar." : lang === "pt-br" ? "Instale pelo app CurseForge ou baixe o jar mais recente." : "Instala con la app de CurseForge o descarga el jar mas reciente."}</p></li>
          <li><strong>${escapeHtml(t.modsFolder)}</strong><p>${lang === "en" ? "Place the mod in the Hytale server or client mods folder used by your setup." : lang === "pt-br" ? "Coloque o mod na pasta de mods do servidor ou cliente Hytale do seu ambiente." : "Coloca el mod en la carpeta de mods del servidor o cliente Hytale de tu entorno."}</p></li>
          <li><strong>${escapeHtml(t.worldSettings)}</strong><p>${lang === "en" ? "Enable the mod for the world or server and keep versions aligned." : lang === "pt-br" ? "Habilite o mod no mundo ou servidor e mantenha as versoes alinhadas." : "Activa el mod en el mundo o servidor y manten las versiones alineadas."}</p></li>
        </ol>
      </div>
    </section>

    <section class="content-section two-column">
      <div>
        <div class="section-heading compact">
          <span>${escapeHtml(t.recipes)}</span>
          <h2>${lang === "en" ? "White Wool, Life Essence, then color petals." : lang === "pt-br" ? "White Wool, Life Essence e depois petalas." : "White Wool, Life Essence y luego petalos."}</h2>
        </div>
        <div class="parchment-card">
          <h3>${escapeHtml(variantTranslations[lang].base)}</h3>
          <p>8x White Wool + 1x Life Essence</p>
          <p>${escapeHtml(variantTranslations[lang].craftedAt)}</p>
          ${linkButton(routeFor(lang, "recipes"), pageTitle(lang, "recipes"), "accent", "book")}
        </div>
      </div>
      <div>
        <div class="section-heading compact">
          <span>${escapeHtml(t.wiki)}</span>
          <h2>${lang === "en" ? "Player docs and contributor notes live together." : lang === "pt-br" ? "Docs de jogador e notas tecnicas no mesmo lugar." : "Docs de jugador y notas tecnicas en el mismo lugar."}</h2>
        </div>
        <div class="quick-link-grid">
          ${["installation", "usage", "configuration", "troubleshooting", "development", "changelog"].map((id) => `<a class="quick-card" href="${routeFor(lang, id)}"><span>${escapeHtml(pageCategory(lang, id))}</span><strong>${escapeHtml(pageTitle(lang, id))}</strong><p>${escapeHtml(pageDescription(lang, id))}</p></a>`).join("")}
        </div>
      </div>
    </section>

    <section class="content-section support-section">
      <div class="section-heading compact">
        <span>${escapeHtml(t.support)}</span>
        <h2>${lang === "en" ? "Report issues where the mod is built." : lang === "pt-br" ? "Reporte problemas onde o mod e construido." : "Reporta problemas donde se construye el mod."}</h2>
      </div>
      <div class="support-actions">
        ${linkButton(links.issues, t.issues, "secondary", "github")}
        ${linkButton(links.discord, "Discord", "secondary", "spark")}
        ${linkButton(links.curseforge, "CurseForge", "primary", "download")}
      </div>
    </section>
  `;
}

function wikiIndexContent(lang) {
  const start = ["installation", "usage", "recipes"];
  const popular = ["configuration", "troubleshooting", "compatibility"];
  const dev = ["development", "changelog"];
  return `
    ${alertBlock("compatibility", pageDescription(lang, "compatibility"), `EnderElevator ${manifest.Version} - Hytale 0.5 / Early Access - ServerVersion ${manifest.ServerVersion}`)}
    <section class="wiki-search-hero">
      <label for="wiki-index-search">${escapeHtml(languages[lang].nav.search)}</label>
      <div class="search-shell">${externalIcon("search")}<input id="wiki-index-search" type="search" data-search-input placeholder="${escapeHtml(languages[lang].nav.search)}"><div class="search-results" data-search-results></div></div>
    </section>
    ${heading(2, languages[lang].nav.startHere)}
    <div class="start-grid">
      ${start.map((id, index) => `<a class="start-card" href="${routeFor(lang, id)}"><span>0${index + 1}</span><strong>${escapeHtml(pageTitle(lang, id))}</strong><p>${escapeHtml(pageDescription(lang, id))}</p></a>`).join("")}
    </div>
    ${heading(2, lang === "en" ? "Categories" : lang === "pt-br" ? "Categorias" : "Categorias")}
    <div class="category-grid">
      ${["installation", "usage", "recipes", "configuration", "compatibility", "troubleshooting", "development", "changelog"].map((id) => `<a class="quick-card" href="${routeFor(lang, id)}"><span>${escapeHtml(pageCategory(lang, id))}</span><strong>${escapeHtml(pageTitle(lang, id))}</strong><p>${escapeHtml(pageDescription(lang, id))}</p></a>`).join("")}
    </div>
    ${heading(2, lang === "en" ? "Popular pages" : lang === "pt-br" ? "Paginas populares" : "Paginas populares")}
    <div class="quick-link-grid">
      ${popular.map((id) => `<a class="quick-card compact-card" href="${routeFor(lang, id)}"><strong>${escapeHtml(pageTitle(lang, id))}</strong><p>${escapeHtml(pageDescription(lang, id))}</p></a>`).join("")}
    </div>
    ${heading(2, lang === "en" ? "Developer docs" : lang === "pt-br" ? "Docs de desenvolvimento" : "Docs de desarrollo")}
    <div class="quick-link-grid">
      ${dev.map((id) => `<a class="quick-card compact-card developer-card" href="${routeFor(lang, id)}"><strong>${escapeHtml(pageTitle(lang, id))}</strong><p>${escapeHtml(pageDescription(lang, id))}</p></a>`).join("")}
    </div>
  `;
}

function installationContent(lang) {
  const copy = {
    en: {
      where: "Where to download",
      steps: "Install steps",
      body: "Download the current release from CurseForge first. GitHub releases and source are useful for contributors, but CurseForge is the public distribution page.",
      warn: "Use the supported Hytale build listed on the Compatibility page. Do not assume unsupported builds are safe.",
      serverHeading: "Server and modpack note",
      server: "For servers and modpacks, keep all players on the same mod jar and Hytale build.",
      compatibility: "Compatibility",
      releases: "GitHub releases",
      stepsCopy: [
        ["Download the mod", `Use <code>EnderElevator-${escapeHtml(manifest.Version)}.jar</code> or the latest CurseForge file.`],
        ["Place it in the mods folder", "Install through CurseForge or place the mod files into the Hytale server/client mods folder used by your setup."],
        ["Enable it for the world", "Start Hytale, enable the mod where required, and confirm the asset pack loads with the mod."]
      ]
    },
    "pt-br": {
      where: "Onde baixar",
      steps: "Passos de instalacao",
      body: "Baixe a versao atual pelo CurseForge primeiro. Releases do GitHub e codigo ajudam contribuidores, mas CurseForge e a pagina publica de distribuicao.",
      warn: "Use a build de Hytale listada em Compatibilidade. Nao assuma que builds nao suportadas sao seguras.",
      serverHeading: "Nota para servidores e modpacks",
      server: "Para servidores e modpacks, mantenha todos os jogadores no mesmo jar e build do Hytale.",
      compatibility: "Compatibilidade",
      releases: "Releases do GitHub",
      stepsCopy: [
        ["Baixe o mod", `Use o arquivo <code>EnderElevator-${escapeHtml(manifest.Version)}.jar</code> ou o arquivo mais recente do CurseForge.`],
        ["Coloque na pasta de mods", "Instale pelo CurseForge ou coloque os arquivos do mod na pasta de mods do servidor/cliente Hytale usada pelo seu ambiente."],
        ["Habilite no mundo", "Inicie o Hytale, habilite o mod onde necessario e confirme que o asset pack carrega com o mod."]
      ]
    },
    es: {
      where: "Donde descargar",
      steps: "Pasos de instalacion",
      body: "Descarga la version actual desde CurseForge primero. Los releases de GitHub y el codigo ayudan a colaboradores, pero CurseForge es la pagina publica de distribucion.",
      warn: "Usa la build de Hytale listada en Compatibilidad. No asumas que builds no soportadas son seguras.",
      serverHeading: "Nota para servidores y modpacks",
      server: "Para servidores y modpacks, manten a todos los jugadores con el mismo jar y build de Hytale.",
      compatibility: "Compatibilidad",
      releases: "Releases de GitHub",
      stepsCopy: [
        ["Descarga el mod", `Usa <code>EnderElevator-${escapeHtml(manifest.Version)}.jar</code> o el archivo mas reciente de CurseForge.`],
        ["Colocalo en la carpeta de mods", "Instala mediante CurseForge o coloca los archivos del mod en la carpeta de mods del servidor/cliente Hytale usada por tu entorno."],
        ["Activalo en el mundo", "Inicia Hytale, activa el mod donde sea necesario y confirma que el asset pack cargue con el mod."]
      ]
    }
  }[lang];
  return `
    ${alertBlock("warning", copy.compatibility, copy.warn)}
    ${heading(2, copy.where)}
    <p>${escapeHtml(copy.body)}</p>
    <div class="support-actions inline-actions">${linkButton(links.curseforge, "CurseForge", "primary", "download")}${linkButton(links.releases, copy.releases, "secondary", "github")}</div>
    ${heading(2, copy.steps)}
    <ol class="step-list docs-list">
      ${copy.stepsCopy.map(([title, body]) => `<li><strong>${escapeHtml(title)}</strong><p>${body}</p></li>`).join("")}
    </ol>
    ${heading(2, copy.serverHeading)}
    <p>${escapeHtml(copy.server)}</p>
  `;
}

function usageContent(lang) {
  const copy = {
    en: ["Expected behavior", "Place Ender Elevators vertically on the same X/Z column. Stand on one, jump to travel upward, or crouch to travel downward.", "Cooldown behavior", "CooldownMs adds a short delay after successful travel so holding a movement key does not repeatedly fire.", "Smooth movement and sound", "If EnableSmoothMovement is true, travel is interpolated for a short duration. If EnableSound is true, the teleport sound plays after a successful use.", "Lower floor", "Jump", "Crouch", "Upper floor", "Base Ender Elevator block icon", "Safe arrival", "The destination must have two clear blocks above the elevator. Matching color variants are required by the search logic."],
    "pt-br": ["Comportamento esperado", "Coloque Ender Elevators na vertical, na mesma coluna X/Z. Fique sobre um, pule para subir ou agache para descer.", "Cooldown", "CooldownMs adiciona um pequeno intervalo apos uma viagem bem-sucedida para evitar ativacao repetida ao segurar a tecla.", "Movimento suave e som", "Se EnableSmoothMovement estiver true, a viagem usa interpolacao curta. Se EnableSound estiver true, o som de teleporte toca apos um uso bem-sucedido.", "Andar inferior", "Pular", "Agachar", "Andar superior", "Icone do bloco Ender Elevator base", "Chegada segura", "O destino precisa ter dois blocos livres acima do elevador. Variacoes de cor equivalentes sao exigidas pela logica de busca."],
    es: ["Comportamiento esperado", "Coloca Ender Elevators en vertical, en la misma columna X/Z. Parate sobre uno, salta para subir o agachate para bajar.", "Cooldown", "CooldownMs agrega una pausa corta tras un viaje exitoso para evitar activacion repetida al mantener la tecla.", "Movimiento suave y sonido", "Si EnableSmoothMovement es true, el viaje usa interpolacion corta. Si EnableSound es true, suena el teletransporte tras un uso exitoso.", "Piso inferior", "Saltar", "Agacharse", "Piso superior", "Icono del bloque Ender Elevator base", "Llegada segura", "El destino debe tener dos bloques libres encima del elevador. La logica de busqueda exige variaciones de color equivalentes."]
  }[lang];
  return `
    <div class="usage-diagram">
      <div><img src="${iconPath("Ender_Elevator_Block.png")}" alt="${escapeHtml(copy[10])}"><strong>${escapeHtml(copy[6])}</strong></div>
      <div class="shaft-line"><span>${escapeHtml(copy[7])}</span><span>${escapeHtml(copy[8])}</span></div>
      <div><img src="${iconPath("Ender_Elevator_Block.png")}" alt="${escapeHtml(copy[10])}"><strong>${escapeHtml(copy[9])}</strong></div>
    </div>
    ${heading(2, copy[0])}
    <p>${escapeHtml(copy[1])}</p>
    ${alertBlock("tip", copy[11], copy[12])}
    ${heading(2, copy[2])}
    <p>${escapeHtml(copy[3])}</p>
    ${heading(2, copy[4])}
    <p>${escapeHtml(copy[5])}</p>
  `;
}

function recipesContent(lang) {
  const intro = {
    en: "README.md and CurseForge agree: use White Wool and Life Essence for the base block. All variants are crafted at the Furniture Bench in the Textiles category.",
    "pt-br": "README.md e CurseForge concordam: use White Wool e Life Essence para o bloco base. Todas as variacoes sao feitas na Furniture Bench, categoria Textiles.",
    es: "README.md y CurseForge coinciden: usa White Wool y Life Essence para el bloque base. Todas las variaciones se fabrican en Furniture Bench, categoria Textiles."
  }[lang];
  const sourceTitle = lang === "en" ? "Source of truth" : lang === "pt-br" ? "Fonte oficial" : "Fuente oficial";
  const baseAlt = lang === "en" ? "Base Ender Elevator recipe icon" : lang === "pt-br" ? "Icone da receita do Ender Elevator base" : "Icono de la receta del Ender Elevator base";
  return `
    ${alertBlock("note", sourceTitle, intro)}
    ${heading(2, variantTranslations[lang].base)}
    <div class="base-recipe-panel">
      <img src="${iconPath("Ender_Elevator_Block.png")}" alt="${escapeHtml(baseAlt)}">
      <div>
        <h3>8x White Wool + 1x Life Essence</h3>
        <p>${escapeHtml(variantTranslations[lang].craftedAt)}</p>
      </div>
    </div>
    ${heading(2, lang === "en" ? "Colored variations" : lang === "pt-br" ? "Variacoes coloridas" : "Variaciones de color")}
    ${recipeCards(lang)}
  `;
}

function configurationContent(lang) {
  const intro = {
    en: "config.json is managed by Hytale's config system. These keys are exact and case-sensitive.",
    "pt-br": "config.json e gerenciado pelo sistema de config do Hytale. Estas chaves sao exatas e diferenciam maiusculas.",
    es: "config.json es gestionado por el sistema de config de Hytale. Estas claves son exactas y distinguen mayusculas."
  }[lang];
  const keysTitle = lang === "en" ? "Config keys" : lang === "pt-br" ? "Chaves de config" : "Claves de config";
  return `
    ${alertBlock("tip", keysTitle, intro)}
    ${heading(2, lang === "en" ? "Default config" : lang === "pt-br" ? "Config padrao" : "Config predeterminada")}
    ${codeBlock(`{
  "MaxSearchDistance": 320,
  "CooldownMs": 500,
  "EnableSound": false,
  "EnableSmoothMovement": false,
  "SmoothingDurationMs": 320
}`, "json", lang)}
    ${heading(2, lang === "en" ? "Config reference" : lang === "pt-br" ? "Referencia de config" : "Referencia de config")}
    ${configTable(lang)}
    ${heading(2, lang === "en" ? "Smooth movement example" : lang === "pt-br" ? "Exemplo de movimento suave" : "Ejemplo de movimiento suave")}
    ${codeBlock(`{
  "MaxSearchDistance": 240,
  "CooldownMs": 550,
  "EnableSound": true,
  "EnableSmoothMovement": true,
  "SmoothingDurationMs": 320
}`, "json", lang)}
  `;
}

function compatibilityContent(lang) {
  const releaseTitle = lang === "en" ? "Current public release" : lang === "pt-br" ? "Release publica atual" : "Release publica actual";
  const releaseBody = lang === "en"
    ? `EnderElevator ${manifest.Version}, CurseForge file EnderElevator-${manifest.Version}.jar, game version 0.5 / Early Access.`
    : lang === "pt-br"
      ? `EnderElevator ${manifest.Version}, arquivo CurseForge EnderElevator-${manifest.Version}.jar, versao do jogo 0.5 / Early Access.`
      : `EnderElevator ${manifest.Version}, archivo de CurseForge EnderElevator-${manifest.Version}.jar, version del juego 0.5 / Early Access.`;
  return `
    ${alertBlock("compatibility", releaseTitle, releaseBody)}
    ${heading(2, lang === "en" ? "Compatibility matrix" : lang === "pt-br" ? "Matriz de compatibilidade" : "Matriz de compatibilidad")}
    ${compatibilityTable(lang)}
    ${heading(2, lang === "en" ? "Do not assume unsupported builds" : lang === "pt-br" ? "Nao assuma builds nao suportadas" : "No asumas builds no soportadas")}
    <p>${lang === "en" ? "Hytale pre-release builds can change engine, asset, and ECS behavior. Treat README.md, manifest.json, and CurseForge as the current public compatibility record." : lang === "pt-br" ? "Builds pre-release do Hytale podem mudar engine, assets e ECS. Trate README.md, manifest.json e CurseForge como o registro publico atual." : "Builds pre-release de Hytale pueden cambiar engine, assets y ECS. Trata README.md, manifest.json y CurseForge como el registro publico actual."}</p>
  `;
}

function troubleshootingContent(lang) {
  return `
    ${alertBlock("warning", pageTitle(lang, "troubleshooting"), pageDescription(lang, "troubleshooting"))}
    ${heading(2, lang === "en" ? "Issue table" : lang === "pt-br" ? "Tabela de problemas" : "Tabla de problemas")}
    ${troubleshootingTable(lang)}
  `;
}

function developmentContent(lang) {
  const labels = {
    en: ["Class", "Role", "Responsibility"],
    "pt-br": ["Classe", "Papel", "Responsabilidade"],
    es: ["Clase", "Rol", "Responsabilidad"]
  }[lang];
  const copy = {
    en: {
      pageTitle: "Contributor page",
      pageBody: "This page is for contributors. Player setup lives in Installation, Usage, Recipes, and Configuration.",
      architecture: "ECS architecture",
      safety: "Safety rules",
      source: "Open the source on GitHub",
      rows: [
        ["<code>ElevatorSystem</code>", "Orchestrator", "Detects input, validates the current elevator block, searches vertically, checks destination safety, and queues travel/effects."],
        ["<code>ElevatorComponent</code>", "Per-player state", "Stores last successful use plus short failed-search timestamps per direction."],
        ["<code>SmoothingComponent</code>", "Travel state", "Stores start/end positions, elapsed time, duration, and captured rotation."],
        ["<code>SmoothingSystem</code>", "Travel runner", "Moves players with TransformComponent#setPosition() and applies one final Teleport correction."],
        ["<code>ElevatorConfig</code>", "Configuration", "Defines BuilderCodec-backed search distance, cooldown, sound, smooth movement, and duration keys."]
      ],
      rules: [
        "Use <code>CommandBuffer</code> for ECS mutations during ticks.",
        "Check <code>world.getChunkIfLoaded()</code> before <code>world.getBlockType()</code>.",
        "Resolve the teleport sound lazily only when sound is enabled and travel succeeds.",
        "Do not smooth by adding <code>Teleport</code> every tick."
      ]
    },
    "pt-br": {
      pageTitle: "Pagina para contribuidores",
      pageBody: "Esta pagina e para contribuidores. A configuracao de jogador fica em Instalacao, Uso, Receitas e Configuracao.",
      architecture: "Arquitetura ECS",
      safety: "Regras de seguranca",
      source: "Abrir codigo no GitHub",
      rows: [
        ["<code>ElevatorSystem</code>", "Orquestrador", "Detecta input, valida o bloco atual do elevador, busca na vertical, checa a seguranca do destino e enfileira viagem/efeitos."],
        ["<code>ElevatorComponent</code>", "Estado por jogador", "Armazena o ultimo uso bem-sucedido e timestamps curtos de busca falha por direcao."],
        ["<code>SmoothingComponent</code>", "Estado da viagem", "Armazena posicoes de inicio/fim, tempo decorrido, duracao e rotacao capturada."],
        ["<code>SmoothingSystem</code>", "Executor da viagem", "Move jogadores com TransformComponent#setPosition() e aplica uma correcao final com Teleport."],
        ["<code>ElevatorConfig</code>", "Configuracao", "Define distancia de busca, cooldown, som, movimento suave e duracao via BuilderCodec."]
      ],
      rules: [
        "Use <code>CommandBuffer</code> para mutacoes ECS durante ticks.",
        "Cheque <code>world.getChunkIfLoaded()</code> antes de <code>world.getBlockType()</code>.",
        "Resolva o som de teleporte sob demanda apenas quando som estiver ativo e a viagem for bem-sucedida.",
        "Nao implemente smoothing adicionando <code>Teleport</code> a cada tick."
      ]
    },
    es: {
      pageTitle: "Pagina para colaboradores",
      pageBody: "Esta pagina es para colaboradores. La configuracion de jugador esta en Instalacion, Uso, Recetas y Configuracion.",
      architecture: "Arquitectura ECS",
      safety: "Reglas de seguridad",
      source: "Abrir codigo en GitHub",
      rows: [
        ["<code>ElevatorSystem</code>", "Orquestador", "Detecta input, valida el bloque actual del elevador, busca en vertical, revisa la seguridad del destino y encola viaje/efectos."],
        ["<code>ElevatorComponent</code>", "Estado por jugador", "Almacena el ultimo uso exitoso y timestamps cortos de busqueda fallida por direccion."],
        ["<code>SmoothingComponent</code>", "Estado del viaje", "Almacena posiciones de inicio/fin, tiempo transcurrido, duracion y rotacion capturada."],
        ["<code>SmoothingSystem</code>", "Ejecutor del viaje", "Mueve jugadores con TransformComponent#setPosition() y aplica una correccion final con Teleport."],
        ["<code>ElevatorConfig</code>", "Configuracion", "Define distancia de busqueda, cooldown, sonido, movimiento suave y duracion mediante BuilderCodec."]
      ],
      rules: [
        "Usa <code>CommandBuffer</code> para mutaciones ECS durante ticks.",
        "Revisa <code>world.getChunkIfLoaded()</code> antes de <code>world.getBlockType()</code>.",
        "Resuelve el sonido de teletransporte bajo demanda solo cuando el sonido este activo y el viaje sea exitoso.",
        "No implementes smoothing agregando <code>Teleport</code> en cada tick."
      ]
    }
  }[lang];
  return `
    ${alertBlock("note", copy.pageTitle, copy.pageBody)}
    ${heading(2, copy.architecture)}
    ${table(labels, copy.rows.map((row) => row.map((cell) => cell.startsWith("<code>") ? cell : escapeHtml(cell))))}
    ${heading(2, copy.safety)}
    <ul>
      ${copy.rules.map((rule) => `<li>${rule}</li>`).join("")}
    </ul>
    <p><a href="${links.github}">${escapeHtml(copy.source)}</a>.</p>
  `;
}

function localizedChangelogHtml(lang) {
  if (lang === "en") return markdownToChangelogHtml(changelog);
  const data = {
    "pt-br": [
      ["[1.1.4] - 2026-06-04", [
        ["p", "Testado em HytaleServer v2026.04.30-b4f6a911e (pre-release, release)"],
        ["h3", "Atualizacao de compatibilidade"],
        ["li", "<strong>Compatibilidade com Hytale:</strong> EnderElevator foi atualizado para dar suporte a versoes mais novas do Hytale <code>0.5+</code>."],
        ["li", "<strong>Sistema de teleporte:</strong> o comportamento de teleporte do elevador foi ajustado para o engine/runtime mais novo, corrigindo casos em que o teleporte podia falhar, agir de forma inesperada ou travar o jogo."],
        ["li", "<strong>Assets de item:</strong> os IDs dos itens de elevador foram atualizados para corresponder aos nomes esperados pelas versoes mais novas do Hytale."]
      ]],
      ["[1.1.3] - 2026-01-19", [
        ["h3", "Mudancas"],
        ["p", "Receitas das variacoes do elevador foram alteradas de flores para petalas."],
        ["p", "Novas receitas:"],
        ["p", "Yellow: Ender Elevator + Petals Yellow<br>Purple: Ender Elevator + Petals Purple<br>Red: Ender Elevator + Petals Red<br>Orange: Ender Elevator + Petals Yellow + Petals Red<br>Cyan: Ender Elevator + Petals Cyan<br>Violet: Ender Elevator + Petals Purple + Petals Blue<br>Brown: Ender Elevator + Petals Red + Petals Green<br>Pink: Ender Elevator + Petals Pink<br>Green: Ender Elevator + Petals Green<br>Black: Ender Elevator + Petals Red + Petals Blue + Petals Yellow<br>Blue: Ender Elevator + Petals Blue"]
      ]],
      ["[1.1.2] - 2026-01-18", [
        ["h3", "Correcoes"],
        ["p", "Logica de teleporte: corrigido um problema em que o teleporte do elevador podia se comportar de forma inesperada ou falhar."],
        ["p", "Estabilidade do sistema: resolvidos erros internos ligados ao manuseio de <code>Teleport.create</code> para garantir viagem vertical mais suave."]
      ]],
      ["[1.1.1] - 2026-01-16", [
        ["h3", "Hotfixes"],
        ["p", "Drop de blocos: corrigido um problema em que quebrar qualquer bloco Ender Elevator nao derrubava o item do elevador."],
        ["p", "Agora o item correto do elevador e derrubado ao quebrar o bloco, incluindo todas as variacoes coloridas."]
      ]],
      ["[1.1] - 2026-01-15", [
        ["h3", "Novos recursos"],
        ["p", "Variacoes coloridas: adicionadas 11 novas versoes coloridas do Ender Elevator para combinar com diferentes estilos de construcao."],
        ["p", "Cores incluidas: Yellow, Purple, Red, Orange, Cyan, Violet, Brown, Pink, Green, Black e Blue."],
        ["h3", "Crafting"],
        ["p", "Implementadas receitas para todas as variacoes coloridas do elevador. Elas sao criadas na Furniture Bench combinando um Ender Elevator base com flores ou itens especificos."]
      ]]
    ],
    es: [
      ["[1.1.4] - 2026-06-04", [
        ["p", "Probado en HytaleServer v2026.04.30-b4f6a911e (pre-release, release)"],
        ["h3", "Actualizacion de compatibilidad"],
        ["li", "<strong>Compatibilidad con Hytale:</strong> EnderElevator fue actualizado para soportar versiones mas nuevas de Hytale <code>0.5+</code>."],
        ["li", "<strong>Sistema de teletransporte:</strong> se ajusto el comportamiento de teletransporte del elevador para el engine/runtime mas nuevo, corrigiendo casos donde podia fallar, comportarse de forma inesperada o cerrar el juego."],
        ["li", "<strong>Assets de item:</strong> los IDs de los items del elevador fueron actualizados para coincidir con los nombres esperados por versiones mas nuevas de Hytale."]
      ]],
      ["[1.1.3] - 2026-01-19", [
        ["h3", "Cambios"],
        ["p", "Las recetas de las variaciones del elevador cambiaron de flores a petalos."],
        ["p", "Nuevas recetas:"],
        ["p", "Yellow: Ender Elevator + Petals Yellow<br>Purple: Ender Elevator + Petals Purple<br>Red: Ender Elevator + Petals Red<br>Orange: Ender Elevator + Petals Yellow + Petals Red<br>Cyan: Ender Elevator + Petals Cyan<br>Violet: Ender Elevator + Petals Purple + Petals Blue<br>Brown: Ender Elevator + Petals Red + Petals Green<br>Pink: Ender Elevator + Petals Pink<br>Green: Ender Elevator + Petals Green<br>Black: Ender Elevator + Petals Red + Petals Blue + Petals Yellow<br>Blue: Ender Elevator + Petals Blue"]
      ]],
      ["[1.1.2] - 2026-01-18", [
        ["h3", "Correcciones"],
        ["p", "Logica de teletransporte: corregido un problema donde el teletransporte del elevador podia comportarse de forma inesperada o fallar."],
        ["p", "Estabilidad del sistema: resueltos errores internos ligados al manejo de <code>Teleport.create</code> para asegurar un viaje vertical mas suave."]
      ]],
      ["[1.1.1] - 2026-01-16", [
        ["h3", "Hotfixes"],
        ["p", "Drop de bloques: corregido un problema donde romper cualquier bloque Ender Elevator no soltaba el item del elevador."],
        ["p", "Ahora se suelta el item correcto al romper el bloque, incluidas todas las variaciones de color."]
      ]],
      ["[1.1] - 2026-01-15", [
        ["h3", "Nuevas funciones"],
        ["p", "Variaciones de color: agregadas 11 nuevas versiones de color del Ender Elevator para combinar con distintos estilos de construccion."],
        ["p", "Colores incluidos: Yellow, Purple, Red, Orange, Cyan, Violet, Brown, Pink, Green, Black y Blue."],
        ["h3", "Crafting"],
        ["p", "Implementadas recetas para todas las variaciones de color del elevador. Se fabrican en Furniture Bench combinando un Ender Elevator base con flores o items especificos."]
      ]]
    ]
  }[lang];
  return data.map(([title, blocks]) => `<h2 id="${slugify(title)}">${escapeHtml(title)}</h2>` + blocks.map(([type, text]) => {
    if (type === "h3") return `<h3 id="${slugify(text)}">${escapeHtml(text)}</h3>`;
    if (type === "li") return `<ul><li>${text}</li></ul>`;
    return `<p>${text}</p>`;
  }).join("\n")).join("\n");
}

function changelogContent(lang) {
  const title = lang === "en" ? "Mirrored source" : lang === "pt-br" ? "Historico localizado" : "Historial localizado";
  const body = lang === "en"
    ? "This page renders CHANGELOG.md from the repository so public docs stay close to release history."
    : lang === "pt-br"
      ? "Esta pagina traduz o historico publico de releases; os identificadores de versao e nomes de itens permanecem como no projeto."
      : "Esta pagina traduce el historial publico de releases; los identificadores de version y nombres de items permanecen como en el proyecto.";
  return `
    ${alertBlock("note", title, body)}
    <div class="changelog-content">${localizedChangelogHtml(lang)}</div>
  `;
}

function roadmapContent(lang) {
  const labels = {
    en: ["Status", "Item", "Notes"],
    "pt-br": ["Status", "Item", "Notas"],
    es: ["Estado", "Item", "Notas"]
  }[lang];
  const rows = {
    en: [
      ["Done", "ECS modernization", "Native ECS systems and components are in place."],
      ["Done", "Sound effects", "Optional SFX_Portal_Neutral_Teleport_Local feedback."],
      ["Done", "Configuration toggles", "Sound, smooth movement, cooldown, search distance, and duration are configurable."],
      ["Done", "Smooth interpolated movement", "Transform interpolation plus final teleport correction."],
      ["Planned", "Directional elevators", "Horizontal teleportation is listed as a future direction."],
      ["Exploring", "Multi-block elevators", "Larger elevator platforms are noted in SYSTEM_DESIGN.md."],
      ["Exploring", "Destination UI", "Diagnostic HUD or destination selection remains future-facing."]
    ],
    "pt-br": [
      ["Concluido", "Modernizacao ECS", "Sistemas e componentes ECS nativos ja estao implementados."],
      ["Concluido", "Efeitos sonoros", "Retorno opcional com SFX_Portal_Neutral_Teleport_Local."],
      ["Concluido", "Toggles de configuracao", "Som, movimento suave, cooldown, distancia de busca e duracao sao configuraveis."],
      ["Concluido", "Movimento interpolado suave", "Interpolacao de Transform mais correcao final de teleporte."],
      ["Planejado", "Elevadores direcionais", "Teleporte horizontal esta listado como direcao futura."],
      ["Em exploracao", "Elevadores multi-bloco", "Plataformas maiores de elevador sao citadas em SYSTEM_DESIGN.md."],
      ["Em exploracao", "UI de destino", "HUD diagnostico ou selecao de destino continuam como ideias futuras."]
    ],
    es: [
      ["Terminado", "Modernizacion ECS", "Sistemas y componentes ECS nativos ya estan implementados."],
      ["Terminado", "Efectos de sonido", "Respuesta opcional con SFX_Portal_Neutral_Teleport_Local."],
      ["Terminado", "Toggles de configuracion", "Sonido, movimiento suave, cooldown, distancia de busqueda y duracion son configurables."],
      ["Terminado", "Movimiento interpolado suave", "Interpolacion de Transform mas correccion final de teletransporte."],
      ["Planificado", "Elevadores direccionales", "Teletransporte horizontal esta listado como direccion futura."],
      ["En exploracion", "Elevadores multi-bloque", "Plataformas mayores de elevador aparecen en SYSTEM_DESIGN.md."],
      ["En exploracion", "UI de destino", "HUD diagnostico o seleccion de destino siguen como ideas futuras."]
    ]
  }[lang];
  const statusClass = (status) => status === rows[0][0] ? "done" : status === rows[4][0] ? "planned" : "exploring";
  const noteTitle = lang === "en" ? "No promised dates" : lang === "pt-br" ? "Sem datas prometidas" : "Sin fechas prometidas";
  const noteBody = lang === "en"
    ? "This roadmap intentionally avoids release dates that are not present in the repository."
    : lang === "pt-br"
      ? "Este roteiro evita datas de release que nao existem no repositorio."
      : "Esta hoja de ruta evita fechas de release que no existen en el repositorio.";
  return `
    ${heading(2, lang === "en" ? "Roadmap 2.0" : lang === "pt-br" ? "Roteiro 2.0" : "Hoja de ruta 2.0")}
    ${table(labels, rows.map(([status, item, notes]) => [`<span class="status-badge ${statusClass(status)}">${escapeHtml(status)}</span>`, escapeHtml(item), escapeHtml(notes)]))}
    ${alertBlock("note", noteTitle, noteBody)}
  `;
}

function creditsContent(lang) {
  const linksTitle = lang === "en" ? "Links" : lang === "pt-br" ? "Links" : "Enlaces";
  const assetsTitle = lang === "en" ? "Assets" : lang === "pt-br" ? "Arquivos visuais do mod" : "Archivos visuales del mod";
  return `
    ${heading(2, lang === "en" ? "Maintainers" : lang === "pt-br" ? "Mantenedores" : "Mantenedores")}
    <div class="credits-grid">
      ${manifest.Authors.map((author) => `<a class="quick-card compact-card" href="${escapeHtml(author.Github)}"><span>GitHub</span><strong>${escapeHtml(author.Name)}</strong><p>${escapeHtml(author.Github)}</p></a>`).join("")}
    </div>
    ${heading(2, linksTitle)}
    <div class="support-actions inline-actions">${linkButton(links.github, "GitHub", "secondary", "github")}${linkButton(links.curseforge, "CurseForge", "primary", "download")}${linkButton(links.discord, "Discord", "accent", "spark")}</div>
    ${heading(2, assetsTitle)}
    <p>${lang === "en" ? "The site uses the real EnderElevator item icons from src/main/resources/Common/Icons/ItemsGenerated/. The mod includes its asset pack through manifest.json." : lang === "pt-br" ? "O site usa os icones reais do EnderElevator em src/main/resources/Common/Icons/ItemsGenerated/. O mod inclui o asset pack pelo manifest.json." : "El sitio usa los iconos reales de EnderElevator en src/main/resources/Common/Icons/ItemsGenerated/. El mod incluye su asset pack mediante manifest.json."}</p>
  `;
}

function contentFor(lang, pageId) {
  switch (pageId) {
    case "home": return homeContent(lang);
    case "wiki": return wikiIndexContent(lang);
    case "installation": return installationContent(lang);
    case "usage": return usageContent(lang);
    case "recipes": return recipesContent(lang);
    case "configuration": return configurationContent(lang);
    case "compatibility": return compatibilityContent(lang);
    case "troubleshooting": return troubleshootingContent(lang);
    case "development": return developmentContent(lang);
    case "changelog": return changelogContent(lang);
    case "roadmap": return roadmapContent(lang);
    case "credits": return creditsContent(lang);
    default: throw new Error(`Unknown page: ${pageId}`);
  }
}

function collectHeadings(html) {
  const headings = [];
  const pattern = /<h2 id="([^"]+)">([^<]+)<\/h2>/g;
  let match;
  while ((match = pattern.exec(html)) !== null) {
    headings.push({ id: match[1], text: match[2] });
  }
  return headings;
}

function languageSwitcher(lang, pageId) {
  const label = lang === "en" ? "Language" : lang === "pt-br" ? "Idioma" : "Idioma";
  return `<nav class="language-switcher" aria-label="${escapeHtml(label)}">
    ${Object.keys(languages).map((candidate) => `<a class="${candidate === lang ? "active" : ""}" href="${routeFor(candidate, pageId)}" hreflang="${languages[candidate].code}">${languages[candidate].label}</a>`).join("")}
  </nav>`;
}

function globalSearchDialog(lang) {
  const t = languages[lang].nav;
  const title = lang === "en" ? "Search the wiki" : lang === "pt-br" ? "Buscar na wiki" : "Buscar en la wiki";
  const hint = lang === "en" ? "Pages, recipes, config keys, troubleshooting" : lang === "pt-br" ? "Paginas, receitas, configs e troubleshooting" : "Paginas, recetas, configs y troubleshooting";
  const close = lang === "en" ? "Close search" : lang === "pt-br" ? "Fechar busca" : "Cerrar busqueda";
  return `<div class="search-overlay" data-global-search hidden>
    <button class="search-backdrop" type="button" data-global-search-close aria-label="${escapeHtml(close)}"></button>
    <section class="search-dialog" role="dialog" aria-modal="true" aria-labelledby="global-search-title">
      <div class="search-dialog-head">
        <div>
          <span>${escapeHtml(t.search)}</span>
          <h2 id="global-search-title">${escapeHtml(title)}</h2>
        </div>
        <button class="search-close" type="button" data-global-search-close aria-label="${escapeHtml(close)}">Esc</button>
      </div>
      <div class="search-dialog-input">
        ${externalIcon("search")}
        <input type="search" data-global-search-input placeholder="${escapeHtml(hint)}" autocomplete="off">
      </div>
      <div class="search-dialog-results" data-global-search-results>
        <div class="search-empty">
          <strong>${escapeHtml(lang === "en" ? "Try a common query" : lang === "pt-br" ? "Tente uma busca comum" : "Prueba una busqueda comun")}</strong>
          <p>${escapeHtml(lang === "en" ? "smooth movement, CooldownMs, recipes, teleport sound, compatibility" : lang === "pt-br" ? "movimento suave, CooldownMs, receitas, som de teleporte, compatibilidade" : "movimiento suave, CooldownMs, recetas, sonido de teletransporte, compatibilidad")}</p>
        </div>
      </div>
    </section>
  </div>`;
}

function topNav(lang, pageId) {
  const t = languages[lang].nav;
  const homeLabel = lang === "en" ? "EnderElevator home" : lang === "pt-br" ? "Inicio do EnderElevator" : "Inicio de EnderElevator";
  const primaryLabel = lang === "en" ? "Primary" : lang === "pt-br" ? "Principal" : "Principal";
  return `<header class="top-nav">
    <a class="brand" href="${routeFor(lang, "home")}" aria-label="${escapeHtml(homeLabel)}">
      <img src="${iconPath("Ender_Elevator_Block_Purple.png")}" alt="" aria-hidden="true">
      <span>EnderElevator</span>
    </a>
    <nav class="desktop-nav" aria-label="${escapeHtml(primaryLabel)}">
      <a href="${routeFor(lang, "wiki")}">${escapeHtml(t.wiki)}</a>
      <a href="${routeFor(lang, "roadmap")}">${escapeHtml(t.roadmap)}</a>
      <a href="${routeFor(lang, "changelog")}">${escapeHtml(t.changelog)}</a>
      <a href="${routeFor(lang, "credits")}">${escapeHtml(t.credits)}</a>
    </nav>
    <div class="nav-actions">
      <button class="nav-search" type="button" data-global-search-open aria-label="${escapeHtml(t.search)}">${externalIcon("search")}<span>${escapeHtml(t.search)}</span><kbd>Ctrl K</kbd></button>
      ${languageSwitcher(lang, pageId)}
      <a class="nav-icon-link" href="${links.github}" aria-label="${escapeHtml(t.github)}">${externalIcon("github")}</a>
      <a class="nav-cta" href="${links.curseforge}">${externalIcon("curseforge")}<span>${escapeHtml(t.curseforge)}</span></a>
      <button class="menu-button" type="button" data-menu-toggle aria-expanded="false">${externalIcon("menu")}<span>${escapeHtml(t.menu)}</span></button>
    </div>
    <div class="mobile-menu" data-mobile-menu>
      <button class="mobile-search-trigger" type="button" data-global-search-open>${externalIcon("search")}<span>${escapeHtml(t.search)}</span><kbd>Ctrl K</kbd></button>
      <a href="${routeFor(lang, "wiki")}">${escapeHtml(t.wiki)}</a>
      <a href="${routeFor(lang, "roadmap")}">${escapeHtml(t.roadmap)}</a>
      <a href="${routeFor(lang, "changelog")}">${escapeHtml(t.changelog)}</a>
      <a href="${routeFor(lang, "credits")}">${escapeHtml(t.credits)}</a>
      <a href="${links.github}">${escapeHtml(t.github)}</a>
      <a href="${links.curseforge}">${escapeHtml(t.curseforge)}</a>
      ${languageSwitcher(lang, pageId)}
    </div>
  </header>`;
}

function sidebar(lang, pageId) {
  const groups = [
    [categoryLabels["Getting Started"][lang], ["wiki", "installation"]],
    [categoryLabels["Player Docs"][lang], ["usage", "recipes"]],
    [categoryLabels["Server Docs"][lang], ["configuration", "compatibility", "troubleshooting"]],
    [categoryLabels["Developer Docs"][lang], ["development", "changelog"]],
    [categoryLabels.Project[lang], ["roadmap", "credits"]]
  ];
  return `<aside class="wiki-sidebar">
    <div class="search-shell sidebar-search">${externalIcon("search")}<input type="search" data-search-input placeholder="${escapeHtml(languages[lang].nav.search)}"><div class="search-results" data-search-results></div></div>
    ${groups.map(([group, ids]) => `<div class="sidebar-group"><strong>${escapeHtml(group)}</strong>${ids.map((id) => `<a class="${id === pageId ? "active" : ""}" href="${routeFor(lang, id)}">${escapeHtml(pageTitle(lang, id))}</a>`).join("")}</div>`).join("")}
  </aside>`;
}

function mobileDocsNav(lang, pageId) {
  return `<details class="mobile-docs-nav">
    <summary>${escapeHtml(languages[lang].nav.docs)}</summary>
    ${wikiPages.concat(["roadmap", "credits"]).map((id) => `<a class="${id === pageId ? "active" : ""}" href="${routeFor(lang, id)}">${escapeHtml(pageTitle(lang, id))}</a>`).join("")}
  </details>`;
}

function onThisPage(lang, headings) {
  if (!headings.length) return "";
  return `<aside class="on-this-page">
    <div class="parchment-card toc-card">
      <strong>${escapeHtml(languages[lang].nav.onThisPage)}</strong>
      <ol>${headings.map((item) => `<li><a href="#${item.id}">${escapeHtml(item.text)}</a></li>`).join("")}</ol>
    </div>
  </aside>`;
}

function prevNext(lang, pageId) {
  const index = pageOrder.indexOf(pageId);
  if (index < 0) return "";
  const prev = pageOrder[index - 1];
  const next = pageOrder[index + 1];
  return `<nav class="prev-next" aria-label="Pagination">
    ${prev ? `<a href="${routeFor(lang, prev)}"><span>${escapeHtml(languages[lang].nav.previous)}</span><strong>${escapeHtml(pageTitle(lang, prev))}</strong></a>` : "<span></span>"}
    ${next ? `<a href="${routeFor(lang, next)}"><span>${escapeHtml(languages[lang].nav.next)}</span><strong>${escapeHtml(pageTitle(lang, next))}</strong></a>` : "<span></span>"}
  </nav>`;
}

function footer(lang) {
  return `<footer class="site-footer">
    <div>
      <strong>EnderElevator</strong>
      <p>${escapeHtml(pageMeta.home.description[lang])}</p>
    </div>
    <nav>
      <a href="${links.curseforge}">CurseForge</a>
      <a href="${links.github}">GitHub</a>
      <a href="${links.discord}">Discord</a>
    </nav>
  </footer>`;
}

function renderPage(lang, pageId) {
  const bodyContent = contentFor(lang, pageId);
  const headings = collectHeadings(bodyContent);
  const title = pageTitle(lang, pageId);
  const description = pageDescription(lang, pageId);
  const isHome = pageId === "home";
  const isDocs = !isHome;
  const pageUrl = canonicalFor(lang, pageId);
  const titleTag = pageId === "home" ? "EnderElevator - Hytale Mod Wiki" : `${title} - EnderElevator`;

  const article = isHome
    ? `<main>${bodyContent}</main>`
    : `<main class="wiki-main" data-pagefind-body>
        ${mobileDocsNav(lang, pageId)}
        <article class="wiki-article">
          <header class="page-header">
            <span class="page-category">${escapeHtml(pageCategory(lang, pageId))}</span>
            <h1>${escapeHtml(title)}</h1>
            <p>${escapeHtml(description)}</p>
            <div class="page-meta"><span>${escapeHtml(languages[lang].nav.updated)} ${updatedAt}</span><span>EnderElevator ${escapeHtml(manifest.Version)}</span></div>
          </header>
          ${bodyContent}
          ${prevNext(lang, pageId)}
        </article>
      </main>`;

  return `<!doctype html>
<html lang="${languages[lang].code}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(titleTag)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${pageUrl}">
  ${Object.keys(languages).map((candidate) => `<link rel="alternate" hreflang="${languages[candidate].code}" href="${canonicalFor(candidate, pageId)}">`).join("\n  ")}
  <link rel="alternate" hreflang="x-default" href="${canonicalFor("en", pageId)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(titleTag)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="EnderElevator">
  <meta property="og:locale" content="${languages[lang].locale}">
  <meta property="og:image" content="${siteOrigin}${assetPath("og-image.svg")}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/png" href="${iconPath("Ender_Elevator_Block_Purple.png")}">
  <link rel="stylesheet" href="${assetPath("site.css")}">
  <script defer src="${assetPath("site.js")}"></script>
</head>
<body class="${isHome ? "home-page" : "docs-page"}">
  <div class="site-shell">
    ${topNav(lang, pageId)}
    ${isDocs ? `<div class="wiki-layout">${sidebar(lang, pageId)}${article}${onThisPage(lang, headings)}</div>` : article}
    ${footer(lang)}
  </div>
  ${globalSearchDialog(lang)}
</body>
</html>`;
}

const css = `
@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Cinzel+Decorative:wght@700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap");

:root {
  --ee-bg: #091012;
  --ee-bg-deep: #05080A;
  --ee-bg-soft: #10161A;
  --ee-stone: #1B1F25;
  --ee-slate: #272C34;
  --ee-surface: #12191D;
  --ee-surface-raised: #1A2025;
  --ee-surface-sunken: #0B1114;
  --ee-surface-muted: #222830;
  --ee-parchment: #E9E1C6;
  --ee-parchment-soft: #F4F2EC;
  --ee-parchment-ink: #2D2417;
  --ee-ink: #F0E7D2;
  --ee-ink-soft: #CFC1A4;
  --ee-muted: #948873;
  --ee-primary: #6B46C1;
  --ee-primary-hover: #8B62E8;
  --ee-secondary: #1E3A2E;
  --ee-secondary-hover: #2E4639;
  --ee-accent: #7BE5DA;
  --ee-reward: #C8A86B;
  --ee-ember: #E6843F;
  --ee-danger: #C96A3C;
  --ee-border: #3B3328;
  --ee-border-soft: #252B2E;
  --ee-border-strong: #8A6B38;
  --ee-ring: #A783EA;
  --ee-radius-card: 8px;
  --ee-radius-control: 7px;
  --ee-shadow: 0 1px 0 rgba(244, 232, 203, 0.04), 0 18px 42px rgba(0, 0, 0, 0.38);
  --ee-shadow-soft: 0 10px 24px rgba(0, 0, 0, 0.3);
  color-scheme: dark;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  overflow-x: hidden;
  background:
    radial-gradient(circle at 50% -8%, rgba(107, 70, 193, 0.16), transparent 34rem),
    radial-gradient(circle at 82% 14%, rgba(126, 104, 67, 0.12), transparent 28rem),
    linear-gradient(180deg, var(--ee-bg), var(--ee-bg-deep) 62%, #030607);
  color: var(--ee-ink);
  font-family: Inter, system-ui, sans-serif;
  line-height: 1.65;
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.55;
  background-image:
    linear-gradient(120deg, rgba(244,232,203,.035), transparent 38%),
    linear-gradient(rgba(244,232,203,.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(244,232,203,.018) 1px, transparent 1px);
  background-size: 260px 260px, 46px 46px, 46px 46px;
}
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: .26;
  background-image:
    repeating-linear-gradient(135deg, rgba(233,225,198,.035) 0 1px, transparent 1px 9px);
  mix-blend-mode: soft-light;
}
a { color: var(--ee-accent); text-decoration: none; }
a:hover { color: var(--ee-parchment-soft); }
img { max-width: 100%; display: block; }
button, input { font: inherit; }
svg { width: 1.1em; height: 1.1em; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
code {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  color: var(--ee-accent);
  background: rgba(114, 224, 207, 0.08);
  border: 1px solid rgba(114, 224, 207, 0.16);
  border-radius: 6px;
  padding: 0.1rem 0.28rem;
}

.site-shell { width: min(100%, 1500px); margin: 0 auto; }
.top-nav {
  position: sticky;
  top: 0;
  z-index: 20;
  min-height: 72px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 18px;
  align-items: center;
  margin: 0 18px;
  padding: 12px 0;
  background:
    linear-gradient(180deg, rgba(9, 16, 18, 0.96), rgba(9, 16, 18, 0.84));
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(138, 107, 56, .28);
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  color: var(--ee-ink);
  font-family: Cinzel, Georgia, serif;
  font-size: 0.98rem;
  font-weight: 800;
  letter-spacing: 0;
}
.brand img { width: 36px; filter: drop-shadow(0 0 16px rgba(123, 79, 214, .55)); }
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 2px;
  justify-content: center;
  justify-self: center;
  padding: 4px;
  border: 1px solid rgba(138, 107, 56, .22);
  border-radius: 999px;
  background: rgba(11, 17, 20, .76);
}
.desktop-nav a, .mobile-menu a {
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  padding: 8px 13px;
  border-radius: 999px;
  color: var(--ee-ink-soft);
  font-weight: 700;
  font-size: 0.84rem;
}
.desktop-nav a:hover, .mobile-menu a:hover {
  background: linear-gradient(180deg, rgba(107, 70, 193, .28), rgba(34, 26, 52, .38));
  color: var(--ee-parchment-soft);
  box-shadow: inset 0 0 0 1px rgba(244, 232, 203, .06);
}
.nav-actions { display: flex; align-items: center; gap: 8px; }
.nav-search {
  min-height: 42px;
  width: clamp(178px, 16vw, 250px);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 10px 0 13px;
  border: 1px solid rgba(138, 107, 56, .28);
  border-radius: 999px;
  color: var(--ee-muted);
  background:
    linear-gradient(180deg, rgba(27, 31, 37, .86), rgba(10, 16, 19, .92));
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(244, 242, 236, .05);
}
.nav-search span {
  min-width: 0;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}
.nav-search:hover {
  color: var(--ee-parchment-soft);
  border-color: rgba(200, 168, 107, .66);
  box-shadow: inset 0 1px 0 rgba(244, 242, 236, .08), 0 0 0 3px rgba(107, 70, 193, .12);
}
.nav-search kbd, .mobile-search-trigger kbd {
  min-width: 44px;
  padding: 3px 7px;
  border: 1px solid rgba(200, 168, 107, .2);
  border-radius: 6px;
  color: var(--ee-reward);
  background: rgba(5, 8, 10, .82);
  font: 700 .68rem "JetBrains Mono", ui-monospace, monospace;
  text-align: center;
}
.language-switcher {
  display: inline-flex;
  padding: 4px;
  gap: 3px;
  border: 1px solid var(--ee-border);
  border-radius: 999px;
  background: rgba(5, 8, 10, .82);
}
.language-switcher a {
  min-height: 30px;
  min-width: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 9px;
  border-radius: 999px;
  color: var(--ee-muted);
  font-size: 0.72rem;
  font-weight: 800;
  white-space: nowrap;
}
.language-switcher a.active { background: var(--ee-primary); color: var(--ee-parchment-soft); box-shadow: inset 0 0 0 1px rgba(244,232,203,.2); }
.nav-icon-link {
  width: 42px;
  min-height: 42px;
  display: inline-grid;
  place-items: center;
  border: 1px solid transparent;
  border-radius: var(--ee-radius-control);
  color: var(--ee-parchment);
}
.nav-icon-link:hover {
  border-color: rgba(200, 168, 107, .34);
  background: rgba(27, 31, 37, .72);
}
.nav-cta {
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 11px;
  border-radius: var(--ee-radius-control);
  color: var(--ee-reward);
  background: linear-gradient(180deg, rgba(27, 31, 37, .96), rgba(10, 14, 16, .96));
  border: 1px solid rgba(200, 168, 107, 0.56);
  font-size: 0.84rem;
  font-weight: 750;
  letter-spacing: 0;
}
.nav-cta svg {
  width: 1rem;
  height: 1rem;
  color: #D7C38A;
}
.nav-cta:hover { color: var(--ee-parchment-soft); border-color: var(--ee-reward); box-shadow: 0 0 0 3px rgba(200,168,107,.1); }
.menu-button { display: none; }
.mobile-menu { display: none; }
.mobile-search-trigger { display: none; }

.button {
  position: relative;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 19px;
  border-radius: var(--ee-radius-control);
  border: 1px solid var(--ee-border-strong);
  font-weight: 800;
  color: var(--ee-ink);
  overflow: hidden;
  box-shadow: 0 3px 0 rgba(0,0,0,.42), inset 0 1px 0 rgba(244,242,236,.12);
  transition: transform .2s ease, background .2s ease, border-color .2s ease, box-shadow .2s ease;
}
.button::after {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: calc(var(--ee-radius-control) - 3px);
  border: 1px solid rgba(244, 242, 236, .08);
  pointer-events: none;
}
.button:hover { transform: translateY(-1px); color: var(--ee-parchment-soft); box-shadow: 0 5px 0 rgba(0,0,0,.34), inset 0 1px 0 rgba(244,242,236,.16); }
.button:active { transform: translateY(1px); box-shadow: 0 1px 0 rgba(0,0,0,.32); }
.button-primary { background: linear-gradient(180deg, #8B62E8, #5D35A9); }
.button-secondary { background: linear-gradient(180deg, #254437, #132B24); }
.button-accent { background: linear-gradient(180deg, #E9D7A8, #C8A86B); color: #171006; }
.button-ghost { background: linear-gradient(180deg, #1D2228, #0D1316); color: var(--ee-ink-soft); border-color: rgba(138, 107, 56, .36); }

.hero-section {
  min-height: min(720px, calc(100dvh - 140px));
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(360px, 0.78fr);
  gap: clamp(32px, 5vw, 80px);
  align-items: center;
  padding: clamp(36px, 6vw, 82px) clamp(18px, 5vw, 72px) 44px;
}
.hero-copy, .hero-art { min-width: 0; }
.hero-copy h1 {
  margin: 16px 0 8px;
  font-family: Cinzel, Georgia, serif;
  font-weight: 700;
  max-width: 100%;
  font-size: clamp(2.55rem, 4.25vw, 4.12rem);
  line-height: 1;
  color: var(--ee-parchment-soft);
  text-shadow: 0 2px 0 rgba(0,0,0,.6);
  letter-spacing: 0;
  text-wrap: balance;
}
.compat-rune {
  width: fit-content;
  padding: 8px 12px;
  border: 1px solid var(--ee-border-strong);
  border-radius: 999px;
  color: var(--ee-reward);
  background: rgba(18, 26, 29, .82);
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 0.8rem;
}
.hero-headline {
  margin: 0;
  max-width: 15ch;
  font-family: Cinzel, Georgia, serif;
  font-size: clamp(1.85rem, 3.3vw, 3.2rem);
  line-height: 1.08;
  color: var(--ee-reward);
}
.hero-sub {
  max-width: 66ch;
  margin: 18px 0 0;
  color: var(--ee-ink-soft);
  font-size: clamp(1rem, 1.5vw, 1.18rem);
}
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
.hero-art {
  position: relative;
  min-height: 500px;
  border: 1px solid rgba(138, 107, 56, .58);
  border-radius: 10px;
  background:
    radial-gradient(circle at 50% 48%, rgba(123, 79, 214, .34), transparent 42%),
    repeating-linear-gradient(135deg, rgba(233,225,198,.035) 0 1px, transparent 1px 9px),
    linear-gradient(145deg, rgba(27, 31, 37, .96), rgba(7, 11, 13, .96));
  box-shadow: var(--ee-shadow), inset 0 0 0 1px rgba(244,232,203,.04);
  overflow: hidden;
}
.hero-art::before {
  content: "";
  position: absolute;
  inset: 16px;
  border: 1px solid rgba(200,168,107,.18);
  border-radius: 6px;
}
.hero-orbit {
  position: absolute;
  inset: 28px;
  display: grid;
  place-items: center;
}
.hero-main-icon { width: min(45%, 210px); filter: drop-shadow(0 0 28px rgba(123,79,214,.8)); animation: floatIcon 5s ease-in-out infinite; }
.hero-orbit img:not(.hero-main-icon) {
  position: absolute;
  width: 64px;
  left: 50%;
  top: 50%;
  margin: -32px 0 0 -32px;
  transform:
    rotate(calc(var(--i) * 36deg))
    translateX(170px)
    rotate(calc(var(--i) * -36deg));
  filter: drop-shadow(0 9px 16px rgba(0,0,0,.44));
}
.hero-art-caption {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  color: var(--ee-ink-soft);
  border-top: 1px solid rgba(200,168,107,.28);
  padding-top: 16px;
}
.hero-art-caption strong {
  min-width: 66px;
  min-height: 54px;
  display: inline-grid;
  place-items: center;
  border: 1px solid rgba(123, 229, 218, .36);
  border-radius: var(--ee-radius-card);
  color: var(--ee-parchment-soft);
  background:
    linear-gradient(180deg, rgba(123, 229, 218, .14), rgba(107, 70, 193, .18)),
    rgba(5, 8, 10, .68);
  box-shadow: inset 0 0 0 1px rgba(244, 242, 236, .06), 0 10px 24px rgba(0, 0, 0, .28);
  font: 800 2.05rem Cinzel, Georgia, serif;
  line-height: 1;
}
.hero-art-caption span {
  color: var(--ee-reward);
  font-size: 0.88rem;
  font-weight: 800;
  text-align: right;
}

.section-band, .content-section {
  padding: clamp(48px, 7vw, 96px) clamp(18px, 5vw, 72px);
}
.next-peek { padding-top: 34px; }
.section-heading { max-width: 780px; margin-bottom: 28px; }
.section-heading span, .page-category, .sidebar-group strong {
  display: block;
  color: var(--ee-reward);
  font-family: Cinzel, Georgia, serif;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.section-heading h2, .wiki-article h2 {
  margin: 8px 0 0;
  color: var(--ee-parchment-soft);
  font-family: Cinzel, Georgia, serif;
  font-size: clamp(1.8rem, 3vw, 3rem);
  line-height: 1.1;
  letter-spacing: 0;
}
.section-heading.compact h2 { font-size: clamp(1.5rem, 2.2vw, 2.2rem); }
.how-grid {
  display: grid;
  grid-template-columns: 1fr 1fr .8fr;
  gap: 16px;
}
.crystal-card, .quick-card, .stone-panel, .recipe-card, .start-card {
  position: relative;
  border: 1px solid rgba(138, 107, 56, .34);
  border-radius: var(--ee-radius-card);
  background:
    repeating-linear-gradient(135deg, rgba(233,225,198,.028) 0 1px, transparent 1px 8px),
    linear-gradient(180deg, rgba(27,31,37,.96), rgba(11,17,20,.96));
  box-shadow: var(--ee-shadow-soft), inset 0 0 0 1px rgba(244,242,236,.035);
}
.crystal-card {
  min-height: 210px;
  padding: 24px;
  overflow: hidden;
}
.crystal-card::before, .quick-card::before, .stone-panel::before, .recipe-card::before, .start-card::before, .wiki-article::before, .wiki-sidebar::before {
  content: "";
  position: absolute;
  inset: 7px;
  pointer-events: none;
  border-radius: calc(var(--ee-radius-card) - 3px);
  background:
    linear-gradient(var(--ee-border-strong), var(--ee-border-strong)) left top / 20px 1px no-repeat,
    linear-gradient(var(--ee-border-strong), var(--ee-border-strong)) left top / 1px 20px no-repeat,
    linear-gradient(var(--ee-border-strong), var(--ee-border-strong)) right top / 20px 1px no-repeat,
    linear-gradient(var(--ee-border-strong), var(--ee-border-strong)) right top / 1px 20px no-repeat,
    linear-gradient(var(--ee-border-strong), var(--ee-border-strong)) left bottom / 20px 1px no-repeat,
    linear-gradient(var(--ee-border-strong), var(--ee-border-strong)) left bottom / 1px 20px no-repeat,
    linear-gradient(var(--ee-border-strong), var(--ee-border-strong)) right bottom / 20px 1px no-repeat,
    linear-gradient(var(--ee-border-strong), var(--ee-border-strong)) right bottom / 1px 20px no-repeat;
  opacity: .48;
}
.crystal-card::after, .quick-card::after, .stone-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background:
    linear-gradient(135deg, rgba(200,168,107,.11), transparent 28%, transparent 76%, rgba(107,70,193,.16));
}
.crystal-card span {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  color: var(--ee-parchment-soft);
  background: rgba(107, 70, 193, .42);
  font-family: "JetBrains Mono", monospace;
  font-weight: 800;
  box-shadow: inset 0 0 0 1px rgba(167,139,250,.28);
}
.crystal-card h3, .quick-card strong, .recipe-card h3, .start-card strong {
  display: block;
  margin: 12px 0 8px;
  color: var(--ee-parchment-soft);
  font-family: Cinzel, Georgia, serif;
  font-size: 1.25rem;
}
.crystal-card p, .quick-card p, .start-card p { margin: 0; color: var(--ee-ink-soft); }
.feature-ledger {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}
.feature-ledger article {
  min-height: 150px;
  padding: 20px;
  border: 1px solid rgba(138,107,56,.32);
  border-radius: var(--ee-radius-card);
  background:
    repeating-linear-gradient(135deg, rgba(233,225,198,.018) 0 1px, transparent 1px 9px),
    rgba(18,26,29,.95);
  box-shadow: var(--ee-shadow-soft), inset 0 0 0 1px rgba(244,242,236,.03);
}
.feature-ledger article:first-child { grid-row: auto; }
.feature-ledger h3 { margin: 0 0 8px; color: var(--ee-reward); font-family: Cinzel, Georgia, serif; }
.feature-ledger p { margin: 0; color: var(--ee-ink-soft); }
.variant-strip {
  display: grid;
  grid-template-columns: repeat(12, minmax(76px, 1fr));
  gap: 10px;
  overflow-x: auto;
  padding: 22px 18px 24px;
  border: 1px solid rgba(138, 107, 56, .5);
  border-radius: var(--ee-radius-card);
  background:
    repeating-linear-gradient(135deg, rgba(233,225,198,.026) 0 1px, transparent 1px 8px),
    linear-gradient(180deg, rgba(27,31,37,.9), rgba(11,17,20,.95));
  box-shadow: var(--ee-shadow-soft), inset 0 0 0 1px rgba(244,242,236,.035);
}
.variant-strip figure {
  min-width: 76px;
  margin: 0;
  padding: 12px 8px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: rgba(5, 8, 10, .26);
  text-align: center;
}
.variant-strip figure:hover { border-color: rgba(200,168,107,.32); background: rgba(27,31,37,.68); }
.variant-strip img { width: 58px; height: 58px; object-fit: contain; margin: 0 auto 8px; filter: drop-shadow(0 9px 12px rgba(0,0,0,.38)); }
.variant-strip figcaption { color: var(--ee-muted); font-size: 0.72rem; font-weight: 800; }
.strong-panel { padding: clamp(22px, 4vw, 42px); border-color: rgba(138, 107, 56, .62); }
.install-section .strong-panel {
  background:
    radial-gradient(circle at 84% 90%, rgba(107,70,193,.16), transparent 28rem),
    repeating-linear-gradient(135deg, rgba(233,225,198,.024) 0 1px, transparent 1px 8px),
    linear-gradient(180deg, rgba(27,31,37,.96), rgba(9,16,18,.98));
}
.step-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; counter-reset: steps; }
.install-section .step-list { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.step-list li {
  counter-increment: steps;
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 14px;
  align-items: start;
}
.install-section .step-list li {
  min-height: 176px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 22px;
  border: 1px solid rgba(138,107,56,.32);
  border-radius: var(--ee-radius-card);
  background:
    repeating-linear-gradient(135deg, rgba(233,225,198,.02) 0 1px, transparent 1px 8px),
    rgba(11,17,20,.68);
  box-shadow: inset 0 1px 0 rgba(244,242,236,.04);
}
.step-list li::before {
  content: counter(steps);
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: var(--ee-primary);
  color: var(--ee-parchment-soft);
  font-family: "JetBrains Mono", monospace;
  font-weight: 800;
}
.install-section .step-list li::before {
  width: auto;
  height: auto;
  display: block;
  color: rgba(167,139,250,.52);
  background: transparent;
  box-shadow: none;
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  line-height: .8;
}
.step-list strong { color: var(--ee-parchment-soft); }
.step-list p { grid-column: 2; margin: 3px 0 0; color: var(--ee-ink-soft); }
.install-section .step-list p { grid-column: auto; margin: 0; }
.two-column {
  display: grid;
  grid-template-columns: .82fr 1.18fr;
  gap: 28px;
}
.parchment-card {
  position: relative;
  color: var(--ee-parchment-ink);
  background:
    repeating-linear-gradient(135deg, rgba(45,36,23,.035) 0 1px, transparent 1px 10px),
    linear-gradient(135deg, rgba(255,255,255,.16), transparent 32%),
    var(--ee-parchment);
  border: 1px solid rgba(126,104,67,.7);
  border-radius: 6px;
  padding: 24px;
  box-shadow: 0 16px 30px rgba(0,0,0,.24);
}
.parchment-card h3, .parchment-card strong { color: var(--ee-parchment-ink); font-family: Cinzel, Georgia, serif; }
.quick-link-grid, .category-grid, .start-grid, .credits-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.quick-card, .start-card {
  padding: 20px;
  min-height: 150px;
  color: var(--ee-ink);
}
.quick-card span { color: var(--ee-reward); font-size: .72rem; font-weight: 800; text-transform: uppercase; letter-spacing: .12em; }
.compact-card { min-height: 120px; }
.support-actions { display: flex; flex-wrap: wrap; gap: 12px; }
.inline-actions { margin-top: 18px; }

.wiki-layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr) 240px;
  gap: 22px;
  padding: 26px 18px 56px;
  align-items: start;
}
.wiki-sidebar {
  position: sticky;
  top: 94px;
  border: 1px solid rgba(138, 107, 56, .42);
  border-radius: var(--ee-radius-card);
  background:
    repeating-linear-gradient(135deg, rgba(233,225,198,.024) 0 1px, transparent 1px 8px),
    rgba(14,20,24,.94);
  padding: 14px;
  box-shadow: var(--ee-shadow);
}
.sidebar-group { padding: 12px 0; border-top: 1px solid rgba(138, 107, 56, .22); }
.sidebar-group:first-of-type { border-top: 0; }
.sidebar-group a {
  display: flex;
  min-height: 38px;
  align-items: center;
  padding: 8px 10px;
  margin-top: 4px;
  border-radius: 9px;
  color: var(--ee-ink-soft);
  font-weight: 700;
  border: 1px solid transparent;
}
.sidebar-group a.active {
  background:
    linear-gradient(90deg, rgba(107,70,193,.72), rgba(107,70,193,.16));
  color: var(--ee-parchment-soft);
  border-color: rgba(200,168,107,.34);
  box-shadow: inset 3px 0 0 var(--ee-reward), 0 8px 18px rgba(0,0,0,.18);
}
.search-shell {
  position: relative;
  display: flex;
  align-items: center;
  gap: 9px;
  min-height: 44px;
  padding: 0 12px;
  border: 1px solid rgba(138, 107, 56, .34);
  border-radius: var(--ee-radius-control);
  background: linear-gradient(180deg, rgba(27,31,37,.78), rgba(7,11,13,.9));
}
.search-shell:focus-within { border-color: rgba(200,168,107,.78); box-shadow: 0 0 0 3px rgba(107,70,193,.14); }
.search-shell input {
  min-width: 0;
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--ee-ink);
  font: inherit;
}
.search-results {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 8px);
  z-index: 30;
  display: none;
  max-height: 440px;
  overflow: auto;
  padding: 8px;
  border: 1px solid rgba(138,107,56,.7);
  border-radius: 8px;
  background:
    repeating-linear-gradient(135deg, rgba(233,225,198,.02) 0 1px, transparent 1px 8px),
    #0D1417;
  box-shadow: 0 22px 50px rgba(0,0,0,.52);
}
.search-results.open { display: grid; gap: 8px; }
.search-result {
  display: block;
  padding: 12px;
  border: 1px solid rgba(138,107,56,.24);
  border-radius: 7px;
  background: rgba(27,31,37,.78);
}
.search-result strong { display: block; color: var(--ee-parchment-soft); }
.search-result span { color: var(--ee-reward); font-size: .75rem; font-weight: 800; }
.search-result p { margin: 4px 0 0; color: var(--ee-ink-soft); font-size: .9rem; }
.wiki-main { min-width: 0; }
.wiki-article {
  position: relative;
  min-width: 0;
  width: 100%;
  max-width: 84ch;
  margin: 0 auto;
  padding: clamp(24px, 4vw, 46px);
  border: 1px solid rgba(138, 107, 56, .42);
  border-radius: 10px;
  background:
    repeating-linear-gradient(135deg, rgba(233,225,198,.022) 0 1px, transparent 1px 8px),
    rgba(18,26,29,.86);
  box-shadow: var(--ee-shadow);
  overflow-wrap: break-word;
}
.page-header {
  padding-bottom: 26px;
  margin-bottom: 26px;
  border-bottom: 1px solid rgba(138, 107, 56, .26);
}
.page-header h1 {
  margin: 10px 0 12px;
  color: var(--ee-parchment-soft);
  font-family: Cinzel, Georgia, serif;
  font-size: clamp(2.4rem, 6vw, 4.2rem);
  line-height: 1;
  letter-spacing: 0;
}
.page-header p { margin: 0; color: var(--ee-ink-soft); font-size: 1.08rem; }
.page-meta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; color: var(--ee-muted); font-size: .86rem; font-family: "JetBrains Mono", monospace; }
.wiki-article h2 { margin-top: 38px; scroll-margin-top: 100px; }
.wiki-article h3 { color: var(--ee-reward); font-family: Cinzel, Georgia, serif; }
.wiki-article p, .wiki-article li { color: var(--ee-ink-soft); }
.mobile-docs-nav { display: none; }
.on-this-page { position: sticky; top: 94px; }
.toc-card { padding: 18px; }
.toc-card ol { margin: 10px 0 0; padding-left: 20px; }
.toc-card a { color: var(--ee-parchment-ink); font-weight: 700; }
.alert {
  position: relative;
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 14px;
  padding: 16px;
  border: 1px solid rgba(138,107,56,.32);
  border-radius: var(--ee-radius-card);
  background:
    repeating-linear-gradient(135deg, rgba(233,225,198,.02) 0 1px, transparent 1px 8px),
    rgba(14,21,24,.96);
  margin: 20px 0;
}
.alert-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: rgba(123,79,214,.2);
  color: var(--ee-ring);
}
.alert strong { color: var(--ee-parchment-soft); }
.alert p { margin: 3px 0 0; }
.alert-tip .alert-icon { background: rgba(114,224,207,.12); color: var(--ee-accent); }
.alert-warning { border-color: rgba(194,107,69,.6); }
.alert-warning .alert-icon { background: rgba(194,107,69,.16); color: var(--ee-danger); }
.alert-note { background: rgba(233,217,184,.08); }
.wiki-search-hero { margin: 22px 0; }
.wiki-search-hero label { display: block; margin-bottom: 8px; color: var(--ee-reward); font-weight: 800; }
.table-scroll { max-width: 100%; overflow-x: auto; margin: 18px 0; border: 1px solid rgba(138,107,56,.32); border-radius: var(--ee-radius-card); }
table { width: 100%; min-width: 720px; border-collapse: collapse; background: var(--ee-surface-sunken); }
th, td { padding: 13px 14px; border-bottom: 1px solid rgba(138,107,56,.18); text-align: left; vertical-align: top; }
th { color: var(--ee-reward); font-family: Cinzel, Georgia, serif; font-size: .8rem; letter-spacing: .08em; text-transform: uppercase; background: rgba(23,33,37,.96); }
td { color: var(--ee-ink-soft); }
tr:last-child td { border-bottom: 0; }
.code-block {
  max-width: 100%;
  margin: 18px 0;
  border: 1px solid rgba(114,224,207,.18);
  border-radius: 12px;
  background: #071014;
  overflow: hidden;
}
.code-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  border-bottom: 1px solid var(--ee-border);
  color: var(--ee-muted);
  font-family: "JetBrains Mono", monospace;
  font-size: .76rem;
}
.copy-button {
  display: inline-flex;
  gap: 7px;
  align-items: center;
  min-height: 34px;
  border: 1px solid var(--ee-border);
  border-radius: 8px;
  background: var(--ee-surface);
  color: var(--ee-accent);
  cursor: pointer;
}
pre { margin: 0; padding: 16px; overflow-x: auto; }
pre code { background: transparent; border: 0; padding: 0; color: var(--ee-ink); }
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.recipe-card {
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: 14px;
  padding: 16px;
}
.recipe-icon-frame {
  width: 84px;
  height: 84px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: var(--ee-surface-sunken);
  border: 1px solid var(--ee-border);
}
.recipe-icon-frame img { width: 64px; }
.recipe-card ul { margin: 8px 0; padding-left: 18px; }
.recipe-card p { margin: 0; color: var(--ee-muted); font-size: .9rem; }
.badge {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: .72rem;
  font-weight: 800;
}
.badge-recipe { color: #171006; background: var(--ee-reward); }
.base-recipe-panel, .usage-diagram {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 18px;
  align-items: center;
  padding: 18px;
  border: 1px solid var(--ee-border-strong);
  border-radius: var(--ee-radius-card);
  background: var(--ee-surface-sunken);
}
.base-recipe-panel img { width: 96px; }
.usage-diagram {
  grid-template-columns: 1fr 110px 1fr;
  text-align: center;
}
.usage-diagram img { width: 76px; margin: 0 auto 8px; }
.shaft-line {
  min-height: 170px;
  display: grid;
  align-content: space-between;
  color: var(--ee-accent);
  border-left: 1px solid var(--ee-primary);
  border-right: 1px solid var(--ee-primary);
}
.prev-next {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 42px;
  border-top: 1px solid var(--ee-border);
  padding-top: 20px;
}
.prev-next a {
  min-height: 86px;
  padding: 16px;
  border: 1px solid var(--ee-border);
  border-radius: 12px;
  background: var(--ee-surface-sunken);
}
.prev-next span { display: block; color: var(--ee-muted); font-size: .8rem; }
.prev-next strong { color: var(--ee-parchment-soft); }
.status-badge {
  display: inline-flex;
  padding: 4px 8px;
  border-radius: 999px;
  font-weight: 800;
  font-size: .76rem;
}
.status-badge.done { background: rgba(114,224,207,.16); color: var(--ee-accent); }
.status-badge.planned { background: rgba(123,79,214,.18); color: var(--ee-ring); }
.status-badge.exploring { background: rgba(200,168,107,.18); color: var(--ee-reward); }
.site-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin: 24px 18px 0;
  padding: 30px 0 44px;
  border-top: 1px solid var(--ee-border);
  color: var(--ee-muted);
}
.site-footer strong {
  color: var(--ee-parchment-soft);
  font-family: Cinzel, Georgia, serif;
  font-size: 1.05rem;
  letter-spacing: 0;
}
.site-footer p { max-width: 64ch; margin: 6px 0 0; }
.site-footer nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: start;
  justify-content: flex-end;
}
.site-footer nav a {
  min-height: 32px;
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid rgba(138, 107, 56, .28);
  border-radius: 999px;
  color: var(--ee-ink-soft);
  background: rgba(11, 17, 20, .6);
  font-size: .84rem;
  font-weight: 700;
}
.site-footer nav a:hover {
  color: var(--ee-parchment-soft);
  border-color: rgba(200, 168, 107, .56);
  background: rgba(27, 31, 37, .86);
}

.search-overlay[hidden] { display: none; }
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: start center;
  padding: min(12vh, 88px) 18px 24px;
}
.search-backdrop {
  position: absolute;
  inset: 0;
  border: 0;
  background: rgba(2, 5, 7, .72);
  backdrop-filter: blur(10px);
  cursor: default;
}
.search-dialog {
  position: relative;
  width: min(720px, 100%);
  border: 1px solid rgba(138, 107, 56, .7);
  border-radius: 10px;
  background:
    radial-gradient(circle at 12% 0%, rgba(107,70,193,.22), transparent 18rem),
    repeating-linear-gradient(135deg, rgba(233,225,198,.026) 0 1px, transparent 1px 8px),
    linear-gradient(180deg, rgba(27,31,37,.98), rgba(8,13,16,.99));
  box-shadow: 0 28px 80px rgba(0,0,0,.62), inset 0 0 0 1px rgba(244,242,236,.05);
  overflow: hidden;
}
.search-dialog::before {
  content: "";
  position: absolute;
  inset: 8px;
  border-radius: 6px;
  pointer-events: none;
  background:
    linear-gradient(var(--ee-border-strong), var(--ee-border-strong)) left top / 30px 1px no-repeat,
    linear-gradient(var(--ee-border-strong), var(--ee-border-strong)) left top / 1px 30px no-repeat,
    linear-gradient(var(--ee-border-strong), var(--ee-border-strong)) right top / 30px 1px no-repeat,
    linear-gradient(var(--ee-border-strong), var(--ee-border-strong)) right top / 1px 30px no-repeat,
    linear-gradient(var(--ee-border-strong), var(--ee-border-strong)) left bottom / 30px 1px no-repeat,
    linear-gradient(var(--ee-border-strong), var(--ee-border-strong)) left bottom / 1px 30px no-repeat,
    linear-gradient(var(--ee-border-strong), var(--ee-border-strong)) right bottom / 30px 1px no-repeat,
    linear-gradient(var(--ee-border-strong), var(--ee-border-strong)) right bottom / 1px 30px no-repeat;
  opacity: .65;
}
.search-dialog-head {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: start;
  padding: 24px 24px 16px;
  border-bottom: 1px solid rgba(138,107,56,.22);
}
.search-dialog-head span {
  display: block;
  color: var(--ee-reward);
  font-family: Cinzel, Georgia, serif;
  font-size: .72rem;
  font-weight: 800;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.search-dialog-head h2 {
  margin: 5px 0 0;
  font-family: Cinzel, Georgia, serif;
  color: var(--ee-parchment-soft);
  font-size: clamp(1.55rem, 3vw, 2.2rem);
  line-height: 1.08;
}
.search-close {
  min-height: 34px;
  padding: 0 10px;
  border: 1px solid rgba(138,107,56,.34);
  border-radius: 6px;
  color: var(--ee-reward);
  background: rgba(5,8,10,.72);
  cursor: pointer;
  font: 700 .72rem "JetBrains Mono", ui-monospace, monospace;
}
.search-dialog-input {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 18px 24px 12px;
  min-height: 54px;
  padding: 0 16px;
  border: 1px solid rgba(138,107,56,.42);
  border-radius: 8px;
  background: rgba(5,8,10,.72);
  color: var(--ee-muted);
}
.search-dialog-input:focus-within {
  color: var(--ee-accent);
  border-color: rgba(200,168,107,.74);
  box-shadow: 0 0 0 3px rgba(107,70,193,.16);
}
.search-dialog-input input {
  min-width: 0;
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--ee-parchment-soft);
}
.search-dialog-results {
  display: grid;
  gap: 8px;
  max-height: min(52vh, 520px);
  overflow: auto;
  padding: 10px 24px 24px;
}
.search-dialog-result, .search-empty {
  display: grid;
  gap: 5px;
  padding: 14px;
  border: 1px solid rgba(138,107,56,.28);
  border-radius: 8px;
  background: rgba(18,25,29,.78);
}
.search-dialog-result:hover {
  border-color: rgba(200,168,107,.58);
  background: rgba(27,31,37,.9);
}
.search-dialog-result span {
  color: var(--ee-reward);
  font-size: .72rem;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.search-dialog-result strong, .search-empty strong { color: var(--ee-parchment-soft); }
.search-dialog-result p, .search-empty p { margin: 0; color: var(--ee-ink-soft); font-size: .92rem; }
.search-empty { border-style: dashed; }
body.search-open { overflow: hidden; }

@keyframes floatIcon {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
}
@media (max-width: 1120px) {
  .wiki-layout { grid-template-columns: 250px minmax(0, 1fr); }
  .on-this-page { display: none; }
  .hero-section { grid-template-columns: 1fr; }
  .hero-art { min-height: 420px; }
  .nav-search { width: 190px; }
  .desktop-nav { display: none; }
  .feature-ledger { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 760px) {
  .top-nav { grid-template-columns: 1fr auto; margin: 0 12px; }
  .desktop-nav, .nav-actions > .language-switcher, .nav-cta, .nav-search, .nav-icon-link { display: none; }
  .menu-button {
    min-height: 42px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid var(--ee-border);
    border-radius: var(--ee-radius-control);
    background: var(--ee-surface);
    color: var(--ee-ink);
  }
  .mobile-menu.open {
    position: absolute;
    top: 66px;
    left: 0;
    right: 0;
    display: grid;
    gap: 6px;
    padding: 14px;
    border: 1px solid var(--ee-border);
    border-radius: 0 0 16px 16px;
    background: #0D1417;
    box-shadow: 0 22px 50px rgba(0,0,0,.52);
  }
  .mobile-search-trigger {
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    border: 1px solid rgba(138,107,56,.38);
    border-radius: var(--ee-radius-control);
    color: var(--ee-ink-soft);
    background: rgba(5,8,10,.62);
    padding: 8px 10px;
    text-align: left;
  }
  .mobile-search-trigger span { flex: 1; }
  .mobile-menu .language-switcher { width: fit-content; }
  .hero-section { padding: 30px 14px; min-height: auto; }
  .hero-copy h1 { font-size: clamp(2.45rem, 12vw, 3.5rem); overflow-wrap: anywhere; }
  .hero-headline { max-width: 12ch; font-size: clamp(1.72rem, 8vw, 2.55rem); }
  .hero-actions, .support-actions { display: grid; grid-template-columns: 1fr; }
  .button { width: 100%; }
  .hero-art { min-height: 340px; }
  .hero-orbit img:not(.hero-main-icon) { width: 46px; transform: rotate(calc(var(--i) * 36deg)) translateX(116px) rotate(calc(var(--i) * -36deg)); }
  .section-band, .content-section { padding: 44px 14px; }
  .how-grid, .feature-ledger, .two-column, .quick-link-grid, .category-grid, .start-grid, .credits-grid, .recipe-grid { grid-template-columns: 1fr; }
  .install-section .step-list { grid-template-columns: 1fr; }
  .install-section .step-list li { min-height: auto; }
  .variant-strip { grid-template-columns: repeat(12, 82px); padding: 16px 12px; }
  .feature-ledger article:first-child { grid-row: auto; }
  .wiki-layout { display: block; padding: 16px 12px 44px; }
  .wiki-sidebar { display: none; }
  .mobile-docs-nav {
    display: grid;
    margin-bottom: 12px;
    border: 1px solid var(--ee-border);
    border-radius: 12px;
    background: var(--ee-surface);
    padding: 10px 12px;
  }
  .mobile-docs-nav summary { cursor: pointer; color: var(--ee-reward); font-weight: 800; }
  .mobile-docs-nav a { display: block; padding: 9px 0; color: var(--ee-ink-soft); }
  .mobile-docs-nav {
    width: calc(100vw - 24px);
    max-width: calc(100vw - 24px);
  }
  .wiki-article {
    width: calc(100vw - 24px);
    max-width: calc(100vw - 24px);
    margin: 0;
    padding: 22px 14px;
    border-radius: 14px;
  }
  .search-overlay { padding: 72px 10px 18px; place-items: start center; }
  .search-dialog-head { padding: 20px 16px 13px; }
  .search-dialog-input { margin: 14px 16px 10px; }
  .search-dialog-results { padding: 8px 16px 18px; max-height: 58vh; }
  .page-header h1 {
    font-size: clamp(1.85rem, 8vw, 2.15rem);
    line-height: 1.04;
    overflow-wrap: anywhere;
    word-break: break-word;
  }
  .wiki-article :where(p, li, td, th, strong, h1, h2, h3) {
    overflow-wrap: anywhere;
  }
  .recipe-card { grid-template-columns: 72px 1fr; }
  .recipe-icon-frame { width: 72px; height: 72px; }
  .usage-diagram { grid-template-columns: 1fr; }
  .shaft-line { min-height: 90px; border: 0; border-top: 1px solid var(--ee-primary); border-bottom: 1px solid var(--ee-primary); padding: 10px 0; }
  .prev-next { grid-template-columns: 1fr; }
  .site-footer { display: grid; margin: 10px 12px 0; }
  .site-footer nav { justify-content: flex-start; }
}
`;

const js = `
const basePath = "${basePath}";

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
  const terms = query.toLowerCase().split(/\\s+/).filter(Boolean);
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
  const firstTerm = query.toLowerCase().split(/\\s+/).find(Boolean) || "";
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
`;

function ogImage() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g" cx="70%" cy="45%" r="50%">
      <stop offset="0" stop-color="#7B4FD6" stop-opacity=".5"/>
      <stop offset=".56" stop-color="#121A1D"/>
      <stop offset="1" stop-color="#070B0D"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="46" y="42" width="1108" height="546" rx="28" fill="none" stroke="#7E6843" stroke-width="2"/>
  <image href="${basePath}/assets/icons/Ender_Elevator_Block_Purple.png" x="790" y="175" width="220" height="220"/>
  <text x="96" y="220" fill="#F4E8CB" font-family="Georgia, serif" font-size="88" font-weight="700">EnderElevator</text>
  <text x="100" y="298" fill="#C8A86B" font-family="Georgia, serif" font-size="42">Vertical travel, powered by ender magic.</text>
  <text x="102" y="372" fill="#D8C8A7" font-family="Arial, sans-serif" font-size="28">Official Hytale mod wiki and public site</text>
  <text x="102" y="488" fill="#72E0CF" font-family="monospace" font-size="24">Version ${escapeHtml(manifest.Version)} - Hytale 0.5 / Early Access</text>
</svg>`;
}

function sitemap(routes) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${siteOrigin}${route}</loc><lastmod>${updatedAt}</lastmod></url>`).join("\n")}
</urlset>
`;
}

async function copyAssets() {
  const iconsSource = path.join(rootDir, "src/main/resources/Common/Icons/ItemsGenerated");
  const iconsOut = path.join(outDir, "assets/icons");
  await fs.mkdir(iconsOut, { recursive: true });
  for (const [, , file] of variantDefs) {
    await fs.copyFile(path.join(iconsSource, file), path.join(iconsOut, file));
  }
  await fs.writeFile(path.join(outDir, "assets/site.css"), css.trim() + "\n", "utf8");
  await fs.writeFile(path.join(outDir, "assets/site.js"), js.trim() + "\n", "utf8");
  await fs.writeFile(path.join(outDir, "assets/og-image.svg"), ogImage(), "utf8");
}

async function build() {
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(path.join(outDir, "assets"), { recursive: true });
  await copyAssets();

  const routes = [];
  const searchEntries = [];
  for (const lang of Object.keys(languages)) {
    for (const pageId of ["home", ...pageOrder]) {
      const html = renderPage(lang, pageId);
      const target = outputPathFor(lang, pageId);
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.writeFile(target, html, "utf8");
      routes.push(routeFor(lang, pageId));
      searchEntries.push({
        title: pageTitle(lang, pageId),
        description: pageDescription(lang, pageId),
        lang,
        category: pageCategory(lang, pageId),
        url: routeFor(lang, pageId),
        content: stripHtml(`${pageTitle(lang, pageId)} ${pageDescription(lang, pageId)} ${contentFor(lang, pageId)}`)
      });
    }
  }

  await fs.writeFile(path.join(outDir, "assets/search-index.json"), JSON.stringify(searchEntries, null, 2), "utf8");
  await fs.writeFile(path.join(outDir, "sitemap.xml"), sitemap(routes), "utf8");
  await fs.writeFile(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${siteOrigin}${basePath}/sitemap.xml\n`, "utf8");
  await fs.writeFile(path.join(outDir, ".nojekyll"), "", "utf8");
}

await build();
console.log(`Built ${outDir}`);
