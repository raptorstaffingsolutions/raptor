"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  ClipboardList,
  MessageSquare,
  FileCheck2,
  HeartPulse,
  Briefcase,
  CalendarCheck2,
  UserCheck,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  ChevronRight,
  BadgeCheck,
  Fingerprint,
  Stethoscope,
  Award,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Stage {
  num: string;
  phaseCode: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  icon: any;
  color: string;
  bgGlow: string;
  sla: string;
  qualityGates: string[];
  deliverables: string[];
  statutoryCheck: string;
}

const STAGES: Stage[] = [
  {
    num: "01",
    phaseCode: "STAGE 01 // DISCOVERY",
    title: "Sourcing & Outreach",
    category: "Talent Discovery",
    shortDesc: "Aggregating active candidate pools across 81+ partner colleges, employee referrals, and 19 Tamil Nadu source districts.",
    fullDesc: "We mobilize candidates simultaneously through our proprietary internal ATS repository, trusted referral channels from 3,000+ active workforce members, weekly walk-ins, and institutional tie-ups across Tier-2/3 industrial regions.",
    icon: Search,
    color: "#0284c7",
    bgGlow: "rgba(2, 132, 199, 0.14)",
    sla: "24-48 Hours Response",
    qualityGates: [
      "Minimum age & education qualification matching",
      "Willingness to commit to manufacturing shift patterns",
      "Initial demographic and regional logistics alignment",
    ],
    deliverables: [
      "Multi-source candidate funnel aggregation",
      "Immediate intake pipeline registration in internal ATS",
      "Pre-qualified roster aligned with client job briefs",
    ],
    statutoryCheck: "Initial Identity & Age Confirmation (18+ only)",
  },
  {
    num: "02",
    phaseCode: "STAGE 02 // EVALUATION",
    title: "Screening & Profiling",
    category: "Candidate Vetting",
    shortDesc: "Telephonic and preliminary in-person screening to assess physical eligibility, role attitude, and commute feasibility.",
    fullDesc: "Our veteran talent coordinators filter candidate applications through structured scoring rubrics. Over 60% of unqualified applicants are filtered out at this stage, ensuring only high-retention prospects advance to interviews.",
    icon: ClipboardList,
    color: "#7457f5",
    bgGlow: "rgba(116, 87, 245, 0.18)",
    sla: "Day 2 Candidate Shortlisting",
    qualityGates: [
      "Verification of past industrial or assembly experience",
      "Communication & behavioral attitude evaluation",
      "Shift rotation tolerance & long-term retention intent",
    ],
    deliverables: [
      "Standardized candidate assessment scorecards",
      "Verified shortlist submission to client hiring managers",
      "Zero ghosting candidate pre-scheduling",
    ],
    statutoryCheck: "Prior ESIC & EPFO Account Status Scan",
  },
  {
    num: "03",
    phaseCode: "STAGE 03 // ASSESSMENT",
    title: "Structured Interview",
    category: "Competency Appraisal",
    shortDesc: "Rigorous technical & behavioral appraisal conducted by Raptor HR panels with optional client joint evaluation.",
    fullDesc: "Candidates undergo competency-based interviews assessing hand-eye coordination, basic technical aptitude, attendance commitment, and factory discipline. For specialised roles, client floor supervisors are invited to join the panel.",
    icon: MessageSquare,
    color: "#f15ca4",
    bgGlow: "rgba(241, 92, 164, 0.18)",
    sla: "72-Hour Candidate Presentation",
    qualityGates: [
      "Direct technical skill & dexterity verification",
      "Punctuality, dress code & industrial hygiene appraisal",
      "Review of client-specific SLA suitability",
    ],
    deliverables: [
      "Final interview clearance certificate",
      "Batch interview summary matrix for HR audit",
      "Instant selection status communication to candidates",
    ],
    statutoryCheck: "Dual-Verification of Identification Papers",
  },
  {
    num: "04",
    phaseCode: "STAGE 04 // COMPLIANCE SHIELD",
    title: "Identity & Background Check",
    category: "Strict Verification",
    shortDesc: "100% Aadhaar biometric confirmation, PAN validation, education credential audit, and local police verification.",
    fullDesc: "We enforce a zero-tolerance policy against document falsification and impersonation. Every credential is cross-verified against official government verification portals, guaranteeing absolute legal and identity security.",
    icon: FileCheck2,
    color: "#10b981",
    bgGlow: "rgba(16, 185, 129, 0.18)",
    sla: "100% Verified Prior to Entry",
    qualityGates: [
      "Real-time Aadhaar OTP / QR biometric validation",
      "PAN card tax authority database verification",
      "Address proof & emergency contact on-ground verification",
    ],
    deliverables: [
      "Comprehensive statutory background dossier",
      "Digital verification archive with timestamped audits",
      "Police verification acknowledgement certificate",
    ],
    statutoryCheck: "Zero-Defect Statutory Compliance Seal",
  },
  {
    num: "05",
    phaseCode: "STAGE 05 // OCCUPATIONAL HEALTH",
    title: "Medical Fitness Screening",
    category: "Health & Safety",
    shortDesc: "Comprehensive pre-employment occupational health examination conducted at authorized empanelled diagnostic clinics.",
    fullDesc: "Every worker must receive medical clearance prior to stepping onto factory grounds. Medical examinations assess vision acuity (including colour blindness for electronics/automotive assembly), audiometry, and stamina for high-tempo shopfloors.",
    icon: HeartPulse,
    color: "#06b6d4",
    bgGlow: "rgba(6, 182, 212, 0.18)",
    sla: "24-Hour Medical Turnaround",
    qualityGates: [
      "Visual acuity & color discrimination certification",
      "Blood pressure, vitals & chronic illness check",
      "Substance-free toxicological screening standard",
    ],
    deliverables: [
      "Official Medical Fitness Certificate signed by MBBS Doctor",
      "Individual health records archived for factory compliance",
      "Special dietary or ergonomic guidance if needed",
    ],
    statutoryCheck: "Factories Act 1948 Health Compliance",
  },
  {
    num: "06",
    phaseCode: "STAGE 06 // CONTRACT ENGAGEMENT",
    title: "Offer & Statutory Terms",
    category: "Transparent Contract",
    shortDesc: "Formal employment offer issuance detailing transparent gross-to-net CTC, PF/ESI deductions, and benefits.",
    fullDesc: "We eliminate compensation misunderstandings. Our bilingual HR officers conduct a detailed contract walkthrough with each candidate in their native language (Tamil/English/Hindi), explaining take-home pay, overtime calculations, PF accumulation, and ESI hospital benefits.",
    icon: Briefcase,
    color: "#a855f7",
    bgGlow: "rgba(168, 85, 247, 0.18)",
    sla: "Same-Day Offer Issuance",
    qualityGates: [
      "100% transparent statutory pay structure (No hidden fees)",
      "Bilingual documentation explanation & candidate sign-off",
      "Pre-enrolment in group accidental insurance policies",
    ],
    deliverables: [
      "Signed Employment Agreement with clear role scope",
      "Written salary breakup sheet provided to candidate",
      "PF Form 11 & ESI Form 1 preliminary completion",
    ],
    statutoryCheck: "Minimum Wages Act (Tamil Nadu) Guaranteed",
  },
  {
    num: "07",
    phaseCode: "STAGE 07 // LOGISTICS & ACCESS",
    title: "Joining & Deployment Day",
    category: "Day-1 Mobilisation",
    shortDesc: "Full mobilization support: travel coordination, hostel/transit setup, biometric issuance, and Day-1 reporting.",
    fullDesc: "On joining day, Raptor deployment managers physically accompany new recruits to the client facility. We handle RFID security access tags, biometric attendance enrolment, and statutory documentation filings before the worker punches in.",
    icon: CalendarCheck2,
    color: "#f59e0b",
    bgGlow: "rgba(245, 158, 11, 0.18)",
    sla: "Zero Day-1 Dropout Commitment",
    qualityGates: [
      "100% on-site supervisor accompaniment",
      "Biometric access registration with client security",
      "PF/ESI portal immediate linking with UAN numbers",
    ],
    deliverables: [
      "Day-1 Welcome Kit: PPE, uniform, and identification badge",
      "Electronic attendance log transmitted to client HR",
      "Hostel accommodation and mess food allocation verified",
    ],
    statutoryCheck: "Statutory Register Form T (Tamil Nadu) Lodged",
  },
  {
    num: "08",
    phaseCode: "STAGE 08 // WORKSTATION READINESS",
    title: "Induction & Floor Buddying",
    category: "Shopfloor Readiness",
    shortDesc: "Plant 5S safety orientation, client SOP training, PPE protocol training, and 14-day senior worker buddy pairing.",
    fullDesc: "Before touching machinery or assembly lines, workers complete thorough plant safety orientation covering fire escape routes, machine guard protocols, cleanroom standards, and 5S workplace disciplines. Each recruit is assigned a senior buddy for seamless adaptation.",
    icon: UserCheck,
    color: "#ec4899",
    bgGlow: "rgba(236, 72, 153, 0.18)",
    sla: "Immediate Floor Productivity",
    qualityGates: [
      "Mandatory plant safety test completion (100% pass score)",
      "Client-specific standard operating procedure (SOP) sign-off",
      "14-day continuous supervisor check-ins & feedback",
    ],
    deliverables: [
      "Safety Induction Completion Certificate",
      "Workstation allocation sign-off from line manager",
      "Active welfare and grievance helpline activation",
    ],
    statutoryCheck: "Occupational Safety & Health (OSH) Certified",
  },
];

