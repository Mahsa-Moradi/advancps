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

        {/* Our Approach Section */}
        <section
          id="process"
          className="bg-white py-20"
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            {/* Main Heading */}
            <h2 className="mb-8 text-4xl font-bold text-slate-950 sm:text-5xl lg:text-6xl">
              Our Approach
            </h2>

            {/* Introductory Text */}
            <div className="mb-12 space-y-6 text-left text-slate-700">
              <p className="text-base leading-relaxed sm:text-lg">
                At AdvanCPS, impactful solutions start with feasibility and context — your business, your data, and your constraints.
              </p>
              <p className="text-base leading-relaxed sm:text-lg">
                We don't offer one-size-fits-all solutions. We lead with feasibility — aligning your goals, data, and constraints to the right technology and a clear path forward.
              </p>
            </div>

            {/* Process Flow Diagram */}
            <div className="mb-12 flex flex-wrap items-center justify-center gap-4 lg:gap-6">
              {/* Step 1: Discover */}
              <div className="relative flex flex-col items-center">
                <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-teal-700 sm:h-40 sm:w-40">
                  <span className="absolute right-2 top-2 text-2xl font-bold text-white/20 sm:text-3xl">
                    01
                  </span>
                  <svg
                    className="mb-2 h-8 w-8 text-yellow-400 sm:h-10 sm:w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-white sm:text-base">
                    Discover
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden text-slate-400 sm:block">
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              {/* Step 2: Design */}
              <div className="relative flex flex-col items-center">
                <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-teal-700 sm:h-40 sm:w-40">
                  <span className="absolute right-2 top-2 text-2xl font-bold text-white/20 sm:text-3xl">
                    02
                  </span>
                  <svg
                    className="mb-2 h-8 w-8 text-yellow-400 sm:h-10 sm:w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span className="text-sm font-medium text-white sm:text-base">
                    Design
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden text-slate-400 sm:block">
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              {/* Step 3: Build */}
              <div className="relative flex flex-col items-center">
                <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-teal-700 sm:h-40 sm:w-40">
                  <span className="absolute right-2 top-2 text-2xl font-bold text-white/20 sm:text-3xl">
                    03
                  </span>
                  <svg
                    className="mb-2 h-8 w-8 text-yellow-400 sm:h-10 sm:w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-white sm:text-base">
                    Build
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden text-slate-400 sm:block">
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              {/* Step 4: Deploy */}
              <div className="relative flex flex-col items-center">
                <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-teal-700 sm:h-40 sm:w-40">
                  <span className="absolute right-2 top-2 text-2xl font-bold text-white/20 sm:text-3xl">
                    04
                  </span>
                  <svg
                    className="mb-2 h-8 w-8 text-yellow-400 sm:h-10 sm:w-10"
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
                  <span className="text-sm font-medium text-white sm:text-base">
                    Deploy
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden text-slate-400 sm:block">
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              {/* Step 5: Evolve */}
              <div className="relative flex flex-col items-center">
                <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-teal-700 sm:h-40 sm:w-40">
                  <span className="absolute right-2 top-2 text-2xl font-bold text-white/20 sm:text-3xl">
                    05
                  </span>
                  <svg
                    className="mb-2 h-8 w-8 text-yellow-400 sm:h-10 sm:w-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span className="text-sm font-medium text-white sm:text-base">
                    Evolve
                  </span>
                </div>
              </div>
            </div>

            {/* Concluding Text */}
            <div className="text-left text-slate-700">
              <p className="text-base leading-relaxed sm:text-lg">
                From your first steps in AI and emerging technologies to scaling transformative projects, we ensure that innovation is built on clarity, trust, and measurable value.
              </p>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section
          id="services"
          className="bg-slate-50 py-20"
        >
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            {/* Main Heading */}
            <h2 className="mb-6 text-4xl font-bold text-slate-950 sm:text-5xl lg:text-6xl">
              Our Services
            </h2>

            {/* Introductory Text */}
            <p className="mb-12 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">
              We help companies move from idea to implementation, providing expertise that unlocks real business value. Our services are designed to be flexible, transparent, and always tailored to your unique context.
            </p>

            {/* Service Cards Grid */}
            <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1: Strategy & Roadmapping */}
              <div className="relative rounded-2xl bg-teal-700 p-6">
                <div className="mb-4">
                  <svg
                    className="mb-4 h-10 w-10 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-lg font-bold text-white">
                  Strategy & Roadmapping
                </h3>
                <p className="text-sm leading-relaxed text-white/90">
                  We evaluate your current capabilities and define a clear, actionable roadmap aligned with your business goals.
                </p>
              </div>

              {/* Card 2: Model Design & Development */}
              <div className="relative rounded-2xl bg-teal-700 p-6">
                <div className="mb-4">
                  <svg
                    className="mb-4 h-10 w-10 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-lg font-bold text-white">
                  Model Design & Development
                </h3>
                <p className="text-sm leading-relaxed text-white/90">
                  We design, prototype, and train AI models—tailored to your data and constraints—ensuring accuracy, efficiency, and fairness.
                </p>
              </div>

              {/* Card 3: Deployment & MLOps */}
              <div className="relative rounded-2xl bg-teal-700 p-6">
                <div className="mb-4">
                  <svg
                    className="mb-4 h-10 w-10 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m-3-3v12"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-lg font-bold text-white">
                  Deployment & MLOps
                </h3>
                <p className="text-sm leading-relaxed text-white/90">
                  From testing to production, we build reliable, maintainable systems that integrate seamlessly into your existing infrastructure.
                </p>
              </div>

              {/* Card 4: Feasibility Audits & Advisory */}
              <div className="relative rounded-2xl bg-teal-700 p-6">
                <div className="mb-4">
                  <svg
                    className="mb-4 h-10 w-10 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-lg font-bold text-white">
                  Feasibility Audits & Advisory
                </h3>
                <p className="text-sm leading-relaxed text-white/90">
                  We offer independent reviews of your solutions—assessing technical soundness, ethical concerns, and regulatory alignment.
                </p>
              </div>

              {/* Card 5: Workshops & Training */}
              <div className="relative rounded-2xl bg-teal-700 p-6">
                <div className="mb-4">
                  <svg
                    className="mb-4 h-10 w-10 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-lg font-bold text-white">
                  Workshops & Training
                </h3>
                <p className="text-sm leading-relaxed text-white/90">
                  We enable your teams through workshops, hands-on sessions, and training programs customized to your data maturity level.
                </p>
              </div>

              {/* Card 6: Responsible AI & Governance */}
              <div className="relative rounded-2xl bg-teal-700 p-6">
                <div className="mb-4">
                  <svg
                    className="mb-4 h-10 w-10 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-lg font-bold text-white">
                  Responsible AI & Governance
                </h3>
                <p className="text-sm leading-relaxed text-white/90">
                  We help you design and implement responsible AI practices—building trust, transparency, and accountability into your solutions.
                </p>
              </div>
            </div>

            {/* Call to Action Button */}
            <div className="flex justify-center">
              <a
                href="#contact"
                className="flex items-center gap-2 rounded-lg border-2 border-yellow-400 bg-white px-6 py-3 text-base font-medium text-slate-950 transition hover:bg-yellow-400/10"
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <span>Discover Our Expertise</span>
          </a>
        </div>
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
