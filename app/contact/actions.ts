"use server";

import { redirect } from "next/navigation";
import { Resend } from "resend";
import { site } from "@/lib/site";

/**
 * Contact form handler.
 *
 * Uses a plain <form action={...}> from a server component, so no client
 * hook is needed. Validation failures redirect back with ?error=<code>, which
 * the page renders — progressive enhancement with zero JavaScript.
 *
 * If RESEND_API_KEY is absent the form reports that delivery is not yet
 * configured, and the page also offers a mailto: fallback so the site is
 * never a dead end.
 */

export type FieldError = "name" | "email" | "subject" | "message" | "config";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_LEN = { name: 120, subject: 160, message: 4000 };

/**
 * Stateless spam check: a hidden field that people never see and bots fill
 * in. No session state, so it works on serverless hosting.
 *
 * There is deliberately no render-time timestamp check here — reading the
 * clock during render breaks React's purity rules, and adding a timestamp
 * token would require server-side state we do not otherwise need. If the form
 * is ever abused in volume, add a real rate limit (e.g. Upstash) rather than
 * another stateless trick.
 */
function looksAutomated(formData: FormData): boolean {
  const company = formData.get("company");
  return typeof company === "string" && company !== "";
}

export async function submitContact(formData: FormData) {
  const fail = (error: FieldError) => redirect(`/contact?error=${error}`);

  if (looksAutomated(formData)) {
    // Pretend it worked; do not tell a bot which check caught it.
    redirect("/contact?sent=1");
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const affiliation = String(formData.get("affiliation") ?? "").trim();

  if (!name) return fail("name");
  if (name.length > MAX_LEN.name) return fail("name");
  if (!email || !EMAIL_RE.test(email)) return fail("email");
  if (!subject) return fail("subject");
  if (subject.length > MAX_LEN.subject) return fail("subject");
  if (message.length < 10) return fail("message");
  if (message.length > MAX_LEN.message) return fail("message");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return fail("config");

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM ?? "LRJC Website <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO ?? site.contact.email;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `[${site.mark}] ${subject}`,
    text: [
      `From: ${name} <${email}>`,
      affiliation ? `Affiliation: ${affiliation}` : null,
      "",
      message,
      "",
      "---",
      `Sent from ${site.url}/contact`,
    ]
      .filter((l): l is string => l !== null)
      .join("\n"),
  });

  if (error) {
    console.error("[contact] resend error", error);
    return fail("message");
  }

  redirect("/contact?sent=1");
}
