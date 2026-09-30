"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Factory,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
  Play,
  Award,
  TrendingUp,
  Globe,
  Layers,
  Star,
} from "lucide-react";

/* ──────────────── HERO CAROUSEL SLIDES ──────────────── */
const heroSlides = [
  {
    id: "assembly",
    label: "Assembly Line Staffing",
    title: "Skilled Plant Technicians",
    desc: "Verified operators for automotive assembly, electronics manufacturing & precision line work across SIPCOT corridors.",
    image: "/images/hero_slide_assembly.jpg",
    stat: "3,064+ Active Workers",
  },
  {
    id: "recruitment",
    label: "Volume Recruitment",
    title: "Rapid Workforce Mobilisation",
    desc: "Campus drives, walk-in fairs & 81+ college tie-ups across Tamil Nadu to source ITI, diploma & graduate talent.",
    image: "/images/hero_slide_recruitment.jpg",
    stat: "81+ College Partners",
  },
  {
    id: "training",
    label: "Pre-Deployment Training",
    title: "EHS & Compliance Ready",
    desc: "Every candidate is safety-inducted, medically cleared & trained on plant discipline before deployment.",
    image: "/images/hero_slide_training.jpg",
    stat: "100% Compliant",
  },
];

/* ──────────────── SECTOR SHOWCASE DATA ──────────────── */
const visualSectors = [
  {
    title: "Assembly & Manufacturing Operators",
    badge: "SIPCOT High-Tech",
    image: "/images/hero_manufacturing.jpg",
    desc: "Precision electronic cleanroom assemblers, SMT line technicians, and automotive component operators trained for zero-defect output.",
    pills: ["Electronics", "Automotive", "Cleanroom", "Line Assembly"],
    href: "/services#manpower",
    icon: <Factory size={22} />,
  },
  {
    title: "Warehousing & Material Logistics",
    badge: "24/7 Operations",
    image: "/images/hero_warehouse.jpg",
    desc: "Inventory barcode scanners, forklift drivers, dispatch specialists, and packaging crews powering fast-turnaround distribution hubs.",
    pills: ["Material Handling", "Inventory", "Packaging", "3 Shifts"],
    href: "/services#manpower",
    icon: <Layers size={22} />,
  },
  {
    title: "Pre-Deployment & Safety Training",
    badge: "EHS & 5S Certified",
    image: "/images/hero_team_training.jpg",
    desc: "Every candidate undergoes mandatory plant safety induction, PPE guidelines, discipline training, and medical fitness checks before day one.",
    pills: ["Safety First", "Labour Laws", "Medical Fitness", "PF/ESI"],
    href: "/process",
    icon: <ShieldCheck size={22} />,
  },
  {
    title: "Campus Drives & Mega Job Fairs",
    badge: "81+ College Tie-ups",
    image: "/images/hero_recruitment.jpg",
    desc: "Structured campus placements and walk-in hiring drives across 10 districts in Tamil Nadu to secure motivated ITI, Diploma, and Graduate talent.",
    pills: ["ITI/Diploma", "Mega Fairs", "19 Districts", "Fresh Talent"],
    href: "/services#recruitment",
    icon: <GraduationCap size={22} />,
  },
];

/* ──────────────── CLIENTS DATA ──────────────── */
const clients = [
  { name: "Bharat FIH", sub: "A Foxconn Technology Group Company", location: "SIPCOT Phase-II, Sunguvarchatram", tag: "Electronics Manufacturing" },
  { name: "KYOWA", sub: "Aluminium Metal Manufacturing", location: "SIPCOT Industrial Park, Vallam Vadagal", tag: "Metal & Precision Parts" },
  { name: "KIML", sub: "Kyungshin Industrial Motherson Pvt. Ltd.", location: "SIPCOT Growth Centre, Sriperumbudur", tag: "Automotive Wiring Systems" },
  { name: "Motherson Polymer Solutions", sub: "Motherson Group", location: "SIPCOT Industrial Growth Center, Oragadam", tag: "Polymer Components" },
  { name: "Rising Stars Hi-Tech", sub: "A Bharat FIH Company", location: "SIPCOT Hi-Tech SEZ, Sunguvarchatram", tag: "Hi-Tech Manufacturing" },
  { name: "WOWTEK", sub: "A FIH Mobile Group Company", location: "SIPCOT Phase III, Sriperumbudur Taluk", tag: "Precision Mobile Hardware" },
];

