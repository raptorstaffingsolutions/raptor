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

/* ──────────────── CONTACT CAROUSEL SLIDES ──────────────── */
const contactSlides = [
  {
    id: "inquiry",
    label: "24-HOUR PROPOSAL TURNAROUND",
    title: "Tailored Headcount & Compliance Proposal",
    desc: "Submit your plant headcount requirements, shifts, and skill categories. Our enterprise operations desk delivers a complete sourcing plan within 24 hours.",
    image: "/images/industrial_plant.jpg",
    stat: "< 24h Response • ₹0 Employer Fee",
  },
  {
    id: "kanchipuram",
    label: "PRIMARY COMPLIANCE & CLIENT HQ",
    title: "Head Office — Gandhi Road, Kanchipuram",
    desc: "Houses executive leadership, legal compliance officers, central ATS recruitment databases, and administrative operations.",
    image: "/images/hero_industrial_park.jpg",
    stat: "No: 6 Gandhi Road • Central HQ",
  },
  {
    id: "sunguvarchatram",
    label: "SIPCOT ON-SITE OPERATIONS BRANCH",
    title: "Industrial Branch — Sunguvarchatram",
    desc: "Positioned directly in Sunguvarchatram, minutes from Foxconn SEZ, Sriperumbudur, and Oragadam for rapid 1-hour physical support.",
    image: "/images/factory_assembly.jpg",
    stat: "< 1h Response SLA • On-Site Daily Leads",
  },
  {
    id: "support",
    label: "DIRECT CHANNELS & ONBOARDING",
    title: "Direct Field Dispatch & Client Support",
    desc: "Connect directly with our recruitment managers and client coordination desks for immediate workforce mobilization and shift replacements.",
    image: "/images/training_safety.jpg",
    stat: "Mon–Sat 9AM–6PM • Dedicated Helpline",
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

export default function ContactHeroSection() {
  const root = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl
        .fromTo(
          ".contact-light-breadcrumb",
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
      setActiveSlide((prev) => (prev + 1) % contactSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="contact-hero-wrapper" ref={root}>
      <section className="hero-light contact-hero-light" id="contact-hero">
        <div className="hero-light-container">
          {/* LEFT COPY */}
          <div className="hero-light-copy">
            {/* Breadcrumb */}
            <div className="contact-light-breadcrumb">
              <Link href="/" className="contact-light-crumb-link">
                Home
              </Link>
              <ChevronRight size={13} className="contact-light-crumb-sep" />
              <span className="contact-light-crumb-active">Contact Us</span>
            </div>

            {/* Badge */}
            <div className="hero-light-badge">
              <span className="hero-light-dot" />
              Direct Industry Operations Desk • Kanchipuram &amp; Sunguvarchatram
            </div>

            {/* Heading */}
            <h1 className="hero-light-h1">
              Let&apos;s Build Your
              <span className="hero-light-accent"> Workforce Together</span>
            </h1>

            {/* Lede */}
            <p className="hero-light-sub">
              Share your manpower requirements with our team — we&apos;ll respond with a tailored headcount plan, skill category breakdown, and compliance framework within 24 hours.
            </p>

            {/* Stats row */}
            <div className="hero-light-stats">
              <div className="hero-light-stat">
                <strong><AnimatedCounter end={24} prefix="<" suffix="h" /></strong>
                <span className="hero-light-stat-label">Proposal SLA</span>
              </div>
              <div className="hero-light-stat-divider" />
              <div className="hero-light-stat">
                <strong><AnimatedCounter end={2} suffix=" Hubs" /></strong>
                <span className="hero-light-stat-label">Office Locations</span>
              </div>
              <div className="hero-light-stat-divider" />
              <div className="hero-light-stat">
                <strong>₹0</strong>
                <span className="hero-light-stat-label">Employer Fee</span>
              </div>
              <div className="hero-light-stat-divider" />
              <div className="hero-light-stat">
                <strong><AnimatedCounter end={1} prefix="<" suffix="h" /></strong>
                <span className="hero-light-stat-label">On-Site Response</span>
              </div>
            </div>

            {/* Actions */}
            <div className="hero-light-actions">
              <Link href="#contact-form" className="hero-light-cta-primary">
                Send a Message
                <ArrowRight size={17} />
              </Link>
              <Link href="#locations" className="hero-light-cta-secondary">
                Our Office Locations
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
              {contactSlides.map((slide, idx) => (
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
                <span className="hero-light-caption-label">{contactSlides[activeSlide].label}</span>
                <strong className="hero-light-caption-title">{contactSlides[activeSlide].title}</strong>
                <p className="hero-light-caption-desc">{contactSlides[activeSlide].desc}</p>
                <span className="hero-light-caption-stat">
                  <ShieldCheck size={14} />{contactSlides[activeSlide].stat}
                </span>
              </div>
            </div>

            {/* Slide dots */}
            <div className="hero-light-dots">
              {contactSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  id={`contact-hero-dot-${idx}`}
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
                <strong>24h Proposal Turnaround</strong>
                <span>Zero Employer Fees • 100% Legal Cover</span>
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
