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
  Globe,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  ArrowUpRight,
} from "lucide-react";

/* ──────────────── THREE.JS CANVAS FOR NETWORK HERO ──────────────── */
function NetworkCanvas() {
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

/* ──────────────── NETWORK TABS DATA ──────────────── */
const networkTabsData = [
  {
    id: "districts",
    tabLabel: "01. 19 TN Districts",
    tagline: "TAMIL NADU TALENT PIPELINE",
    title: "Deep Grassroots Sourcing Across Tamil Nadu",
    desc: "3,064+ active candidates mapped across 19 districts, anchored by primary sourcing hubs in Thanjavur (480), Mayiladuthurai (365), and Cuddalore (285) with dedicated community coordinators.",
    image: "/images/manpower_workforce_supply.jpg",
    alt: "Pan-Tamil Nadu contract manpower supply and industrial workforce mobilization at SIPCOT",
    targetHash: "#districts",
    stats: [
      { label: "Headcounts", val: "3,064+", color: "#00f0ff" },
      { label: "Source Districts", val: "19 Hubs", color: "#10b981" },
      { label: "Mobilisation", val: "24–72 Hrs", color: "#f15ca4" },
    ],
    features: [
      "Thanjavur, Mayiladuthurai, Cuddalore & Tiruvarur primary feeder hubs",
      "Local community hiring camps and rural walk-in recruitment drives",
      "Direct transit coordination to SIPCOT Sriperumbudur & Oragadam",
    ],
  },
  {
    id: "colleges",
    tabLabel: "02. 81+ College Alliances",
    tagline: "INSTITUTIONAL TIE-UPS",
    title: "Campus Drives Across 81+ Partnered Colleges",
    desc: "Structured annual campus recruitment drives and mega job fairs conducted across arts, science, polytechnic, and ITI institutions to secure skilled and disciplined fresh talent.",
    image: "/images/iti_technical_workforce.jpg",
    alt: "Technical diploma and ITI candidates training for industrial plant deployment across 81+ partner institutions",
    targetHash: "#colleges",
    stats: [
      { label: "Institutions", val: "81+ Colleges", color: "#00f0ff" },
      { label: "Active Districts", val: "10 Districts", color: "#7457f5" },
      { label: "Qualifications", val: "ITI / Diploma", color: "#10b981" },
    ],
    features: [
      "SASTRA, PRIST, Annamalai & Government Arts College partnerships",
      "Pre-screened technical diploma & ITI candidates ready for deployment",
      "Structured campus onboarding with pre-employment verification",
    ],
  },
  {
    id: "migration",
    tabLabel: "03. Interstate Migration",
    tagline: "MULTI-STATE WORKFORCE SOURCING",
    title: "Interstate Migration Workforce Sourcing",
    desc: "Active recruitment networks in Odisha, West Bengal, Andhra Pradesh, Assam, and Kerala to supply verified, high-volume production line workers for round-the-clock plant operations.",
    image: "/images/factory_assembly.jpg",
    alt: "Interstate migration workers for manufacturing plants",
    targetHash: "#migration",
    stats: [
      { label: "Source States", val: "5 States", color: "#00f0ff" },
      { label: "Screening", val: "100% Aadhaar", color: "#10b981" },
      { label: "Welfare", val: "Hostel & Food", color: "#f15ca4" },
    ],
    features: [
      "Trusted sub-vendor and local partner network in 5 origin states",
      "Complete police clearance, Aadhaar authentication & medical tests",
      "Full hostel, transit, language bridge, and welfare management",
    ],
  },
  {
    id: "hubs",
    tabLabel: "04. Strategic Corridors",
    tagline: "SIPCOT MANUFACTURING CORRIDOR",
    title: "Two Regional Field Offices Minutes From Plants",
    desc: "Headquartered in Kanchipuram with an on-site Industrial Branch in Sunguvarchatram right next to Foxconn SEZ, Sriperumbudur, and Oragadam for rapid 1-hour physical response.",
    image: "/images/industrial_plant.jpg",
    alt: "SIPCOT Industrial Park Corridors in Tamil Nadu",
    targetHash: "#branches",
    stats: [
      { label: "Head Office", val: "Kanchipuram", color: "#00f0ff" },
      { label: "Industrial Branch", val: "Sunguvarchatram", color: "#7457f5" },
      { label: "Response SLA", val: "< 1 Hour", color: "#10b981" },
    ],
    features: [
      "Sunguvarchatram branch dedicated to SIPCOT Phase-II clients",
      "Kanchipuram HQ managing compliance, payroll, PF & ESI filings",
      "24/7 on-site incident response & dedicated plant shift coordinators",
    ],
  },
];

export default function NetworkHeroSection() {
  const root = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".network-hero-breadcrumb",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.1 }
      )
        .fromTo(
          ".network-hero-eyebrow",
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".network-hero-title-line",
          { y: 60, opacity: 0, rotateX: 20 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.15 },
          "-=0.6"
        )
        .fromTo(
          ".network-hero-lede",
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          ".network-hero-actions",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.7"
        )
        .fromTo(
          ".network-hero-proof > div",
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
          ".network-hero-deck",
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
          ".network-hero-badge-float",
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
          ".network-hero-ticker",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
          "-=0.5"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  const cur = networkTabsData[activeTab];

  return (
    <section className="network-hero" ref={root} id="network-hero">
      {/* 3D WebGL Constellation Canvas */}
      <NetworkCanvas />

      {/* Cyber Mesh Grid Overlay */}
      <div className="hero-mesh-grid" />

      {/* Ambient Glowing Orbs */}
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <div className="orb orb-d" />

      <div className="network-hero-container">
        {/* TOP BREADCRUMBS */}
        <div className="network-hero-breadcrumb">
          <Link href="/" className="network-crumb-link">
            <span>Home</span>
          </Link>
          <ChevronRight size={13} className="network-crumb-sep" />
          <span className="network-crumb-active">Our Network</span>
        </div>

        <div className="network-hero-split">
          {/* LEFT COLUMN: Headings, Exact Lede, Exact Actions, Telemetry */}
          <div className="network-hero-content">
            <div className="network-hero-eyebrow">
              <span className="hero-live-beacon" />
              <Sparkles size={14} style={{ color: "#00f0ff" }} />
              <span>RECRUITMENT NETWORK</span>
              <span className="hero-eyebrow-divider">|</span>
              <span className="hero-eyebrow-sub">GROUND-LEVEL WORKFORCE REACH</span>
            </div>

            <h1 className="network-hero-h1">
              <span className="network-hero-title-line">3,064+ Confirmed Headcounts Across</span>
              <span className="network-hero-title-line gradient-text">
                19 Districts in Tamil Nadu
              </span>
            </h1>

            <p className="network-hero-lede">
              We maintain an active, district-mapped recruitment network across Tamil Nadu and five interstate migration states — delivering consistent quality manpower to manufacturing facilities in the SIPCOT industrial belt.
            </p>

            <div className="network-hero-actions">
              <Link href="/contact" className="hero-primary-cta">
                <span>Request Headcount Plan</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/process" className="hero-secondary-cta">
                <Zap size={16} color="#00f0ff" />
                <span>Recruitment Process</span>
              </Link>
              <div className="hero-sla-pill">
                <Clock size={15} color="#00f0ff" />
                <span>24–72h Mobilisation SLA</span>
              </div>
            </div>

            {/* 4 Telemetry Proof Metric Capsules */}
            <div className="network-hero-proof">
              <div className="network-proof-item">
                <strong className="network-proof-val" style={{ color: "#00f0ff" }}>
                  <AnimatedCounter end={3064} suffix="+" />
                </strong>
                <span className="network-proof-lbl">Confirmed Headcounts</span>
                <span className="network-proof-sub">Active talent roster</span>
              </div>

              <div className="network-proof-item">
                <strong className="network-proof-val" style={{ color: "#10b981" }}>
                  <AnimatedCounter end={19} suffix=" Hubs" />
                </strong>
                <span className="network-proof-lbl">Source Districts</span>
                <span className="network-proof-sub">Across Tamil Nadu</span>
              </div>

              <div className="network-proof-item">
                <strong className="network-proof-val" style={{ color: "#a855f7" }}>
                  <AnimatedCounter end={81} suffix="+" />
                </strong>
                <span className="network-proof-lbl">College Alliances</span>
                <span className="network-proof-sub">ITI, Diploma &amp; Arts</span>
              </div>

              <div className="network-proof-item">
                <strong className="network-proof-val" style={{ color: "#f15ca4" }}>
                  <AnimatedCounter end={5} suffix=" States" />
                </strong>
                <span className="network-proof-lbl">Interstate Sourcing</span>
                <span className="network-proof-sub">Migration corridors</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Futuristic Enterprise Console & Network Switcher */}
          <div className="network-hero-deck-wrap">
            {/* FLOATING BADGE 1: 3,064+ Headcounts (Top Right) */}
            <div className="network-hero-badge-float badge-top-right">
              <div className="badge-float-icon" style={{ background: "rgba(16, 185, 129, 0.2)", borderColor: "rgba(16, 185, 129, 0.4)" }}>
                <Users size={20} color="#10b981" />
              </div>
              <div className="badge-float-text">
                <strong>3,064+ Headcounts</strong>
                <span>Active on File</span>
              </div>
            </div>

            {/* FLOATING BADGE 2: 81+ College Alliances (Bottom Left) */}
            <div className="network-hero-badge-float badge-bottom-left">
              <div className="badge-float-icon" style={{ background: "rgba(0, 240, 255, 0.2)", borderColor: "rgba(0, 240, 255, 0.4)" }}>
                <GraduationCap size={20} color="#00f0ff" />
              </div>
              <div className="badge-float-text">
                <strong>81+ College Tie-Ups</strong>
                <span>ITI, Diploma &amp; Graduates</span>
              </div>
            </div>

            {/* FLOATING BADGE 3: 5 Migration Corridors (Middle Right) */}
            <div className="network-hero-badge-float badge-mid-right">
              <div className="badge-float-icon" style={{ background: "rgba(241, 92, 164, 0.2)", borderColor: "rgba(241, 92, 164, 0.4)" }}>
                <MapPin size={19} color="#f15ca4" />
              </div>
              <div className="badge-float-text">
                <strong>5 Migration States</strong>
                <span>Odisha • WB • AP • Assam</span>
              </div>
            </div>

            {/* INTERACTIVE COMMAND DECK CARD */}
            <div className="network-hero-deck">
              {/* HUD Brackets */}
              <div className="hero-hud-bracket hud-top-left" />
              <div className="hero-hud-bracket hud-top-right" />
              <div className="hero-hud-bracket hud-bottom-left" />
              <div className="hero-hud-bracket hud-bottom-right" />

              {/* Console Header Bar */}
              <div className="network-deck-hud-header">
                <div className="hud-header-left">
                  <span className="hud-signal-dot" />
                  <span className="hud-code-title">RAPTOR_NETWORK_RADAR // v2.6</span>
                </div>
                <div className="hud-header-right">
                  <span className="hud-tag">MAP: 19 TN DISTRICTS</span>
                  <span className="hud-tag hud-tag-location">SIPCOT • KANCHIPURAM</span>
                </div>
              </div>

              {/* Tab Selector Buttons */}
              <div className="network-deck-tabs">
                {networkTabsData.map((tab, idx) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(idx)}
                    className={`network-deck-tab-btn ${activeTab === idx ? "active" : ""}`}
                    type="button"
                  >
                    <span>{tab.tabLabel}</span>
                    {activeTab === idx && <div className="tab-active-glow" />}
                  </button>
                ))}
              </div>

              {/* Main Deck Image Showcase */}
              <div className="network-deck-media-wrap">
                <Image
                  src={cur.image}
                  alt={cur.alt}
                  width={680}
                  height={380}
                  className="network-deck-img"
                  priority
                />
                <div className="network-deck-media-overlay" />
                <div className="network-deck-media-tag">
                  <Sparkles size={13} color="#00f0ff" />
                  <span>{cur.tagline}</span>
                </div>
              </div>

              {/* Deck Details & Telemetry */}
              <div className="network-deck-body">
                <h3 className="network-deck-title">{cur.title}</h3>
                <p className="network-deck-desc">{cur.desc}</p>

                {/* Micro Telemetry Bar */}
                <div className="network-deck-stats-grid">
                  {cur.stats.map((st, i) => (
                    <div key={i} className="network-deck-stat-box">
                      <span className="stat-label">{st.label}</span>
                      <strong className="stat-value" style={{ color: st.color }}>
                        {st.val}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Feature Checklist */}
                <div className="network-deck-features">
                  {cur.features.map((feat, i) => (
                    <div key={i} className="network-deck-feature-row">
                      <CheckCircle2 size={16} color="#00f0ff" className="feat-check" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Console Footer */}
              <div className="network-deck-footer">
                <span className="footer-status">
                  <span className="live-ping" />
                  Direct Transit Coordination to SIPCOT Manufacturing Plants
                </span>
                <a href={cur.targetHash} className="footer-action">
                  <span>Explore Network Map</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM NETWORK DISTRICTS & STATES TICKER */}
      <div className="network-hero-ticker">
        <div className="ticker-label-box">
          <Factory size={14} color="#00f0ff" />
          <span>SOURCING DISTRICTS &amp; CORRIDORS</span>
        </div>
        <div className="ticker-strip-wrapper">
          <div className="ticker-strip">
            {[
              "Thanjavur (480 Headcount)",
              "Mayiladuthurai (365 Headcount)",
              "Cuddalore (285 Headcount)",
              "Tiruvarur (235 Headcount)",
              "Sivagangai (230 Headcount)",
              "Pudukkotai (180 Headcount)",
              "Thoothukudi (160 Headcount)",
              "Nagapattinam (150 Headcount)",
              "Ramanathapuram (140 Headcount)",
              "Ariyalur (130 Headcount)",
              "Odisha Migration Corridor",
              "West Bengal Skilled Workers",
              "Andhra Pradesh Gateway",
              "Assam Specialized Sourcing",
              "Kerala Technical Staff",
              "Thanjavur (480 Headcount)",
              "Mayiladuthurai (365 Headcount)",
              "Cuddalore (285 Headcount)",
            ].map((node, index) => (
              <div key={index} className="ticker-item">
                <span className="ticker-dot" />
                <span className="ticker-text">{node}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
