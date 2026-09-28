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
  FileCheck2,
  GraduationCap,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  ArrowUpRight,
} from "lucide-react";

/* ──────────────── THREE.JS CANVAS FOR PROCESS HERO ──────────────── */
function ProcessCanvas() {
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

/* ──────────────── PROCESS GATEWAY TABS DATA ──────────────── */
const processStagesData = [
  {
    id: "sourcing",
    tabLabel: "01. Intake & Sourcing",
    tagline: "STAGES 01 & 02 • MULTI-CHANNEL PIPELINE",
    title: "Requirement Briefing & 8 Sourcing Channels",
    desc: "We analyze skill requirements, shift models, and SLA targets within 24 hours, tapping internal ATS pools, 81+ partner colleges, and community hiring camps simultaneously.",
    image: "/images/manpower_assembly_team.jpg",
    alt: "Industrial manpower supplying and assembly workforce deployment in Tamil Nadu",
    targetHash: "#stages",
    stats: [
      { label: "Intake Brief", val: "24 Hours", color: "#00f0ff" },
      { label: "Talent Channels", val: "8 Sources", color: "#7457f5" },
      { label: "Colleges", val: "81+ Alliances", color: "#10b981" },
    ],
    features: [
      "Job description & shift schedule alignment within 24 hours",
      "Simultaneous sourcing across 8 proven recruitment channels",
      "Immediate candidate pool screening from proprietary ATS",
    ],
  },
  {
    id: "vetting",
    tabLabel: "02. Verification & Medical",
    tagline: "STAGES 03, 04, 05 & 06 • STATUTORY CLEARANCE",
    title: "Technical Screening, Biometrics & Medical Exams",
    desc: "Rigorous 3-stage filtration: structured technical vetting, 100% Aadhaar authentication, past employer verification, and mandatory government clinic medical exams.",
    image: "/images/industrial_plant.jpg",
    alt: "Candidate screening and medical verification",
    targetHash: "#stages",
    stats: [
      { label: "Candidate CVs", val: "72 Hours", color: "#00f0ff" },
      { label: "Biometric Vetting", val: "100% Aadhaar", color: "#10b981" },
      { label: "Medical Fitness", val: "Certified", color: "#f15ca4" },
    ],
    features: [
      "Structured technical interviews for operator & technician roles",
      "Biometric Aadhaar & criminal background check authentication",
      "Complete medical fitness clearance for plant line readiness",
    ],
  },
  {
    id: "training",
    tabLabel: "03. Safety & EHS Induction",
    tagline: "STAGE 07 • PRE-DEPLOYMENT PREPARATION",
    title: "Pre-Deployment Safety & Technical Briefing",
    desc: "Before stepping onto your shop floor, every candidate completes mandatory safety induction covering 5S principles, PPE protocol, and plant discipline guidelines.",
    image: "/images/training_safety.jpg",
    alt: "Pre-deployment safety training and technical briefing",
    targetHash: "#stages",
    stats: [
      { label: "Induction", val: "Mandatory", color: "#10b981" },
      { label: "EHS Standards", val: "5S & PPE", color: "#00f0ff" },
      { label: "Compliance Risk", val: "0% Zero", color: "#f15ca4" },
    ],
    features: [
      "Plant safety induction and emergency protocol training",
      "Personal Protective Equipment (PPE) compliance instructions",
      "Shop floor etiquette, attendance discipline, and shift rules",
    ],
  },
  {
    id: "onboarding",
    tabLabel: "04. Factory Floor Handover",
    tagline: "STAGE 08 • ON-SITE OPERATIONAL DEPLOYMENT",
    title: "Factory Floor Handover & Muster Onboarding",
    desc: "Our on-site field team manages candidate arrival, biometric punch registration, ID badge distribution, and shift coordinator introduction on day one.",
    image: "/images/factory_assembly.jpg",
    alt: "Manufacturing plant assembly line staffing",
    targetHash: "#stages",
    stats: [
      { label: "Batch Ready", val: "7 Working Days", color: "#00f0ff" },
      { label: "Supervision", val: "On-Site Daily", color: "#10b981" },
      { label: "Muster Audit", val: "240-Day Track", color: "#7457f5" },
    ],
    features: [
      "On-site candidate escort and plant supervisor handover",
      "Biometric punch registration and official ID generation",
      "Continuous daily attendance and welfare coordinator support",
    ],
  },
];

export default function ProcessHeroSection() {
  const root = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".process-hero-breadcrumb",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.1 }
      )
        .fromTo(
          ".process-hero-eyebrow",
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".process-hero-title-line",
          { y: 60, opacity: 0, rotateX: 20 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.15 },
          "-=0.6"
        )
        .fromTo(
          ".process-hero-lede",
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          ".process-hero-actions",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.7"
        )
        .fromTo(
          ".process-hero-proof > div",
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
          ".process-hero-deck",
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
          ".process-hero-badge-float",
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
          ".process-hero-ticker",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
          "-=0.5"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  const cur = processStagesData[activeTab];

  return (
    <section className="process-hero" ref={root} id="process-hero">
      {/* 3D WebGL Constellation Canvas */}
      <ProcessCanvas />

      {/* Cyber Mesh Grid Overlay */}
      <div className="hero-mesh-grid" />

      {/* Ambient Glowing Orbs */}
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <div className="orb orb-d" />

      <div className="process-hero-container">
        {/* TOP BREADCRUMBS */}
        <div className="process-hero-breadcrumb">
          <Link href="/" className="process-crumb-link">
            <span>Home</span>
          </Link>
          <ChevronRight size={13} className="process-crumb-sep" />
          <span className="process-crumb-active">Our Process</span>
        </div>

        <div className="process-hero-split">
          {/* LEFT COLUMN: Headings, Exact Lede, Exact Actions, Telemetry */}
          <div className="process-hero-content">
            <div className="process-hero-eyebrow">
              <span className="hero-live-beacon" />
              <Sparkles size={14} style={{ color: "#00f0ff" }} />
              <span>HOW WE RECRUIT</span>
              <span className="hero-eyebrow-divider">|</span>
              <span className="hero-eyebrow-sub">END-TO-END WORKFORCE DEPLOYMENT</span>
            </div>

            <h1 className="process-hero-h1">
              <span className="process-hero-title-line">A Structured 8-Stage Process from</span>
              <span className="process-hero-title-line gradient-text">
                Brief to Factory Floor
              </span>
            </h1>

            <p className="process-hero-lede">
              Our proven pre-onboarding recruitment process ensures every candidate supplied to your facility is verified, medically cleared, and fully ready to contribute — with zero compliance risk.
            </p>

            <div className="process-hero-actions">
              <Link href="/contact" className="hero-primary-cta">
                <span>Discuss Your Requirement</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/services" className="hero-secondary-cta">
                <Zap size={16} color="#00f0ff" />
                <span>Our Services</span>
              </Link>
              <div className="hero-sla-pill">
                <Clock size={15} color="#00f0ff" />
                <span>24–72h Turnaround SLA</span>
              </div>
            </div>

            {/* 4 Telemetry Proof Metric Capsules */}
            <div className="process-hero-proof">
              <div className="process-proof-item">
                <strong className="process-proof-val" style={{ color: "#00f0ff" }}>
                  <AnimatedCounter end={8} suffix=" Stages" />
                </strong>
                <span className="process-proof-lbl">Quality Gates</span>
                <span className="process-proof-sub">Brief to shop floor</span>
              </div>

              <div className="process-proof-item">
                <strong className="process-proof-val" style={{ color: "#10b981" }}>
                  <AnimatedCounter end={24} suffix=" Hrs" />
                </strong>
                <span className="process-proof-lbl">Requirement SLA</span>
                <span className="process-proof-sub">Intake acknowledgement</span>
              </div>

              <div className="process-proof-item">
                <strong className="process-proof-val" style={{ color: "#a855f7" }}>
                  <AnimatedCounter end={72} suffix=" Hrs" />
                </strong>
                <span className="process-proof-lbl">Shortlist Delivery</span>
                <span className="process-proof-sub">Vetted candidate CVs</span>
              </div>

              <div className="process-proof-item">
                <strong className="process-proof-val" style={{ color: "#f15ca4" }}>
                  <AnimatedCounter end={100} suffix="%" />
                </strong>
                <span className="process-proof-lbl">Zero Legal Risk</span>
                <span className="process-proof-sub">100% PF &amp; ESI cleared</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Futuristic Enterprise Console & Stage Switcher */}
          <div className="process-hero-deck-wrap">
            {/* FLOATING BADGE 1: Zero Compliance Risk (Top Right) */}
            <div className="process-hero-badge-float badge-top-right">
              <div className="badge-float-icon" style={{ background: "rgba(16, 185, 129, 0.2)", borderColor: "rgba(16, 185, 129, 0.4)" }}>
                <ShieldCheck size={20} color="#10b981" />
              </div>
              <div className="badge-float-text">
                <strong>Zero Compliance Risk</strong>
                <span>100% Statutory Clearance</span>
              </div>
            </div>

            {/* FLOATING BADGE 2: 100% Medical Clearance (Bottom Left) */}
            <div className="process-hero-badge-float badge-bottom-left">
              <div className="badge-float-icon" style={{ background: "rgba(0, 240, 255, 0.2)", borderColor: "rgba(0, 240, 255, 0.4)" }}>
                <CheckCircle2 size={20} color="#00f0ff" />
              </div>
              <div className="badge-float-text">
                <strong>100% Medical Clearance</strong>
                <span>Government Clinic Vetting</span>
              </div>
            </div>

            {/* FLOATING BADGE 3: 7-Day Mobilisation (Middle Right) */}
            <div className="process-hero-badge-float badge-mid-right">
              <div className="badge-float-icon" style={{ background: "rgba(241, 92, 164, 0.2)", borderColor: "rgba(241, 92, 164, 0.4)" }}>
                <Clock size={19} color="#f15ca4" />
              </div>
              <div className="badge-float-text">
                <strong>7-Day Mobilisation</strong>
                <span>Deployment-Ready Batches</span>
              </div>
            </div>

            {/* INTERACTIVE COMMAND DECK CARD */}
            <div className="process-hero-deck">
              {/* HUD Brackets */}
              <div className="hero-hud-bracket hud-top-left" />
              <div className="hero-hud-bracket hud-top-right" />
              <div className="hero-hud-bracket hud-bottom-left" />
              <div className="hero-hud-bracket hud-bottom-right" />

              {/* Console Header Bar */}
              <div className="process-deck-hud-header">
                <div className="hud-header-left">
                  <span className="hud-signal-dot" />
                  <span className="hud-code-title">RAPTOR_PROCESS_PIPELINE // v2.6</span>
                </div>
                <div className="hud-header-right">
                  <span className="hud-tag">STAGES: 08 COMPREHENSIVE</span>
                  <span className="hud-tag hud-tag-location">SIPCOT • VALLAM VADAGAL</span>
                </div>
              </div>

              {/* Tab Selector Buttons */}
              <div className="process-deck-tabs">
                {processStagesData.map((tab, idx) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(idx)}
                    className={`process-deck-tab-btn ${activeTab === idx ? "active" : ""}`}
                    type="button"
                  >
                    <span>{tab.tabLabel}</span>
                    {activeTab === idx && <div className="tab-active-glow" />}
                  </button>
                ))}
              </div>

              {/* Main Deck Image Showcase */}
              <div className="process-deck-media-wrap">
                <Image
                  src={cur.image}
                  alt={cur.alt}
                  width={680}
                  height={380}
                  className="process-deck-img"
                  priority
                />
                <div className="process-deck-media-overlay" />
                <div className="process-deck-media-tag">
                  <Sparkles size={13} color="#00f0ff" />
                  <span>{cur.tagline}</span>
                </div>
              </div>

              {/* Deck Details & Telemetry */}
              <div className="process-deck-body">
                <h3 className="process-deck-title">{cur.title}</h3>
                <p className="process-deck-desc">{cur.desc}</p>

                {/* Micro Telemetry Bar */}
                <div className="process-deck-stats-grid">
                  {cur.stats.map((st, i) => (
                    <div key={i} className="process-deck-stat-box">
                      <span className="stat-label">{st.label}</span>
                      <strong className="stat-value" style={{ color: st.color }}>
                        {st.val}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Feature Checklist */}
                <div className="process-deck-features">
                  {cur.features.map((feat, i) => (
                    <div key={i} className="process-deck-feature-row">
                      <CheckCircle2 size={16} color="#00f0ff" className="feat-check" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Console Footer */}
              <div className="process-deck-footer">
                <span className="footer-status">
                  <span className="live-ping" />
                  Continuous Quality Audit at Every Transition
                </span>
                <a href={cur.targetHash} className="footer-action">
                  <span>View 8-Stage Flow</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM PROCESS SCOPE TICKER */}
      <div className="process-hero-ticker">
        <div className="ticker-label-box">
          <Factory size={14} color="#00f0ff" />
          <span>8-STAGE RECRUITMENT QUALITY GATES</span>
        </div>
        <div className="ticker-strip-wrapper">
          <div className="ticker-strip">
            {[
              "01. Employer Requirement Briefing",
              "02. Multi-Channel Candidate Sourcing",
              "03. Profile Screening & Shortlisting",
              "04. Structured Technical Interviews",
              "05. Biometric Aadhaar Verification",
              "06. Medical Fitness Certification",
              "07. Pre-Deployment Safety & EHS Induction",
              "08. Factory Floor Handover & Muster Onboarding",
              "100% PF & ESI Statutory Compliance",
              "24–72h Turnaround SLA",
              "01. Employer Requirement Briefing",
              "02. Multi-Channel Candidate Sourcing",
              "03. Profile Screening & Shortlisting",
              "04. Structured Technical Interviews",
              "05. Biometric Aadhaar Verification",
              "06. Medical Fitness Certification",
            ].map((stage, index) => (
              <div key={index} className="ticker-item">
                <span className="ticker-dot" />
                <span className="ticker-text">{stage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
