import { useState } from "react";
import { Star, X, CircleCheckBig } from "lucide-react";
import { WidgetConfig } from "@/widget/FeedbackWidget";

type Status = "initial" | "submitting" | "success" | "error";

export default function FeedbackPanel({
  config,
  onClose,
}: {
  config: WidgetConfig;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("initial");

  async function submit() {
    if (!message || rating === 0) return;

    setStatus("submitting");

    try {
      await fetch("http://localhost:3001/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          message,
          email,
          url: window.location.href,
        }),
      });

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className={`fixed ${
        config.position === "bottom-left"
          ? "left-6 bottom-20"
          : "right-6 bottom-20"
      } z-50 w-[320px] bg-linear-to-br from-emerald-50 via-teal-50 to-white
           text-green-900 font-sans p-4`}
    >
      {status === "success" ? (
        <div className="text-center space-y-3">
          <CircleCheckBig className="mx-auto text-green-600" />
          <p className="font-medium">Thank you for your feedback</p>
          <button
            onClick={onClose}
            className="w-full rounded border px-3 py-1.5 text-sm"
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-medium">Feedback</h3>
            <button onClick={onClose}>
              <X size={16} />
            </button>
          </div>

        
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((v) => (
              <button key={v} onClick={() => setRating(v)}>
                <Star
                  className={`h-5 w-5 ${rating >= v ? "fill-green-900" : ""}`}
                />
              </button>
            ))}
          </div>

          <textarea
            className="mt-3 w-full rounded border-solid border px-2 py-1.5 text-sm"
            placeholder="Your feedback"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="email"
            className="mt-2 w-full rounded border-solid border px-2 py-1.5 text-sm"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={submit}
            disabled={status === "submitting"}
            className="mt-3 w-full rounded border-solid border px-3 py-1.5 text-sm"
          >
            {status === "submitting" ? "Submitting..." : "Submit"}
          </button>

          {status === "error" && (
            <p className="mt-2 text-xs text-red-500">
              Something went wrong. Try again.
            </p>
          )}
        </>
      )}
    </div>
  );
}
