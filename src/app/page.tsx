"use client";

import { FormEvent, useMemo, useState } from "react";
import dynamic from "next/dynamic";

const InlineWidget = dynamic(
  () => import("react-calendly").then((mod) => mod.InlineWidget),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-slate-400">
        Loading calendar...
      </div>
    ),
  }
);
// **************************************
const CALENDLY_EVENT_URL =
  "https://calendly.com/mahsamoradi611-mm/30min";
// **************************************
type Step = "form" | "calendly";

export default function Home() {
  const [step, setStep] = useState<Step>("form");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fullName = useMemo(
    () => [firstName.trim(), lastName.trim()].filter(Boolean).join(" "),
    [firstName, lastName]
  );

  const calendlyPrefill = useMemo(() => {
    const prefill: Record<string, string> = {};
    if (fullName) prefill.name = fullName;
    if (email) prefill.email = email;
    if (phone) prefill.a1 = phone;
    return prefill;
  }, [fullName, email, phone]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in all fields before continuing.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("calendly");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-24 px-6 pb-20 pt-10 lg:px-10">
        {/* Top navigation */}
        <header className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-linear-to-tr from-sky-400 via-cyan-300 to-emerald-300" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide text-sky-200">
              AdvanCPS
              </span>
              <span className="text-xs text-slate-400">
                Digital Transformation Consulting
              </span>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#services" className="hover:text-white">
              Services
            </a>
            <a href="#process" className="hover:text-white">
              How we work
            </a>
            <a href="#cases" className="hover:text-white">
              Cases
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-sky-400 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 shadow-lg shadow-sky-500/40 hover:bg-sky-300"
          >
            Book a call
          </a>
        </header>

        {/* Hero section */}
        <section className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
          <div className="space-y-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
              Digital manufacturing excellence
            </p>
            <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
              Together we make your engineering process
              <span className="block text-sky-300">
                more efficient, sustainable and future‑proof.
              </span>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              We help industrial companies design, validate and optimize complex
              systems using model‑based systems engineering, digital twins and
              advanced simulation.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="rounded-full bg-sky-400 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 hover:bg-sky-300"
              >
                Request an introduction call
              </a>
              <span className="text-xs text-slate-400">
                No obligation · 30 minutes · Online or on‑site
              </span>
            </div>
            <div className="grid gap-4 text-xs text-slate-300 sm:grid-cols-3">
              <div>
                <p className="font-semibold text-slate-50">High expertise</p>
                <p>20+ years in systems engineering and simulation.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-50">Faster delivery</p>
                <p>Reduce development time and risks early in the process.</p>
              </div>
              <div>
                <p className="font-semibold text-slate-50">Cost savings</p>
                <p>Identify issues before they hit your production line.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="h-64 rounded-3xl bg-linear-to-br from-sky-500 via-cyan-400 to-emerald-400 p-px shadow-2xl shadow-sky-900/50 sm:h-72 lg:h-80">
              <div className="flex h-full flex-col justify-between rounded-3xl bg-slate-950/90 p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
                    Quick introduction
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-50">
                    Explore how DT Valley can support your engineering teams.
                  </p>
                  <p className="mt-2 text-xs text-slate-300">
                    Share a few details and directly pick a suitable slot in our
                    Calendly calendar.
                  </p>
                </div>
                <ul className="mt-4 space-y-1 text-xs text-slate-300">
                  <li>• 30‑minute online call</li>
                  <li>• Focused on your current challenges</li>
                  <li>• No sales pressure, just clarity</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Simple sections for structure */}
        <section
          id="services"
          className="grid gap-8 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 md:grid-cols-3"
        >
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-slate-50">
              Services
            </h2>
            <p className="mt-2 text-xs text-slate-300">
              From early‑stage exploration to full deployment of digital twins
              and system models.
            </p>
          </div>
          <div className="space-y-2 text-xs text-slate-300">
            <p className="font-semibold text-slate-50">
              Model‑based systems engineering
            </p>
            <p>
              Structure complex systems, define clear interfaces and guarantee
              traceability of requirements.
            </p>
          </div>
          <div className="space-y-2 text-xs text-slate-300">
            <p className="font-semibold text-slate-50">
              Simulation & digital twins
            </p>
            <p>
              Validate design decisions and explore what‑if scenarios before you
              invest in hardware.
            </p>
          </div>
        </section>

        {/* Process overview */}
        <section
          id="process"
          className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8"
        >
          <h2 className="text-sm font-semibold tracking-wide text-slate-50">
            How we operate
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="space-y-1 text-xs text-slate-300">
              <p className="text-sky-300">01 · Exploration</p>
              <p className="font-semibold text-slate-50">
                Understand your challenges
              </p>
              <p>
                We start with a short call to understand your situation,
                stakeholders and time‑line.
              </p>
            </div>
            <div className="space-y-1 text-xs text-slate-300">
              <p className="text-sky-300">02 · Proposal</p>
              <p className="font-semibold text-slate-50">
                Concrete, transparent plan
              </p>
              <p>
                You receive a clear scope, deliverables and planning tailored to
                your organisation.
              </p>
            </div>
            <div className="space-y-1 text-xs text-slate-300">
              <p className="text-sky-300">03 · Execution</p>
              <p className="font-semibold text-slate-50">
                Co‑creation with your team
              </p>
              <p>
                We work closely with your engineering teams to implement and
                transfer knowledge.
              </p>
            </div>
          </div>
        </section>

        {/* Contact & booking section with Calendly embed */}
        <section
          id="contact"
          className="grid gap-10 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]"
        >
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-slate-50">
              Interested in a first conversation?
            </h2>
            <p className="text-sm text-slate-300">
              Share a few details about yourself and your organisation. After
              submitting the form, you can immediately select a time slot via
              Calendly. Your name and email will be pre‑filled for a smooth
              experience.
            </p>
            <div className="space-y-1 text-xs text-slate-400">
              <p>• Typical response within 1 business day</p>
              <p>• Online video call via Microsoft Teams or Zoom</p>
            </div>
          </div>

          <div className="space-y-8">
            {step === "form" && (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-2xl bg-slate-950/60 p-6 shadow-lg shadow-black/40"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label
                      htmlFor="firstName"
                      className="text-xs font-medium text-slate-200"
                    >
                      First name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      autoComplete="given-name"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-sky-400/60 placeholder:text-slate-500 focus:border-sky-400 focus:ring-2"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="lastName"
                      className="text-xs font-medium text-slate-200"
                    >
                      Last name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      autoComplete="family-name"
                      className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-sky-400/60 placeholder:text-slate-500 focus:border-sky-400 focus:ring-2"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium text-slate-200"
                  >
                    Work email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-sky-400/60 placeholder:text-slate-500 focus:border-sky-400 focus:ring-2"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="phone"
                    className="text-xs font-medium text-slate-200"
                  >
                    Phone number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-sky-400/60 placeholder:text-slate-500 focus:border-sky-400 focus:ring-2"
                    placeholder="+1 555 000 1234"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {error && (
                  <p className="text-xs text-rose-300" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-full bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Preparing Calendly..." : "Continue to calendar"}
                </button>

                <p className="text-[11px] text-slate-500">
                  By continuing you will be redirected to our Calendly widget to
                  select a suitable date and time. Calendly will send all email
                  confirmations and reminders.
                </p>
              </form>
            )}

            {step === "calendly" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-50">
                    Pick a date & time
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="text-xs text-sky-300 hover:text-sky-200"
                  >
                    Edit contact details
                  </button>
                </div>
                <p className="text-xs text-slate-300">
                  The Calendly widget below is pre‑filled with your name and
                  email. Select the slot that works best for you.
                </p>
                <div className="h-[640px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                  <InlineWidget
                    url={CALENDLY_EVENT_URL}
                    prefill={calendlyPrefill}
                    styles={{
                      height: "100%",
                      width: "100%",
                    }}
                    pageSettings={{
                      backgroundColor: "0f172a",
                      hideEventTypeDetails: false,
                      hideLandingPageDetails: false,
                      primaryColor: "0ea5e9",
                      textColor: "f1f5f9",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
