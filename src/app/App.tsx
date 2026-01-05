import { useState } from "react";
import { MessageSquare } from "lucide-react";
import FeedbackPanel from "./FeedbackPanel";

export default function App({ config }: any) {
  const [open, setOpen] = useState(false);

  function openWidget() {
    setOpen(true);
    window.dispatchEvent(new CustomEvent("feedback:opened"));
  }

  const positionClass =
    config.position === "bottom-left"
      ? "left-5 bottom-5"
      : "right-5 bottom-5";

  return (
    <>
      {/* ================= FLOATING FEEDBACK BUTTON ================= */}
      <button
        onClick={openWidget}
        aria-label="Open feedback widget"
        className={`
          fixed ${positionClass} z-[9999]
          flex h-12 w-12 items-center justify-center
          rounded-full
          bg-emerald-500
          ring-2 ring-emerald-300
          shadow-[0_0_0_4px_rgba(16,185,129,0.25),0_12px_24px_rgba(16,185,129,0.45)]
          hover:bg-emerald-600
          hover:shadow-[0_0_0_6px_rgba(16,185,129,0.35),0_16px_30px_rgba(16,185,129,0.55)]
          hover:scale-105
          active:scale-95
          transition-all duration-200 ease-out
        `}
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </button>

      {/* ================= FEEDBACK PANEL ================= */}
      {open && (
        <FeedbackPanel
          config={config}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
