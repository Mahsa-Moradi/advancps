"use client";

import { FormEvent, useMemo, useState, useEffect } from "react";
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
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/rejected cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => {
        setShowCookieBanner(true);
      }, 500);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowCookieBanner(false);
  };

  const handleRejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowCookieBanner(false);
  };

  const handleCloseBanner = () => {
    localStorage.setItem("cookieConsent", "dismissed");
    setShowCookieBanner(false);
  };

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
    <div className="min-h-screen bg-[#FFB703] text-slate-950">
      <main className="flex mx-auto min-h-screen w-full flex-col">
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
          <nav className="hidden p-5 md:px-15 items-center gap-8 text-sm font-medium text-slate-950 md:flex">
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
                className="inline-block rounded-full bg-slate-950 px-8 py-4 text-base font-semibold text-[#FFB703] transition hover:bg-slate-900 sm:text-lg"
              >
                Request an introduction call
              </a>
            </div>
          </div>
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <a
              href="#services"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-[#FFB703] transition hover:bg-slate-900"
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
                className="flex items-center gap-2 rounded-lg border-2 border-[#FB8500] bg-transparent px-6 py-3 text-base font-medium text-slate-950 transition hover:bg-[#FFB703]/10"
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
                className="flex items-center gap-2 rounded-lg border-2 border-[#FB8500] bg-transparent px-6 py-3 text-base font-medium text-slate-950 transition hover:bg-[#FFB703]/10"
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
                <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-[#023047] sm:h-40 sm:w-40">
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
                <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-[#023047] sm:h-40 sm:w-40">
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
                <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-[#023047] sm:h-40 sm:w-40">
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
                <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-[#023047] sm:h-40 sm:w-40">
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
                <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-2xl bg-[#023047] sm:h-40 sm:w-40">
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
              <div className="relative rounded-2xl bg-[#023047] p-6">
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
              <div className="relative rounded-2xl bg-[#023047] p-6">
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
              <div className="relative rounded-2xl bg-[#023047] p-6">
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
              <div className="relative rounded-2xl bg-[#023047] p-6">
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
              <div className="relative rounded-2xl bg-[#023047] p-6">
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
              <div className="relative rounded-2xl bg-[#023047] p-6">
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

        {/* CTA Banner Section */}
        <section className="bg-white py-12">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <div className="flex flex-col items-center gap-6 rounded-2xl bg-[#023047] p-8 sm:flex-row sm:gap-8">
              {/* Profile Picture */}
              <div className="shrink-0">
                <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white/20 sm:h-28 sm:w-28">
                  <img
                    src="/photo_2026-02-18_13-30-32.jpg"
                    alt="Mehrdad Moradi"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
                  Ready to move forward?
                </h3>
                <p className="mb-2 text-xl font-bold text-white sm:text-2xl">
                  Let's build the future together!
                </p>
                <p className="text-sm text-white/90 sm:text-base">
                  Get in touch for a call with our experts.
                </p>
              </div>

              {/* Contact Button */}
              <div className="shrink-0">
                <a
                  href="#contact"
                  className="flex items-center gap-2 rounded-full border-2 border-[#FB8500] bg-[#023047] px-6 py-3 text-base font-medium text-white transition hover:bg-[#219EBC]"
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Contact us</span>
                </a>
              </div>
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
              <p className="text-[#FB8500] font-semibold">01 · Exploration</p>
              <p className="font-semibold text-slate-950">
                Understand your challenges
              </p>
              <p>
                We start with a short call to understand your situation,
                stakeholders and time‑line.
              </p>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              <p className="text-[#FB8500] font-semibold">02 · Proposal</p>
              <p className="font-semibold text-slate-950">
                Concrete, transparent plan
              </p>
              <p>
                You receive a clear scope, deliverables and planning tailored to
                your organisation.
              </p>
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              <p className="text-[#FB8500] font-semibold">03 · Execution</p>
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
          <div className="space-y-8">
            {/* Heading + intro text */}
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Let&apos;s talk
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                Schedule a call with our team to discuss how AI and digital
                solutions can transform your business.
              </p>
            </div>

            {/* Avatar + short bio */}
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-full bg-slate-200 sm:h-24 sm:w-24">
                <img
                  src="/photo_2026-02-18_13-30-32.jpg"
                  alt="Mehrdad Moradi"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-950">
                  Mehrdad Moradi
                </p>
                <p className="text-xs text-slate-600">
                  Founder &amp; AI Consultant at AdvanCPS
                </p>
              </div>
            </div>

            {/* Contact options */}
            <div className="space-y-4 text-sm text-slate-700">
              {/* Email row */}
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-950">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-950">Email</p>
                  <a
                    href="mailto:M.moradi.1367@gmail.com"
                    className="text-sm text-slate-700 underline decoration-slate-400 underline-offset-2 hover:text-slate-900"
                  >
                    M.moradi.1367@gmail.com
                  </a>
                </div>
              </div>

              {/* Quick meeting row */}
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-950">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3M5 11h14M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    Quick meeting
                  </p>
                  <p className="text-xs leading-relaxed text-slate-600">
                    Fill out the form and we&apos;ll get back to you within 24
                    hours to schedule a short call that fits your agenda.
                  </p>
                </div>
              </div>
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
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none ring-[#FFB703]/60 placeholder:text-slate-400 focus:border-[#FFB703] focus:ring-2"
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
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none ring-[#FFB703]/60 placeholder:text-slate-400 focus:border-[#FFB703] focus:ring-2"
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
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none ring-[#FFB703]/60 placeholder:text-slate-400 focus:border-[#FFB703] focus:ring-2"
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
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none ring-[#FFB703]/60 placeholder:text-slate-400 focus:border-[#FFB703] focus:ring-2"
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
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-[#FFB703] transition hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-70"
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
                  className="text-xs text-[#FB8500] hover:text-[#FFB703]"
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

      {/* Footer */}
      <footer className="bg-[#FB8500] py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
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
              <span className="text-2xl font-bold tracking-tight text-slate-950">
                AdvanCPS
              </span>
            </div>
          </div>

          {/* Footer Columns */}
          <div className="mb-8 grid gap-8 md:grid-cols-3">
            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-950">
                Quick links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-sm text-slate-950 transition hover:opacity-70"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-sm text-slate-950 transition hover:opacity-70"
                  >
                    Our Expertise
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-sm text-slate-950 transition hover:opacity-70"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#cases"
                    className="text-sm text-slate-950 transition hover:opacity-70"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-sm text-slate-950 transition hover:opacity-70"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-950">
                Contact
              </h3>
              <div className="mb-6 flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-slate-950"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:M.moradi.1367@gmail.com"
                  className="text-sm text-slate-950 transition hover:opacity-70"
                >
                  M.moradi.1367@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://be.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-950 text-slate-950 transition hover:bg-slate-950 hover:text-yellow-400"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-950 text-slate-950 transition hover:bg-slate-950 hover:text-yellow-400"
                  aria-label="Instagram"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-950 text-slate-950 transition hover:bg-slate-950 hover:text-yellow-400"
                  aria-label="YouTube"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-950 text-slate-950 transition hover:bg-slate-950 hover:text-yellow-400"
                  aria-label="Contact"
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Policies */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-950">
                Policies
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/privacy"
                    className="text-sm text-slate-950 transition hover:opacity-70"
                  >
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a
                    href="/cookies"
                    className="text-sm text-slate-950 transition hover:opacity-70"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-950/20 pt-8 text-center">
            <p className="text-xs text-slate-950">
              © 2026 AdvanCPS • All rights reserved
            </p>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#8ECAE6] p-6 shadow-lg">
          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-2xl bg-white p-6 shadow-xl">
              {/* Close Button */}
              <button
                onClick={handleCloseBanner}
                className="absolute right-4 top-4 text-slate-950 transition hover:opacity-70"
                aria-label="Close"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Title */}
              <h3 className="mb-3 text-lg font-bold text-slate-950">
                We value your privacy
              </h3>

              {/* Main Text */}
              <p className="mb-6 text-sm leading-relaxed text-slate-700">
                We use essential cookies to make our site work. With your
                consent, we'll also use analytics and marketing cookies to
                improve your experience. You can change your choices at any
                time. See our{" "}
                <a
                  href="/cookies"
                  className="underline transition hover:opacity-70"
                >
                  Cookie Policy
                </a>
                .
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <a
                  href="/cookies"
                  className="text-sm font-medium text-slate-950 underline transition hover:opacity-70"
                >
                  Customize
                </a>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRejectCookies}
                    className="rounded-lg border-2 border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-slate-50"
                  >
                    Reject non-essential
                  </button>
                  <button
                    onClick={handleAcceptCookies}
                    className="rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-yellow-500"
                  >
                    Accept all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
