import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Target,
  Users2,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Raptor Staffing Solutions | Manpower Company Kanchipuram Tamil Nadu",
  description:
    "Raptor Staffing Solutions is a trusted manpower supply and recruitment company in Kanchipuram, Tamil Nadu. Learn about our leadership, vision, mission, and proven track record with clients like Bharat FIH, Motherson, and KIML.",
  keywords: [
    "manpower company Kanchipuram",
    "staffing agency Tamil Nadu",
    "manpower supply Sriperumbudur",
    "recruitment agency SIPCOT industrial park",
    "Raptor Staffing Solutions",
    "PF ESI compliant manpower contractor",
  ],
};

export default function AboutPage() {
  const leadership = [
    {
      initial: "GR",
      name: "Mr. Gowtham Ranganathan",
      role: "Proprietor",
      color: "linear-gradient(135deg,#6d50ec,#ef60ad)",
      points: [
        "Founder and owner of Raptor Staffing Solutions",
        "Leads the company's vision, growth, and business strategy",
        "Drives innovation and builds strong client relationships",
      ],
    },
    {
      initial: "CD",
      name: "Mr. Chandrasekaran D",
      role: "General Manager",
      color: "linear-gradient(135deg,#0c8ca4,#34cddd)",
      points: [
        "Oversees daily business operations",
        "Ensures high-quality client service and team performance",
        "Implements strategies for growth and operational efficiency",
      ],
    },
    {
      initial: "AD",
      name: "Mr. Azhagiri D",
      role: "Manager",
      color: "linear-gradient(135deg,#f15ca4,#f4a157)",
      points: [
        "Manages recruitment and staffing operations",
        "Coordinates with clients and candidates for timely deployment",
        "Ensures quality screening and candidate satisfaction",
      ],
    },
  ];

  const executionServices = [
    "Manpower Supply", "Reporting & Functionality", "Success Planning",
    "People Development", "Training & Development", "Training Objectives & Outputs",
    "Performance Management", "Reward & Recognition", "Leadership",
    "Internal Promotion", "Planning & Action", "Staffing",
    "Remuneration", "Statutory Compliance (Unmodified)",
  ];

  const clients = [
    {
      name: "Bharat FIH",
      sub: "A Foxconn Technology Group Company",
      addr: "M-2B, DTA Area, SIPCOT Industrial Park Phase-II, Chennai Bangalore National Highway NH-4, Sunguvarchatram, Sriperumbudur – 602 106, Tamil Nadu, India",
    },
    {
      name: "KYOWA",
      sub: "Create the Future in Aluminium Metal",
      addr: "Plot No. VV 8, SIPCOT Industrial Park, Vallam Vadagal Village, Sriperumbudur – 631 604, Tamil Nadu, India",
    },
    {
      name: "KIML",
      sub: "Kyungshin Industrial Motherson Pvt. Ltd.",
      addr: "Survey No. 451, 452A, 444, No. 23 & 24, Oragadam Village, Mathur Village, Sipcot Growth Centre, Sriperumbudur – 602 105, Tamil Nadu, India",
    },
    {
      name: "Motherson Polymer Solutions",
      sub: "Motherson Group",
      addr: "A4, SIPCOT Industrial Growth Center, Chengalpet–Sriperumbudur Road, Oragadam, Tamil Nadu, India",
    },
    {
      name: "Rising Stars Hi-Tech",
      sub: "A Bharat FIH Company",
      addr: "C02, Ground Floor, M2/A-1, SIPCOT Hi-Tech SEZ, SIPCOT Industrial Park Phase II, Sunguvarchatram, Kanchipuram – 602 306, Tamil Nadu, India",
    },
    {
      name: "WOWTEK",
      sub: "A FIH Mobile Group Company",
      addr: "P.No. A-1, Phase III, SIPCOT Industrial Park, Pondur Village, Sriperumbudur Taluk, Kanchipuram – 602 105, Tamil Nadu",
    },
  ];

  return (
    <main>
      <PageHero
        badge="About Raptor Staffing Solutions"
        title="A Trusted Manpower Partner for"
        highlightedText="Tamil Nadu's Manufacturing Industry"
        description="Simplifying the hiring process for manufacturing plants, industrial companies, and service businesses by connecting them with qualified, compliant, and motivated candidates across all workforce categories."
        breadcrumbCurrent="About Us"
        actionButton={
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link href="/contact" className="primary"><span>Request Manpower Proposal</span><ArrowRight size={16} /></Link>
            <Link href="/services" className="secondary-btn"><span>Our Services</span></Link>
          </div>
        }
      />

      {/* Company Overview */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="about-grid" style={{ marginTop: 0 }}>
          <div>
            <div className="section-label">Company Overview</div>
            <h2 style={{ marginBottom: "24px" }}>
              Friendly. Affordable. <em>Stress-Free Recruitment.</em>
            </h2>
            <div className="about-copy">
              <p>
                Raptor Staffing Solutions specialises in providing manpower services of various categories as per client needs. We aim to simplify the hiring process by connecting businesses with qualified candidates for their complete workforce requirements.
              </p>
              <p style={{ marginTop: "14px" }}>
                We are a <strong>trusted manpower supply and recruitment company</strong>, providing skilled, semi-skilled, and unskilled workforce across Tamil Nadu. All our deployed staff are managed by trained professionals committed to delivering high-quality service.
              </p>
              <p style={{ marginTop: "14px" }}>
                Raptor connects employers with job seekers through simple, effective, and mutually beneficial recruitment solutions. Our services are offered <strong>at no cost to employers</strong>, making hiring easier and more efficient for everyone.
              </p>
            </div>
            <div className="trust-line" style={{ marginTop: "24px" }}>
              <BadgeCheck size={20} /> Responsive. Proactive. Built around your workforce needs.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ background: "linear-gradient(145deg,#f8f6ff,#f3fcff)", borderRadius: "28px", padding: "36px", border: "1px solid rgba(116,87,245,0.15)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
                {[
                  { val: "3,064+", label: "Confirmed Headcounts" },
                  { val: "19", label: "Source Districts (TN)" },
                  { val: "81+", label: "College Tie-Ups" },
                  { val: "6+", label: "Major Industry Clients" },
                ].map((s, i) => (
                  <div key={i}>
                    <strong style={{ fontSize: "36px", display: "block", fontWeight: 800, background: "linear-gradient(135deg,var(--violet),var(--pink))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.val}</strong>
                    <span style={{ fontSize: "13px", color: "var(--muted)", fontWeight: 600 }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "linear-gradient(135deg,#1e1550,#3d2480)", borderRadius: "20px", padding: "24px", color: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <ShieldCheck size={22} color="#a9f2f5" />
                <strong style={{ fontSize: "15px" }}>Statutory Compliance Guarantee</strong>
              </div>
              <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.6, color: "#d9d4f5" }}>
                100% compliant under EPF, ESIC, CLRA, Bonus Act, Minimum Wages Act, and Industrial Disputes Act. Monthly compliance dossiers delivered to your desk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section" style={{ background: "linear-gradient(180deg,#faf9ff,#f5f9ff)" }}>
        <div className="section-head">
          <div>
            <div className="section-label">Vision & Mission</div>
            <h2>The Values That <em>Drive Us</em></h2>
          </div>
          <p>Our guiding philosophy ensures we remain the preferred manpower partner for Tamil Nadu's growing manufacturing sector.</p>
        </div>
        <div className="vision-wrap" style={{ marginTop: "40px" }}>
          <article>
            <Target />
            <small>Our Vision</small>
            <h3>Provide manpower solutions of standards through value-added services.</h3>
            <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "12px", lineHeight: 1.6 }}>
              To establish Raptor Staffing Solutions amongst the finest players in all departments of our core competency — becoming the benchmark staffing partner for manufacturing industries across Tamil Nadu and beyond.
            </p>
          </article>
          <article>
            <CheckCircle2 color="#f59e0b" />
            <small>Our Mission</small>
            <h3>Deliver the best possible service to clients and workers with efficiency and integrity.</h3>
            <p style={{ color: "var(--muted)", fontSize: "14px", marginTop: "12px", lineHeight: 1.6 }}>
              Backed by an infrastructure of expert consultants in respective fields, we aim to be the first choice of the manufacturing industry — providing an unrivalled blend of knowledge and cross-border skills across Tamil Nadu.
            </p>
          </article>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="section-head">
          <div>
            <div className="section-label">Our Leadership</div>
            <h2>The People Behind <em>Our Success</em></h2>
          </div>
          <p>Our experienced leadership team drives every aspect of Raptor's staffing excellence — from client relationships to field operations.</p>
        </div>
        <div className="grid-3" style={{ marginTop: "40px" }}>
          {leadership.map((l) => (
            <div key={l.name} className="leader-card">
              <div className="leader-avatar" style={{ background: l.color, color: "#fff", fontSize: "22px" }}>
                {l.initial}
              </div>
              <div className="leader-role-badge">{l.role}</div>
              <div className="leader-name">{l.name}</div>
              <ul className="leader-points">
                {l.points.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Org Chart */}
      <section className="section" style={{ background: "linear-gradient(180deg,#faf9ff,#f5f9ff)" }}>
        <div className="section-head" style={{ marginBottom: "10px" }}>
          <div>
            <div className="section-label">Organisational Structure</div>
            <h2>How We Operate — <em>Our Team Setup</em></h2>
          </div>
          <p>A lean, functional organisation built for rapid response and quality delivery across every manpower engagement.</p>
        </div>
        <div className="org-chart">
          <div className="org-node-top">Proprietor</div>
          <div className="org-line" />
          <div className="org-level">
            <div className="org-node accent">General Manager</div>
          </div>
          <div className="org-line" />
          <div className="org-level">
            <div className="org-node" style={{ minWidth: "200px" }}>
              <strong style={{ display: "block", marginBottom: "8px", fontSize: "13px", color: "var(--violet)" }}>Sourcing Team</strong>
              <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.8 }}>Team Leader<br />Recruiters<br />Field Executives<br />Coordinators<br />Tele-calling</div>
            </div>
            <div className="org-node" style={{ minWidth: "200px" }}>
              <strong style={{ display: "block", marginBottom: "8px", fontSize: "13px", color: "var(--pink)" }}>HR Team</strong>
              <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.8 }}>HR Manager<br />HR Executive<br />Payroll / Admin<br />Compliance</div>
            </div>
            <div className="org-node" style={{ minWidth: "200px" }}>
              <strong style={{ display: "block", marginBottom: "8px", fontSize: "13px", color: "var(--cyan-dark)" }}>Business Development</strong>
              <div style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.8 }}>BD Manager<br />Marketing Executive<br />Client Relationship Executive<br />Sales Executive</div>
            </div>
          </div>
        </div>
      </section>

      {/* Execution of Services */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="section-head">
          <div>
            <div className="section-label">Service Execution</div>
            <h2>What We <em>Actually Execute</em></h2>
          </div>
          <p>Our operational scope covers every dimension of workforce management — from deployment to long-term employee development.</p>
        </div>
        <div className="exec-list" style={{ marginTop: "40px" }}>
          {executionServices.map((s) => (
            <div key={s} className="exec-item">
              <div className="exec-dot" />
              <span>{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Operational Team */}
      <section className="section" style={{ background: "linear-gradient(180deg,#faf9ff,#f5f9ff)" }}>
        <div className="section-head">
          <div>
            <div className="section-label">How Our Teams Work</div>
            <h2>Operational Excellence <em>Across All Functions</em></h2>
          </div>
        </div>
        <div className="grid-2" style={{ marginTop: "40px" }}>
          {[
            {
              title: "Sourcing Team",
              color: "var(--violet)",
              bg: "#f4edff",
              desc: "Our sourcing team leverages our internal employee database and references from existing employees. We also advertise in print and online media and conduct campus interviews across 81+ colleges in Tamil Nadu.",
            },
            {
              title: "HR Team",
              color: "var(--pink)",
              bg: "#fff0f7",
              desc: "Our HR Team handles employee induction, pre-deployment training, payroll activities, and client-site attendance. We are very responsive and proactive in extending support with strong expertise in our respective areas.",
            },
            {
              title: "Business Development Team",
              color: "var(--cyan-dark)",
              bg: "#e8fcff",
              desc: "Our BD team works across Tamil Nadu to collaborate with colleges, sub-vendors, and agencies to build a robust and continually growing candidate pipeline.",
            },
            {
              title: "Compliance Officers",
              color: "#f59e0b",
              bg: "#fffbeb",
              desc: "Dedicated compliance officers manage PF, ESI, Labour Law compliance, self-assessment audits, and government policy updates to ensure zero statutory exposure for our clients.",
            },
          ].map((item, i) => (
            <div key={i} className="content-card" style={{ padding: "32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <div style={{ width: "46px", height: "46px", borderRadius: "14px", background: item.bg, display: "grid", placeItems: "center" }}>
                  <Users2 size={22} color={item.color} />
                </div>
                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 700 }}>{item.title}</h3>
              </div>
              <p style={{ margin: 0, color: "var(--muted)", fontSize: "15px", lineHeight: 1.65 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Valued Clients */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="section-head">
          <div>
            <div className="section-label">Our Valuable Clients</div>
            <h2>Powering India's <em>Top Manufacturers</em></h2>
          </div>
          <p>We are a trusted manpower partner to multinational and national industry leaders operating in SIPCOT industrial parks across Tamil Nadu.</p>
        </div>
        <div className="client-grid" style={{ marginTop: "40px" }}>
          {clients.map((c, i) => (
            <div key={i} className="client-card">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "linear-gradient(135deg,#ede9fe,#fce7f3)", display: "grid", placeItems: "center", fontWeight: 900, fontSize: "18px", color: "var(--violet)", flexShrink: 0 }}>
                  {c.name[0]}
                </div>
                <div>
                  <div className="client-name" style={{ fontSize: "16px" }}>{c.name}</div>
                  <div className="client-sub">{c.sub}</div>
                </div>
              </div>
              <p className="client-addr">
                <MapPin size={11} style={{ display: "inline", marginRight: "3px", verticalAlign: "middle", color: "var(--violet)" }} />
                {c.addr}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Looking for a reliable manpower partner in Tamil Nadu?"
        subtitle="Contact our Kanchipuram head office or Sunguvarchatram industrial branch for a customised manpower plan."
        tagline="Partner With Raptor Staffing"
      />
    </main>
  );
}
