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
      search: "Search the codex...",
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
      roadmap: "Roadmap",
      changelog: "Changelog",
      credits: "Credits",
      curseforge: "CurseForge",
      menu: "Menu",
      search: "Buscar no codex...",
      onThisPage: "Nesta pagina",
      previous: "Anterior",
      next: "Proxima",
      startHere: "Comece aqui",
      docs: "Docs",
      download: "Download",
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
      roadmap: "Roadmap",
      changelog: "Changelog",
      credits: "Credits",
      curseforge: "CurseForge",
      menu: "Menu",
      search: "Buscar en el codex...",
      onThisPage: "En esta pagina",
      previous: "Anterior",
      next: "Siguiente",
      startHere: "Empieza aqui",
      docs: "Docs",
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
      "pt-br": "Troubleshooting",
      es: "Troubleshooting"
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
      "pt-br": "Changelog",
      es: "Changelog"
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
      "pt-br": "Roadmap",
      es: "Roadmap"
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
      "pt-br": "Credits",
      es: "Credits"
    },
    description: {
      en: "Maintainers, source links, CurseForge page, Discord support, and asset notes.",
      "pt-br": "Mantenedores, links de codigo, pagina CurseForge, suporte no Discord e notas de assets.",
      es: "Mantenedores, enlaces de codigo, pagina de CurseForge, soporte en Discord y notas de assets."
    }
  }
};

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

