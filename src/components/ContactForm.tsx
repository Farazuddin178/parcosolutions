"use client";

import { useState, type FormEvent } from "react";
import { Check, CircleNotch, WarningCircle } from "@phosphor-icons/react";
import { site } from "@/content/site";

// Submits straight to Contact Form 7 on WordPress (REST API, CORS-enabled),
// so the static site needs no server of its own.
const WP_URL = (process.env.NEXT_PUBLIC_WP_URL ?? "https://parcosolutions.in").replace(/\/$/, "");
const FORM_ID = process.env.NEXT_PUBLIC_CF7_FORM_ID ?? "1253";
const ENDPOINT = `${WP_URL}/wp-json/contact-form-7/v1/contact-forms/${FORM_ID}/feedback`;

const TOPICS = [
  "Custom software",
  "Management system",
  "Website",
  "Mobile app",
  "Cloud, AI or data",
  "ERP or Ocean ERP",
  "Something else",
];

type Status = "idle" | "sending" | "sent" | "error";
type CF7Response = {
  status: "mail_sent" | "validation_failed" | "mail_failed" | "spam" | "aborted";
  message: string;
  invalid_fields?: { field: string; message: string }[];
};

const inputCls =
  "w-full border border-ash bg-ink px-4 py-3 text-[15px] text-bone placeholder:text-dim transition-colors focus:border-signal focus:outline-none aria-[invalid=true]:border-[#e0805a]";
const labelCls = "font-pixel text-[10px] uppercase tracking-[0.16em] text-fog";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-[#f0a080]">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("_wpcf7_unit_tag", `wpcf7-f${FORM_ID}-o1`);

    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch(ENDPOINT, { method: "POST", body: data });
      const json = (await res.json()) as CF7Response;
      if (json.status === "mail_sent") {
        setStatus("sent");
        setMessage("Thanks. Your message is with our team and we will get back to you shortly.");
        form.reset();
        return;
      }
      if (json.status === "validation_failed" && json.invalid_fields) {
        setErrors(Object.fromEntries(json.invalid_fields.map((f) => [f.field, f.message])));
      }
      setStatus("error");
      setMessage(json.message || "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setMessage(`We could not reach the server. Please email ${site.email} or call ${site.phone}.`);
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="frame grid min-h-[420px] place-items-center p-10 text-center">
        <div>
          <span className="notch mx-auto grid size-14 place-items-center bg-signal text-ink">
            <Check size={26} weight="bold" aria-hidden />
          </span>
          <p className="mt-6 font-display text-3xl text-bone">Message received</p>
          <p className="mx-auto mt-3 max-w-sm text-fog">{message}</p>
          <button
            type="button"
            className="btn-pixel notch btn-ghost mt-8"
            onClick={() => {
              setStatus("idle");
              setMessage("");
            }}
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  const err = (name: string) => errors[name];
  const aria = (name: string) => ({
    "aria-invalid": err(name) ? true : undefined,
    "aria-describedby": err(name) ? `${name}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} className="frame grid gap-5 p-6 sm:p-8" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fname" label="Your name" error={err("fname")}>
          <input id="fname" name="fname" required autoComplete="name" className={inputCls} {...aria("fname")} />
        </Field>
        <Field id="email" label="Email" error={err("email")}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputCls}
            {...aria("email")}
          />
        </Field>
        <Field id="phone" label="Phone" error={err("phone")}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputCls} {...aria("phone")} />
        </Field>
        <Field id="subject" label="What do you need?" error={err("subject")}>
          <select id="subject" name="subject" className={inputCls} defaultValue={TOPICS[0]} {...aria("subject")}>
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field id="message" label="Project details" error={err("message")}>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="A few lines about the system, timeline and team."
          className={`${inputCls} resize-y`}
          {...aria("message")}
        />
      </Field>

      {status === "error" && (
        <p role="alert" className="flex items-start gap-2 text-sm text-[#f0a080]">
          <WarningCircle size={18} className="mt-0.5 flex-none" aria-hidden />
          {message}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-dim">
          Prefer email?{" "}
          <a href={`mailto:${site.email}`} className="text-fog underline underline-offset-4 hover:text-signal">
            {site.email}
          </a>
        </p>
        <button type="submit" disabled={status === "sending"} className="btn-pixel notch btn-primary disabled:opacity-70">
          {status === "sending" ? (
            <>
              <CircleNotch size={14} className="animate-spin" aria-hidden /> Sending
            </>
          ) : (
            "Send message"
          )}
        </button>
      </div>
    </form>
  );
}
