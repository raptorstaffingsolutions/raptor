"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Factory,
  FileCheck2,
  Globe,
  GraduationCap,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  ArrowUpRight,
} from "lucide-react";

/* ──────────────── THREE.JS CANVAS FOR ABOUT HERO ──────────────── */
function AboutCanvas() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mount.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = mount.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    camera.position.z = 7.5;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    // Group 1: Cyan / Aqua Constellation (400 particles)
    const count1 = 400;
    const pos1 = new Float32Array(count1 * 3);
    for (let i = 0; i < count1 * 3; i += 3) {
      pos1[i] = (Math.random() - 0.5) * 16;
      pos1[i + 1] = (Math.random() - 0.5) * 10;
      pos1[i + 2] = (Math.random() - 0.5) * 10;
    }
    const geo1 = new THREE.BufferGeometry();
    geo1.setAttribute("position", new THREE.BufferAttribute(pos1, 3));
    const mat1 = new THREE.PointsMaterial({
      size: 0.034,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.5,
    });
    const points1 = new THREE.Points(geo1, mat1);
    scene.add(points1);

    // Group 2: Violet / Rose Constellation (350 particles)
    const count2 = 350;
    const pos2 = new Float32Array(count2 * 3);
    for (let i = 0; i < count2 * 3; i += 3) {
      pos2[i] = (Math.random() - 0.5) * 16;
      pos2[i + 1] = (Math.random() - 0.5) * 10;
      pos2[i + 2] = (Math.random() - 0.5) * 10;
    }
    const geo2 = new THREE.BufferGeometry();
    geo2.setAttribute("position", new THREE.BufferAttribute(pos2, 3));
    const mat2 = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xa855f7,
      transparent: true,
      opacity: 0.42,
    });
    const points2 = new THREE.Points(geo2, mat2);
    scene.add(points2);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.35;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.35;
    };
    window.addEventListener("mousemove", onMouseMove);

    let frame = 0;
    const draw = () => {
      points1.rotation.y += 0.0006;
      points1.rotation.x += 0.00025;
      points2.rotation.y -= 0.0004;
      points2.rotation.x -= 0.0002;

      camera.position.x += (mouseX - camera.position.x) * 0.025;
      camera.position.y += (-mouseY - camera.position.y) * 0.025;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      frame = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      geo1.dispose();
      mat1.dispose();
      geo2.dispose();
      mat2.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="hero-canvas" ref={mount} aria-hidden="true" />;
}

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

