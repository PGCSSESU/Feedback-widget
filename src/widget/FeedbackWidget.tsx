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
    import("../mountWidget.tsx").then(({ mountWidget }) => {
      mountWidget(this.shadow, {
        projectId: this.dataset.projectId!,
        position: (this.dataset.position as WidgetConfig["position"]) ?? "bottom-right",
      });
    });
  }
}

if (!customElements.get("feedback-widget")) {
  customElements.define("feedback-widget", FeedbackWidget);
}
