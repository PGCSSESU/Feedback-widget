import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import FeedbackPanel from "./FeedbackPanel";
import { WidgetConfig } from "@/widget/FeedbackWidget";

export default function App({ config }: { config: WidgetConfig }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const feed = ((window as any).FeedbackWidget ??= {});
    feed.open = () => {
      setOpen(true);
      window.dispatchEvent(new CustomEvent("feedback:opened"));
    };

    feed.close = () => setOpen(false);

  }, []);

  function openWidget() {
    setOpen(true);
    window.dispatchEvent(new CustomEvent("feedback:opened"));
  }

  const positionClass =
    config.position === "bottom-left"
      ? "left-4 bottom-4"
      : "right-4 bottom-4";

  return (
    <>
      <button
        type="button"
        onClick={openWidget}
        aria-label="Open feedback"
        className={`fixed ${positionClass} z-50
          flex h-11 w-11 items-center justify-center
          rounded-full border bg-emerald-900 text-white shadow`}
      >
        <MessageSquare className="h-5 w-5" />
      </button>

      {open && (
        <FeedbackPanel
          config={config}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
