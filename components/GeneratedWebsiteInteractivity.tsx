"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";

type ActionKind = "demo" | "trial" | "contact";

type Props = {
  children: ReactNode;
};

type LeadPayload = {
  action: ActionKind;
  sourceLabel: string;
  name: string;
  email: string;
  company: string;
  message: string;
};

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function inferAction(labelRaw: string, hrefRaw: string): ActionKind | null {
  const label = normalize(labelRaw);
  const href = normalize(hrefRaw);

  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return null;
  }

  if (href.startsWith("#")) {
    if (href.includes("contact") || href.includes("demo") || href.includes("trial")) {
      return "contact";
    }
    return null;
  }

  if (
    label.includes("book demo") ||
    label.includes("get demo") ||
    label.includes("request demo") ||
    label.includes("demo")
  ) {
    return "demo";
  }

  if (
    label.includes("start free") ||
    label.includes("free trial") ||
    label.includes("start trial") ||
    label.includes("launch") ||
    label.includes("get started") ||
    label.includes("shop") ||
    label.includes("buy") ||
    label.includes("visit")
  ) {
    return "trial";
  }

  if (
    label.includes("contact") ||
    label.includes("talk to sales") ||
    label.includes("sales") ||
    label.includes("support")
  ) {
    return "contact";
  }

  return null;
}

export default function GeneratedWebsiteInteractivity({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<ActionKind>("demo");
  const [sourceLabel, setSourceLabel] = useState("Website CTA");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const title = useMemo(() => {
    if (kind === "demo") return "Book A Demo";
    if (kind === "trial") return "Start Free Trial";
    return "Contact Sales";
  }, [kind]);

  const defaultMessage = useMemo(() => {
    if (kind === "demo") return "I would like a product demo for my team.";
    if (kind === "trial") return "I would like to start a trial and learn onboarding steps.";
    return "I would like to discuss pricing and implementation.";
  }, [kind]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
    setStatus(null);
  };

  const openActionModal = (nextKind: ActionKind, label: string) => {
    setKind(nextKind);
    setSourceLabel(label || "Website CTA");
    setStatus(null);
    setMessage(defaultMessage);
    setOpen(true);
  };

  const onCaptureClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    const interactive = target?.closest("button,a") as HTMLButtonElement | HTMLAnchorElement | null;

    if (!interactive) return;
    if (interactive.getAttribute("data-generated-action-skip") === "true") return;

    const label = (interactive.textContent || "").trim();
    const href =
      interactive instanceof HTMLAnchorElement
        ? interactive.getAttribute("href") || ""
        : "";

    const action = inferAction(label, href);
    if (!action) return;

    event.preventDefault();
    event.stopPropagation();

    openActionModal(action, label || "Website CTA");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const payload: LeadPayload = {
      action: kind,
      sourceLabel,
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      message: (message.trim() || defaultMessage).trim(),
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to submit form.");
      }

      setStatus("Thanks, your request was captured successfully.");
      resetForm();
      setOpen(false);
    } catch {
      setStatus("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div onClickCapture={onCaptureClick}>{children}</div>

      {open && (
        <div className="fixed inset-0 z-300 flex items-center justify-center px-4">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
            data-generated-action-skip="true"
          />

          <div className="relative z-310 w-full max-w-md rounded-2xl border border-white/15 bg-[#0f1118] p-5 shadow-2xl" data-generated-action-skip="true">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="mt-1 text-sm text-gray-300">Triggered from: {sourceLabel}</p>

            <form className="mt-4 space-y-3" onSubmit={onSubmit}>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company (optional)"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={defaultMessage}
                rows={4}
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white"
                >
                  Cancel
                </button>
              </div>
            </form>

            {status && <p className="mt-3 text-sm text-gray-300">{status}</p>}
          </div>
        </div>
      )}
    </>
  );
}
