
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import widgetCss from "./styles/widget.css?inline";
import { WidgetConfig } from "./widget/FeedbackWidget.tsx";

export function mountWidget(shadowRoot: ShadowRoot,config: WidgetConfig){
  const style = document.createElement("style");
  style.textContent = widgetCss;
  shadowRoot.appendChild(style);

  const container = document.createElement("div");
  shadowRoot.appendChild(container);

  createRoot(container).render(<App config={config} />);
}
