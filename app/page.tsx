"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animated, useSpring } from "@react-spring/web";
import anime from "animejs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Manpower Supply",
    text: "Skilled, semi-skilled, and unskilled workforce for manufacturing plants across SIPCOT industrial parks in Tamil Nadu.",
    tone: "violet",
    href: "/services#manpower",
  },
  {
    icon: GraduationCap,
    title: "Campus & Job Fair Recruitment",
    text: "Structured campus drives, mega job fairs, and walk-in interviews across 81+ colleges in 10 districts of Tamil Nadu.",
    tone: "sky",
    href: "/services#recruitment",
  },
  {
    icon: HeartHandshake,
    title: "HR & Payroll Management",
    text: "Induction, pre-deployment training, PF, ESI, bonus, payroll processing, and employee grievance resolution.",
    tone: "rose",
    href: "/services#hr",
  },
  {
    icon: ShieldCheck,
    title: "Statutory Compliance",
    text: "Full Labour Law compliance, self-assessment audits, and 240-day service management per Industrial Disputes Act.",
    tone: "amber",
    href: "/services#compliance",
  },
];

function HeroCanvas() {
  const mount = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mount.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = mount.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    camera.position.z = 7;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);
    const geo = new THREE.BufferGeometry();
    const count = 850;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 12;
      pos[i + 1] = (Math.random() - 0.5) * 8;
      pos[i + 2] = (Math.random() - 0.5) * 8;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ size: 0.035, color: 0x7c3aed, transparent: true, opacity: 0.55 });
    const points = new THREE.Points(geo, mat);
    scene.add(points);
    let frame = 0;
    const draw = () => { points.rotation.y += 0.0008; points.rotation.x += 0.00025; renderer.render(scene, camera); frame = requestAnimationFrame(draw); };
    draw();
    const resize = () => { camera.aspect = el.clientWidth / el.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(el.clientWidth, el.clientHeight); };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); renderer.dispose(); geo.dispose(); mat.dispose(); renderer.domElement.remove(); };
  }, []);
  return <div className="hero-canvas" ref={mount} aria-hidden="true" />;
}

function ServiceCard({ item, index }: { item: (typeof services)[number]; index: number }) {
  const [style, api] = useSpring(() => ({ transform: "translateY(0px) scale(1)", boxShadow: "0 18px 60px rgba(74,55,130,.08)" }));
  const Icon = item.icon;
  return (
    <animated.article
      className={"service-card " + item.tone}
      style={style}
      onMouseEnter={() => api.start({ transform: "translateY(-10px) scale(1.015)", boxShadow: "0 30px 80px rgba(74,55,130,.17)" })}
      onMouseLeave={() => api.start({ transform: "translateY(0px) scale(1)", boxShadow: "0 18px 60px rgba(74,55,130,.08)" })}
    >
      <span className="card-number">0{index + 1}</span>
      <Icon size={32} />
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      <Link href={item.href} className="service-link">
        Learn more <ArrowRight size={14} />
      </Link>
    </animated.article>
  );
}

const clients = [
  { name: "Bharat FIH", sub: "A Foxconn Technology Group Company", location: "SIPCOT Industrial Park Phase-II, Sunguvarchatram, Sriperumbudur – 602 106" },
  { name: "KYOWA", sub: "Aluminium Metal Manufacturing", location: "Plot No. VV 8, SIPCOT Industrial Park, Vallam Vadagal Village, Sriperumbudur – 631 604" },
  { name: "KIML", sub: "Kyungshin Industrial Motherson Pvt. Ltd.", location: "Survey No. 451, 452A, 444, Oragadam Village, Mathur Village, Sipcot Growth Centre, Sriperumbudur – 602 105" },
  { name: "Motherson Polymer Solutions", sub: "Motherson Group", location: "A4, SIPCOT Industrial Growth Center, Chengalpet–Sriperumbudur Road, Oragadam, Tamil Nadu" },
  { name: "Rising Stars Hi-Tech", sub: "A Bharat FIH Company", location: "M2/A-1, SIPCOT Hi-Tech SEZ, Industrial Park Phase II, Sunguvarchatram, Kanchipuram – 602 306" },
  { name: "WOWTEK", sub: "A FIH Mobile Group Company", location: "Phase III, SIPCOT Industrial Park, Pondur Village, Sriperumbudur Taluk, Kanchipuram – 602 105" },
];

