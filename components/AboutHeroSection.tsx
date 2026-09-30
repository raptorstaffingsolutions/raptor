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

/* ──────────────── HERO CAROUSEL SLIDES ──────────────── */
const aboutSlides = [
  {
    id: "workforce",
    label: "ZERO-COST EMPLOYER MODEL",
    title: "Zero-Cost Hiring with Zero Statutory Liability",
    desc: "Pre-screened industrial talent supplied across Tamil Nadu at zero recruitment commission to employers, with comprehensive statutory compliance.",
    image: "/images/hero_workforce.jpg",
    stat: "₹0 Employer Fee • 100% PF/ESI Cover",
  },
  {
    id: "industrial",
    label: "SIPCOT STRATEGIC CORRIDORS",
    title: "Direct Embedded Presence in Manufacturing Hubs",
    desc: "Field command centres in Kanchipuram and Sunguvarchatram, positioned minutes from Foxconn SEZ, Sriperumbudur, Oragadam & Vallam Vadagal.",
    image: "/images/industrial_plant.jpg",
    stat: "4 SIPCOT Corridors • 2 Field Command Hubs",
  },
  {
    id: "training",
    label: "QUALITY & SCREENING",
    title: "Pre-Trained & Medically Cleared",
    desc: "Strict Aadhaar biometric screening, clinical medical exams, and comprehensive 5S shop-floor safety orientation before candidate deployment.",
    image: "/images/hero_team_training.jpg",
    stat: "81+ ITI/Diploma College Tie-Ups",
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

export default function AboutHeroSection() {
  const root = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl
        .fromTo(
          ".about-light-breadcrumb",
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
      setActiveSlide((prev) => (prev + 1) % aboutSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="about-hero-wrapper" ref={root}>
      <section className="hero-light about-hero-light" id="about-hero">
        <div className="hero-light-container">
          {/* LEFT COPY */}
          <div className="hero-light-copy">
            {/* Breadcrumb */}
            <div className="about-light-breadcrumb">
              <Link href="/" className="about-light-crumb-link">
                Home
              </Link>
              <ChevronRight size={13} className="about-light-crumb-sep" />
              <span className="about-light-crumb-active">About Raptor Staffing Solutions</span>
            </div>

            {/* Badge */}
            <div className="hero-light-badge">
              <span className="hero-light-dot" />
              Tamil Nadu&apos;s Industrial Workforce Engine • Kanchipuram HQ
            </div>

            {/* Heading */}
            <h1 className="hero-light-h1">
              Engineering Tamil Nadu&apos;s
              <span className="hero-light-accent"> Manufacturing Might</span>
            </h1>

            {/* Lede */}
            <p className="hero-light-sub">
              Founded in Kanchipuram, Raptor Staffing Solutions is the premier operational partner for global OEMs and Tier-1 manufacturing plants across Sriperumbudur, Oragadam, and Sunguvarchatram — delivering zero-cost employer hiring with guaranteed 100% PF &amp; ESI statutory compliance and rapid 24–72 hour mobilisation.
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
                <strong><AnimatedCounter end={19} suffix="" /></strong>
                <span className="hero-light-stat-label">Districts (TN)</span>
              </div>
              <div className="hero-light-stat-divider" />
              <div className="hero-light-stat">
                <strong><AnimatedCounter end={81} suffix="+" /></strong>
                <span className="hero-light-stat-label">College Partners</span>
              </div>
            </div>

            {/* Actions */}
            <div className="hero-light-actions">
              <Link href="/contact" className="hero-light-cta-primary">
                Request Manpower Proposal
                <ArrowRight size={17} />
              </Link>
              <Link href="/services" className="hero-light-cta-secondary">
                Explore Plant Services
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
              {aboutSlides.map((slide, idx) => (
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
                <span className="hero-light-caption-label">{aboutSlides[activeSlide].label}</span>
                <strong className="hero-light-caption-title">{aboutSlides[activeSlide].title}</strong>
                <p className="hero-light-caption-desc">{aboutSlides[activeSlide].desc}</p>
                <span className="hero-light-caption-stat">
                  <ShieldCheck size={14} />{aboutSlides[activeSlide].stat}
                </span>
              </div>
            </div>

            {/* Slide dots */}
            <div className="hero-light-dots">
              {aboutSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  id={`about-hero-dot-${idx}`}
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
                <strong>Zero Employer Fees</strong>
                <span>100% PF, ESI &amp; CLRA Compliant</span>
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
