import type { Metadata } from "next";
import Link from "next/link";
import ServicesHeroSection from "@/components/ServicesHeroSection";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  LayoutDashboard,
  Search,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Manpower Staffing Services | Raptor Staffing Solutions Tamil Nadu",
  description:
    "Raptor Staffing Solutions offers skilled manpower supply, PF & ESI compliance, payroll management, self-assessment audits, and 240-day workforce management for manufacturers across SIPCOT industrial parks in Tamil Nadu.",
  keywords: [
    "skilled manpower supply Tamil Nadu",
    "staffing services Kanchipuram",
    "PF ESI manpower compliance",
    "payroll management manufacturing",
    "240 day Industrial Disputes Act staffing",
    "self-assessment audit manpower contractor",
    "absenteeism management Tamil Nadu",
    "contract labour compliance Tamil Nadu",
  ],
};

const mainServices = [
  {
    icon: Users,
    title: "Skilled & Unskilled Manpower Supply",
    desc: "We supply skilled, semi-skilled, and unskilled workers to manufacturing plants based on exact client requirements — all screened, verified, and ready to deploy.",
    features: ["Production line workers", "Quality inspectors & checkers", "Packing & assembly operators", "Supervisors & team leaders", "Housekeeping & facility staff"],
    tone: "violet",
    id: "industrial",
    aliasId: "manpower",
    image: "/images/factory_assembly.jpg",
    imageCaption: "Assembly Line & Manufacturing Workforce",
  },
  {
    icon: GraduationCap,
    title: "Campus & Job Fair Recruitment",
    desc: "We run structured campus recruitment drives and mega job fairs across 81+ colleges in 10 districts of Tamil Nadu to consistently supply fresh, motivated talent.",
    features: ["College campus drives", "Mega walk-in job fairs", "Community hiring camps", "ITI & polytechnic tie-ups", "Online job portal sourcing"],
    tone: "sky",
    id: "recruitment",
    image: "/images/campus_recruitment.jpg",
    imageCaption: "Campus Drives Across 81+ Partnered Colleges",
  },
  {
    icon: HeartHandshake,
    title: "HR & Payroll Management",
    desc: "From induction to payroll — we manage the complete HR lifecycle for every deployed worker so your team can focus on production, not administration.",
    features: ["Employee induction & on-boarding", "Salary & payroll processing", "PF, ESI, TDS deductions", "Attendance & shift tracking", "Leave & helpdesk management"],
    tone: "rose",
    id: "payroll",
    aliasId: "hr",
    image: "/images/training_safety.jpg",
    imageCaption: "Pre-Deployment Safety & Induction Training",
  },
  {
    icon: ShieldCheck,
    title: "Statutory Compliance & Audit",
    desc: "Full Labour Law compliance with zero exposure for our clients. We manage all statutory obligations under EPF, ESIC, CLRA, Bonus Act, and the Industrial Disputes Act.",
    features: ["PF / ESI registration & filing", "Bonus Act administration", "Labour Law compliance reports", "Self-assessment audit (SAA)", "240-day service management"],
    tone: "amber",
    id: "compliance",
    image: "/images/industrial_plant.jpg",
    imageCaption: "Audit-Ready Across All SIPCOT Facilities",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <ServicesHeroSection />


      {/* Core Services */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="section-head">
          <div>
            <div className="section-label">Core Services</div>
            <h2>Everything You Need from <em>One Staffing Partner</em></h2>
          </div>
          <p>We are designed to be a single-point solution for your complete workforce requirements — from sourcing to post-deployment management.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginTop: "48px" }}>
          {mainServices.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                id={svc.id}
                className="content-card service-core-card"
              >
                {svc.aliasId && <span id={svc.aliasId} style={{ position: "absolute", top: 0 }} />}

                {/* Left: Image Banner */}
                <div style={{ position: "relative", minHeight: "260px", background: "#172039" }}>
                  <img
                    src={svc.image}
                    alt={svc.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, transparent 40%, rgba(23,32,57,0.85) 100%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "18px",
                      right: "18px",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {svc.imageCaption}
                  </div>
                </div>

                {/* Middle: Title & Description */}
                <div style={{ padding: "34px 28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "14px",
                        background:
                          svc.tone === "violet"
                            ? "linear-gradient(135deg,#ede9fe,#ddd6fe)"
                            : svc.tone === "sky"
                            ? "linear-gradient(135deg,#e0f9fd,#bae8f1)"
                            : svc.tone === "rose"
                            ? "linear-gradient(135deg,#ffe4f0,#fecee4)"
                            : "linear-gradient(135deg,#fef3c7,#fde68a)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Icon
                        size={22}
                        color={
                          svc.tone === "violet"
                            ? "#6d28d9"
                            : svc.tone === "sky"
                            ? "#0c8ca4"
                            : svc.tone === "rose"
                            ? "#db2777"
                            : "#d97706"
                        }
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          color: "var(--muted)",
                        }}
                      >
                        0{i + 1}
                      </div>
                      <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 800 }}>{svc.title}</h3>
                    </div>
                  </div>
                  <p style={{ color: "var(--muted)", lineHeight: 1.65, margin: 0, fontSize: "14px" }}>
                    {svc.desc}
                  </p>
                </div>

                {/* Right: What's Included */}
                <div
                  style={{
                    padding: "34px 28px",
                    background: "#fafbff",
                    borderLeft: "1px solid var(--line)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--muted)",
                      margin: "0 0 14px",
                    }}
                  >
                    What's included
                  </p>
                  <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {svc.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "13.5px",
                          fontWeight: 600,
                          color: "#334155",
                        }}
                      >
                        <BadgeCheck size={15} color="#7457f5" style={{ flexShrink: 0 }} /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Management Ability */}
      <section className="section" style={{ background: "linear-gradient(180deg,#faf9ff,#f5f9ff)" }}>
        <div className="section-head">
          <div>
            <div className="section-label">Management Capability</div>
            <h2>Our <em>Management Ability</em> — In Practice</h2>
          </div>
          <p>We don't just supply workers — we actively manage their performance, attendance, welfare, and grievances on your behalf.</p>
        </div>
        <div className="grid-2" style={{ marginTop: "48px" }}>
          {[
            {
              icon: LayoutDashboard,
              title: "Shift & Attendance Management",
              color: "var(--violet)",
              points: ["Efficient shift planning aligned to production schedules", "Real-time attendance monitoring and reporting", "Absenteeism tracking and immediate replacement arrangements", "Overtime tracking with statutory limits"],
            },
            {
              icon: Zap,
              title: "Productivity & Performance",
              color: "var(--pink)",
              points: ["Daily productivity monitoring per line or department", "KPI tracking aligned to client objectives", "Team leader coaching and daily briefings", "Worker performance review cycles"],
            },
            {
              icon: HeartHandshake,
              title: "Employee Welfare & Relations",
              color: "#0c8ca4",
              id: "welfare",
              points: ["On-site worker welfare monitoring", "Grievance redressal and help desk support", "Worker counselling and motivation programmes", "Social security benefit registration and guidance"],
            },
            {
              icon: ClipboardCheck,
              title: "Absenteeism & Attrition Control",
              color: "#d97706",
              points: ["Daily, weekly, and monthly absenteeism analysis", "Root-cause analysis for attrition spikes", "Retention strategies and engagement activities", "Reserve bench strength for immediate replacement"],
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} id={item.id} className="content-card" style={{ padding: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#f4edff", display: "grid", placeItems: "center" }}>
                    <Icon size={24} color={item.color} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: "19px", fontWeight: 700 }}>{item.title}</h3>
                </div>
                <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {item.points.map((p, pi) => (
                    <li key={pi} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px", color: "var(--muted)", lineHeight: 1.55 }}>
                      <span style={{ color: item.color, fontWeight: 900, fontSize: "16px", marginTop: "-2px", flexShrink: 0 }}>›</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Grievance & Compliance */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="section-head">
          <div>
            <div className="section-label">Statutory Compliance Detail</div>
            <h2>Compliance Areas We <em>Fully Cover</em></h2>
          </div>
          <p>We handle every statutory obligation on behalf of the workers we deploy — ensuring you never face a compliance gap.</p>
        </div>
        <div className="grid-3" style={{ marginTop: "40px" }}>
          {[
            { label: "Provident Fund (PF)", desc: "Registration, monthly deductions, employee declarations, ECR filing, and grievance resolution under EPF Act." },
            { label: "ESI (Employee State Insurance)", desc: "Monthly ESI contributions, half-yearly returns, IP card generation, and benefit claim assistance." },
            { label: "Bonus Act", desc: "Annual bonus calculation, eligibility determination, and disbursement in compliance with Payment of Bonus Act." },
            { label: "Payroll Processing", desc: "Accurate monthly salary computation, payslip generation, and bank transfer coordination for all deployed workers." },
            { label: "Help Desk & Grievance", desc: "Dedicated worker helpdesk for salary queries, PF withdrawal, ESI benefits, and general HR grievances." },
            { label: "Labour Law Compliance", desc: "Full compliance under CLRA, Minimum Wages Act, Factories Act, and Industrial Disputes Act — with monthly compliance reports." },
          ].map((item, i) => (
            <div key={i} className="content-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "linear-gradient(135deg,var(--violet),var(--pink))", display: "grid", placeItems: "center", fontWeight: 900, fontSize: "13px", color: "#fff", flexShrink: 0 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <strong style={{ fontSize: "15px", fontWeight: 700 }}>{item.label}</strong>
              </div>
              <p style={{ margin: 0, fontSize: "13px", color: "var(--muted)", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 240-Day Rule / Contract Staffing */}
      <section id="contract" className="section" style={{ background: "linear-gradient(135deg,#1e1550 0%,#2a1560 50%,#3d2480 100%)", color: "#fff", borderRadius: "32px", margin: "0 max(4vw,20px) 60px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <div className="section-label light">Industrial Disputes Act Compliance</div>
          <h2 style={{ color: "#fff" }}>The <em style={{ color: "#a78bfa" }}>240-Day Rule</em> — Managed Correctly</h2>
          <p style={{ color: "#c4b9f5", fontSize: "17px", lineHeight: 1.7, marginBottom: "40px" }}>
            Under the Industrial Disputes Act, a workman becomes eligible for gratuity and other benefits after completing 240 continuous days of service. We maintain a rolling 240-day tracking system that protects your plant from unplanned statutory exposure.
          </p>
          <div className="grid-3" style={{ gap: "20px" }}>
            {[
              { num: "240", label: "Days tracked per worker", sub: "Continuous service monitoring" },
              { num: "Monthly", label: "Review & reporting", sub: "Sent to client HR team" },
              { num: "Zero", label: "Statutory surprises", sub: "Proactive risk mitigation" },
            ].map((stat, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.1)", borderRadius: "20px", padding: "28px", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(6px)" }}>
                <strong style={{ display: "block", fontSize: "32px", fontWeight: 900, color: "#e0d5ff", marginBottom: "6px" }}>{stat.num}</strong>
                <span style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{stat.label}</span>
                <span style={{ fontSize: "12px", color: "#c4b9f5" }}>{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Assessment Audit */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="section-head">
          <div>
            <div className="section-label">Self-Assessment Audit</div>
            <h2>Our Internal <em>Quality Assurance</em> Process</h2>
          </div>
          <p>We conduct periodic self-assessment audits across our staffing operations to maintain service quality and identify improvement opportunities before they affect client operations.</p>
        </div>
        <div className="audit-steps" style={{ maxWidth: "820px", marginTop: "40px" }}>
          {[
            { step: "1", title: "Requirement Gap Analysis", desc: "Identify headcount shortfalls versus agreed deployment targets across all client sites." },
            { step: "2", title: "Compliance Check", desc: "Review PF, ESI, Labour Law filings, Bonus calculations, and payroll accuracy for the audit period." },
            { step: "3", title: "Candidate Quality Review", desc: "Evaluate candidate screening pass rates, interview-to-offer ratios, and onboarding completion metrics." },
            { step: "4", title: "Attrition Deep-Dive", desc: "Analyse exit reasons, department-wise attrition trends, and cost-of-attrition for the period." },
            { step: "5", title: "Action Planning", desc: "Implement corrective measures, tighten SLAs where needed, and submit improvement report to client." },
          ].map((a) => (
            <div key={a.step} className="audit-step">
              <div className="audit-step-num">{a.step}</div>
              <div>
                <strong style={{ fontSize: "16px", fontWeight: 700, display: "block", marginBottom: "4px" }}>{a.title}</strong>
                <p style={{ margin: 0, fontSize: "14px", color: "var(--muted)", lineHeight: 1.55 }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

