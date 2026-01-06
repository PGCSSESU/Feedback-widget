import { mountWidget } from "@/mountWidget";

export type WidgetConfig = {
  position: "bottom-right" | "bottom-left";
};

export class FeedbackWidget extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const position = this.dataset.position === "bottom-left" ? "bottom-left" : "bottom-right";
    mountWidget(this.shadow, { position });
  }
}

if (!customElements.get("feedback-widget")) {
  customElements.define("feedback-widget", FeedbackWidget);
}
