import type { Metadata } from "next";
import Link from "next/link";
import ProcessHeroSection from "@/components/ProcessHeroSection";
import CTASection from "@/components/CTASection";
import PreOnboardingFlowSection from "@/components/PreOnboardingFlowSection";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  GraduationCap,
  MessageSquare,
  ShieldCheck,
  Star,
  UserPlus,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Recruitment Process | Raptor Staffing Solutions Tamil Nadu",
  description:
    "Raptor Staffing Solutions follows an 8-stage pre-onboarding recruitment process — from sourcing and screening to medical verification and factory floor onboarding. Trusted by SIPCOT manufacturers in Tamil Nadu.",
  keywords: [
    "manpower recruitment process Tamil Nadu",
    "staffing process SIPCOT Kanchipuram",
    "pre-onboarding recruitment steps",
    "candidate sourcing Tamil Nadu factories",
    "campus recruitment manufacturing",
    "job fair Tamil Nadu",
    "worker verification process",
    "manpower onboarding process",
  ],
};

const channels = [
  { icon: Users, label: "Employee Referrals", desc: "Trusted referral network from existing Raptor-deployed workers" },
  { icon: BookOpen, label: "Internal Database", desc: "Pre-screened candidate pool maintained in our proprietary ATS" },
  { icon: GraduationCap, label: "Campus Drives", desc: "Structured drives in 81+ colleges across 10 TN districts" },
  { icon: Star, label: "Mega Job Fairs", desc: "Large-scale job fairs conducted at community & district venues" },
  { icon: UserPlus, label: "Walk-in Interviews", desc: "Weekly walk-in drives at Kanchipuram and Sunguvarchatram" },
  { icon: ShieldCheck, label: "Sub-Vendor Network", desc: "Trusted agency network for interstate migration sourcing" },
  { icon: MessageSquare, label: "Social Media", desc: "Targeted Facebook, WhatsApp, and job portal campaigns" },
  { icon: Building2, label: "Community Camps", desc: "On-site rural hiring camps in source districts of Tamil Nadu" },
];

