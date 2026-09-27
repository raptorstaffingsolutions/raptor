"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Target,
  ShieldCheck,
  Compass,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  HeartHandshake,
  TrendingUp,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VisionMissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate Header
      gsap.fromTo(
        ".vm-header > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Animate Vision & Mission Cards with 3D entrance
      gsap.fromTo(
        ".vm-card",
        { y: 60, opacity: 0, scale: 0.94, rotateX: 8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          stagger: 0.2,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        }
      );

      // Animate Feature Pills inside cards
      gsap.fromTo(
        ".vm-pillar-pill",
        { y: 15, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: "back.out(1.5)",
          delay: 0.3,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          },
        }
      );

      // Animate Bottom Pillars Ribbon
      gsap.fromTo(
        ".vm-core-pillar",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ribbonRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const coreValues = [
    {
      icon: <ShieldCheck size={20} color="#34cddd" />,
      title: "100% Legal Integrity",
      desc: "Zero-compromise statutory compliance covering PF, ESI, and labour department audits.",
    },
    {
      icon: <Zap size={20} color="#f15ca4" />,
      title: "Operational Velocity",
      desc: "Guaranteed 24–72 hour deployment SLAs tailored to high-demand factory schedules.",
    },
    {
      icon: <HeartHandshake size={20} color="#facc15" />,
      title: "Worker Dignity & Care",
      desc: "Hygienic hostels, transparent payroll, and welfare management ensuring high worker retention.",
    },
    {
      icon: <TrendingUp size={20} color="#a78bfa" />,
      title: "Uptime-Driven Quality",
      desc: "Pre-screened, verified, and medical-cleared operators protecting daily plant output.",
    },
  ];

  return (
    <section className="vm-section" ref={sectionRef} id="vision-mission">
      {/* Decorative Cosmic Lighting Orbs */}
      <div className="vm-orb vm-orb-violet" aria-hidden="true" />
      <div className="vm-orb vm-orb-cyan" aria-hidden="true" />
      <div className="vm-orb vm-orb-pink" aria-hidden="true" />
      <div className="vm-grid-mesh" aria-hidden="true" />

      <div className="vm-container">
        {/* Section Header */}
        <div className="vm-header">
          <div className="vm-eyebrow">
            <Sparkles size={14} className="vm-sparkle-icon" />
            <span>Guiding Philosophy & DNA</span>
          </div>
          <h2 className="vm-title">
            The Purpose That <span className="vm-gradient-text">Drives Every Placement.</span>
          </h2>
          <p className="vm-subtitle">
            Our guiding philosophy unites rapid workforce deployment with unwavering statutory integrity — ensuring Raptor remains the trusted staffing partner for Tamil Nadu&apos;s industrial powerhouses.
          </p>
        </div>

        {/* Master Vision & Mission Cards */}
        <div className="vm-cards-grid" ref={cardsRef}>
          {/* ────── VISION CARD ────── */}
          <article className="vm-card vm-card-vision">
            <div className="vm-card-glow" />
            <div className="vm-card-badge-row">
              <span className="vm-badge-tag vision-tag">
                <Compass size={13} />
                <span>Our Vision</span>
              </span>
              <span className="vm-stat-badge">
                <span className="vm-pulse-dot" />
                <span>Benchmark 2030</span>
              </span>
            </div>

            <div className="vm-card-icon-wrap vision-icon-wrap">
              <Target size={36} color="#ffffff" />
            </div>

            <h3 className="vm-card-heading">
              Establish the Gold Standard in Industrial Manpower Solutions
            </h3>

            <p className="vm-card-desc">
              To establish Raptor Staffing Solutions amongst the finest players in all departments of our core competency — becoming the standard-setting staffing partner for manufacturing, automotive, and logistics hubs across Tamil Nadu and national industrial corridors.
            </p>

            <div className="vm-pillars-section">
              <span className="vm-pillars-title">Key Strategic Focus Areas:</span>
              <div className="vm-pillars-wrap">
                <span className="vm-pillar-pill">
                  <CheckCircle2 size={13} color="#80edf2" />
                  <span>Standardized Operator Sourcing</span>
                </span>
                <span className="vm-pillar-pill">
                  <CheckCircle2 size={13} color="#80edf2" />
                  <span>Zero Assembly Line Downtime</span>
                </span>
                <span className="vm-pillar-pill">
                  <CheckCircle2 size={13} color="#80edf2" />
                  <span>Interstate Talent Scalability</span>
                </span>
              </div>
            </div>

            <div className="vm-card-footer">
              <div className="vm-metric-pill">
                <strong>3,064+</strong>
                <span>Active Field Deployments</span>
              </div>
              <div className="vm-badge-target">
                <span>Value-Added Operations</span>
              </div>
            </div>
          </article>

          {/* ────── MISSION CARD ────── */}
          <article className="vm-card vm-card-mission">
            <div className="vm-card-glow" />
            <div className="vm-card-badge-row">
              <span className="vm-badge-tag mission-tag">
                <Award size={13} />
                <span>Our Mission</span>
              </span>
              <span className="vm-stat-badge">
                <span className="vm-pulse-dot" />
                <span>100% Compliance</span>
              </span>
            </div>

            <div className="vm-card-icon-wrap mission-icon-wrap">
              <ShieldCheck size={36} color="#ffffff" />
            </div>

            <h3 className="vm-card-heading">
              Deliver Peak Service to Clients &amp; Workers with Efficiency &amp; Integrity
            </h3>

            <p className="vm-card-desc">
              Backed by expert on-ground recruitment infrastructure across 19 districts and 5 migration states, we aim to be the first choice of plant managers — delivering an unrivalled blend of cross-border talent, swift deployment velocity, and transparent governance.
            </p>

            <div className="vm-pillars-section">
              <span className="vm-pillars-title">Core Execution Commitments:</span>
              <div className="vm-pillars-wrap">
                <span className="vm-pillar-pill">
                  <CheckCircle2 size={13} color="#fca5a5" />
                  <span>Statutory PF, ESI &amp; CLRA Audited</span>
                </span>
                <span className="vm-pillar-pill">
                  <CheckCircle2 size={13} color="#fca5a5" />
                  <span>24–72h Rapid Turnaround SLA</span>
                </span>
                <span className="vm-pillar-pill">
                  <CheckCircle2 size={13} color="#fca5a5" />
                  <span>Complete Hostel &amp; Welfare Care</span>
                </span>
              </div>
            </div>

            <div className="vm-card-footer">
              <div className="vm-metric-pill">
                <strong>100%</strong>
                <span>Audited Legal Compliance</span>
              </div>
              <div className="vm-badge-target">
                <span>Zero Labour Disruption</span>
              </div>
            </div>
          </article>
        </div>

        {/* ────── BOTTOM 4 FOUNDATIONAL PILLARS ────── */}
        <div className="vm-core-ribbon" ref={ribbonRef}>
          <div className="vm-ribbon-head">
            <span className="vm-ribbon-tag">OUR CORE DNA</span>
            <h4>Four Cornerstones That Underpin Every Raptor Partnership</h4>
          </div>
          <div className="vm-core-grid">
            {coreValues.map((v, i) => (
              <div key={i} className="vm-core-pillar">
                <div className="vm-pillar-icon-box">{v.icon}</div>
                <h5>{v.title}</h5>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Link to Solutions */}
        <div className="vm-footer-action">
          <Link href="/services" className="vm-explore-btn">
            <span>Explore How Our Values Power Factory Solutions</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
