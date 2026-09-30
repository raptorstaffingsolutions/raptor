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

/* ──────────────── NETWORK CAROUSEL SLIDES ──────────────── */
const networkSlides = [
  {
    id: "districts",
    label: "DISTRICT SOURCING GRID",
    title: "Deep Grassroots Sourcing Across 19 TN Districts",
    desc: "3,064+ active candidates mapped across 19 districts, anchored by primary sourcing hubs in Thanjavur (480), Mayiladuthurai (365), and Cuddalore (285).",
    image: "/images/manpower_workforce_supply.jpg",
    stat: "3,064+ Headcounts • 19 Districts",
  },
  {
    id: "colleges",
    label: "INSTITUTIONAL PARTNERSHIPS",
    title: "Campus Drives Across 81+ Partnered Colleges",
    desc: "Structured annual campus recruitment drives and mega job fairs conducted across arts, science, polytechnic, and ITI institutions.",
    image: "/images/iti_technical_workforce.jpg",
    stat: "81+ Colleges • 10 Active Districts",
  },
  {
    id: "migration",
    label: "MULTI-STATE PIPELINE",
    title: "Interstate Migration Workforce Sourcing",
    desc: "Active recruitment networks in Odisha, West Bengal, Andhra Pradesh, Assam, and Kerala to supply verified high-volume plant operators.",
    image: "/images/factory_assembly.jpg",
    stat: "5 Sourcing States • 100% Aadhaar Verified",
  },
  {
    id: "hubs",
    label: "SIPCOT PHYSICAL HUBS",
    title: "Embedded Plant Presence in Sriperumbudur & Oragadam",
    desc: "Headquartered in Kanchipuram with an on-site branch in Sunguvarchatram right next to Foxconn SEZ for rapid 1-hour physical response.",
    image: "/images/industrial_plant.jpg",
    stat: "2 Regional Hubs • <1 Hour Response SLA",
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

export default function NetworkHeroSection() {
  const root = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl
        .fromTo(
          ".network-light-breadcrumb",
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
      setActiveSlide((prev) => (prev + 1) % networkSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="network-hero-wrapper" ref={root}>
      <section className="hero-light network-hero-light" id="network-hero">
        <div className="hero-light-container">
          {/* LEFT COPY */}
          <div className="hero-light-copy">
            {/* Breadcrumb */}
            <div className="network-light-breadcrumb">
              <Link href="/" className="network-light-crumb-link">
                Home
              </Link>
              <ChevronRight size={13} className="network-light-crumb-sep" />
              <span className="network-light-crumb-active">Our Network</span>
            </div>

            {/* Badge */}
            <div className="hero-light-badge">
              <span className="hero-light-dot" />
              Pan-Tamil Nadu Talent Grid • 19 Districts &amp; 5 Migration States
            </div>

            {/* Heading */}
            <h1 className="hero-light-h1">
              3,064+ Confirmed Headcounts Across
              <span className="hero-light-accent"> 19 Districts in Tamil Nadu</span>
            </h1>

            {/* Lede */}
            <p className="hero-light-sub">
              We maintain an active, district-mapped recruitment network across Tamil Nadu and 5 interstate migration corridors — delivering consistent, compliance-ready manpower to manufacturing facilities in the SIPCOT industrial belt.
            </p>

            {/* Stats row */}
            <div className="hero-light-stats">
              <div className="hero-light-stat">
                <strong><AnimatedCounter end={3064} suffix="+" /></strong>
                <span className="hero-light-stat-label">Confirmed Headcounts</span>
              </div>
              <div className="hero-light-stat-divider" />
              <div className="hero-light-stat">
                <strong><AnimatedCounter end={19} suffix="" /></strong>
                <span className="hero-light-stat-label">Source Districts</span>
              </div>
              <div className="hero-light-stat-divider" />
              <div className="hero-light-stat">
                <strong><AnimatedCounter end={81} suffix="+" /></strong>
                <span className="hero-light-stat-label">College Alliances</span>
              </div>
              <div className="hero-light-stat-divider" />
              <div className="hero-light-stat">
                <strong><AnimatedCounter end={5} suffix="" /></strong>
                <span className="hero-light-stat-label">Migration States</span>
              </div>
            </div>

            {/* Actions */}
            <div className="hero-light-actions">
              <Link href="/contact" className="hero-light-cta-primary">
                Request Headcount Plan
                <ArrowRight size={17} />
              </Link>
              <Link href="#districts" className="hero-light-cta-secondary">
                Explore All 19 Districts
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
              {networkSlides.map((slide, idx) => (
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
                <span className="hero-light-caption-label">{networkSlides[activeSlide].label}</span>
                <strong className="hero-light-caption-title">{networkSlides[activeSlide].title}</strong>
                <p className="hero-light-caption-desc">{networkSlides[activeSlide].desc}</p>
                <span className="hero-light-caption-stat">
                  <ShieldCheck size={14} />{networkSlides[activeSlide].stat}
                </span>
              </div>
            </div>

            {/* Slide dots */}
            <div className="hero-light-dots">
              {networkSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  id={`network-hero-dot-${idx}`}
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
                <strong>3,064+ Deployed Workforce</strong>
                <span>Pan-Tamil Nadu &amp; Interstate Network</span>
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