/* ──────────────── TABS DATA ──────────────── */
const deckTabs = [
  {
    id: "moat",
    tabLabel: "01. Enterprise Advantage",
    tagline: "ZERO-COST EMPLOYER MODEL",
    title: "Zero-Cost Hiring with Zero Statutory Liability",
    desc: "We supply pre-screened industrial talent across Tamil Nadu at zero recruitment commission to employers, absorbing compliance auditing, medical screenings, and biometrics so you maintain pure production uptime.",
    image: "/images/hero_workforce.jpg",
    alt: "Raptor Staffing Deployed Workforce in Tamil Nadu",
    stats: [
      { label: "Employer Fee", val: "₹0 Free", color: "#10b981" },
      { label: "Deployment SLA", val: "24–72 Hrs", color: "#00f0ff" },
      { label: "Legal Immunity", val: "100% PF/ESI", color: "#f15ca4" },
    ],
    features: [
      "No recruitment commissions charged to employer partners",
      "End-to-end PF, ESI, CLRA & 240-day muster tracking",
      "On-site coordinators dedicated to attendance & shift rotation",
    ],
  },
  {
    id: "corridors",
    tabLabel: "02. Industrial Footprint",
    tagline: "SIPCOT STRATEGIC CORRIDORS",
    title: "Direct Embedded Presence in Manufacturing Hubs",
    desc: "Strategically headquartered in Kanchipuram and Sunguvarchatram, positioned minutes away from Foxconn SEZ, Sriperumbudur, Oragadam, and Vallam Vadagal industrial corridors.",
    image: "/images/industrial_plant.jpg",
    alt: "SIPCOT Manufacturing Corridor Tamil Nadu",
    stats: [
      { label: "Source Districts", val: "19 Hubs", color: "#00f0ff" },
      { label: "Active Corridors", val: "4 SIPCOT", color: "#7457f5" },
      { label: "Field Offices", val: "2 Hubs", color: "#10b981" },
    ],
    features: [
      "Sunguvarchatram & Kanchipuram field command centres",
      "Sub-1-hour on-site incident response & supervisor coverage",
      "Pre-mapped transit & bus routes for shift punctuality",
    ],
  },
  {
    id: "governance",
    tabLabel: "03. Quality & Screening",
    tagline: "RIGOROUS PRE-ONBOARDING",
    title: "Pre-Trained, Medically Cleared & EHS Inducted",
    desc: "Every candidate undergoes strict Aadhaar biometric screening, past employment verification, government clinic medical exams, and comprehensive 5S / plant safety orientation before step one.",
    image: "/images/hero_team_training.jpg",
    alt: "Industrial Workforce Training and Safety Induction",
    stats: [
      { label: "Screening Ratio", val: "1 in 3", color: "#f15ca4" },
      { label: "EHS Certified", val: "100%", color: "#10b981" },
      { label: "College Alliances", val: "81+ ITI/Dip", color: "#00f0ff" },
    ],
    features: [
      "Biometric Aadhaar & criminal background authentication",
      "Rigorous medical fitness tests for high-precision assembly lines",
      "EHS, PPE compliance, and shop-floor discipline training",
    ],
  },
];