export default function Home() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
        gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } })
      );
      gsap.fromTo(".process-line", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".process", start: "top 75%", end: "bottom 70%", scrub: 1 } });
    }, root);
    anime({ targets: ".hero-word", translateY: [50, 0], opacity: [0, 1], delay: anime.stagger(80), duration: 850, easing: "easeOutQuart" });
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root}>
      {/* ───── Hero ───── */}
      <section className="hero" id="home">
        <HeroCanvas />
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="hero-copy">
          <p className="eyebrow hero-word">
            <Sparkles size={16} /> Trusted Manpower & Recruitment Partner — Tamil Nadu
          </p>
          <h1>
            <span className="hero-word">People Power.</span>
            <span className="gradient-text hero-word">Plant Productivity.</span>
          </h1>
          <p className="hero-lede hero-word">
            Raptor Staffing Solutions supplies skilled, semi-skilled, and unskilled manpower to leading manufacturers across SIPCOT industrial corridors — with full PF, ESI, and Labour Law compliance.
          </p>
          <div className="hero-actions hero-word">
            <Link href="/contact" className="primary">
              <span>Request Manpower</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/about" className="text-link">
              <span>About Raptor</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
        <div className="hero-proof hero-word">
          <div><strong>3,064+</strong><span>confirmed headcounts</span></div>
          <div><strong>19</strong><span>source districts</span></div>
          <div><strong>81+</strong><span>college tie-ups</span></div>
          <div><strong>100%</strong><span>statutory compliance</span></div>
        </div>
      </section>

      {/* ───── Stats Band ───── */}
      <div className="stats-band">
        <div className="stats-band-item">
          <strong>6+</strong>
          <span>Major Industry Clients</span>
        </div>
        <div className="stats-band-item">
          <strong>5</strong>
          <span>Interstate Sourcing States</span>
        </div>
        <div className="stats-band-item">
          <strong>24–72h</strong>
          <span>Deployment SLA</span>
        </div>
        <div className="stats-band-item">
          <strong>360°</strong>
          <span>Workforce Management</span>
        </div>
      </div>

      {/* ───── Marquee ───── */}
      <section className="marquee" style={{ marginTop: "60px" }}>
        <div>
          MANPOWER SUPPLY • CAMPUS RECRUITMENT • PAYROLL PROCESSING • PF & ESI COMPLIANCE • EMPLOYEE WELFARE • SHIFT MANAGEMENT • STATUTORY AUDIT • GRIEVANCE RESOLUTION •{" "}
          <span>MANPOWER SUPPLY • CAMPUS RECRUITMENT • PAYROLL PROCESSING • PF & ESI COMPLIANCE • EMPLOYEE WELFARE • SHIFT MANAGEMENT • STATUTORY AUDIT • GRIEVANCE RESOLUTION •</span>
        </div>
      </section>

      {/* ───── About Teaser ───── */}
      <section className="section about">
        <div className="section-label reveal">01 / Who We Are</div>
        <div className="about-grid">
          <h2 className="reveal">
            Simplifying Hiring. <em>Empowering Manufacturing.</em>
          </h2>
          <div className="about-copy reveal">
            <p>
              Raptor Staffing Solutions specialises in providing manpower of various categories as per client requirements. We connect businesses with qualified candidates — skilled, semi-skilled, and unskilled — for their complete workforce needs.
            </p>
            <p style={{ marginTop: "14px" }}>
              We are a <strong>friendly, affordable, efficient, and stress-free</strong> recruitment partner. Our services are structured to be <strong>at no extra cost to employers</strong>, making hiring simpler and more efficient for every manufacturing plant we serve.
            </p>
            <div className="trust-line">
              <BadgeCheck size={20} /> Responsive. Proactive. Built around your production needs.
            </div>
            <div style={{ marginTop: "20px" }}>
              <Link href="/about" className="text-link" style={{ fontSize: "15px" }}>
                <span>Meet our leadership team</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div className="vision-wrap reveal">
          <article>
            <Target />
            <small>Our Vision</small>
            <h3>Provide manpower solutions of the highest standards through value-added services.</h3>
            <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "12px" }}>
              Establish Raptor among the finest staffing partners across all departments of our core competency in Tamil Nadu.
            </p>
          </article>
          <article>
            <Sparkles />
            <small>Our Mission</small>
            <h3>Deliver the best service to clients and workers with efficiency and integrity.</h3>
            <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "12px" }}>
              Backed by expert consultants in respective fields, we aim to be the first choice of the manufacturing industry through an unrivalled blend of knowledge and cross-border skills.
            </p>
          </article>
        </div>
      </section>

      {/* ───── Services Grid ───── */}
      <section className="section services">
        <div className="section-head reveal">
          <div>
            <div className="section-label">02 / What We Deliver</div>
            <h2>One Partner.<br /><span className="gradient-text">Every Workforce Need.</span></h2>
          </div>
          <div>
            <p>From sourcing and screening to payroll and statutory compliance — we manage the complete manpower lifecycle.</p>
            <div style={{ marginTop: "14px" }}>
              <Link href="/services" className="primary" style={{ padding: "10px 18px", fontSize: "13px" }}>
                <span>View All Services</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
        <div className="services-grid">
          {services.map((x, i) => <ServiceCard key={x.title} item={x} index={i} />)}
        </div>
      </section>

      {/* ───── Valued Clients ───── */}
      <section className="section" style={{ background: "#fff", paddingTop: "60px" }}>
        <div className="section-head reveal">
          <div>
            <div className="section-label">03 / Our Valued Clients</div>
            <h2>Trusted by India's <em>Leading Manufacturers</em></h2>
          </div>
          <p>
            We proudly serve global manufacturers and multinational corporations operating within SIPCOT industrial parks in the Kanchipuram and Sriperumbudur belt.
          </p>
        </div>
        <div className="client-grid reveal">
          {clients.map((c, i) => (
            <div key={i} className="client-card">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "linear-gradient(135deg,#ede9fe,#fce7f3)", display: "grid", placeItems: "center", fontWeight: 900, fontSize: "17px", color: "var(--violet)", flexShrink: 0 }}>
                  {c.name[0]}
                </div>
                <div>
                  <div className="client-name" style={{ fontSize: "16px" }}>{c.name}</div>
                  <div className="client-sub">{c.sub}</div>
                </div>
              </div>
              <div className="client-addr">
                <MapPin size={12} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle", color: "var(--violet)" }} />
                {c.location}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── Recruitment Network ───── */}
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
                <span key={x}><MapPin size={14} color="#80edf2" />{x}</span>
              ))}
            </div>
            <div style={{ marginTop: "28px" }}>
              <Link href="/network" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#caf7fb", fontWeight: 700, fontSize: "15px", borderBottom: "1px solid rgba(202,247,251,0.5)", paddingBottom: "4px" }}>
                <span>View full district headcount data</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="network-visual reveal">
            <div className="orbit o1" />
            <div className="orbit o2" />
            <div className="orbit o3" />
            <div className="network-core">
              <Network size={42} color="#80edf2" />
              <b style={{ color: "#fff", marginTop: "4px" }}>Raptor</b>
              <span>Talent Network</span>
            </div>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <i key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── Process Preview ───── */}
      <section className="section process">
        <div className="section-head reveal">
          <div>
            <div className="section-label">05 / Recruitment Process</div>
            <h2>A Clear Path from <em>Brief</em> to <em>Factory Floor.</em></h2>
          </div>
          <p>Our structured 8-stage pre-onboarding process ensures every candidate is verified, medically fit, and deployment-ready before day one.</p>
        </div>
        <div className="process-track">
          <div className="process-line" />
          {["Sourcing", "Screening", "Interview", "Verification", "Medical", "Offer", "Joining", "Onboarding"].map((x, i) => (
            <div className="process-step reveal" key={x}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{x}</h3>
            </div>
          ))}
        </div>
        <div className="channel-cloud reveal">
          {["Employee Referrals", "Internal Database", "Online Job Portals", "Social Media", "Campus Drives", "Mega Job Fairs", "Walk-in Interviews", "Community Hiring Camps"].map((x) => (
            <span key={x}><CheckCircle2 size={15} color="#7457f5" />{x}</span>
          ))}
        </div>
        <div style={{ marginTop: "28px", textAlign: "center" }}>
          <Link href="/process" className="text-link" style={{ fontSize: "16px" }}>
            <span>See full recruitment methodology & SLAs</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="cta-section">
        <div className="cta-panel reveal">
          <div>
            <div className="section-label light">Build Your Workforce With Us</div>
            <h2>Ready for a staffing partner who keeps your lines moving?</h2>
            <p className="cta-desc">
              Contact our Kanchipuram head office or Sunguvarchatram industrial branch for a tailored manpower proposal within 24 hours.
            </p>
          </div>
          <div className="cta-actions">
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link href="/contact" className="light-btn">
                <span>Send Manpower Brief</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/process" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", padding: "14px 20px", borderRadius: "15px", fontWeight: 700, fontSize: "14px" }}>
                <span>Our Hiring Process</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            <div style={{ marginTop: "14px" }}>
              <p><Building2 size={18} style={{ flexShrink: 0 }} /><span>Head Office: No. 6, First Floor, Gandhi Road, Kanchipuram – 631501</span></p>
              <p style={{ marginTop: "8px" }}><MapPin size={18} style={{ flexShrink: 0 }} /><span>Branch: No.365/2C, Vijay Complex (F02), Walajabad Road, Sunguvarchatram – 602106</span></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