export default function ProcessPage() {
  return (
    <main>
      <ProcessHeroSection />
      
      {/* 8-Stage Pre-Onboarding Flow Architecture */}
      <div id="stages">
        <PreOnboardingFlowSection />
      </div>

      {/* Sourcing Channels */}
      <section className="section" style={{ background: "linear-gradient(180deg,#faf9ff,#f5f9ff)" }}>
        <div className="section-head">
          <div>
            <div className="section-label">Sourcing Channels</div>
            <h2>Where We Find <em>Your Workforce</em></h2>
          </div>
          <p>We tap eight distinct sourcing channels simultaneously to build a consistent, quality pipeline — so you're never left short on manpower.</p>
        </div>
        <div className="channel-grid" style={{ marginTop: "48px" }}>
          {channels.map((ch, i) => {
            const Icon = ch.icon;
            return (
              <div key={i} className="channel-pill" style={{ flexDirection: "column", alignItems: "flex-start", gap: "10px", padding: "20px" }}>
                <div className="channel-pill-icon">
                  <Icon size={18} />
                </div>
                <strong style={{ fontSize: "14px", display: "block" }}>{ch.label}</strong>
                <span style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.5 }}>{ch.desc}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* SLA & Commitments */}
      <section id="sla" className="section" style={{ background: "#fff" }}>
        <div className="section-head">
          <div>
            <div className="section-label">Service Level Commitments</div>
            <h2>Response Times & <em>Delivery SLAs</em></h2>
          </div>
          <p>We commit to clear turnaround timelines for every stage of the recruitment and deployment process.</p>
        </div>
        <div className="grid-3" style={{ marginTop: "40px" }}>
          {[
            { metric: "24 hrs", label: "Requirement acknowledgement", desc: "We confirm receipt and understanding of your manpower requirement within 24 hours." },
            { metric: "72 hrs", label: "First candidate profiles", desc: "Screened and shortlisted candidate CVs delivered to your HR team within 72 hours." },
            { metric: "7 days", label: "Deployment-ready candidates", desc: "For standard unskilled and semi-skilled roles, first batch ready for deployment within 7 working days." },
            { metric: "Monthly", label: "Compliance reports", desc: "PF, ESI, payroll, and statutory compliance dossier submitted to client every month." },
            { metric: "Daily", label: "Attendance updates", desc: "Real-time or daily attendance reports for all deployed workers across your facility." },
            { metric: "Immediate", label: "Grievance response", desc: "Worker grievances escalated to our HR team receive same-day acknowledgement and resolution within 48 hours." },
          ].map((s, i) => (
            <div key={i} className="content-card" style={{ padding: "28px" }}>
              <strong style={{
                display: "block", fontSize: "36px", fontWeight: 900, marginBottom: "6px",
                background: "linear-gradient(135deg,#7457f5,#f15ca4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>{s.metric}</strong>
              <span style={{ display: "block", fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>{s.label}</span>
              <p style={{ margin: 0, fontSize: "13px", color: "var(--muted)", lineHeight: 1.55 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Future Cooperation / Strategic Approach */}
      <section className="section" style={{ background: "linear-gradient(135deg,#1e1550 0%,#2a1560 50%,#3d2480 100%)", color: "#fff", borderRadius: "32px", margin: "0 max(4vw,20px) 60px" }}>
        <div style={{ maxWidth: "920px", margin: "0 auto" }}>
          <div className="section-label light" style={{ marginBottom: "16px" }}>Strategic Partnership Approach</div>
          <h2 style={{ color: "#fff", marginBottom: "28px" }}>Our Plan for <em style={{ color: "#a78bfa" }}>Long-Term Cooperation</em></h2>
          <div className="grid-2" style={{ gap: "20px" }}>
            {[
              { num: "Phase 1", title: "Needs Assessment & Site Visit", desc: "We visit your facility, understand production schedules, skill requirements, shift patterns, and specific workforce challenges." },
              { num: "Phase 2", title: "Custom Recruitment Plan", desc: "Based on the assessment, we propose a tailored recruitment blueprint with district-wise sourcing, college tie-ups, and interstate migration options." },
              { num: "Phase 3", title: "Pilot Deployment", desc: "Initial deployment of an agreed headcount as a pilot batch, allowing your team to assess candidate quality, attitude, and work readiness before scale-up." },
              { num: "Phase 4", title: "Full-Scale Partnership", desc: "Ongoing full-service engagement — covering sourcing, HR management, payroll, compliance, and continuous improvement — as your trusted manpower partner." },
            ].map((ph, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: "20px", padding: "28px", border: "1px solid rgba(255,255,255,0.12)" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "#a78bfa", letterSpacing: "0.1em", textTransform: "uppercase" }}>{ph.num}</span>
                <strong style={{ display: "block", fontSize: "17px", color: "#fff", margin: "8px 0 10px", fontWeight: 700 }}>{ph.title}</strong>
                <p style={{ margin: 0, fontSize: "14px", color: "#c4b9f5", lineHeight: 1.6 }}>{ph.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <Link href="/contact" className="light-btn" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <span>Start Your Recruitment Partnership</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Educational Partnership */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="section-head">
          <div>
            <div className="section-label">Educational Partnerships</div>
            <h2>Building Tomorrow's Workforce <em>Today</em></h2>
          </div>
          <p>We collaborate with arts, science, polytechnic, and engineering colleges across Tamil Nadu to create a sustainable talent pipeline for our manufacturing clients.</p>
        </div>

        <div style={{ position: "relative", borderRadius: "28px", overflow: "hidden", aspectRatio: "21 / 9", marginTop: "40px", border: "1px solid var(--line)", boxShadow: "0 14px 40px rgba(50,40,90,0.08)" }}>
          <img src="/images/campus_recruitment.jpg" alt="Campus Placement Drive Across Tamil Nadu Colleges" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(23,32,57,0.85) 100%)" }} />
          <div style={{ position: "absolute", bottom: "20px", left: "28px", right: "28px", color: "#fff", display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.85, fontWeight: 700 }}>Direct Placement Channel</span>
              <strong style={{ display: "block", fontSize: "18px", fontWeight: 800 }}>81+ Partnered Colleges & Mega Walk-in Hiring Drives</strong>
            </div>
            <span style={{ background: "#7457f5", color: "#fff", padding: "6px 14px", borderRadius: "99px", fontSize: "12px", fontWeight: 800 }}>10 Districts in Tamil Nadu</span>
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: "32px" }}>
          <div className="content-card" style={{ padding: "36px" }}>
            <h3 style={{ marginTop: 0, marginBottom: "16px" }}>Campus Recruitment Coverage</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                "81+ colleges across 10 districts in Tamil Nadu",
                "Arts & Science colleges, Polytechnics, and ITIs",
                "Dedicated placement cell liaison for seamless coordination",
                "On-campus job fairs, aptitude tests, and group discussions",
                "Fast placement confirmation for graduating students",
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--muted)" }}>
                  <BadgeCheck size={16} color="#7457f5" style={{ flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="content-card" style={{ padding: "36px", background: "linear-gradient(145deg,#f8f6ff,#fdf4ff)" }}>
            <h3 style={{ marginTop: 0, marginBottom: "16px" }}>Why Colleges Partner With Us</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                "Guaranteed placement for eligible students every semester",
                "Industry-leading employers from SIPCOT industrial parks",
                "Free career guidance and interview preparation",
                "Transparent offer letters and statutory employment contracts",
                "Post-placement support and welfare monitoring",
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--muted)" }}>
                  <BadgeCheck size={16} color="#f15ca4" style={{ flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to streamline your recruitment process?"
        subtitle="Share your headcount requirement and role details — we'll initiate your structured recruitment cycle within 24 hours."
        tagline="Launch Your Recruitment Cycle"
      />
    </main>
  );
}