function codeBlock(code, lang = "json") {
  return `<div class="code-block" data-code-block>
    <div class="code-head"><span>${escapeHtml(lang)}</span><button class="copy-button" type="button" data-copy-code>${externalIcon("copy")}<span>Copy</span></button></div>
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
  return table(labels, [
    ["Mod version", `<code>${escapeHtml(manifest.Version)}</code>`, "manifest.json / CurseForge", escapeHtml(guidance[0])],
    ["Hytale game version", "<code>0.5 / Early Access</code>", "CurseForge", escapeHtml(guidance[1])],
    ["ServerVersion", `<code>${escapeHtml(manifest.ServerVersion)}</code>`, "manifest.json", escapeHtml(guidance[1])],
    ["IncludesAssetPack", `<code>${escapeHtml(String(manifest.IncludesAssetPack))}</code>`, "manifest.json", escapeHtml(guidance[2])],
    ["Server and modpacks", "Supported when all players run the same compatible mod build", "README / CurseForge", escapeHtml(guidance[3])]
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
      wiki: "Open the codex",
      support: "Support and source"
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
      wiki: "Abra o codex",
      support: "Suporte e codigo"
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
      wiki: "Abre el codex",
      support: "Soporte y codigo"
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
        ${[
          ["11 color variations", "Build elevators that match stone halls, gardens, libraries, and arcane rooms."],
          ["Configurable search distance", "Tune MaxSearchDistance for compact builds or very tall shafts."],
          ["Cooldown configuration", "Use CooldownMs to keep repeated travel deliberate."],
          ["Optional sound", "Enable teleport sound only when the server wants audible feedback."],
          ["Optional smooth movement", "Enable smooth movement for a short interpolated travel effect."]
        ].map(([title, body]) => `<article><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></article>`).join("")}
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
          <li><strong>Mods folder</strong><p>${lang === "en" ? "Place the mod in the Hytale server or client mods folder used by your setup." : lang === "pt-br" ? "Coloque o mod na pasta de mods do servidor ou cliente Hytale do seu setup." : "Coloca el mod en la carpeta de mods del servidor o cliente Hytale de tu setup."}</p></li>
          <li><strong>World settings</strong><p>${lang === "en" ? "Enable the mod for the world or server and keep versions aligned." : lang === "pt-br" ? "Habilite o mod no mundo ou servidor e mantenha as versoes alinhadas." : "Activa el mod en el mundo o servidor y manten las versiones alineadas."}</p></li>
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
          ${["installation", "usage", "configuration", "troubleshooting", "development", "changelog"].map((id) => `<a class="quick-card" href="${routeFor(lang, id)}"><span>${escapeHtml(pageMeta[id].category)}</span><strong>${escapeHtml(pageTitle(lang, id))}</strong><p>${escapeHtml(pageDescription(lang, id))}</p></a>`).join("")}
        </div>
      </div>
    </section>

    <section class="content-section support-section">
      <div class="section-heading compact">
        <span>${escapeHtml(t.support)}</span>
        <h2>${lang === "en" ? "Report issues where the mod is built." : lang === "pt-br" ? "Reporte problemas onde o mod e construido." : "Reporta problemas donde se construye el mod."}</h2>
      </div>
      <div class="support-actions">
        ${linkButton(links.issues, "GitHub issues", "secondary", "github")}
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
      ${["installation", "usage", "recipes", "configuration", "compatibility", "troubleshooting", "development", "changelog"].map((id) => `<a class="quick-card" href="${routeFor(lang, id)}"><span>${escapeHtml(pageMeta[id].category)}</span><strong>${escapeHtml(pageTitle(lang, id))}</strong><p>${escapeHtml(pageDescription(lang, id))}</p></a>`).join("")}
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
      server: "For servers and modpacks, keep all players on the same mod jar and Hytale build."
    },
    "pt-br": {
      where: "Onde baixar",
      steps: "Passos de instalacao",
      body: "Baixe a versao atual pelo CurseForge primeiro. GitHub releases e codigo ajudam contribuidores, mas CurseForge e a pagina publica de distribuicao.",
      warn: "Use a build de Hytale listada em Compatibilidade. Nao assuma que builds nao suportadas sao seguras.",
      server: "Para servidores e modpacks, mantenha todos os jogadores no mesmo jar e build do Hytale."
    },
    es: {
      where: "Donde descargar",
      steps: "Pasos de instalacion",
      body: "Descarga la version actual desde CurseForge primero. GitHub releases y el codigo ayudan a colaboradores, pero CurseForge es la pagina publica de distribucion.",
      warn: "Usa la build de Hytale listada en Compatibilidad. No asumas que builds no soportadas son seguras.",
      server: "Para servidores y modpacks, manten a todos los jugadores con el mismo jar y build de Hytale."
    }
  }[lang];
  return `
    ${alertBlock("warning", "Compatibility", copy.warn)}
    ${heading(2, copy.where)}
    <p>${escapeHtml(copy.body)}</p>
    <div class="support-actions inline-actions">${linkButton(links.curseforge, "CurseForge", "primary", "download")}${linkButton(links.releases, "GitHub releases", "secondary", "github")}</div>
    ${heading(2, copy.steps)}
    <ol class="step-list docs-list">
      <li><strong>Download the mod</strong><p>Use <code>EnderElevator-${escapeHtml(manifest.Version)}.jar</code> or the latest CurseForge file.</p></li>
      <li><strong>Place it in the mods folder</strong><p>Install through CurseForge or place the mod files into the Hytale server/client mods folder used by your setup.</p></li>
      <li><strong>Enable it for the world</strong><p>Start Hytale, enable the mod where required, and confirm the asset pack loads with the mod.</p></li>
    </ol>
    ${heading(2, "Server and modpack note")}
    <p>${escapeHtml(copy.server)}</p>
  `;
}

function usageContent(lang) {
  const copy = {
    en: ["Expected behavior", "Place Ender Elevators vertically on the same X/Z column. Stand on one, jump to travel upward, or crouch to travel downward.", "Cooldown behavior", "CooldownMs adds a short delay after successful travel so holding a movement key does not repeatedly fire.", "Smooth movement and sound", "If EnableSmoothMovement is true, travel is interpolated for a short duration. If EnableSound is true, the teleport sound plays after a successful use."],
    "pt-br": ["Comportamento esperado", "Coloque Ender Elevators na vertical, na mesma coluna X/Z. Fique sobre um, pule para subir ou agache para descer.", "Cooldown", "CooldownMs adiciona um pequeno intervalo apos uma viagem bem-sucedida para evitar ativacao repetida ao segurar a tecla.", "Movimento suave e som", "Se EnableSmoothMovement estiver true, a viagem usa interpolacao curta. Se EnableSound estiver true, o som de teleporte toca apos um uso bem-sucedido."],
    es: ["Comportamiento esperado", "Coloca Ender Elevators en vertical, en la misma columna X/Z. Parate sobre uno, salta para subir o agachate para bajar.", "Cooldown", "CooldownMs agrega una pausa corta tras un viaje exitoso para evitar activacion repetida al mantener la tecla.", "Movimiento suave y sonido", "Si EnableSmoothMovement es true, el viaje usa interpolacion corta. Si EnableSound es true, suena el teletransporte tras un uso exitoso."]
  }[lang];
  return `
    <div class="usage-diagram">
      <div><img src="${iconPath("Ender_Elevator_Block.png")}" alt="Base Ender Elevator block icon"><strong>Lower floor</strong></div>
      <div class="shaft-line"><span>Jump</span><span>Crouch</span></div>
      <div><img src="${iconPath("Ender_Elevator_Block.png")}" alt="Base Ender Elevator block icon"><strong>Upper floor</strong></div>
    </div>
    ${heading(2, copy[0])}
    <p>${escapeHtml(copy[1])}</p>
    ${alertBlock("tip", "Safe arrival", "The destination must have two clear blocks above the elevator. Matching color variants are required by the search logic.")}
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
  return `
    ${alertBlock("note", "Source of truth", intro)}
    ${heading(2, variantTranslations[lang].base)}
    <div class="base-recipe-panel">
      <img src="${iconPath("Ender_Elevator_Block.png")}" alt="Base Ender Elevator recipe icon">
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
  return `
    ${alertBlock("tip", "Config keys", intro)}
    ${heading(2, lang === "en" ? "Default config" : lang === "pt-br" ? "Config padrao" : "Config predeterminada")}
    ${codeBlock(`{
  "MaxSearchDistance": 320,
  "CooldownMs": 500,
  "EnableSound": false,
  "EnableSmoothMovement": false,
  "SmoothingDurationMs": 320
}`)}
    ${heading(2, lang === "en" ? "Config reference" : lang === "pt-br" ? "Referencia de config" : "Referencia de config")}
    ${configTable(lang)}
    ${heading(2, lang === "en" ? "Smooth movement example" : lang === "pt-br" ? "Exemplo de movimento suave" : "Ejemplo de movimiento suave")}
    ${codeBlock(`{
  "MaxSearchDistance": 240,
  "CooldownMs": 550,
  "EnableSound": true,
  "EnableSmoothMovement": true,
  "SmoothingDurationMs": 320
}`)}
  `;
}

function compatibilityContent(lang) {
  return `
    ${alertBlock("compatibility", "Current public release", `EnderElevator ${manifest.Version}, CurseForge file EnderElevator-${manifest.Version}.jar, game version 0.5 / Early Access.`)}
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
  return `
    ${alertBlock("note", "Contributor page", "This page is for contributors. Player setup lives in Installation, Usage, Recipes, and Configuration.")}
    ${heading(2, "ECS architecture")}
    ${table(labels, [
      ["<code>ElevatorSystem</code>", "Orchestrator", "Detects input, validates the current elevator block, searches vertically, checks destination safety, and queues travel/effects."],
      ["<code>ElevatorComponent</code>", "Per-player state", "Stores last successful use plus short failed-search timestamps per direction."],
      ["<code>SmoothingComponent</code>", "Travel state", "Stores start/end positions, elapsed time, duration, and captured rotation."],
      ["<code>SmoothingSystem</code>", "Travel runner", "Moves players with TransformComponent#setPosition() and applies one final Teleport correction."],
      ["<code>ElevatorConfig</code>", "Configuration", "Defines BuilderCodec-backed search distance, cooldown, sound, smooth movement, and duration keys."]
    ].map((row) => row.map((cell) => cell.startsWith("<code>") ? cell : escapeHtml(cell))))}
    ${heading(2, "Safety rules")}
    <ul>
      <li>Use <code>CommandBuffer</code> for ECS mutations during ticks.</li>
      <li>Check <code>world.getChunkIfLoaded()</code> before <code>world.getBlockType()</code>.</li>
      <li>Resolve the teleport sound lazily only when sound is enabled and travel succeeds.</li>
      <li>Do not smooth by adding <code>Teleport</code> every tick.</li>
    </ul>
    <p><a href="${links.github}">Open the source on GitHub</a>.</p>
  `;
}