export default function AboutHeroSection() {
  const root = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".about-hero-breadcrumb",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.1 }
      )
        .fromTo(
          ".about-hero-eyebrow",
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".about-hero-title-line",
          { y: 60, opacity: 0, rotateX: 20 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.15 },
          "-=0.6"
        )
        .fromTo(
          ".about-hero-lede",
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          ".about-hero-actions",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.7"
        )
        .fromTo(
          ".about-hero-proof > div",
          { y: 30, opacity: 0, scale: 0.85 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "back.out(2)",
          },
          "-=0.5"
        )
        .fromTo(
          ".about-hero-deck",
          {
            x: 90,
            opacity: 0,
            scale: 0.88,
            rotateY: 12,
            filter: "blur(12px)",
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power4.out",
          },
          "-=1.3"
        )
        .fromTo(
          ".about-hero-badge-float",
          { scale: 0, opacity: 0, y: 25 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(2.5)",
          },
          "-=0.8"
        )
        .fromTo(
          ".about-hero-ticker",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
          "-=0.5"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  const cur = deckTabs[activeTab];

  return (
    <section className="about-hero" ref={root} id="about-hero">
      {/* 3D WebGL Constellation Canvas */}
      <AboutCanvas />

      {/* Cyber Mesh Grid Overlay */}
      <div className="hero-mesh-grid" />

      {/* Ambient Glowing Orbs */}
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <div className="orb orb-d" />

      <div className="about-hero-container">
        {/* TOP BREADCRUMBS */}
        <div className="about-hero-breadcrumb">
          <Link href="/" className="about-crumb-link">
            <span>Home</span>
          </Link>
          <ChevronRight size={13} className="about-crumb-sep" />
          <span className="about-crumb-active">About Raptor Staffing Solutions</span>
        </div>

        <div className="about-hero-split">
          {/* LEFT COLUMN: Headings, Lede, Actions, Telemetry */}
          <div className="about-hero-content">
            <div className="about-hero-eyebrow">
              <span className="hero-live-beacon" />
              <Sparkles size={14} style={{ color: "#00f0ff" }} />
              <span>THE INDUSTRIAL WORKFORCE ENGINE</span>
              <span className="hero-eyebrow-divider">|</span>
              <span className="hero-eyebrow-sub">TAMIL NADU MANUFACTURING CORRIDOR</span>
            </div>

            <h1 className="about-hero-h1">
              <span className="about-hero-title-line">ENGINEERING TAMIL NADU&apos;S</span>
              <span className="about-hero-title-line gradient-text">
                MANUFACTURING MIGHT.
              </span>
            </h1>

            <p className="about-hero-lede">
              Founded in Kanchipuram, Raptor Staffing Solutions is the premier
              operational partner for global OEMs and Tier-1 manufacturing plants
              across Sriperumbudur, Oragadam, and Sunguvarchatram. We eliminate
              workforce shortages with <strong>3,064+ verified operators</strong>,
              guaranteed <strong>100% PF &amp; ESI statutory immunity</strong>, and
              a rapid <strong>24–72 hour mobilisation SLA</strong>.
            </p>

            <div className="about-hero-actions">
              <Link href="/contact" className="hero-primary-cta">
                <span>Request Manpower Proposal</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/services" className="hero-secondary-cta">
                <Zap size={16} color="#00f0ff" />
                <span>Explore Plant Services</span>
              </Link>
              <div className="hero-sla-pill">
                <ShieldCheck size={15} color="#10b981" />
                <span>Zero Employer Fee • 100% Legal Immunity</span>
              </div>
            </div>

            {/* 4 Telemetry Capsules */}
            <div className="about-hero-proof">
              <div className="about-proof-item">
                <strong className="about-proof-val" style={{ color: "#00f0ff" }}>
                  <AnimatedCounter end={3064} suffix="+" />
                </strong>
                <span className="about-proof-lbl">Deployed Workforce</span>
                <span className="about-proof-sub">Active in SIPCOT corridors</span>
              </div>

              <div className="about-proof-item">
                <strong className="about-proof-val" style={{ color: "#10b981" }}>
                  <AnimatedCounter end={100} suffix="%" />
                </strong>
                <span className="about-proof-lbl">Statutory Compliance</span>
                <span className="about-proof-sub">PF, ESI, CLRA &amp; 240-day audit</span>
              </div>

              <div className="about-proof-item">
                <strong className="about-proof-val" style={{ color: "#a855f7" }}>
                  <AnimatedCounter end={19} suffix=" Districts" />
                </strong>
                <span className="about-proof-lbl">Tamil Nadu Sourcing</span>
                <span className="about-proof-sub">Deep grassroots network</span>
              </div>

              <div className="about-proof-item">
                <strong className="about-proof-val" style={{ color: "#f15ca4" }}>
                  <AnimatedCounter end={81} suffix="+" />
                </strong>
                <span className="about-proof-lbl">College Tie-ups</span>
                <span className="about-proof-sub">ITI, Diploma &amp; Graduates</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Futuristic Enterprise Console & Switcher */}
          <div className="about-hero-deck-wrap">
            {/* FLOATING BADGE 1: Statutory Compliance (Top Right) */}
            <div className="about-hero-badge-float badge-top-right">
              <div className="badge-float-icon" style={{ background: "rgba(16, 185, 129, 0.2)", borderColor: "rgba(16, 185, 129, 0.4)" }}>
                <ShieldCheck size={20} color="#10b981" />
              </div>
              <div className="badge-float-text">
                <strong>100% Statutory Compliant</strong>
                <span>PF, ESI, CLRA &amp; Factory Act</span>
              </div>
            </div>

            {/* FLOATING BADGE 2: Tier-1 Trusted (Bottom Left) */}
            <div className="about-hero-badge-float badge-bottom-left">
              <div className="badge-float-icon" style={{ background: "rgba(0, 240, 255, 0.2)", borderColor: "rgba(0, 240, 255, 0.4)" }}>
                <Factory size={20} color="#00f0ff" />
              </div>
              <div className="badge-float-text">
                <strong>Fortune 500 Trusted</strong>
                <span>Bharat FIH • Motherson • KYOWA</span>
              </div>
            </div>

            {/* FLOATING BADGE 3: Rapid SLA (Middle Right) */}
            <div className="about-hero-badge-float badge-mid-right">
              <div className="badge-float-icon" style={{ background: "rgba(241, 92, 164, 0.2)", borderColor: "rgba(241, 92, 164, 0.4)" }}>
                <Clock size={19} color="#f15ca4" />
              </div>
              <div className="badge-float-text">
                <strong>24–72h Mobilisation</strong>
                <span>Rapid Plant Deployment</span>
              </div>
            </div>

            {/* INTERACTIVE COMMAND DECK CARD */}
            <div className="about-hero-deck">
              {/* HUD Brackets */}
              <div className="hero-hud-bracket hud-top-left" />
              <div className="hero-hud-bracket hud-top-right" />
              <div className="hero-hud-bracket hud-bottom-left" />
              <div className="hero-hud-bracket hud-bottom-right" />

              {/* Console Header Bar */}
              <div className="about-deck-hud-header">
                <div className="hud-header-left">
                  <span className="hud-signal-dot" />
                  <span className="hud-code-title">RAPTOR_CORP_INFRASTRUCTURE // v2.6</span>
                </div>
                <div className="hud-header-right">
                  <span className="hud-tag">STATUS: 100% OPERATIONAL</span>
                  <span className="hud-tag hud-tag-location">KANCHIPURAM • SIPCOT</span>
                </div>
              </div>

              {/* Tab Selector Buttons */}
              <div className="about-deck-tabs">
                {deckTabs.map((tab, idx) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(idx)}
                    className={`about-deck-tab-btn ${activeTab === idx ? "active" : ""}`}
                    type="button"
                  >
                    <span>{tab.tabLabel}</span>
                    {activeTab === idx && <div className="tab-active-glow" />}
                  </button>
                ))}
              </div>

              {/* Main Deck Image Showcase */}
              <div className="about-deck-media-wrap">
                <Image
                  src={cur.image}
                  alt={cur.alt}
                  width={680}
                  height={380}
                  className="about-deck-img"
                  priority
                />
                <div className="about-deck-media-overlay" />
                <div className="about-deck-media-tag">
                  <Sparkles size={13} color="#00f0ff" />
                  <span>{cur.tagline}</span>
                </div>
              </div>

              {/* Deck Details & Telemetry */}
              <div className="about-deck-body">
                <h3 className="about-deck-title">{cur.title}</h3>
                <p className="about-deck-desc">{cur.desc}</p>

                {/* Micro Telemetry Bar */}
                <div className="about-deck-stats-grid">
                  {cur.stats.map((st, i) => (
                    <div key={i} className="about-deck-stat-box">
                      <span className="stat-label">{st.label}</span>
                      <strong className="stat-value" style={{ color: st.color }}>
                        {st.val}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Feature Checklist */}
                <div className="about-deck-features">
                  {cur.features.map((feat, i) => (
                    <div key={i} className="about-deck-feature-row">
                      <CheckCircle2 size={16} color="#00f0ff" className="feat-check" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Console Footer */}
              <div className="about-deck-footer">
                <span className="footer-status">
                  <span className="live-ping" />
                  Continuous On-Site Supervision Across Tamil Nadu
                </span>
                <Link href="/about#leadership" className="footer-action">
                  <span>Leadership Team</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ENTERPRISE OEM CLIENT TICKER */}
      <div className="about-hero-ticker">
        <div className="ticker-label-box">
          <Factory size={14} color="#00f0ff" />
          <span>PROVEN PARTNER TO INDUSTRY LEADERS</span>
        </div>
        <div className="ticker-strip-wrapper">
          <div className="ticker-strip">
            {[
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
            ].map((partner, index) => (
              <div key={index} className="ticker-item">
                <span className="ticker-dot" />
                <span className="ticker-text">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
