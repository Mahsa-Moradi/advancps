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
    <div className="min-h-screen bg-yellow-400 text-slate-950">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 lg:px-10">
        {/* Top navigation */}
        <header className="flex items-center justify-between gap-6 border-b border-slate-950/10 py-6">
          <div className="flex items-center gap-3">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xl font-bold tracking-tight text-slate-950">
              AdvanCPS
            </span>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-950 md:flex">
            <a href="#home" className="transition hover:opacity-70">
              Home
            </a>
            <a href="#services" className="transition hover:opacity-70">
              Our Expertise
            </a>
            <a href="#process" className="transition hover:opacity-70">
              About Us
            </a>
            <a href="#cases" className="transition hover:opacity-70">
              Careers
            </a>
            <a href="#contact" className="transition hover:opacity-70">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 text-slate-950 transition hover:opacity-70"
              aria-label="Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <button
              type="button"
              className="p-2 text-slate-950 transition hover:opacity-70"
              aria-label="Toggle theme"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Hero section */}
        <section
          id="home"
          className="relative flex min-h-[calc(100vh-120px)] flex-col items-center justify-center network-pattern py-20"
        >
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Cutting-Edge to Real-World Impact
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-800 sm:text-xl">
              Realizing the potential of AI and novel technologies with expertise,
              innovation, and integrity.
            </p>
            <div className="mt-10">
              <a
                href="#contact"
                className="inline-block rounded-full bg-slate-950 px-8 py-4 text-base font-semibold text-yellow-400 transition hover:bg-slate-900 sm:text-lg"
              >
                Request an introduction call
              </a>
            </div>
          </div>
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <a
              href="#services"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-yellow-400 transition hover:bg-slate-900"
              aria-label="Scroll down"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Intro / About Section */}
        <section
          id="about"
          className="bg-slate-100 py-20"
        >
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            {/* Main Heading */}
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-5xl font-bold leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                <span className="text-3xl font-normal sm:text-4xl lg:text-5xl">
                  We are{" "}
                </span>
                <span className="font-bold">AdvanCPS</span>
              </h2>
              <p className="text-xl font-medium text-slate-800 sm:text-2xl">
                AI-Minded. Expert Led. Innovation Driven.
              </p>
            </div>

            {/* Descriptive Text */}
            <div className="mb-12 space-y-6 text-left text-slate-700">
              <p className="text-base leading-relaxed sm:text-lg">
                At AdvanCPS, we turn complexity into clarity through state-of-the-art solutions. Rooted in deep expertise and driven by curiosity, we help future-focused companies unlock their full potential with tailored solutions and strategies for cutting-edge automation.
              </p>
              <p className="text-base leading-relaxed sm:text-lg">
                We're not just consultants, we're partners in your digital evolution. From concept to deployment, our team blends academic rigor with real-world impact to ensure an intelligent, ethical and efficient solution.
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#process"
                className="flex items-center gap-2 rounded-lg border-2 border-yellow-400 bg-transparent px-6 py-3 text-base font-medium text-slate-950 transition hover:bg-yellow-400/10"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>Explore Our Approach</span>
              </a>
              <a
                href="#about"
                className="flex items-center gap-2 rounded-lg border-2 border-yellow-400 bg-transparent px-6 py-3 text-base font-medium text-slate-950 transition hover:bg-yellow-400/10"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>About us</span>
              </a>
            </div>
          </div>
        </section>

        {/* Simple sections for structure */}
        <section
          id="services"
          className="grid gap-8 bg-white p-12 py-20 md:grid-cols-3"
        >
          <div>
            <h2 className="text-lg font-semibold tracking-wide text-slate-950">
              Services
            </h2>
            <p className="mt-2 text-sm text-slate-700">
              From early‑stage exploration to full deployment of digital twins
              and system models.
            </p>
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <p className="font-semibold text-slate-950">
              Model‑based systems engineering
            </p>
            <p>
              Structure complex systems, define clear interfaces and guarantee
              traceability of requirements.
            </p>
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <p className="font-semibold text-slate-950">
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
          className="bg-slate-50 p-12 py-20"
        >
          <h2 className="text-lg font-semibold tracking-wide text-slate-950">
            How we operate
          </h2>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <div className="space-y-2 text-sm text-slate-700">
              <p className="text-yellow-500 font-semibold">01 · Exploration</p>
              <p className="font-semibold text-slate-950">
                Understand your challenges
              </p>
              <p>
                We start with a short call to understand your situation,
                stakeholders and time‑line.
              </p>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              <p className="text-yellow-500 font-semibold">02 · Proposal</p>
              <p className="font-semibold text-slate-950">
                Concrete, transparent plan
              </p>
              <p>
                You receive a clear scope, deliverables and planning tailored to
                your organisation.
              </p>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              <p className="text-yellow-500 font-semibold">03 · Execution</p>
              <p className="font-semibold text-slate-950">
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
          className="grid gap-10 bg-white p-12 py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]"
        >
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-slate-950">
              Interested in a first conversation?
            </h2>
            <p className="text-sm text-slate-700">
              Share a few details about yourself and your organisation. After
              submitting the form, you can immediately select a time slot via
              Calendly. Your name and email will be pre‑filled for a smooth
              experience.
            </p>
            <div className="space-y-1 text-xs text-slate-600">
              <p>• Typical response within 1 business day</p>
              <p>• Online video call via Microsoft Teams or Zoom</p>
            </div>
          </div>

          <div className="space-y-8">
            {step === "form" && (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-2xl bg-slate-50 border border-slate-200 p-6 shadow-lg"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <label
                      htmlFor="firstName"
                      className="text-xs font-medium text-slate-700"
                    >
                      First name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      autoComplete="given-name"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none ring-yellow-400/60 placeholder:text-slate-400 focus:border-yellow-400 focus:ring-2"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="lastName"
                      className="text-xs font-medium text-slate-700"
                    >
                      Last name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      autoComplete="family-name"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none ring-yellow-400/60 placeholder:text-slate-400 focus:border-yellow-400 focus:ring-2"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium text-slate-700"
                  >
                    Work email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none ring-yellow-400/60 placeholder:text-slate-400 focus:border-yellow-400 focus:ring-2"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="phone"
                    className="text-xs font-medium text-slate-700"
                  >
                    Phone number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none ring-yellow-400/60 placeholder:text-slate-400 focus:border-yellow-400 focus:ring-2"
                    placeholder="+1 555 000 1234"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {error && (
                  <p className="text-xs text-rose-600" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-yellow-400 transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
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
                  <p className="text-sm font-semibold text-slate-950">
                    Pick a date & time
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="text-xs text-yellow-600 hover:text-yellow-700"
                  >
                    Edit contact details
                  </button>
                </div>
                <p className="text-xs text-slate-700">
                  The Calendly widget below is pre‑filled with your name and
                  email. Select the slot that works best for you.
                </p>
                <div className="h-[640px] overflow-hidden rounded-2xl border border-slate-200 bg-white">
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
