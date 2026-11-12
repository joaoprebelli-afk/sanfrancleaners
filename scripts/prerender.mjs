// Renders every route to static HTML so search engines and link previews get real content,
// then the client bundle hydrates it. Runs after `vite build` and the SSR build.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, PRERENDER_PATHS } = await import(pathToFileURL(path.join(root, "dist-server", "entry-server.js")).href);

for (const url of PRERENDER_PATHS) {
  const { html, head } = render(url);
  const page = template.replace("<!--app-head-->", head).replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const file = url === "/" ? "index.html" : `${url.slice(1)}.html`;
  fs.writeFileSync(path.join(dist, file), page);
  console.log(`prerendered ${url} -> ${file} (${Math.round(page.length / 1024)} KB)`);
}
fs.rmSync(path.join(root, "dist-server"), { recursive: true, force: true });