const TRUST_METRICS = [
  {
    icon: Fingerprint,
    title: "100% Biometric Authentication",
    desc: "Aadhaar verified via official UIDAI portal — zero candidate impersonation.",
    color: "#0284c7",
  },
  {
    icon: Stethoscope,
    title: "Pre-Deployment Medical Clear",
    desc: "Empanelled clinic health check with vision and fitness certification.",
    color: "#059669",
  },
  {
    icon: ShieldCheck,
    title: "Statutory Zero-Defect Guarantee",
    desc: "PF UAN generation & ESI insurance binding before Day-1 shift start.",
    color: "#7457f5",
  },
  {
    icon: Award,
    title: "98.2% 90-Day Retention Rate",
    desc: "Structured buddy pairing and proactive welfare support eliminates churn.",
    color: "#db2777",
  },
];

export default function PreOnboardingFlowSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const activeStage = STAGES[activeStageIndex];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".flow-header > *",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Stepper Bar Animation
      gsap.fromTo(
        ".flow-stepper-btn",
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.06,
          duration: 0.6,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".flow-stepper-track",
            start: "top 80%",
          },
        }
      );

      // Spotlight Card Entrance
      gsap.fromTo(
        spotlightRef.current,
        { y: 40, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: spotlightRef.current,
            start: "top 78%",
          },
        }
      );

      // Grid Cards Entrance
      gsap.fromTo(
        ".flow-card",
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
          },
        }
      );

      // Trust metrics
      gsap.fromTo(
        ".flow-metric-pill",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".flow-metrics-row",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSelectStage = (idx: number) => {
    setActiveStageIndex(idx);
    if (spotlightRef.current) {
      gsap.fromTo(
        spotlightRef.current,
        { opacity: 0.6, scale: 0.985 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
      );
    }
  };

  const handleNextStage = () => {
    handleSelectStage((activeStageIndex + 1) % STAGES.length);
  };

  const handlePrevStage = () => {
    handleSelectStage((activeStageIndex - 1 + STAGES.length) % STAGES.length);
  };

  return (
    <section ref={sectionRef} className="flow-section" id="pre-onboarding-pipeline">
      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* Header Block */}
        <div className="flow-header">
          <div className="flow-badge-glow">
            <span className="flow-badge-pulse" />
            <Sparkles size={14} className="flow-sparkle-icon" />
            <span>PROPRIETARY WORKFORCE PIPELINE</span>
          </div>

          <h2 className="flow-title">
            The 8-Stage Candidate Journey:{" "}
            <span className="flow-gradient-text">Zero Gaps. Zero Risk.</span>
          </h2>

          <p className="flow-subtitle">
            Every candidate mobilized by Raptor Staffing navigates an uncompromising 8-checkpoint pipeline before arriving at your factory gate. We combine strict statutory compliance with on-ground human diligence.
          </p>

          {/* Quick SLA Summary Pills */}
          <div className="flow-header-tags">
            <div className="flow-tag-item">
              <ShieldCheck size={16} color="#0284c7" />
              <span>8 Quality Checkpoints</span>
            </div>
            <div className="flow-tag-item">
              <Fingerprint size={16} color="#7457f5" />
              <span>100% Aadhaar Biometric Verified</span>
            </div>
            <div className="flow-tag-item">
              <Stethoscope size={16} color="#059669" />
              <span>Doctor-Certified Medical Clearance</span>
            </div>
            <div className="flow-tag-item">
              <Clock size={16} color="#db2777" />
              <span>48h - 7d Rapid Deployment SLAs</span>
            </div>
          </div>
        </div>

        {/* Interactive Step Track (Conduit) */}
        <div className="flow-stepper-scroll-area">
          <div className="flow-stepper-track-wrap">
            <div className="flow-conduit-line" />
            <div
              className="flow-conduit-fill"
              style={{
                "--fill-progress": `${((activeStageIndex + 1) / STAGES.length) * 100}%`,
              } as React.CSSProperties}
            />
            <div className="flow-stepper-track">
              {STAGES.map((s, idx) => {
                const StepIcon = s.icon;
                const isActive = idx === activeStageIndex;
                const isPassed = idx < activeStageIndex;
                return (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => handleSelectStage(idx)}
                    className={`flow-stepper-btn ${isActive ? "active" : ""} ${isPassed ? "passed" : ""}`}
                    style={{
                      borderColor: isActive ? s.color : isPassed ? "rgba(116, 87, 245, 0.35)" : "var(--line)",
                      boxShadow: isActive ? `0 10px 26px ${s.bgGlow}, 0 0 0 1px ${s.color}` : "0 4px 14px rgba(50, 40, 90, 0.04)",
                    }}
                    title={`Stage ${s.num}: ${s.title}`}
                  >
                    <div
                      className="flow-stepper-icon-disc"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${s.color}, #5938da)`
                          : isPassed
                          ? "linear-gradient(135deg, rgba(116, 87, 245, 0.12), rgba(241, 92, 164, 0.12))"
                          : "#f4f1fd",
                      }}
                    >
                      <StepIcon size={16} color={isActive ? "#fff" : isPassed ? "#7457f5" : "#65708b"} />
                    </div>
                    <span className="flow-stepper-num" style={{ color: isActive ? s.color : undefined }}>{s.num}</span>
                    <span className="flow-stepper-name">{s.title.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Stage Spotlight Inspector */}
        <div ref={spotlightRef} className="flow-spotlight-card">
          <div
            className="flow-spotlight-glow-corner"
            style={{
              background: `radial-gradient(circle at top right, ${activeStage.bgGlow}, transparent 70%)`,
            }}
          />

          <div className="flow-spotlight-top">
            <div className="flow-spotlight-title-group">
              <div className="flow-spotlight-phase-tag" style={{ color: activeStage.color, borderColor: activeStage.color }}>
                <span className="flow-pulsing-dot" style={{ background: activeStage.color }} />
                <span>{activeStage.phaseCode}</span>
                <span className="flow-tag-divider">|</span>
                <span className="flow-tag-cat">{activeStage.category}</span>
              </div>
              <h3 className="flow-spotlight-heading">{activeStage.title}</h3>
            </div>

            <div className="flow-spotlight-controls">
              <div className="flow-spotlight-counter">
                <span className="flow-spotlight-current">{activeStage.num}</span>
                <span className="flow-spotlight-slash">/</span>
                <span className="flow-spotlight-total">08</span>
              </div>
              <button
                type="button"
                onClick={handlePrevStage}
                className="flow-nav-btn flow-nav-prev"
                aria-label="Previous Stage"
              >
                <ArrowLeft size={18} strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={handleNextStage}
                className="flow-nav-btn flow-nav-next"
                style={{ background: activeStage.color }}
                aria-label="Next Stage"
              >
                <ArrowRight size={18} color="#ffffff" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="flow-spotlight-body">
            <div className="flow-spotlight-desc-col">
              <p className="flow-spotlight-lead">{activeStage.shortDesc}</p>
              <p className="flow-spotlight-deep">{activeStage.fullDesc}</p>

              {/* SLA Banner */}
              <div className="flow-spotlight-sla-box" style={{ borderColor: `${activeStage.color}40` }}>
                <Clock size={18} style={{ color: activeStage.color, flexShrink: 0 }} />
                <div>
                  <span className="flow-sla-label">Operational SLA & Turnaround</span>
                  <strong className="flow-sla-value" style={{ color: activeStage.color }}>{activeStage.sla}</strong>
                </div>
              </div>

              {/* Statutory Badge */}
              <div className="flow-statutory-shield">
                <ShieldCheck size={18} color="#10b981" />
                <span>
                  <strong>Statutory Standard: </strong>
                  {activeStage.statutoryCheck}
                </span>
              </div>
            </div>

            <div className="flow-spotlight-details-col">
              <div className="flow-checkpoint-box">
                <div className="flow-box-header">
                  <BadgeCheck size={16} color={activeStage.color} />
                  <h4>Strict Quality Gate Protocols</h4>
                </div>
                <ul className="flow-checklist">
                  {activeStage.qualityGates.map((gate, i) => (
                    <li key={i}>
                      <CheckCircle2 size={15} color={activeStage.color} className="flow-check-bullet" />
                      <span>{gate}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flow-checkpoint-box deliverables">
                <div className="flow-box-header">
                  <Sparkles size={16} color="#f15ca4" />
                  <h4>Documented Deliverables</h4>
                </div>
                <ul className="flow-checklist">
                  {activeStage.deliverables.map((del, i) => (
                    <li key={i}>
                      <ChevronRight size={15} color="#f15ca4" className="flow-check-bullet" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 8-Stage Overview Grid */}
        <div className="flow-grid-header">
          <div>
            <span className="flow-grid-badge">COMPLETE WORKFORCE ARCHITECTURE</span>
            <h3 className="flow-grid-title">All 8 Stages at a Glance</h3>
          </div>
          <p className="flow-grid-note">Click any stage card to inspect verification protocols and deliverables.</p>
        </div>

        <div ref={gridRef} className="flow-cards-grid">
          {STAGES.map((stage, idx) => {
            const CardIcon = stage.icon;
            const isCardActive = idx === activeStageIndex;
            return (
              <div
                key={stage.num}
                onClick={() => handleSelectStage(idx)}
                className={`flow-card ${isCardActive ? "card-active" : ""}`}
                style={{
                  borderColor: isCardActive ? stage.color : "var(--line)",
                  boxShadow: isCardActive
                    ? `0 16px 36px ${stage.bgGlow}, 0 0 0 1px ${stage.color}`
                    : "0 8px 24px rgba(50, 40, 90, 0.05)",
                }}
              >
                <div
                  className="flow-card-top-accent"
                  style={{
                    background: `linear-gradient(90deg, ${stage.color}, #7457f5)`,
                  }}
                />

                <div className="flow-card-header">
                  <div
                    className="flow-card-icon-wrap"
                    style={{
                      background: `linear-gradient(135deg, ${stage.bgGlow}, #fbf9ff)`,
                      borderColor: `${stage.color}45`,
                      color: stage.color,
                    }}
                  >
                    <CardIcon size={22} />
                  </div>

                  <div className="flow-card-meta">
                    <span className="flow-card-num" style={{ color: stage.color }}>{stage.num}</span>
                    <span className="flow-card-cat">{stage.category}</span>
                  </div>
                </div>

                <h4 className="flow-card-title">{stage.title}</h4>
                <p className="flow-card-desc">{stage.shortDesc}</p>

                <div className="flow-card-footer">
                  <span className="flow-card-sla" style={{ color: stage.color }}>
                    <Clock size={12} style={{ display: "inline", marginRight: "4px" }} />
                    {stage.sla.split(" ")[0]} SLA
                  </span>
                  <span className="flow-inspect-link" style={{ color: stage.color }}>
                    {isCardActive ? "Inspecting" : "Inspect"}
                    <ArrowRight size={13} style={{ marginLeft: "4px" }} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quality Assurance & Statutory Governance Row */}
        <div className="flow-metrics-row">
          {TRUST_METRICS.map((metric, i) => {
            const MetricIcon = metric.icon;
            return (
              <div key={i} className="flow-metric-pill">
                <div
                  className="flow-metric-icon-wrap"
                  style={{
                    background: `${metric.color}15`,
                    borderColor: `${metric.color}40`,
                    color: metric.color,
                  }}
                >
                  <MetricIcon size={20} />
                </div>
                <div>
                  <strong className="flow-metric-title">{metric.title}</strong>
                  <p className="flow-metric-desc">{metric.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Direct CTA Link */}
        <div className="flow-bottom-cta">
          <div className="flow-cta-content">
            <h4 className="flow-cta-title">Ready to deploy a thoroughly vetted workforce at your facility?</h4>
            <p className="flow-cta-desc">
              Request a tailored staffing proposal for your manufacturing plant in Sriperumbudur, Oragadam, Irungattukottai, or SIPCOT parks across Tamil Nadu.
            </p>
          </div>
          <Link href="/contact" className="flow-cta-btn">
            <span>Initiate Deployment Request</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
