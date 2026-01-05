import "./FeedbackWidget.tsx";

const script = document.currentScript as HTMLScriptElement | null;

if (!script) {
  throw new Error("Feedback Widget must be loaded via <script> tag");
}

const widget = document.createElement("feedback-widget");

if (script.dataset.projectId) {
  widget.dataset.projectId = script.dataset.projectId;
}

if (script.dataset.position) {
  widget.dataset.position = script.dataset.position;
}

document.body.appendChild(widget);
