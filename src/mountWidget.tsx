
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import widgetCss from "./styles/widget.css?inline";

export function mountWidget(shadowRoot: ShadowRoot, config: any) {
  const style = document.createElement("style");
  style.textContent = widgetCss;
  shadowRoot.appendChild(style);

  const container = document.createElement("div");
  shadowRoot.appendChild(container);

  createRoot(container).render(<App config={config} />);
}
