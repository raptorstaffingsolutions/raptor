"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

/* ──────────────── ANIMATED COUNTER ──────────────── */
function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const dur = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent =
              prefix + Math.round(end * eased).toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, suffix, prefix]);

  return <span className="counter-val" ref={ref}>{prefix}0{suffix}</span>;
}

/* ──────────────── SERVICES CAROUSEL SLIDES ──────────────── */
const servicesSlides = [
  {
    id: "industrial",
    label: "ASSEMBLY & PRODUCTION STAFFING",
    title: "Skilled & Semi-Skilled Plant Operators",
    desc: "Line feeders, precision assembly technicians, and quality inspectors pre-screened for automotive and electronics manufacturing plants.",
    image: "/images/factory_assembly.jpg",
    stat: "3,064+ Active Workers • 24–72h Mobilisation",
  },
  {
    id: "recruitment",
    label: "CAMPUS & VOLUME RECRUITMENT",
    title: "Structured Talent Drives Across Tamil Nadu",
    desc: "Direct college partnerships and mega hiring drives across 81+ ITI and diploma institutions in 10 industrial districts.",
    image: "/images/campus_recruitment.jpg",
    stat: "81+ College Alliances • 19 Sourcing Districts",
  },
  {
    id: "payroll",
    label: "HR & ON-SITE WORKFORCE LIFECYCLE",
    title: "Turnkey Workforce Induction & Payroll",
    desc: "From candidate screening and safety induction to biometric muster tracking, monthly payroll processing, and on-site supervision.",
    image: "/images/training_safety.jpg",
    stat: "100% On-Time Payroll • Dedicated Floor Leads",
  },
  {
    id: "compliance",
    label: "STATUTORY COMPLIANCE & AUDIT",
    title: "100% PF, ESI & Labour Law Adherence",
    desc: "Complete statutory governance under EPF, ESIC, CLRA, Bonus Act, and 240-day muster tracking with zero legal exposure for employers.",
    image: "/images/industrial_plant.jpg",
    stat: "Zero Violations • 100% Audit-Ready",
  },
];

const partners = [
  "Bharat FIH (Foxconn Group)",
  "KYOWA Aluminium Metal",
  "KIML (Kyungshin Industrial Motherson)",
  "Motherson Polymer Solutions",
  "Rising Stars Hi-Tech",
  "WOWTEK Mobile Hardware",
  "SIPCOT Phase-II Sunguvarchatram",
  "Oragadam Industrial Growth Center",
  "Sriperumbudur Vallam Vadagal",
  "100% PF & ESI Statutory Compliance",
  "Bharat FIH (Foxconn Group)",
  "KYOWA Aluminium Metal",
  "KIML (Kyungshin Industrial Motherson)",
  "Motherson Polymer Solutions",
  "Rising Stars Hi-Tech",
  "WOWTEK Mobile Hardware",
];

