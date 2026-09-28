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
  Factory,
  GraduationCap,
  HeartHandshake,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  ArrowUpRight,
} from "lucide-react";

/* ──────────────── THREE.JS CANVAS FOR SERVICES HERO ──────────────── */
function ServicesCanvas() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mount.current || (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    const el = mount.current;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (e) {
      console.warn('WebGL not supported, skipping 3D animation.');
      return;
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 100);
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

/* ──────────────── CORE SERVICES DATA (EXACT CONTENT) ──────────────── */
const coreServicesData = [
  {
    id: "industrial",
    aliasId: "manpower",
    tabLabel: "01. Manpower Supply",
    tagline: "MANUFACTURING & ASSEMBLY WORKFORCE",
    title: "Skilled & Unskilled Manpower Supply",
    desc: "We supply skilled, semi-skilled, and unskilled workers to manufacturing plants based on exact client requirements — all screened, verified, and ready to deploy.",
    image: "/images/factory_assembly.jpg",
    alt: "Manufacturing plant assembly line staffing",
    targetHash: "#industrial",
    stats: [
      { label: "Mobilisation", val: "24–72 Hrs", color: "#00f0ff" },
      { label: "Vetting", val: "100% Med Clear", color: "#10b981" },
      { label: "Deployment", val: "3,064+ Plant", color: "#f15ca4" },
    ],
    features: [
      "Production line workers & line feeders",
      "Quality inspectors & cleanroom checkers",
      "Packing, assembly operators & shift supervisors",
    ],
  },
  {
    id: "recruitment",
    tabLabel: "02. Campus Drives",
    tagline: "STRUCTURED TALENT ACQUISITION",
    title: "Campus & Job Fair Recruitment",
    desc: "We run structured campus recruitment drives and mega job fairs across 81+ colleges in 10 districts of Tamil Nadu to consistently supply fresh, motivated talent.",
    image: "/images/campus_recruitment.jpg",
    alt: "Campus Drives Across 81+ Partnered Colleges",
    targetHash: "#recruitment",
    stats: [
      { label: "Colleges", val: "81+ Tie-ups", color: "#00f0ff" },
      { label: "Districts", val: "19 Sourcing", color: "#7457f5" },
      { label: "Cadres", val: "ITI / Diploma", color: "#10b981" },
    ],
    features: [
      "Structured college campus drives across Tamil Nadu",
      "Mega walk-in job fairs & community hiring camps",
      "ITI, polytechnic & engineering graduate pipelines",
    ],
  },
  {
    id: "payroll",
    aliasId: "hr",
    tabLabel: "03. HR & Payroll",
    tagline: "FULL WORKFORCE LIFECYCLE",
    title: "HR & Payroll Management",
    desc: "From induction to payroll — we manage the complete HR lifecycle for every deployed worker so your team can focus on production, not administration.",
    image: "/images/training_safety.jpg",
    alt: "Pre-Deployment Safety & Induction Training",
    targetHash: "#payroll",
    stats: [
      { label: "Payroll Accuracy", val: "100% On-Time", color: "#10b981" },
      { label: "Deductions", val: "PF/ESI/TDS", color: "#00f0ff" },
      { label: "Welfare", val: "24/7 Desk", color: "#f15ca4" },
    ],
    features: [
      "Employee induction, pre-deployment & EHS training",
      "Salary & payroll processing with PF, ESI, TDS deductions",
      "Attendance, shift tracking, and on-site helpdesk",
    ],
  },
  {
    id: "compliance",
    tabLabel: "04. Statutory Audit",
    tagline: "ZERO LEGAL EXPOSURE",
    title: "Statutory Compliance & Audit",
    desc: "Full Labour Law compliance with zero exposure for our clients. We manage all statutory obligations under EPF, ESIC, CLRA, Bonus Act, and the Industrial Disputes Act.",
    image: "/images/industrial_plant.jpg",
    alt: "Audit-Ready Across All SIPCOT Facilities",
    targetHash: "#compliance",
    stats: [
      { label: "Labour Laws", val: "100% Adherence", color: "#10b981" },
      { label: "Muster Audit", val: "240-Day Track", color: "#00f0ff" },
      { label: "Audits", val: "Self-Assess", color: "#7457f5" },
    ],
    features: [
      "PF / ESI registration, monthly challans & annual filing",
      "Bonus Act administration & labour inspection registers",
      "Self-Assessment Audit (SAA) & 240-day service tracker",
    ],
  },
];

export default function ServicesHeroSection() {
  const root = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".services-hero-breadcrumb",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.1 }
      )
        .fromTo(
          ".services-hero-eyebrow",
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".services-hero-title-line",
          { y: 60, opacity: 0, rotateX: 20 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.15 },
          "-=0.6"
        )
        .fromTo(
          ".services-hero-lede",
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          ".services-hero-actions",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.7"
        )
        .fromTo(
          ".services-hero-proof > div",
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
          ".services-hero-deck",
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
          ".services-hero-badge-float",
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
          ".services-hero-ticker",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
          "-=0.5"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  const cur = coreServicesData[activeTab];

  return (
    <section className="services-hero" ref={root} id="services-hero">
      {/* 3D WebGL Constellation Canvas */}
      <ServicesCanvas />

      {/* Cyber Mesh Grid Overlay */}
      <div className="hero-mesh-grid" />

      {/* Ambient Glowing Orbs */}
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <div className="orb orb-d" />

      <div className="services-hero-container">
        {/* TOP BREADCRUMBS */}
        <div className="services-hero-breadcrumb">
          <Link href="/" className="services-crumb-link">
            <span>Home</span>
          </Link>
          <ChevronRight size={13} className="services-crumb-sep" />
          <span className="services-crumb-active">Services</span>
        </div>

        <div className="services-hero-split">
          {/* LEFT COLUMN: Headings, Exact Lede, Exact Actions, Telemetry */}
          <div className="services-hero-content">
            <div className="services-hero-eyebrow">
              <span className="hero-live-beacon" />
              <Sparkles size={14} style={{ color: "#00f0ff" }} />
              <span>OUR STAFFING SERVICES</span>
              <span className="hero-eyebrow-divider">|</span>
              <span className="hero-eyebrow-sub">END-TO-END WORKFORCE LIFECYCLE</span>
            </div>

            <h1 className="services-hero-h1">
              <span className="services-hero-title-line">Complete Workforce Solutions for</span>
              <span className="services-hero-title-line gradient-text">
                Tamil Nadu&apos;s Manufacturing Plants
              </span>
            </h1>

            <p className="services-hero-lede">
              From sourcing and screening to payroll and statutory compliance — Raptor Staffing Solutions manages the complete manpower lifecycle so your production lines never stop.
            </p>

            <div className="services-hero-actions">
              <Link href="/contact" className="hero-primary-cta">
                <span>Request a Quote</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/process" className="hero-secondary-cta">
                <Zap size={16} color="#00f0ff" />
                <span>Our Process</span>
              </Link>
              <div className="hero-sla-pill">
                <Clock size={15} color="#00f0ff" />
                <span>24–72h Rapid Mobilisation SLA</span>
              </div>
            </div>

            {/* 4 Telemetry Proof Metric Capsules */}
            <div className="services-hero-proof">
              <div className="services-proof-item">
                <strong className="services-proof-val" style={{ color: "#00f0ff" }}>
                  <AnimatedCounter end={4} suffix=" Core" />
                </strong>
                <span className="services-proof-lbl">Service Disciplines</span>
                <span className="services-proof-sub">Full turnkey lifecycle</span>
              </div>

              <div className="services-proof-item">
                <strong className="services-proof-val" style={{ color: "#10b981" }}>
                  <AnimatedCounter end={100} suffix="%" />
                </strong>
                <span className="services-proof-lbl">Statutory Compliance</span>
                <span className="services-proof-sub">PF, ESI, CLRA &amp; SAA</span>
              </div>

              <div className="services-proof-item">
                <strong className="services-proof-val" style={{ color: "#a855f7" }}>
                  <AnimatedCounter end={3064} suffix="+" />
                </strong>
                <span className="services-proof-lbl">Active Workforce</span>
                <span className="services-proof-sub">SIPCOT plant deployments</span>
              </div>

              <div className="services-proof-item">
                <strong className="services-proof-val" style={{ color: "#f15ca4" }}>
                  <AnimatedCounter end={0} prefix="₹" suffix=" Cost" />
                </strong>
                <span className="services-proof-lbl">To Employers</span>
                <span className="services-proof-sub">Zero commission fee</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Futuristic Enterprise Console & Service Switcher */}
          <div className="services-hero-deck-wrap">
            {/* FLOATING BADGE 1: Zero Downtime (Top Right) */}
            <div className="services-hero-badge-float badge-top-right">
              <div className="badge-float-icon" style={{ background: "rgba(16, 185, 129, 0.2)", borderColor: "rgba(16, 185, 129, 0.4)" }}>
                <ShieldCheck size={20} color="#10b981" />
              </div>
              <div className="badge-float-text">
                <strong>Zero Production Downtime</strong>
                <span>Assembly &amp; Shift Continuity</span>
              </div>
            </div>

            {/* FLOATING BADGE 2: 100% Audit-Ready (Bottom Left) */}
            <div className="services-hero-badge-float badge-bottom-left">
              <div className="badge-float-icon" style={{ background: "rgba(0, 240, 255, 0.2)", borderColor: "rgba(0, 240, 255, 0.4)" }}>
                <CheckCircle2 size={20} color="#00f0ff" />
              </div>
              <div className="badge-float-text">
                <strong>100% Audit-Ready</strong>
                <span>EPF, ESIC, CLRA &amp; SAA</span>
              </div>
            </div>

            {/* FLOATING BADGE 3: End-to-End Lifecycle (Middle Right) */}
            <div className="services-hero-badge-float badge-mid-right">
              <div className="badge-float-icon" style={{ background: "rgba(241, 92, 164, 0.2)", borderColor: "rgba(241, 92, 164, 0.4)" }}>
                <Layers size={19} color="#f15ca4" />
              </div>
              <div className="badge-float-text">
                <strong>End-to-End Lifecycle</strong>
                <span>From Sourcing to Payroll</span>
              </div>
            </div>

            {/* INTERACTIVE COMMAND DECK CARD */}
            <div className="services-hero-deck">
              {/* HUD Brackets */}
              <div className="hero-hud-bracket hud-top-left" />
              <div className="hero-hud-bracket hud-top-right" />
              <div className="hero-hud-bracket hud-bottom-left" />
              <div className="hero-hud-bracket hud-bottom-right" />

              {/* Console Header Bar */}
              <div className="services-deck-hud-header">
                <div className="hud-header-left">
                  <span className="hud-signal-dot" />
                  <span className="hud-code-title">RAPTOR_SERVICE_ARCHITECTURE // v2.6</span>
                </div>
                <div className="hud-header-right">
                  <span className="hud-tag">STATUS: 100% OPERATIONAL</span>
                  <span className="hud-tag hud-tag-location">SIPCOT • ORAGADAM</span>
                </div>
              </div>

              {/* Tab Selector Buttons */}
              <div className="services-deck-tabs">
                {coreServicesData.map((tab, idx) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(idx)}
                    className={`services-deck-tab-btn ${activeTab === idx ? "active" : ""}`}
                    type="button"
                  >
                    <span>{tab.tabLabel}</span>
                    {activeTab === idx && <div className="tab-active-glow" />}
                  </button>
                ))}
              </div>

              {/* Main Deck Image Showcase */}
              <div className="services-deck-media-wrap">
                <Image
                  src={cur.image}
                  alt={cur.alt}
                  width={680}
                  height={380}
                  className="services-deck-img"
                  priority
                />
                <div className="services-deck-media-overlay" />
                <div className="services-deck-media-tag">
                  <Sparkles size={13} color="#00f0ff" />
                  <span>{cur.tagline}</span>
                </div>
              </div>

              {/* Deck Details & Telemetry */}
              <div className="services-deck-body">
                <h3 className="services-deck-title">{cur.title}</h3>
                <p className="services-deck-desc">{cur.desc}</p>

                {/* Micro Telemetry Bar */}
                <div className="services-deck-stats-grid">
                  {cur.stats.map((st, i) => (
                    <div key={i} className="services-deck-stat-box">
                      <span className="stat-label">{st.label}</span>
                      <strong className="stat-value" style={{ color: st.color }}>
                        {st.val}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Feature Checklist */}
                <div className="services-deck-features">
                  {cur.features.map((feat, i) => (
                    <div key={i} className="services-deck-feature-row">
                      <CheckCircle2 size={16} color="#00f0ff" className="feat-check" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Console Footer */}
              <div className="services-deck-footer">
                <span className="footer-status">
                  <span className="live-ping" />
                  Zero Downtime Guarantee on All Shifts
                </span>
                <a href={cur.targetHash} className="footer-action">
                  <span>Explore Service Details</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SERVICE SCOPE & CLIENT TICKER */}
      <div className="services-hero-ticker">
        <div className="ticker-label-box">
          <Factory size={14} color="#00f0ff" />
          <span>INDUSTRIAL SERVICE CAPABILITIES</span>
        </div>
        <div className="ticker-strip-wrapper">
          <div className="ticker-strip">
            {[
              "Skilled & Unskilled Manpower Supply",
              "Campus & Mega Job Fair Drives",
              "HR & Payroll Processing",
              "Statutory Compliance & SAA Audit",
              "Cleanroom & Assembly Line Operators",
              "Quality Inspectors & Checkers",
              "Warehouse & Material Logistics",
              "240-Day Muster Management",
              "PF, ESI, CLRA & Bonus Act Audits",
              "Zero-Cost Employer Hiring Model",
              "Skilled & Unskilled Manpower Supply",
              "Campus & Mega Job Fair Drives",
              "HR & Payroll Processing",
              "Statutory Compliance & SAA Audit",
              "Cleanroom & Assembly Line Operators",
              "Quality Inspectors & Checkers",
            ].map((scope, index) => (
              <div key={index} className="ticker-item">
                <span className="ticker-dot" />
                <span className="ticker-text">{scope}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
