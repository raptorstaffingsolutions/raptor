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
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  ArrowUpRight,
} from "lucide-react";

/* ──────────────── THREE.JS CANVAS FOR CONTACT HERO ──────────────── */
function ContactCanvas() {
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

/* ──────────────── CONTACT TABS DATA ──────────────── */
const contactTabsData = [
  {
    id: "inquiry",
    tabLabel: "01. Quick Inquiry",
    tagline: "24-HOUR PROPOSAL TURNAROUND",
    title: "Tailored Headcount & Compliance Proposal",
    desc: "Submit your plant headcount requirements, shifts, and skill categories. Our enterprise operations desk delivers a complete sourcing plan and cost breakdown within 24 hours.",
    image: "/images/industrial_plant.jpg",
    alt: "Raptor Staffing Solutions Tamil Nadu industrial offices",
    targetHash: "#contact-form",
    stats: [
      { label: "Response SLA", val: "24 Hours", color: "#00f0ff" },
      { label: "Employer Fee", val: "₹0 Free", color: "#10b981" },
      { label: "Mobilisation", val: "24–72h Staged", color: "#f15ca4" },
    ],
    features: [
      "No recruitment commissions charged to employer partners",
      "Tailored headcount plan with skill category breakdown",
      "Complete PF, ESI, CLRA & 240-day compliance framework",
    ],
  },
  {
    id: "kanchipuram",
    tabLabel: "02. Kanchipuram HQ",
    tagline: "PRIMARY COMPLIANCE & CLIENT HQ",
    title: "Head Office — Gandhi Road, Kanchipuram",
    desc: "Located on Gandhi Road, our central headquarters houses executive leadership, legal compliance officers, central ATS recruitment databases, and administrative operations.",
    image: "/images/hero_industrial_park.jpg",
    alt: "Kanchipuram Head Office",
    targetHash: "#locations",
    stats: [
      { label: "District", val: "Kanchipuram", color: "#00f0ff" },
      { label: "Hours", val: "Mon–Sat 9–6", color: "#7457f5" },
      { label: "Operations", val: "Central HQ", color: "#10b981" },
    ],
    features: [
      "No: 6, First Floor, Gandhi Road, Kanchipuram – 631 501",
      "Executive client meetings & contract onboarding hub",
      "Statutory audit dossier preparation & compliance desk",
    ],
  },
  {
    id: "sunguvarchatram",
    tabLabel: "03. Sunguvarchatram",
    tagline: "SIPCOT ON-SITE OPERATIONS BRANCH",
    title: "Industrial Branch — Vijay Complex, Sunguvarchatram",
    desc: "Positioned directly on Walajabad Road in Sunguvarchatram, minutes from Foxconn SEZ, Sriperumbudur, and Oragadam for rapid 1-hour physical client and plant support.",
    image: "/images/factory_assembly.jpg",
    alt: "Sunguvarchatram Industrial Branch",
    targetHash: "#locations",
    stats: [
      { label: "Corridor", val: "SIPCOT Phase-II", color: "#00f0ff" },
      { label: "Response", val: "< 1 Hour", color: "#10b981" },
      { label: "Support", val: "On-Site Daily", color: "#f15ca4" },
    ],
    features: [
      "No: 365/2C, Vijay Complex (F02), Walajabad Road, Sunguvarchatram",
      "Dedicated shift supervisors and candidate muster check-in",
      "Immediate worker replacement and on-site grievance handling",
    ],
  },
  {
    id: "channels",
    tabLabel: "04. Direct Channels",
    tagline: "DIRECT CALL & EMAIL CHANNELS",
    title: "Instant Direct Phone & Enterprise Email",
    desc: "Connect directly with our recruitment managers and client coordination desks for immediate workforce mobilization, shift replacements, or campus placement requests.",
    image: "/images/training_safety.jpg",
    alt: "Direct Communication Channels",
    targetHash: "#contact-form",
    stats: [
      { label: "Direct Phone", val: "+91 94441 69546", color: "#00f0ff" },
      { label: "Availability", val: "Mon–Sat 9–6", color: "#7457f5" },
      { label: "Email", val: "raptorstaffing", color: "#10b981" },
    ],
    features: [
      "Direct Hotline: +91 94441 69546",
      "Enterprise Email: raptorstaffingsolutions@gmail.com",
      "Fast response for industrial HR teams & plant directors",
    ],
  },
];

export default function ContactHeroSection() {
  const root = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".contact-hero-breadcrumb",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.1 }
      )
        .fromTo(
          ".contact-hero-eyebrow",
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".contact-hero-title-line",
          { y: 60, opacity: 0, rotateX: 20 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.15 },
          "-=0.6"
        )
        .fromTo(
          ".contact-hero-lede",
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.7"
        )
        .fromTo(
          ".contact-hero-actions",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.7"
        )
        .fromTo(
          ".contact-hero-proof > div",
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
          ".contact-hero-deck",
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
          ".contact-hero-badge-float",
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
          ".contact-hero-ticker",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" },
          "-=0.5"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  const cur = contactTabsData[activeTab];

  return (
    <section className="contact-hero" ref={root} id="contact-hero">
      {/* 3D WebGL Constellation Canvas */}
      <ContactCanvas />

      {/* Cyber Mesh Grid Overlay */}
      <div className="hero-mesh-grid" />

      {/* Ambient Glowing Orbs */}
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <div className="orb orb-d" />

      <div className="contact-hero-container">
        {/* TOP BREADCRUMBS */}
        <div className="contact-hero-breadcrumb">
          <Link href="/" className="contact-crumb-link">
            <span>Home</span>
          </Link>
          <ChevronRight size={13} className="contact-crumb-sep" />
          <span className="contact-crumb-active">Contact</span>
        </div>

        <div className="contact-hero-split">
          {/* LEFT COLUMN: Headings, Exact Lede, Exact Actions, Telemetry */}
          <div className="contact-hero-content">
            <div className="contact-hero-eyebrow">
              <span className="hero-live-beacon" />
              <Sparkles size={14} style={{ color: "#00f0ff" }} />
              <span>GET IN TOUCH</span>
              <span className="hero-eyebrow-divider">|</span>
              <span className="hero-eyebrow-sub">24-HOUR PROPOSAL TURNAROUND</span>
            </div>

            <h1 className="contact-hero-h1">
              <span className="contact-hero-title-line">Let&apos;s Build Your</span>
              <span className="contact-hero-title-line gradient-text">
                Workforce Together
              </span>
            </h1>

            <p className="contact-hero-lede">
              Share your manpower requirement with our team — we&apos;ll respond with a tailored headcount plan, skill category breakdown, and compliance framework within 24 hours.
            </p>

            <div className="contact-hero-actions">
              <Link href="#contact-form" className="hero-primary-cta">
                <span>Send a Message</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/network" className="hero-secondary-cta">
                <Zap size={16} color="#00f0ff" />
                <span>View Our Network</span>
              </Link>
              <div className="hero-sla-pill">
                <Clock size={15} color="#00f0ff" />
                <span>24h Rapid Proposal Turnaround SLA</span>
              </div>
            </div>

            {/* 4 Telemetry Proof Metric Capsules */}
            <div className="contact-hero-proof">
              <div className="contact-proof-item">
                <strong className="contact-proof-val" style={{ color: "#00f0ff" }}>
                  <AnimatedCounter end={24} prefix="< " suffix=" Hrs" />
                </strong>
                <span className="contact-proof-lbl">Proposal SLA</span>
                <span className="contact-proof-sub">Tailored headcount plan</span>
              </div>

              <div className="contact-proof-item">
                <strong className="contact-proof-val" style={{ color: "#10b981" }}>
                  <AnimatedCounter end={2} suffix=" Hubs" />
                </strong>
                <span className="contact-proof-lbl">Office Locations</span>
                <span className="contact-proof-sub">Kanchipuram &amp; Sunguvarchatram</span>
              </div>

              <div className="contact-proof-item">
                <strong className="contact-proof-val" style={{ color: "#a855f7" }}>
                  <AnimatedCounter end={0} prefix="₹" suffix=" Cost" />
                </strong>
                <span className="contact-proof-lbl">To Employers</span>
                <span className="contact-proof-sub">Zero commission fee</span>
              </div>

              <div className="contact-proof-item">
                <strong className="contact-proof-val" style={{ color: "#f15ca4" }}>
                  <AnimatedCounter end={1} prefix="< " suffix=" Hr" />
                </strong>
                <span className="contact-proof-lbl">On-Site Response</span>
                <span className="contact-proof-sub">SIPCOT corridor presence</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Futuristic Enterprise Console & Contact Switcher */}
          <div className="contact-hero-deck-wrap">
            {/* FLOATING BADGE 1: 24h Response SLA (Top Right) */}
            <div className="contact-hero-badge-float badge-top-right">
              <div className="badge-float-icon" style={{ background: "rgba(16, 185, 129, 0.2)", borderColor: "rgba(16, 185, 129, 0.4)" }}>
                <Clock size={20} color="#10b981" />
              </div>
              <div className="badge-float-text">
                <strong>24-Hour SLA Response</strong>
                <span>Guaranteed Proposal Delivery</span>
              </div>
            </div>

            {/* FLOATING BADGE 2: Zero Employer Fee (Bottom Left) */}
            <div className="contact-hero-badge-float badge-bottom-left">
              <div className="badge-float-icon" style={{ background: "rgba(0, 240, 255, 0.2)", borderColor: "rgba(0, 240, 255, 0.4)" }}>
                <ShieldCheck size={20} color="#00f0ff" />
              </div>
              <div className="badge-float-text">
                <strong>Zero Employer Fee</strong>
                <span>100% Free Consultation</span>
              </div>
            </div>

            {/* FLOATING BADGE 3: SIPCOT Corridor Hub (Middle Right) */}
            <div className="contact-hero-badge-float badge-mid-right">
              <div className="badge-float-icon" style={{ background: "rgba(241, 92, 164, 0.2)", borderColor: "rgba(241, 92, 164, 0.4)" }}>
                <MapPin size={19} color="#f15ca4" />
              </div>
              <div className="badge-float-text">
                <strong>SIPCOT Corridor Hub</strong>
                <span>Kanchipuram &amp; Sunguvarchatram</span>
              </div>
            </div>

            {/* INTERACTIVE COMMAND DECK CARD */}
            <div className="contact-hero-deck">
              {/* HUD Brackets */}
              <div className="hero-hud-bracket hud-top-left" />
              <div className="hero-hud-bracket hud-top-right" />
              <div className="hero-hud-bracket hud-bottom-left" />
              <div className="hero-hud-bracket hud-bottom-right" />

              {/* Console Header Bar */}
              <div className="contact-deck-hud-header">
                <div className="hud-header-left">
                  <span className="hud-signal-dot" />
                  <span className="hud-code-title">RAPTOR_CONNECT_DESK // v2.6</span>
                </div>
                <div className="hud-header-right">
                  <span className="hud-tag">STATUS: LIVE INTAKE</span>
                  <span className="hud-tag hud-tag-location">KANCHIPURAM • SUNGUVARCHATRAM</span>
                </div>
              </div>

              {/* Tab Selector Buttons */}
              <div className="contact-deck-tabs">
                {contactTabsData.map((tab, idx) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(idx)}
                    className={`contact-deck-tab-btn ${activeTab === idx ? "active" : ""}`}
                    type="button"
                  >
                    <span>{tab.tabLabel}</span>
                    {activeTab === idx && <div className="tab-active-glow" />}
                  </button>
                ))}
              </div>

              {/* Main Deck Image Showcase */}
              <div className="contact-deck-media-wrap">
                <Image
                  src={cur.image}
                  alt={cur.alt}
                  width={680}
                  height={380}
                  className="contact-deck-img"
                  priority
                />
                <div className="contact-deck-media-overlay" />
                <div className="contact-deck-media-tag">
                  <Sparkles size={13} color="#00f0ff" />
                  <span>{cur.tagline}</span>
                </div>
              </div>

              {/* Deck Details & Telemetry */}
              <div className="contact-deck-body">
                <h3 className="contact-deck-title">{cur.title}</h3>
                <p className="contact-deck-desc">{cur.desc}</p>

                {/* Micro Telemetry Bar */}
                <div className="contact-deck-stats-grid">
                  {cur.stats.map((st, i) => (
                    <div key={i} className="contact-deck-stat-box">
                      <span className="stat-label">{st.label}</span>
                      <strong className="stat-value" style={{ color: st.color }}>
                        {st.val}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Feature Checklist */}
                <div className="contact-deck-features">
                  {cur.features.map((feat, i) => (
                    <div key={i} className="contact-deck-feature-row">
                      <CheckCircle2 size={16} color="#00f0ff" className="feat-check" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Console Footer */}
              <div className="contact-deck-footer">
                <span className="footer-status">
                  <span className="live-ping" />
                  Direct Physical Access Across SIPCOT Industrial Belt
                </span>
                <a href={cur.targetHash} className="footer-action">
                  <span>Connect With Us</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CONTACT CHANNELS TICKER */}
      <div className="contact-hero-ticker">
        <div className="ticker-label-box">
          <Factory size={14} color="#00f0ff" />
          <span>DIRECT CONTACT &amp; OFFICE HUBS</span>
        </div>
        <div className="ticker-strip-wrapper">
          <div className="ticker-strip">
            {[
              "Kanchipuram Head Office: No. 6 Gandhi Road (631 501)",
              "Sunguvarchatram Industrial Branch: Vijay Complex Walajabad Road (602 106)",
              "Direct Hotline: +91 94441 69546",
              "Email: raptorstaffingsolutions@gmail.com",
              "24-Hour Headcount Proposal Turnaround SLA",
              "Zero Employer Commission Fee Model",
              "SIPCOT Phase-II Sunguvarchatram Coverage",
              "Kanchipuram Head Office: No. 6 Gandhi Road (631 501)",
              "Sunguvarchatram Industrial Branch: Vijay Complex Walajabad Road (602 106)",
              "Direct Hotline: +91 94441 69546",
            ].map((contactNode, index) => (
              <div key={index} className="ticker-item">
                <span className="ticker-dot" />
                <span className="ticker-text">{contactNode}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
