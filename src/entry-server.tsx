import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import AppRoutes, { PRERENDER_PATHS } from "./routes";

export { PRERENDER_PATHS };

export function render(url: string) {
  const ctx: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={ctx}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </HelmetProvider>,
  );
  const h = ctx.helmet!;
  const head = [h.title.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join("\n");
  return { html, head };
}