function changelogContent() {
  return `
    ${alertBlock("note", "Mirrored source", "This page renders CHANGELOG.md from the repository so public docs stay close to release history.")}
    <div class="changelog-content">${markdownToChangelogHtml(changelog)}</div>
  `;
}

function roadmapContent(lang) {
  const labels = {
    en: ["Status", "Item", "Notes"],
    "pt-br": ["Status", "Item", "Notas"],
    es: ["Estado", "Item", "Notas"]
  }[lang];
  return `
    ${heading(2, lang === "en" ? "Roadmap 2.0" : "Roadmap 2.0")}
    ${table(labels, [
      ["<span class=\"status-badge done\">Done</span>", "ECS modernization", "Native ECS systems and components are in place."],
      ["<span class=\"status-badge done\">Done</span>", "Sound effects", "Optional SFX_Portal_Neutral_Teleport_Local feedback."],
      ["<span class=\"status-badge done\">Done</span>", "Configuration toggles", "Sound, smooth movement, cooldown, search distance, and duration are configurable."],
      ["<span class=\"status-badge done\">Done</span>", "Smooth interpolated movement", "Transform interpolation plus final teleport correction."],
      ["<span class=\"status-badge planned\">Planned</span>", "Directional elevators", "Horizontal teleportation is listed as a future direction."],
      ["<span class=\"status-badge exploring\">Exploring</span>", "Multi-block elevators", "Larger elevator platforms are noted in SYSTEM_DESIGN.md."],
      ["<span class=\"status-badge exploring\">Exploring</span>", "Destination UI", "Diagnostic HUD or destination selection remains future-facing."]
    ].map((row) => row.map((cell) => cell.startsWith("<span") ? cell : escapeHtml(cell))))}
    ${alertBlock("note", "No promised dates", "This roadmap intentionally avoids release dates that are not present in the repository.")}
  `;
}

