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

/* ──────────────── PROCESS CAROUSEL SLIDES ──────────────── */
const processSlides = [
  {
    id: "sourcing",
    label: "PROCESS GATE 01",
    title: "Requirement Briefing & Multi-Channel Sourcing",
    desc: "Within 24 hours we analyze skill specs, shift models, and SLA targets, tapping internal ATS databases and 81+ partner colleges simultaneously.",
    image: "/images/manpower_assembly_team.jpg",
    stat: "24h Intake Brief • 8 Sourcing Channels",
  },
  {
    id: "vetting",
    label: "PROCESS GATE 02",
    title: "Technical Screening, Biometrics & Medical Clearance",
    desc: "Rigorous 3-stage filtration: structured technical vetting, 100% Aadhaar authentication, and mandatory government clinic medical exams.",
    image: "/images/industrial_plant.jpg",
    stat: "100% Aadhaar Verified • Certified Fit",
  },
  {
    id: "training",
    label: "PROCESS GATE 03",
    title: "Pre-Deployment Safety & 5S Briefing",
    desc: "Before stepping onto your shop floor, every candidate completes mandatory safety induction covering 5S principles, PPE protocol, and plant discipline.",
    image: "/images/training_safety.jpg",
    stat: "Mandatory 5S & PPE • Zero Compliance Risk",
  },
  {
    id: "onboarding",
    label: "PROCESS GATE 04",
    title: "Factory Floor Handover & Attendance Muster",
    desc: "Our on-site field team manages candidate arrival, biometric punch registration, ID badge distribution, and shift coordinator introduction on day one.",
    image: "/images/factory_assembly.jpg",
    stat: "On-Site Daily Leads • 240-Day Muster Track",
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

export default function ProcessHeroSection() {
  const root = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl
        .fromTo(
          ".process-light-breadcrumb",
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
      setActiveSlide((prev) => (prev + 1) % processSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="process-hero-wrapper" ref={root}>
      <section className="hero-light process-hero-light" id="process-hero">
        <div className="hero-light-container">
          {/* LEFT COPY */}
          <div className="hero-light-copy">
            {/* Breadcrumb */}
            <div className="process-light-breadcrumb">
              <Link href="/" className="process-light-crumb-link">
                Home
              </Link>
              <ChevronRight size={13} className="process-light-crumb-sep" />
              <span className="process-light-crumb-active">Our Process</span>
            </div>

            {/* Badge */}
            <div className="hero-light-badge">
              <span className="hero-light-dot" />
              Structured 8-Stage Recruitment &amp; Deployment Engine
            </div>

            {/* Heading */}
            <h1 className="hero-light-h1">
              A Structured 8-Stage Process from
              <span className="hero-light-accent"> Brief to Factory Floor</span>
            </h1>

            {/* Lede */}
            <p className="hero-light-sub">
              Our proven pre-onboarding recruitment process ensures every candidate supplied to your facility is verified, medically cleared, and fully ready to contribute — with zero compliance risk and 24–72h turnaround.
            </p>

            {/* Stats row */}
            <div className="hero-light-stats">
              <div className="hero-light-stat">
                <strong><AnimatedCounter end={8} suffix="" /></strong>
                <span className="hero-light-stat-label">Quality Gates</span>
              </div>
              <div className="hero-light-stat-divider" />
              <div className="hero-light-stat">
                <strong><AnimatedCounter end={24} suffix="h" /></strong>
                <span className="hero-light-stat-label">Intake SLA</span>
              </div>
              <div className="hero-light-stat-divider" />
              <div className="hero-light-stat">
                <strong><AnimatedCounter end={72} suffix="h" /></strong>
                <span className="hero-light-stat-label">Shortlist SLA</span>
              </div>
              <div className="hero-light-stat-divider" />
              <div className="hero-light-stat">
                <strong>100%</strong>
                <span className="hero-light-stat-label">Statutory Cover</span>
              </div>
            </div>

            {/* Actions */}
            <div className="hero-light-actions">
              <Link href="/contact" className="hero-light-cta-primary">
                Discuss Your Requirement
                <ArrowRight size={17} />
              </Link>
              <Link href="#stages" className="hero-light-cta-secondary">
                Explore All 8 Stages
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
              {processSlides.map((slide, idx) => (
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
                <span className="hero-light-caption-label">{processSlides[activeSlide].label}</span>
                <strong className="hero-light-caption-title">{processSlides[activeSlide].title}</strong>
                <p className="hero-light-caption-desc">{processSlides[activeSlide].desc}</p>
                <span className="hero-light-caption-stat">
                  <ShieldCheck size={14} />{processSlides[activeSlide].stat}
                </span>
              </div>
            </div>

            {/* Slide dots */}
            <div className="hero-light-dots">
              {processSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  id={`process-hero-dot-${idx}`}
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
                <strong>Zero Compliance Risk</strong>
                <span>100% PF, ESI &amp; CLRA Cleared</span>
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
