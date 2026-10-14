import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const routes = new Map([
  ["/", "index.html"],
  ["/banho-e-tosa/", "banho-e-tosa/index.html"],
  ["/quem-somos/", "quem-somos/index.html"],
  ["/loja/", "loja/index.html"],
  ["/perguntas-frequentes/", "perguntas-frequentes/index.html"],
  ["/contato/", "contato/index.html"],
  ["/404/", "404.html"],
]);
const pages = new Map(
  [...routes].map(([url, file]) => [
    url,
    readFileSync(join("dist", file), "utf8"),
  ]),
);
for (const [route, html] of pages) {
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${route}: one H1`);
  assert.match(html, /name="robots" content="noindex, follow"/);
  assert.doesNotMatch(html, /application\/ld\+json|Lorem ipsum/i);
  assert.match(html, /lang="pt-BR"/);
  assert.match(html, /name="description" content="[^"]+"/);
  assert.doesNotMatch(html, /fraunces-latin|nunito-sans-latin/);
  if (route !== "/404/")
    assert.ok(
      html.includes(`href="${route}" aria-current="page"`),
      `${route}: active navigation`,
    );
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (href.startsWith("https://wa.me/")) {
      const url = new URL(href.replaceAll("&amp;", "&"));
      assert.equal(url.pathname, "/5513978143448");
      assert.match(url.searchParams.get("text"), /Ghati.*demonstração/);
    } else if (href.startsWith("/") || href.startsWith("#")) {
      const [path, hash] = href.split("#");
      if (path && !routes.has(path)) {
        assert.ok(existsSync(join("dist", path)), `Missing file ${href}`);
      } else {
        const target = pages.get(path || route);
        assert.ok(target, `Missing page ${href}`);
        if (hash)
          assert.ok(target.includes(`id="${hash}"`), `Missing anchor ${href}`);
      }
    }
  }
  for (const [, src] of html.matchAll(/<img[^>]+src="([^"]+)"/g))
    assert.ok(existsSync(join("dist", src)), `Missing image ${src}`);
}
assert.doesNotMatch(pages.get("/"), /<details/);
assert.match(pages.get("/perguntas-frequentes/"), /<details/);
assert.equal(
  new Set(
    [...pages.values()].map((html) => html.match(/<title>(.*?)<\/title>/)[1]),
  ).size,
  pages.size,
  "Individual page titles",
);
assert.match(readFileSync("dist/robots.txt", "utf8"), /Allow: \//);
assert.doesNotMatch(readFileSync("dist/robots.txt", "utf8"), /Disallow: \//);
assert.doesNotMatch(
  readFileSync("dist/sitemap.xml", "utf8"),
  /localhost|example\.com/,
);
console.log(
  "Build verificado: páginas, âncoras, imagens, WhatsApp, noindex e robots.",
);