function creditsContent(lang) {
  return `
    ${heading(2, lang === "en" ? "Maintainers" : lang === "pt-br" ? "Mantenedores" : "Mantenedores")}
    <div class="credits-grid">
      ${manifest.Authors.map((author) => `<a class="quick-card compact-card" href="${escapeHtml(author.Github)}"><span>GitHub</span><strong>${escapeHtml(author.Name)}</strong><p>${escapeHtml(author.Github)}</p></a>`).join("")}
    </div>
    ${heading(2, "Links")}
    <div class="support-actions inline-actions">${linkButton(links.github, "GitHub", "secondary", "github")}${linkButton(links.curseforge, "CurseForge", "primary", "download")}${linkButton(links.discord, "Discord", "accent", "spark")}</div>
    ${heading(2, lang === "en" ? "Assets" : "Assets")}
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
  return `<nav class="language-switcher" aria-label="Language">
    ${Object.keys(languages).map((candidate) => `<a class="${candidate === lang ? "active" : ""}" href="${routeFor(candidate, pageId)}" hreflang="${languages[candidate].code}">${languages[candidate].label}</a>`).join("")}
  </nav>`;
}

function topNav(lang, pageId) {
  const t = languages[lang].nav;
  return `<header class="top-nav">
    <a class="brand" href="${routeFor(lang, "home")}" aria-label="EnderElevator home">
      <img src="${iconPath("Ender_Elevator_Block_Purple.png")}" alt="" aria-hidden="true">
      <span>EnderElevator</span>
    </a>
    <nav class="desktop-nav" aria-label="Primary">
      <a href="${routeFor(lang, "wiki")}">${escapeHtml(t.wiki)}</a>
      <a href="${routeFor(lang, "roadmap")}">${escapeHtml(t.roadmap)}</a>
      <a href="${routeFor(lang, "changelog")}">${escapeHtml(t.changelog)}</a>
      <a href="${routeFor(lang, "credits")}">${escapeHtml(t.credits)}</a>
    </nav>
    <div class="nav-actions">
      ${languageSwitcher(lang, pageId)}
      <a class="nav-cta" href="${links.curseforge}">${escapeHtml(t.curseforge)}</a>
      <button class="menu-button" type="button" data-menu-toggle aria-expanded="false">${externalIcon("menu")}<span>${escapeHtml(t.menu)}</span></button>
    </div>
    <div class="mobile-menu" data-mobile-menu>
      <a href="${routeFor(lang, "wiki")}">${escapeHtml(t.wiki)}</a>
      <a href="${routeFor(lang, "roadmap")}">${escapeHtml(t.roadmap)}</a>
      <a href="${routeFor(lang, "changelog")}">${escapeHtml(t.changelog)}</a>
      <a href="${routeFor(lang, "credits")}">${escapeHtml(t.credits)}</a>
      <a href="${links.curseforge}">${escapeHtml(t.curseforge)}</a>
      ${languageSwitcher(lang, pageId)}
    </div>
  </header>`;
}

function sidebar(lang, pageId) {
  const groups = [
    ["Getting Started", ["wiki", "installation"]],
    ["Player Docs", ["usage", "recipes"]],
    ["Server Docs", ["configuration", "compatibility", "troubleshooting"]],
    ["Developer Docs", ["development", "changelog"]],
    ["Project", ["roadmap", "credits"]]
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
      <strong>EnderElevator Codex</strong>
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
  const titleTag = pageId === "home" ? "EnderElevator - Hytale Mod Wiki" : `${title} - EnderElevator Codex`;

  const article = isHome
    ? `<main>${bodyContent}</main>`
    : `<main class="wiki-main" data-pagefind-body>
        ${mobileDocsNav(lang, pageId)}
        <article class="wiki-article">
          <header class="page-header">
            <span class="page-category">${escapeHtml(pageMeta[pageId].category)}</span>
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
  <meta property="og:site_name" content="EnderElevator Codex">
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
</body>
</html>`;
}

const css = `
@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Cinzel+Decorative:wght@700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap");

:root {
  --ee-bg: #0B1113;
  --ee-bg-deep: #070B0D;
  --ee-bg-soft: #10191C;
  --ee-surface: #121A1D;
  --ee-surface-raised: #172125;
  --ee-surface-sunken: #0E1518;
  --ee-surface-muted: #1D292C;
  --ee-parchment: #E9D9B8;
  --ee-parchment-soft: #F4E8CB;
  --ee-parchment-ink: #2D2417;
  --ee-ink: #F2E8D0;
  --ee-ink-soft: #D8C8A7;
  --ee-muted: #9C9078;
  --ee-primary: #7B4FD6;
  --ee-primary-hover: #8D63EA;
  --ee-secondary: #173A2E;
  --ee-secondary-hover: #214D3D;
  --ee-accent: #72E0CF;
  --ee-reward: #C8A86B;
  --ee-danger: #C26B45;
  --ee-border: #2A352E;
  --ee-border-soft: #1D2827;
  --ee-border-strong: #7E6843;
  --ee-ring: #A783EA;
  --ee-radius-card: 16px;
  --ee-radius-control: 10px;
  --ee-shadow: 0 1px 0 rgba(244, 232, 203, 0.04), 0 18px 40px rgba(0, 0, 0, 0.32);
  color-scheme: dark;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  overflow-x: hidden;
  background:
    radial-gradient(circle at 50% 0%, rgba(123, 79, 214, 0.12), transparent 34rem),
    radial-gradient(circle at 82% 12%, rgba(114, 224, 207, 0.07), transparent 25rem),
    linear-gradient(180deg, var(--ee-bg), var(--ee-bg-deep));
  color: var(--ee-ink);
  font-family: Inter, system-ui, sans-serif;
  line-height: 1.65;
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.34;
  background-image:
    linear-gradient(rgba(244,232,203,.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(244,232,203,.02) 1px, transparent 1px);
  background-size: 46px 46px;
}
a { color: var(--ee-accent); text-decoration: none; }
a:hover { color: var(--ee-parchment-soft); }
img { max-width: 100%; display: block; }
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
  background: rgba(11, 17, 19, 0.88);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--ee-border);
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  color: var(--ee-ink);
  font-family: "Cinzel Decorative", Cinzel, Georgia, serif;
  font-weight: 700;
  letter-spacing: 0.02em;
}
.brand img { width: 36px; filter: drop-shadow(0 0 16px rgba(123, 79, 214, .55)); }
.desktop-nav { display: flex; align-items: center; gap: 6px; justify-content: center; }
.desktop-nav a, .mobile-menu a {
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: var(--ee-radius-control);
  color: var(--ee-ink-soft);
  font-weight: 700;
  font-size: 0.9rem;
}
.desktop-nav a:hover, .mobile-menu a:hover { background: var(--ee-surface); color: var(--ee-parchment-soft); }
.nav-actions { display: flex; align-items: center; gap: 10px; }
.language-switcher {
  display: inline-flex;
  padding: 3px;
  gap: 2px;
  border: 1px solid var(--ee-border);
  border-radius: 999px;
  background: var(--ee-surface-sunken);
}
.language-switcher a {
  min-height: 34px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  color: var(--ee-muted);
  font-size: 0.78rem;
  font-weight: 800;
}
.language-switcher a.active { background: var(--ee-primary); color: var(--ee-parchment-soft); box-shadow: inset 0 0 0 1px rgba(244,232,203,.2); }
.nav-cta {
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: var(--ee-radius-control);
  color: var(--ee-parchment-soft);
  background: linear-gradient(180deg, var(--ee-primary), #5b38a5);
  border: 1px solid rgba(200, 168, 107, 0.8);
  font-weight: 800;
}
.menu-button { display: none; }
.mobile-menu { display: none; }

.button {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: var(--ee-radius-control);
  border: 1px solid var(--ee-border-strong);
  font-weight: 800;
  color: var(--ee-ink);
  box-shadow: 0 3px 0 rgba(0,0,0,.32);
  transition: transform .2s ease, background .2s ease, border-color .2s ease;
}
.button:hover { transform: translateY(-1px); color: var(--ee-parchment-soft); }
.button:active { transform: translateY(1px); box-shadow: 0 1px 0 rgba(0,0,0,.32); }
.button-primary { background: linear-gradient(180deg, var(--ee-primary-hover), var(--ee-primary)); }
.button-secondary { background: linear-gradient(180deg, var(--ee-secondary-hover), var(--ee-secondary)); }
.button-accent { background: linear-gradient(180deg, var(--ee-accent), #4bb8ab); color: #061313; }
.button-ghost { background: var(--ee-surface-sunken); color: var(--ee-ink-soft); border-color: var(--ee-border); }

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
  font-family: "Cinzel Decorative", Cinzel, Georgia, serif;
  max-width: 100%;
  font-size: clamp(3rem, 5vw, 4.85rem);
  line-height: 0.92;
  color: var(--ee-parchment-soft);
  text-shadow: 0 2px 0 rgba(0,0,0,.6);
  letter-spacing: 0;
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
  max-width: 14ch;
  font-family: Cinzel, Georgia, serif;
  font-size: clamp(2rem, 4vw, 4rem);
  line-height: 1.02;
  color: var(--ee-reward);
}
.hero-sub {
  max-width: 66ch;
  margin: 22px 0 0;
  color: var(--ee-ink-soft);
  font-size: clamp(1rem, 1.5vw, 1.18rem);
}
.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
.hero-art {
  position: relative;
  min-height: 500px;
  border: 1px solid var(--ee-border-strong);
  border-radius: 22px;
  background:
    radial-gradient(circle at 50% 48%, rgba(123, 79, 214, .34), transparent 42%),
    linear-gradient(145deg, rgba(23, 33, 37, .96), rgba(7, 11, 13, .96));
  box-shadow: var(--ee-shadow), inset 0 0 0 1px rgba(244,232,203,.04);
  overflow: hidden;
}
.hero-art::before {
  content: "";
  position: absolute;
  inset: 16px;
  border: 1px solid rgba(200,168,107,.22);
  border-radius: 16px;
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
  align-items: end;
  color: var(--ee-ink-soft);
  border-top: 1px solid rgba(200,168,107,.28);
  padding-top: 16px;
}
.hero-art-caption strong { font: 800 3rem "JetBrains Mono", monospace; color: var(--ee-accent); }
.hero-art-caption span { color: var(--ee-reward); font-weight: 800; }

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
  border: 1px solid var(--ee-border);
  border-radius: var(--ee-radius-card);
  background: linear-gradient(180deg, rgba(23,33,37,.96), rgba(14,21,24,.96));
  box-shadow: var(--ee-shadow);
}
.crystal-card {
  min-height: 210px;
  padding: 24px;
  overflow: hidden;
}
.crystal-card::after, .quick-card::after, .stone-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(135deg, rgba(200,168,107,.16), transparent 22%, transparent 72%, rgba(123,79,214,.18));
}
.crystal-card span { color: var(--ee-accent); font-family: "JetBrains Mono", monospace; font-weight: 800; }
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
  grid-template-columns: 1.2fr .8fr;
  gap: 1px;
  border: 1px solid var(--ee-border);
  background: var(--ee-border);
  border-radius: var(--ee-radius-card);
  overflow: hidden;
}
.feature-ledger article {
  padding: 24px;
  background: rgba(18,26,29,.95);
}
.feature-ledger article:first-child { grid-row: span 2; }
.feature-ledger h3 { margin: 0 0 8px; color: var(--ee-reward); font-family: Cinzel, Georgia, serif; }
.feature-ledger p { margin: 0; color: var(--ee-ink-soft); }
.variant-strip {
  display: grid;
  grid-template-columns: repeat(12, minmax(76px, 1fr));
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 12px;
}
.variant-strip figure {
  min-width: 76px;
  margin: 0;
  padding: 12px 8px;
  border: 1px solid var(--ee-border);
  border-radius: 12px;
  background: var(--ee-surface-sunken);
  text-align: center;
}
.variant-strip img { width: 52px; height: 52px; object-fit: contain; margin: 0 auto 8px; }
.variant-strip figcaption { color: var(--ee-muted); font-size: 0.72rem; font-weight: 800; }
.strong-panel { padding: clamp(22px, 4vw, 42px); border-color: var(--ee-border-strong); }
.step-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; counter-reset: steps; }
.step-list li {
  counter-increment: steps;
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 14px;
  align-items: start;
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
.step-list strong { color: var(--ee-parchment-soft); }
.step-list p { margin: 3px 0 0; color: var(--ee-ink-soft); }
.two-column {
  display: grid;
  grid-template-columns: .82fr 1.18fr;
  gap: 28px;
}
.parchment-card {
  color: var(--ee-parchment-ink);
  background:
    linear-gradient(135deg, rgba(255,255,255,.16), transparent 32%),
    var(--ee-parchment);
  border: 1px solid rgba(126,104,67,.7);
  border-radius: var(--ee-radius-card);
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
  border: 1px solid var(--ee-border);
  border-radius: var(--ee-radius-card);
  background: rgba(18,26,29,.92);
  padding: 14px;
  box-shadow: var(--ee-shadow);
}
.sidebar-group { padding: 12px 0; border-top: 1px solid var(--ee-border); }
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
}
.sidebar-group a.active {
  background: linear-gradient(90deg, rgba(123,79,214,.72), rgba(123,79,214,.18));
  color: var(--ee-parchment-soft);
  box-shadow: inset 2px 0 0 var(--ee-accent);
}
.search-shell {
  position: relative;
  display: flex;
  align-items: center;
  gap: 9px;
  min-height: 44px;
  padding: 0 12px;
  border: 1px solid var(--ee-border);
  border-radius: var(--ee-radius-control);
  background: var(--ee-surface-sunken);
}
.search-shell:focus-within { border-color: var(--ee-accent); box-shadow: 0 0 0 3px rgba(114,224,207,.12); }
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
  border: 1px solid var(--ee-border-strong);
  border-radius: 12px;
  background: #0D1417;
  box-shadow: 0 22px 50px rgba(0,0,0,.52);
}
.search-results.open { display: grid; gap: 8px; }
.search-result {
  display: block;
  padding: 12px;
  border: 1px solid var(--ee-border);
  border-radius: 10px;
  background: var(--ee-surface);
}
.search-result strong { display: block; color: var(--ee-parchment-soft); }
.search-result span { color: var(--ee-reward); font-size: .75rem; font-weight: 800; }
.search-result p { margin: 4px 0 0; color: var(--ee-ink-soft); font-size: .9rem; }
.wiki-main { min-width: 0; }
.wiki-article {
  min-width: 0;
  width: 100%;
  max-width: 84ch;
  margin: 0 auto;
  padding: clamp(24px, 4vw, 46px);
  border: 1px solid var(--ee-border);
  border-radius: 20px;
  background: rgba(18,26,29,.82);
  box-shadow: var(--ee-shadow);
  overflow-wrap: break-word;
}
.page-header {
  padding-bottom: 26px;
  margin-bottom: 26px;
  border-bottom: 1px solid var(--ee-border);
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
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 14px;
  padding: 16px;
  border: 1px solid var(--ee-border);
  border-radius: var(--ee-radius-card);
  background: rgba(14,21,24,.96);
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
.table-scroll { max-width: 100%; overflow-x: auto; margin: 18px 0; border: 1px solid var(--ee-border); border-radius: var(--ee-radius-card); }
table { width: 100%; min-width: 720px; border-collapse: collapse; background: var(--ee-surface-sunken); }
th, td { padding: 13px 14px; border-bottom: 1px solid var(--ee-border); text-align: left; vertical-align: top; }
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
  gap: 24px;
  margin: 24px 18px 0;
  padding: 30px 0 44px;
  border-top: 1px solid var(--ee-border);
  color: var(--ee-muted);
}
.site-footer strong { color: var(--ee-parchment-soft); font-family: Cinzel, Georgia, serif; }
.site-footer p { max-width: 64ch; margin: 6px 0 0; }
.site-footer nav { display: flex; flex-wrap: wrap; gap: 14px; align-items: start; }

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
}
@media (max-width: 760px) {
  .top-nav { grid-template-columns: 1fr auto; margin: 0 12px; }
  .desktop-nav, .nav-actions > .language-switcher, .nav-cta { display: none; }
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
  .mobile-menu .language-switcher { width: fit-content; }
  .hero-section { padding: 30px 14px; min-height: auto; }
  .hero-copy h1 { font-size: clamp(2.9rem, 14vw, 4.1rem); overflow-wrap: anywhere; }
  .hero-headline { max-width: 11ch; font-size: clamp(1.9rem, 9vw, 3rem); }
  .hero-actions, .support-actions { display: grid; grid-template-columns: 1fr; }
  .button { width: 100%; }
  .hero-art { min-height: 340px; }
  .hero-orbit img:not(.hero-main-icon) { width: 46px; transform: rotate(calc(var(--i) * 36deg)) translateX(116px) rotate(calc(var(--i) * -36deg)); }
  .section-band, .content-section { padding: 44px 14px; }
  .how-grid, .feature-ledger, .two-column, .quick-link-grid, .category-grid, .start-grid, .credits-grid, .recipe-grid { grid-template-columns: 1fr; }
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
        category: pageMeta[pageId].category,
        url: routeFor(lang, pageId),
        content: stripHtml(html)
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