export default function ServicesHeroSection() {
  const root = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl
        .fromTo(
          ".services-light-breadcrumb",
          { y: -15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.1 }
        )
        .fromTo(
          ".hero-light-badge",
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          ".hero-light-h1",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.5"
        )
        .fromTo(
          ".hero-light-sub",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".hero-light-stats",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.55"
        )
        .fromTo(
          ".hero-light-actions",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".hero-light-trust",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.45"
        )
        .fromTo(
          ".hero-light-carousel",
          { x: 60, opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power4.out" },
          0.2
        )
        .fromTo(
          ".hero-light-cred-card",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" },
          "-=0.4"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  /* Auto-cycle slides */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % servicesSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="services-hero-wrapper" ref={root}>
      <section className="hero-light services-hero-light" id="services-hero">
        <div className="hero-light-container">
          {/* LEFT COPY */}
          <div className="hero-light-copy">
            {/* Breadcrumb */}
            <div className="services-light-breadcrumb">
              <Link href="/" className="services-light-crumb-link">
                Home
              </Link>
              <ChevronRight size={13} className="services-light-crumb-sep" />
              <span className="services-light-crumb-active">Services</span>
            </div>

            {/* Badge */}
            <div className="hero-light-badge">
              <span className="hero-light-dot" />
              Turnkey Industrial Manpower &amp; Plant Operations
            </div>

            {/* Heading */}
            <h1 className="hero-light-h1">
              Complete Workforce Solutions for
              <span className="hero-light-accent"> Manufacturing Plants</span>
            </h1>

            {/* Lede */}
            <p className="hero-light-sub">
              From sourcing and screening to payroll and statutory compliance — Raptor Staffing Solutions manages the complete manpower lifecycle across SIPCOT, Sriperumbudur, and Oragadam so your production lines maintain peak uptime.
            </p>

            {/* Stats row */}
            <div className="hero-light-stats">
              <div className="hero-light-stat">
                <strong><AnimatedCounter end={3064} suffix="+" /></strong>
                <span className="hero-light-stat-label">Active Workers</span>
              </div>
              <div className="hero-light-stat-divider" />
              <div className="hero-light-stat">
                <strong>100%</strong>
                <span className="hero-light-stat-label">Statutory Cover</span>
              </div>
              <div className="hero-light-stat-divider" />
              <div className="hero-light-stat">
                <strong>24–72h</strong>
                <span className="hero-light-stat-label">Deployment SLA</span>
              </div>
              <div className="hero-light-stat-divider" />
              <div className="hero-light-stat">
                <strong>₹0</strong>
                <span className="hero-light-stat-label">Employer Fee</span>
              </div>
            </div>

            {/* Actions */}
            <div className="hero-light-actions">
              <Link href="/contact" className="hero-light-cta-primary">
                Request a Workforce Quote
                <ArrowRight size={17} />
              </Link>
              <Link href="/process" className="hero-light-cta-secondary">
                Our 6-Step Process
              </Link>
            </div>

            {/* Trust strip */}
            <div className="hero-light-trust">
              <span className="hero-light-trust-label">Trusted by</span>
              {["Bharat FIH", "KYOWA Aluminium", "KIML Motherson", "Rising Stars"].map((name) => (
                <span key={name} className="hero-light-trust-pill">{name}</span>
              ))}
            </div>
          </div>

          {/* RIGHT CAROUSEL */}
          <div className="hero-light-carousel">
            {/* Image slides */}
            <div className="hero-light-img-wrap">
              {servicesSlides.map((slide, idx) => (
                <Image
                  key={slide.id}
                  src={slide.image}
                  alt={slide.title}
                  width={900}
                  height={600}
                  priority={idx === 0}
                  className={`hero-light-img ${activeSlide === idx ? "active" : ""}`}
                />
              ))}

              {/* Caption overlay */}
              <div className="hero-light-caption">
                <span className="hero-light-caption-label">{servicesSlides[activeSlide].label}</span>
                <strong className="hero-light-caption-title">{servicesSlides[activeSlide].title}</strong>
                <p className="hero-light-caption-desc">{servicesSlides[activeSlide].desc}</p>
                <span className="hero-light-caption-stat">
                  <ShieldCheck size={14} />{servicesSlides[activeSlide].stat}
                </span>
              </div>
            </div>

            {/* Slide dots */}
            <div className="hero-light-dots">
              {servicesSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  id={`services-hero-dot-${idx}`}
                  className={`hero-light-dot-btn ${activeSlide === idx ? "active" : ""}`}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`View slide: ${slide.title}`}
                />
              ))}
            </div>

            {/* Floating credential card */}
            <div className="hero-light-cred-card">
              <BadgeCheck size={18} color="#1d4ed8" />
              <div>
                <strong>24–72h Mobilisation SLA</strong>
                <span>Zero Employer Fee • 100% Statutory Immunity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Light OEM Partner Ticker */}
      <div className="about-light-ticker">
        <div className="about-light-ticker-inner">
          <div className="about-light-ticker-label">
            <Building2 size={14} />
            <span>Trusted Industry Partners</span>
          </div>
          <div className="about-light-ticker-mask">
            <div className="about-light-ticker-strip">
              {partners.map((partner, index) => (
                <div key={index} className="about-light-ticker-item">
                  <span className="about-light-ticker-dot" />
                  <span>{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
