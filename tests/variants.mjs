import { build } from "astro";
import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

// Compile isolated fixtures without editing the client configuration or the preview build.
for (const variant of ["store-only", "grooming-only"]) {
  const outDir = new URL(`../reports/${variant}/`, import.meta.url);
  await build({
    root: fileURLToPath(new URL("../", import.meta.url)),
    outDir: fileURLToPath(outDir),
    logLevel: "error",
    vite: {
      plugins: [
        {
          name: "business-variant-fixture",
          enforce: "pre",
          transform(code, id) {
            if (!id.replaceAll("\\", "/").endsWith("/src/data/site.ts")) return;
            return variant === "store-only"
              ? code.replace(
                  /services: \[[\s\S]*?\n  \],\n  products:/,
                  "services: [],\n  products:",
                )
              : code.replace(
                  "sections: { products: true",
                  "sections: { products: false",
                );
          },
        },
      ],
    },
  });
  const html = readFileSync(new URL("index.html", outDir), "utf8");
  if (variant === "store-only") {
    assert.doesNotMatch(html, /id="cuidados"|href="\/banho-e-tosa\//);
    assert.ok(!existsSync(new URL("banho-e-tosa/index.html", outDir)));
    assert.doesNotMatch(
      readFileSync(new URL("perguntas-frequentes/index.html", outDir), "utf8"),
      /<h2>Banho e tosa<\/h2>/,
    );
    assert.match(html, /id="na-loja"/);
  } else {
    assert.doesNotMatch(html, /id="na-loja"|href="\/#na-loja"/);
    assert.ok(existsSync(new URL("banho-e-tosa/index.html", outDir)));
    assert.ok(!existsSync(new URL("loja/index.html", outDir)));
    assert.doesNotMatch(
      readFileSync(new URL("perguntas-frequentes/index.html", outDir), "utf8"),
      /<h2>Loja e produtos<\/h2>/,
    );
    assert.match(html, /id="cuidados"/);
  }
  console.log(`${variant}: páginas, seções e navegação coerentes.`);
}
