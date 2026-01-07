import { mountWidget } from "@/mountWidget";

export type WidgetConfig = {
  projectId: string;
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
    const projectId = this.dataset.projectid

    if (!projectId) {
      throw new Error("Missing projectId");
    }
    mountWidget(this.shadow, { config: { projectId, position } });
  }
}

if (!customElements.get("feedback-widget")) {
  customElements.define("feedback-widget", FeedbackWidget);
}