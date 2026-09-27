"use client";

import { useEffect, useRef, useState } from "react";
import {
  Users2,
  ShieldCheck,
  Building2,
  Crown,
  GitBranch,
  CheckCircle2,
  Sparkles,
  ArrowDown,
  Layers,
  Clock,
  Award,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function OrganisationalStructureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [activeWing, setActiveWing] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".org-header > *",
        { y: 35, opacity: 0 },
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

      // Top Executive Nodes Animation
      gsap.fromTo(
        ".org-exec-node",
        { scale: 0.85, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 0.8,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 80%",
          },
        }
      );

      // Pipeline Connectors
      gsap.fromTo(
        ".org-flow-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 78%",
          },
        }
      );

      // Wings Cards Animation
      gsap.fromTo(
        ".org-wing-card",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".org-wings-grid",
            start: "top 80%",
          },
        }
      );

      // Bottom SLA Matrix Animation
      gsap.fromTo(
        ".org-sla-pill",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".org-sla-matrix",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const wings = [
    {
      id: 1,
      title: "Sourcing & Field Mobilisation",
      subtitle: "District & Interstate Talent Pipeline",
      accent: "cyan",
      icon: <Users2 size={24} color="#34cddd" />,
      badge: "19 Districts & 5 Migration States",
      colorGradient: "linear-gradient(135deg, #0c8ca4 0%, #34cddd 100%)",
      leadTitle: "Sourcing Operations Head",
      roles: [
        { title: "Team Leaders", desc: "District recruitment & zone supervision" },
        { title: "Field Recruiters", desc: "Ground sourcing in taluks & rural pockets" },
        { title: "Campus Coordinators", desc: "81+ polytechnic & ITI college tie-ups" },
        { title: "Interstate Mobilisers", desc: "Dedicated channels in Odisha, WB, AP, Assam & Kerala" },
        { title: "Tele-Calling Desk", desc: "Daily pre-screening & pipeline validation" },
      ],
      metric: "3,064+",
      metricLabel: "Headcounts Mobilised",
    },
    {
      id: 2,
      title: "HR Operations & Compliance",
      subtitle: "Audited Welfare, Safety & Governance",
      accent: "pink",
      icon: <ShieldCheck size={24} color="#f15ca4" />,
      badge: "100% Audited Legal Integrity",
      colorGradient: "linear-gradient(135deg, #f15ca4 0%, #f59e0b 100%)",
      leadTitle: "HR & Compliance Manager",
      roles: [
        { title: "HR Operations Executives", desc: "Daily plant gate management & onboarding" },
        { title: "Statutory Officers", desc: "PF, ESI, CLRA audits & monthly returns" },
        { title: "Payroll & Admin", desc: "Timely direct bank wage disbursements" },
        { title: "Training Officers", desc: "5S, safety protocols & production orientation" },
        { title: "Welfare & Hostel Staff", desc: "24/7 food, hygiene & boarding supervision" },
      ],
      metric: "100%",
      metricLabel: "PF & Labour Law Compliant",
    },
    {
      id: 3,
      title: "Business Development & Client Relations",
      subtitle: "Tier-1 OEM Partnerships & SLA Governance",
      accent: "violet",
      icon: <Building2 size={24} color="#a78bfa" />,
      badge: "Tier-1 SIPCOT Manufacturers",
      colorGradient: "linear-gradient(135deg, #6d50ec 0%, #818cf8 100%)",
      leadTitle: "BD & Key Account Manager",
      roles: [
        { title: "Business Development Lead", desc: "Industrial park client onboarding" },
        { title: "Key Account Managers", desc: "Dedicated liaison for Foxconn, Motherson & KYOWA" },
        { title: "Plant SLA Coordinators", desc: "Real-time shift requirement tracking" },
        { title: "Candidate Success Officers", desc: "Worker retention & dispute resolution" },
        { title: "Executive Escalation Desk", desc: "24-hour turnaround for emergency staffing" },
      ],
      metric: "24–72h",
      metricLabel: "Rapid Fulfillment SLA",
    },
  ];

  return (
    <section className="org-section" ref={sectionRef} id="org-structure">
      {/* Ambient Lighting Orbs */}
      <div className="org-orb org-orb-1" aria-hidden="true" />
      <div className="org-orb org-orb-2" aria-hidden="true" />
      <div className="org-orb org-orb-3" aria-hidden="true" />
      <div className="org-mesh-grid" aria-hidden="true" />

      <div className="org-container">
        {/* Header */}
        <div className="org-header">
          <div className="org-eyebrow">
            <Sparkles size={14} className="org-sparkle-icon" />
            <span>Operational Architecture</span>
          </div>
          <h2 className="org-title">
            Engineered for <span className="org-gradient-text">Speed, Governance &amp; Scale.</span>
          </h2>
          <p className="org-subtitle">
            A battle-tested, three-tier functional hierarchy designed to eliminate staffing bottlenecks, guarantee statutory compliance, and power zero-downtime plant operations.
          </p>
        </div>

        {/* ────── TIER 1 & 2: EXECUTIVE COMMAND HIERARCHY ────── */}
        <div className="org-hierarchy-canvas" ref={chartRef}>
          {/* Level 1: Proprietor */}
          <div className="org-level-wrap">
            <div className="org-exec-node org-node-proprietor">
              <div className="org-exec-crown">
                <Crown size={18} color="#facc15" />
              </div>
              <div className="org-exec-content">
                <span className="org-exec-badge">Executive Command</span>
                <h3 className="org-exec-name">Mr. Gowtham Ranganathan</h3>
                <span className="org-exec-role">Proprietor &amp; Founder</span>
                <p className="org-exec-focus">
                  Vision, Strategic Capital, Enterprise Client Trust &amp; Long-Term Industry Growth
                </p>
              </div>
            </div>
          </div>

          {/* Central Connecting Pipeline */}
          <div className="org-flow-wrapper">
            <div className="org-flow-line" />
            <div className="org-flow-pulse" />
          </div>

          {/* Level 2: General Manager */}
          <div className="org-level-wrap">
            <div className="org-exec-node org-node-gm">
              <div className="org-exec-icon-pod">
                <GitBranch size={18} color="#34cddd" />
              </div>
              <div className="org-exec-content">
                <span className="org-exec-badge gm-badge">Operational Governance</span>
                <h3 className="org-exec-name">Mr. Chandrasekaran D</h3>
                <span className="org-exec-role">General Manager — Operations</span>
                <p className="org-exec-focus">
                  Cross-Departmental Synchronization, Daily Shift Deployments &amp; Performance Delivery
                </p>
              </div>
            </div>
          </div>

          {/* Distribution Stream to 3 Wings */}
          <div className="org-dist-stream">
            <div className="org-dist-stem-down" />
            <div className="org-dist-bar" />
            <div className="org-dist-drops">
              <span className="org-drop drop-1" />
              <span className="org-drop drop-2" />
              <span className="org-drop drop-3" />
            </div>
          </div>
        </div>

        {/* ────── TIER 3: THREE FUNCTIONAL OPERATIONAL WINGS ────── */}
        <div className="org-wings-grid">
          {wings.map((wing, index) => {
            const isHovered = activeWing === wing.id;
            return (
              <article
                key={wing.id}
                className={`org-wing-card wing-${wing.accent} ${isHovered ? "active" : ""}`}
                onMouseEnter={() => setActiveWing(wing.id)}
                onMouseLeave={() => setActiveWing(null)}
              >
                {/* Glow Backdrop */}
                <div className="org-wing-glow" />

                {/* Top Badge & Metric */}
                <div className="org-wing-top">
                  <span className="org-wing-tag">
                    {wing.icon}
                    <span>Wing 0{index + 1}</span>
                  </span>
                  <div className="org-wing-stat">
                    <strong>{wing.metric}</strong>
                    <span>{wing.metricLabel}</span>
                  </div>
                </div>

                <h3 className="org-wing-title">{wing.title}</h3>
                <p className="org-wing-subtitle">{wing.subtitle}</p>

                <div className="org-wing-badge-pill">
                  <span className="org-live-dot" />
                  <span>{wing.badge}</span>
                </div>

                {/* Team Roles Breakdown */}
                <div className="org-roles-container">
                  <span className="org-roles-header">Key Functional Roles:</span>
                  <ul className="org-roles-list">
                    {wing.roles.map((r, i) => (
                      <li key={i} className="org-role-item">
                        <CheckCircle2 size={14} className="org-check-icon" />
                        <div>
                          <strong>{r.title}</strong>
                          <p>{r.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* ────── TIER 4: INTEGRATED SLA & GOVERNANCE MATRIX ────── */}
        <div className="org-sla-matrix">
          <div className="org-sla-intro">
            <span className="org-sla-tag">INTEGRATED SLA GOVERNANCE</span>
            <h4>Continuous Quality Assurance Across Every Engagement</h4>
          </div>
          <div className="org-sla-grid">
            <div className="org-sla-pill">
              <Clock size={18} color="#34cddd" />
              <div>
                <strong>24–72h Turnaround</strong>
                <span>Rapid Candidate Mobilisation</span>
              </div>
            </div>
            <div className="org-sla-pill">
              <ShieldCheck size={18} color="#f15ca4" />
              <div>
                <strong>100% Statutory Audits</strong>
                <span>PF, ESI &amp; CLRA Full Filing</span>
              </div>
            </div>
            <div className="org-sla-pill">
              <Zap size={18} color="#facc15" />
              <div>
                <strong>Zero Shift Disruptions</strong>
                <span>Dedicated Buffer Pool Sourcing</span>
              </div>
            </div>
            <div className="org-sla-pill">
              <Award size={18} color="#a78bfa" />
              <div>
                <strong>Single-Window POC</strong>
                <span>Direct Executive Accountability</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
