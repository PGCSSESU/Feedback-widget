import { useState } from "react";
import { Star, X, CircleCheckBig} from "lucide-react";

type Status = "initial" | "submitting" | "success" | "error";

export default function FeedbackPanel({
  onClose,
  config,
}: {
  onClose: () => void;
  config: any;
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
          projectId: config.projectId,
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
    <div className="fixed bottom-20 right-6 z-10000 w-[320px] rounded-2xl bg-white border border-emerald-300 p-5 shadow-lg">
      {status === "success" ? (
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
           <CircleCheckBig size={24} />
          </div>
          <p className="text-lg font-semibold text-emerald-600">
            Thank you for your feedback!
          </p>
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-emerald-500 py-2 text-white hover:bg-emerald-600 transition"
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-emerald-700">
              Share your feedback
            </h3>
            <button
              onClick={onClose}
              className="text-emerald-500 hover:text-emerald-700"
            >
              <X size={18} />
            </button>
          </div>


          <label className="block text-sm font-medium text-emerald-700">
            Rating (1–5)
          </label>

          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((v) => (
              <button key={v} onClick={() => setRating(v)}>
                <Star
                  className={`h-6 w-6 ${
                    rating >= v
                      ? "fill-emerald-800 text-green-800"
                      : "text-green-800"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-green-700 bg-white shadow-[inset_0_0_0_1px_rgba(16,185,129,0.2)] focus-within:ring-2 focus-within:ring-emerald-400 transition">
            <textarea
              placeholder="Tell us what you think..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg bg-transparent px-3 py-2 text-sm text-emerald-900 placeholder:text-green-800 outline-none"
            />
          </div>

          <div className="mt-3 rounded-lg border border-green-700 bg-white shadow-[inset_0_0_0_1px_rgba(16,185,129,0.2)] focus-within:ring-2 focus-within:ring-emerald-400 transition">
            <input
              type="email"
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-transparent px-3 py-2 text-sm text-emerald-900 placeholder:text-green-800 outline-none"
            />
          </div>
          <button
            onClick={submit}
            disabled={status === "submitting"}
            className="mt-4 w-full rounded-lg bg-emerald-500 py-2 text-white hover:bg-emerald-600 transition"
          >
            Submit
          </button>

          {status === "error" && (
            <p className="mt-2 text-sm text-red-500">
              Submission failed. Please try again.
            </p>
          )}
        </>
      )}
    </div>
  );
}