/* ──────────────── THREE.JS PARTICLE CANVAS ──────────────── */
function HeroCanvas() {
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
    camera.position.z = 7;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    // Group 1: Cyan Particles
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
      size: 0.032,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.45,
    });
    const points1 = new THREE.Points(geo1, mat1);
    scene.add(points1);

    // Group 2: Violet Particles
    const count2 = 400;
    const pos2 = new Float32Array(count2 * 3);
    for (let i = 0; i < count2 * 3; i += 3) {
      pos2[i] = (Math.random() - 0.5) * 16;
      pos2[i + 1] = (Math.random() - 0.5) * 10;
      pos2[i + 2] = (Math.random() - 0.5) * 10;
    }
    const geo2 = new THREE.BufferGeometry();
    geo2.setAttribute("position", new THREE.BufferAttribute(pos2, 3));
    const mat2 = new THREE.PointsMaterial({
      size: 0.028,
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.4,
    });
    const points2 = new THREE.Points(geo2, mat2);
    scene.add(points2);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", onMouseMove);

    let frame = 0;
    const draw = () => {
      points1.rotation.y += 0.0005;
      points1.rotation.x += 0.0002;
      points2.rotation.y -= 0.0003;
      points2.rotation.x -= 0.00015;

      camera.position.x += (mouseX - camera.position.x) * 0.02;
      camera.position.y += (-mouseY - camera.position.y) * 0.02;
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
function AnimatedCounter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
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
            el.textContent = prefix + Math.round(end * eased).toLocaleString() + suffix;
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

/* ──────────────── MAIN PAGE COMPONENT ──────────────── */
export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedRole, setSelectedRole] = useState("Assembly Line");
  const [selectedCount, setSelectedCount] = useState("50–150 Workers");
  const [selectedShift, setSelectedShift] = useState("2 Shifts (Rotational)");

  /* ─── GSAP Scroll Animations ─── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      /* Reveal on scroll */
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });

      /* Stagger reveal for grid items */
      gsap.utils.toArray<HTMLElement>(".stagger-parent").forEach((parent) => {
        const children = parent.querySelectorAll(".stagger-child");
        gsap.fromTo(
          children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: parent, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      });

      /* Hero timeline - light professional entry */
      const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });
      heroTl
        // Badge slide down
        .fromTo(".hero-light-badge", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.1)
        // Heading slide up
        .fromTo(".hero-light-h1", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.25)
        // Sub text
        .fromTo(".hero-light-sub", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
        // Stats bar
        .fromTo(".hero-light-stats", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.55")
        // Actions
        .fromTo(".hero-light-actions", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        // Trust strip
        .fromTo(".hero-light-trust", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.45")
        // Carousel slide in from right
        .fromTo(".hero-light-carousel",
          { x: 60, opacity: 0, scale: 0.96 },
          { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power4.out" },
          0.2
        )
        // Cred card pop
        .fromTo(".hero-light-cred-card",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" },
          "-=0.4"
        );

      /* Process line animation */
      const isMobileProcess = window.innerWidth <= 700;
      gsap.fromTo(
        ".process-line",
        { 
          scaleX: isMobileProcess ? 1 : 0, 
          scaleY: isMobileProcess ? 0 : 1,
          transformOrigin: isMobileProcess ? "top center" : "left center"
        },
        {
          scaleX: 1,
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".process", start: "top 75%", end: "bottom 70%", scrub: 1 },
        }
      );

      /* Parallax images */
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((img) => {
        gsap.to(img, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: img.closest(".parallax-wrap"), start: "top bottom", end: "bottom top", scrub: true },
        });
      });

    }, root);

    return () => ctx.revert();
  }, []);

  /* ─── Auto-cycle hero slides ─── */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getDeploymentTime = () => {
    if (selectedCount === "25–50 Workers") return "24–48 Hours";
    if (selectedCount === "50–150 Workers") return "48–72 Hours";
    return "3–5 Days (Staged)";
  };

  return (
    <main ref={root}>
      {/* ═══════════════ PROFESSIONAL HERO ═══════════════ */}
      <section className="hero-light" id="home">
        <div className="hero-light-container">

          {/* LEFT COPY */}
          <div className="hero-light-copy">
            <div className="hero-light-badge">
              <span className="hero-light-dot" />
              Tamil Nadu&apos;s Premier Manpower Consulting Firm
            </div>

            <h1 className="hero-light-h1">
              Workforce Solutions
              <span className="hero-light-accent"> Built for Industry</span>
            </h1>

            <p className="hero-light-sub">
              Raptor Staffing Solutions supplies verified, compliance-ready manpower to Fortune 500 &amp; Tier-1 manufacturers across SIPCOT, Sriperumbudur &amp; Oragadam — with full PF, ESI &amp; CLRA statutory cover.
            </p>

            {/* Stats row */}
            <div className="hero-light-stats">
              <div className="hero-light-stat">
                <strong><AnimatedCounter end={3064} suffix="+" /></strong>
                <span className="hero-light-stat-label">Active Workers</span>
              </div>
              <div className="hero-light-stat-divider" />
              <div className="hero-light-stat">
                <strong><AnimatedCounter end={81} suffix="+" /></strong>
                <span className="hero-light-stat-label">College Partners</span>
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
            </div>

            {/* Actions */}
            <div className="hero-light-actions">
              <Link href="/contact" className="hero-light-cta-primary">
                Get a Workforce Quote
                <ArrowRight size={17} />
              </Link>
              <Link href="/services" className="hero-light-cta-secondary">
                Our Services
              </Link>
            </div>

            {/* Trust logos strip */}
            <div className="hero-light-trust">
              <span className="hero-light-trust-label">Trusted by</span>
              {clients.slice(0, 4).map((c) => (
                <span key={c.name} className="hero-light-trust-pill">{c.name}</span>
              ))}
            </div>
          </div>

          {/* RIGHT CAROUSEL */}
          <div className="hero-light-carousel">
            {/* Image slides */}
            <div className="hero-light-img-wrap">
              {heroSlides.map((slide, idx) => (
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
                <span className="hero-light-caption-label">{heroSlides[activeSlide].label}</span>
                <strong className="hero-light-caption-title">{heroSlides[activeSlide].title}</strong>
                <p className="hero-light-caption-desc">{heroSlides[activeSlide].desc}</p>
                <span className="hero-light-caption-stat">
                  <ShieldCheck size={14} />{heroSlides[activeSlide].stat}
                </span>
              </div>
            </div>

            {/* Slide dots */}
            <div className="hero-light-dots">
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  id={`hero-dot-${idx}`}
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
                <strong>100% PF &amp; ESI Compliant</strong>
                <span>Statutory Audited | Zero Violations</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════ STATS BAND ═══════════════ */}
      <div className="stats-band">
        {[
          { value: 6, suffix: "+", label: "Major Industry Clients", sub: "Tier-1 Auto & Electronics", icon: <Building2 size={24} /> },
          { value: 5, label: "Interstate Sourcing States", sub: "Pan-India Talent Pipeline", icon: <Globe size={24} /> },
          { label: "Rapid Deployment SLA", display: "24–72h", sub: "Guaranteed Plant Delivery", icon: <Clock size={24} /> },
          { label: "End-to-End Plant Support", display: "360°", sub: "Hostel, PF & Welfare Care", icon: <Target size={24} /> },
        ].map((item, i) => (
          <div key={i} className="stats-band-item">
            <div className="stats-icon">{item.icon}</div>
            <strong className="stats-value">{item.display || <AnimatedCounter end={item.value!} suffix={item.suffix || ""} />}</strong>
            <span className="stats-label">{item.label}</span>
            <span className="stats-sub">{item.sub}</span>
          </div>
        ))}
      </div>

      {/* ═══════════════ MARQUEE ═══════════════ */}
      <section className="marquee" style={{ marginTop: "60px" }}>
        <div>
          MANPOWER SUPPLY • ASSEMBLY LINE OPERATORS • WAREHOUSE & LOGISTICS • STATUTORY AUDIT • PF & ESI COMPLIANCE • CAMPUS RECRUITMENT • PRE-DEPLOYMENT TRAINING •{" "}
          <span>MANPOWER SUPPLY • ASSEMBLY LINE OPERATORS • WAREHOUSE & LOGISTICS • STATUTORY AUDIT • PF & ESI COMPLIANCE • CAMPUS RECRUITMENT • PRE-DEPLOYMENT TRAINING •</span>
        </div>
      </section>

      {/* ═══════════════ VISUAL SECTORS SHOWCASE ═══════════════ */}
      <section className="section" id="sectors" style={{ background: "#fbfaff" }}>
        <div className="section-head reveal">
          <div>
            <div className="section-label">01 / Workforce Capabilities</div>
            <h2>
              Visualising Our <em>Plant Workforce</em> in Action
            </h2>
          </div>
          <p>
            Real manpower on real production lines. We recruit, screen, and manage candidates across high-demand industrial disciplines.
          </p>
        </div>

        <div className="workforce-sector-grid stagger-parent">
          {visualSectors.map((sec, idx) => (
            <article key={idx} className="sector-visual-card stagger-child">
              <div className="sector-img-container parallax-wrap">
                <Image
                  src={sec.image}
                  alt={sec.title}
                  width={600}
                  height={450}
                  className="sector-img parallax-img"
                />
                <span className="sector-badge">{sec.badge}</span>
                <div className="sector-img-overlay">
                  <div className="sector-overlay-icon">{sec.icon}</div>
                </div>
              </div>
              <div className="sector-body">
                <h3>{sec.title}</h3>
                <p>{sec.desc}</p>
                <div className="sector-meta-pills">
                  {sec.pills.map((pill) => (
                    <span key={pill} className="sector-pill">
                      <CheckCircle2 size={10} /> {pill}
                    </span>
                  ))}
                </div>
                <Link href={sec.href} className="service-link" style={{ marginTop: "auto" }}>
                  <span>Explore service details</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════════ IMMERSIVE INDUSTRIAL CORRIDOR ═══════════════ */}
      <section className="immersive-showcase">
        <div className="immersive-bg parallax-wrap">
          <Image
            src="/images/hero_industrial_park.jpg"
            alt="SIPCOT Industrial Corridor Aerial View"
            fill
            className="immersive-bg-img parallax-img"
            style={{ objectFit: "cover" }}
          />
          <div className="immersive-overlay" />
        </div>
        <div className="immersive-content reveal">
          <span className="badge-pill" style={{ background: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}>
            <Factory size={14} /> SIPCOT Industrial Footprint
          </span>
          <h2>
            Anchored in Tamil Nadu&apos;s<br />
            <span className="immersive-accent">Manufacturing Epicenter</span>
          </h2>
          <p>
            Operating directly within Sriperumbudur, Oragadam, Sunguvarchatram, and Kanchipuram manufacturing hubs with immediate local response and 24–72 hour replacement SLAs.
          </p>
          <div className="immersive-stats">
            {[
              { icon: <MapPin size={18} />, label: "Sriperumbudur SEZ" },
              { icon: <MapPin size={18} />, label: "Oragadam Auto Corridor" },
              { icon: <MapPin size={18} />, label: "Sunguvarchatram Hi-Tech" },
              { icon: <MapPin size={18} />, label: "Vallam Vadagal Park" },
            ].map((loc, i) => (
              <span key={i} className="immersive-location">
                {loc.icon} {loc.label}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "30px" }}>
            <Link href="/network" className="light-btn">
              <span>View 19 Source Districts</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="secondary-btn" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff", background: "rgba(255,255,255,0.08)" }}>
              <span>Meet Our Team</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ MANPOWER ESTIMATOR ═══════════════ */}
      <section className="section" style={{ background: "#f8f9fc", paddingTop: "50px" }}>
        <div className="section-head reveal">
          <div>
            <div className="section-label">02 / Quick Workforce Planner</div>
            <h2>
              Estimate Your <em>Deployment Timeline</em>
            </h2>
          </div>
          <p>
            Configure your plant's immediate workforce requirements and get an instant deployment turnaround estimate.
          </p>
        </div>

        <div className="estimator-box reveal">
          <div className="estimator-grid">
            <div>
              <div className="estimator-control-group">
                <label>1. Select Industry Discipline</label>
                <div className="estimator-chip-row">
                  {["Assembly Line", "Logistics & Dispatch", "Quality Control", "General Factory"].map((r) => (
                    <button key={r} type="button" className={`estimator-chip ${selectedRole === r ? "active" : ""}`} onClick={() => setSelectedRole(r)}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div className="estimator-control-group">
                <label>2. Required Headcount Scale</label>
                <div className="estimator-chip-row">
                  {["25–50 Workers", "50–150 Workers", "150–500+ Workers"].map((c) => (
                    <button key={c} type="button" className={`estimator-chip ${selectedCount === c ? "active" : ""}`} onClick={() => setSelectedCount(c)}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div className="estimator-control-group" style={{ marginBottom: 0 }}>
                <label>3. Shift Configuration</label>
                <div className="estimator-chip-row">
                  {["Single General Shift", "2 Shifts (Rotational)", "3 Shifts (24/7 Operations)"].map((s) => (
                    <button key={s} type="button" className={`estimator-chip ${selectedShift === s ? "active" : ""}`} onClick={() => setSelectedShift(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="estimator-result-card">
              <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#a5f3fc", fontWeight: 800 }}>
                Estimated Deployment Window
              </span>
              <div style={{ fontSize: "28px", fontWeight: 800, color: "#fff", margin: "8px 0 6px", letterSpacing: "-0.02em" }}>
                {getDeploymentTime()}
              </div>
              <p style={{ fontSize: "12.5px", color: "#e0f2fe", lineHeight: 1.5, margin: "0 0 18px" }}>
                Customized for <strong>{selectedCount}</strong> in <strong>{selectedRole}</strong> across <strong>{selectedShift}</strong>.
              </p>

              <div style={{ background: "rgba(255,255,255,0.08)", padding: "14px", borderRadius: "14px", textAlign: "left", marginBottom: "22px" }}>
                {["100% PF, ESI & Labour Law Verified", "Pre-deployment Safety & 5S Inducted", "Dedicated On-Site Supervisor"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#fff", marginBottom: i < 2 ? "6px" : 0 }}>
                    <CheckCircle2 size={14} color="#34cddd" /> {item}
                  </div>
                ))}
              </div>

              <Link
                href={`/contact?role=${encodeURIComponent(selectedRole)}&count=${encodeURIComponent(selectedCount)}`}
                className="light-btn"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <span>Request Proposal for {selectedCount}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ VALUED CLIENTS ═══════════════ */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="section-head reveal">
          <div>
            <div className="section-label">03 / Our Valued Clients</div>
            <h2>
              Trusted by India's <em>Leading Manufacturers</em>
            </h2>
          </div>
          <p>
            We proudly supply and manage workforce solutions for multinational corporations and tier-1 suppliers across Tamil Nadu industrial hubs.
          </p>
        </div>

        <div className="client-grid stagger-parent">
          {clients.map((c, i) => (
            <div key={i} className="client-card stagger-child">
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div className="client-avatar">
                  {c.name[0]}
                </div>
                <div>
                  <div className="client-name">{c.name}</div>
                  <div className="client-sub">{c.sub}</div>
                </div>
              </div>
              <div style={{ marginBottom: "8px" }}>
                <span className="client-tag-pill">{c.tag}</span>
              </div>
              <div className="client-addr">
                <MapPin size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle", color: "var(--violet)" }} />
                {c.location}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ RECRUITMENT NETWORK ═══════════════ */}
      <section className="network">
        <div className="network-inner">
          <div className="network-copy reveal">
            <div className="section-label light">04 / Recruitment Network</div>
            <h2>District-Level Intelligence.<br />Multi-State Reach.</h2>
            <p>
              We maintain <strong>3,064+ confirmed headcounts</strong> across 19 districts in Tamil Nadu and conduct active sourcing across Odisha, West Bengal, Andhra Pradesh, Assam, and Kerala for interstate migration manpower.
            </p>
            <div className="regions">
              {["Thanjavur", "Mayiladuthurai", "Cuddalore", "Sivagangai", "Tiruvarur", "Pudukkotai", "Thoothukudi", "Nagapattinam"].map((x) => (
                <span key={x}>
                  <MapPin size={14} color="#80edf2" /> {x}
                </span>
              ))}
            </div>
            <div className="network-cta-group">
              <Link href="/network" className="network-cta-btn">
                <span>View Full District Headcount Data</span>
                <span className="network-cta-arrow">
                  <ArrowRight size={17} />
                </span>
              </Link>
              <div className="network-cta-badge">
                <span className="network-pulse-dot" />
                <span>19 Districts & 5 Migration States Live</span>
              </div>
            </div>
          </div>

          <div className="network-visual reveal">
            <div className="network-orbit-ring o1" />
            <div className="network-orbit-ring o2" />
            <div className="network-orbit-ring o3" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="network-dot" style={{ "--i": i } as React.CSSProperties} />
            ))}
            <div className="network-core">
              <Network size={44} color="#80edf2" />
              <b style={{ color: "#fff", marginTop: "4px", fontSize: "16px" }}>Raptor</b>
              <span>3,064+ Network</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESS PREVIEW ═══════════════ */}
      <section className="section process">
        <div className="section-head reveal">
          <div>
            <div className="section-label">05 / Recruitment Process</div>
            <h2>
              A Clear Path from <em>Brief</em> to <em>Factory Floor.</em>
            </h2>
          </div>
          <p>
            Our structured 8-stage pre-onboarding process ensures every candidate is verified, medically fit, and deployment-ready before day one.
          </p>
        </div>

        <div className="process-scroll-area">
          <div className="process-track">
            <div className="process-line" />
            {["Sourcing", "Screening", "Interview", "Verification", "Medical", "Offer", "Joining", "Onboarding"].map((x, i) => (
              <div className="process-step reveal" key={x}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{x}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="channel-cloud reveal">
          {[
            "Employee Referrals",
            "Internal Database",
            "Online Job Portals",
            "Social Media Campaigns",
            "Campus Drives",
            "Mega Job Fairs",
            "Walk-in Interviews",
            "Community Hiring Camps",
          ].map((x) => (
            <span key={x}>
              <CheckCircle2 size={15} color="#7457f5" /> {x}
            </span>
          ))}
        </div>

        <div className="process-cta-wrap reveal">
          <Link href="/process" className="process-cta-btn">
            <span>Explore Full Recruitment Methodology & SLAs</span>
            <span className="process-cta-arrow">
              <ArrowRight size={18} />
            </span>
          </Link>
          <div className="process-cta-meta">
            <span className="process-meta-item">
              <Clock size={15} color="#7457f5" />
              <span><strong>24–72h</strong> Candidate Shortlist SLA</span>
            </span>
            <span className="process-meta-divider">•</span>
            <span className="process-meta-item">
              <ShieldCheck size={15} color="#10b981" />
              <span><strong>100%</strong> Pre-Screened & Compliant</span>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
