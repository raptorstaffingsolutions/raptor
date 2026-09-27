import type { Metadata } from "next";
import Link from "next/link";
import NetworkHeroSection from "@/components/NetworkHeroSection";
import CTASection from "@/components/CTASection";
import { ArrowRight, GraduationCap, Map, MapPin, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Recruitment Network | Raptor Staffing — 19 Districts, 81+ Colleges, Tamil Nadu",
  description:
    "Raptor Staffing Solutions maintains 3,064+ confirmed headcounts across 19 source districts in Tamil Nadu and actively recruits from Odisha, West Bengal, Andhra Pradesh, Assam, and Kerala for interstate migration manpower.",
  keywords: [
    "manpower supply Tamil Nadu districts",
    "inter-state migration workers Tamil Nadu",
    "recruitment network Kanchipuram",
    "college recruitment Tamil Nadu",
    "district wise headcount Tamil Nadu",
    "manpower sourcing Thanjavur Mayiladuthurai",
    "migrant labour supply Tamil Nadu factories",
    "staffing network SIPCOT Sriperumbudur",
  ],
};

const districts = [
  { district: "Thanjavur", headcount: 480, note: "Primary sourcing hub" },
  { district: "Mayiladuthurai", headcount: 365, note: "High placement rate" },
  { district: "Cuddalore", headcount: 285, note: "" },
  { district: "Tiruvarur", headcount: 235, note: "" },
  { district: "Sivagangai", headcount: 230, note: "" },
  { district: "Pudukkotai", headcount: 180, note: "" },
  { district: "Thoothukudi", headcount: 160, note: "" },
  { district: "Nagapattinam", headcount: 150, note: "" },
  { district: "Ramanathapuram", headcount: 140, note: "" },
  { district: "Ariyalur", headcount: 130, note: "" },
  { district: "Kallakuruchi", headcount: 110, note: "" },
  { district: "Nagarcoil", headcount: 60, note: "" },
  { district: "Dharmapuri", headcount: 45, note: "" },
  { district: "Tiruchirappalli", headcount: 130, note: "" },
  { district: "Vellore", headcount: 80, note: "" },
  { district: "Salem", headcount: 70, note: "" },
  { district: "Namakkal", headcount: 65, note: "" },
  { district: "Virudhunagar", headcount: 95, note: "" },
  { district: "Other Districts", headcount: 54, note: "Emerging zones" },
];
const totalHeadcount = districts.reduce((s, d) => s + d.headcount, 0);

const colleges: { district: string; count: number; examples: string[] }[] = [
  { district: "Thanjavur", count: 14, examples: ["Thanjavur Arts College", "PRIST University", "SASTRA University"] },
  { district: "Nagapattinam", count: 9, examples: ["Govt. Arts College Nagapattinam", "Annai College of Arts & Science"] },
  { district: "Tiruvarur", count: 8, examples: ["Annai Fathima College", "Govindammal Aditanar College"] },
  { district: "Ariyalur", count: 7, examples: ["Ariyalur Govt. Arts College", "Excel College of Engineering"] },
  { district: "Pudukkotai", count: 9, examples: ["Pudukkotai Govt. Arts College", "Periyar Maniammai College"] },
  { district: "Cuddalore", count: 10, examples: ["Cuddalore Arts & Science College", "Annamalai University"] },
  { district: "Mayiladuthurai", count: 8, examples: ["MET Arts & Science College", "Nehru Memorial College"] },
  { district: "Sivagangai", count: 7, examples: ["Sivagangai Govt. Arts College", "RC College of Engineering"] },
  { district: "Ramanathapuram", count: 6, examples: ["RGM College of Engineering", "Ramanathapuram Govt. Arts College"] },
  { district: "Thoothukudi", count: 3, examples: ["Kamaraj College of Engineering", "VOC College"] },
];

const migrationStates = [
  { state: "Odisha", icon: "🟡", note: "High-volume interstate migration source" },
  { state: "West Bengal", icon: "🔵", note: "Skilled manufacturing workers" },
  { state: "Andhra Pradesh", icon: "🟢", note: "Southern gateway sourcing" },
  { state: "Assam", icon: "🟠", note: "Northeast specialised sourcing" },
  { state: "Kerala", icon: "🔴", note: "Skilled & technical workers" },
];

const branches = [
  {
    label: "Head Office",
    address: "No:6, First Floor, Gandhi Road, Kanchipuram – 631 501",
    state: "Tamil Nadu, India",
    note: "Primary client coordination & compliance HQ",
  },
  {
    label: "Industrial Branch",
    address: "No:365/2C, Vijay Complex (F02), Walajabad Road, Sunguvarchatram – 602 106",
    state: "Tamil Nadu, India",
    note: "On-site client support for SIPCOT industrial park clients",
  },
];

export default function NetworkPage() {
  return (
    <main>
      <NetworkHeroSection />


      {/* Network Stats */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="section-head">
          <div>
            <div className="section-label">Network Overview</div>
            <h2>Built on <em>Ground-Level Reach</em></h2>
          </div>
          <p>Our talent infrastructure spans Tamil Nadu and beyond — with district-level sourcing teams, college partnerships, and interstate migration channels.</p>
        </div>
        <div className="stats-band" style={{ margin: "40px 0 0", position: "static" }}>
          <div className="stats-band-item">
            <strong>3,064+</strong>
            <span>Confirmed headcounts on file</span>
          </div>
          <div className="stats-band-item">
            <strong>19</strong>
            <span>Tamil Nadu source districts</span>
          </div>
          <div className="stats-band-item">
            <strong>81+</strong>
            <span>College partnerships</span>
          </div>
          <div className="stats-band-item">
            <strong>5</strong>
            <span>Interstate migration states</span>
          </div>
        </div>
      </section>

      {/* District-wise Headcount Table */}
      <section className="section" id="districts" style={{ background: "linear-gradient(180deg,#faf9ff,#f5f9ff)" }}>
        <div className="section-head">
          <div>
            <div className="section-label">District-Wise Headcount Data</div>
            <h2>Where Our <em>Talent Comes From</em></h2>
          </div>
          <p>Verified manpower supply data mapped to source districts across Tamil Nadu. All figures represent confirmed, deployment-ready candidates.</p>
        </div>
        <div className="district-table-wrap" style={{ marginTop: "40px" }}>
          <table className="district-table">
            <thead>
              <tr>
                <th>#</th>
                <th>District</th>
                <th>Confirmed Headcount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {districts.map((d, i) => (
                <tr key={d.district}>
                  <td style={{ color: "var(--muted)", fontWeight: 600 }}>{String(i + 1).padStart(2, "0")}</td>
                  <td style={{ fontWeight: 700 }}>
                    <MapPin size={13} style={{ display: "inline", marginRight: "5px", verticalAlign: "middle", color: "var(--violet)" }} />
                    {d.district}
                  </td>
                  <td><span className="district-count-badge">{d.headcount.toLocaleString()}</span></td>
                  <td style={{ fontSize: "12px", color: "var(--muted)" }}>{d.note || "Active"}</td>
                </tr>
              ))}
              <tr className="district-total-row">
                <td colSpan={2} style={{ fontWeight: 800 }}>
                  <Users size={16} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
                  TOTAL CONFIRMED HEADCOUNT
                </td>
                <td><span className="district-count-badge">{totalHeadcount.toLocaleString()}+</span></td>
                <td style={{ fontSize: "12px", color: "#e0d5ff" }}>Tamil Nadu-wide</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Interstate Migration */}
      <section className="section" id="migration" style={{ background: "linear-gradient(135deg,#1e1550 0%,#2a1560 50%,#3d2480 100%)", borderRadius: "32px", margin: "0 max(4vw,20px) 60px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div className="section-label light">Interstate Migration Network</div>
          <h2 style={{ color: "#fff", marginBottom: "14px" }}>Beyond Tamil Nadu — <em style={{ color: "#a78bfa" }}>Multi-State Sourcing</em></h2>
          <p style={{ color: "#c4b9f5", fontSize: "16px", lineHeight: 1.7, marginBottom: "40px" }}>
            For large-scale or specialised manpower requirements, we source candidates from five interstate migration states through our established ground-level networks, sub-vendor partners, and community sourcing agents.
          </p>
          <div className="migration-grid">
            {migrationStates.map((s, i) => (
              <div key={i} className="migration-card">
                <span style={{ fontSize: "32px" }}>{s.icon}</span>
                <strong>{s.state}</strong>
                <span>{s.note}</span>
              </div>
            ))}
          </div>
          <div className="grid-2" style={{ marginTop: "32px", gap: "16px" }}>
            {[
              { label: "Advance travel coordination", icon: "✈️" },
              { label: "Pre-departure document verification", icon: "📄" },
              { label: "Induction support on arrival", icon: "🏭" },
              { label: "Welfare monitoring post-deployment", icon: "❤️" },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#d9d4f5", fontSize: "14px", fontWeight: 600 }}>
                <span style={{ fontSize: "18px" }}>{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* College Network */}
      <section className="section" id="colleges" style={{ background: "#fff" }}>
        <div className="section-head">
          <div>
            <div className="section-label">College Partnership Network</div>
            <h2>81+ Colleges Across <em>10 Tamil Nadu Districts</em></h2>
          </div>
          <p>We have active placement partnerships with arts & science colleges, polytechnics, and ITIs — creating a consistent pipeline of fresh, motivated graduates for our manufacturing clients.</p>
        </div>
        <div className="college-table-wrap" style={{ marginTop: "40px" }}>
          <table className="college-table">
            <thead>
              <tr>
                <th>#</th>
                <th>District</th>
                <th>Colleges Covered</th>
                <th>Example Institutions</th>
              </tr>
            </thead>
            <tbody>
              {colleges.map((c, i) => (
                <tr key={c.district}>
                  <td style={{ color: "var(--muted)", fontWeight: 600 }}>{String(i + 1).padStart(2, "0")}</td>
                  <td style={{ fontWeight: 700 }}>
                    <GraduationCap size={13} style={{ display: "inline", marginRight: "5px", verticalAlign: "middle", color: "#0c8ca4" }} />
                    {c.district}
                  </td>
                  <td>
                    <span style={{ display: "inline-block", background: "linear-gradient(135deg,#e0f9fd,#bae8f1)", color: "#0c8ca4", fontWeight: 800, padding: "3px 10px", borderRadius: "6px", fontSize: "13px" }}>
                      {c.count} colleges
                    </span>
                  </td>
                  <td style={{ fontSize: "12px", color: "var(--muted)", lineHeight: 1.5 }}>
                    {c.examples.join(" • ")}
                  </td>
                </tr>
              ))}
              <tr style={{ background: "linear-gradient(90deg,#0a7a9a,#0c8ca4)" }}>
                <td colSpan={2} style={{ fontWeight: 800, color: "#fff", padding: "14px 20px" }}>
                  TOTAL COLLEGE COVERAGE
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <span style={{ background: "#fff", color: "#0c8ca4", fontWeight: 900, padding: "3px 10px", borderRadius: "6px", fontSize: "14px" }}>
                    81+ colleges
                  </span>
                </td>
                <td style={{ color: "#bae8f1", fontSize: "12px", padding: "14px 20px" }}>Across 10 districts in Tamil Nadu</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Geographical Reach */}
      <section className="section" style={{ background: "linear-gradient(180deg,#faf9ff,#f5f9ff)" }}>
        <div className="section-head">
          <div>
            <div className="section-label">Geographical Recruitment Reach</div>
            <h2>A Network Built for <em>Consistent Delivery</em></h2>
          </div>
          <p>Our district-level field executives and sub-vendor partners give us reliable, ground-level reach across Tamil Nadu and five other states.</p>
        </div>
        <div className="grid-2" style={{ marginTop: "40px" }}>
          <div className="content-card" style={{ padding: "36px" }}>
            <h3 style={{ marginTop: 0 }}>Tamil Nadu Sourcing Districts</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {["Thanjavur", "Mayiladuthurai", "Cuddalore", "Tiruvarur", "Sivagangai", "Pudukkotai", "Thoothukudi", "Nagapattinam", "Ramanathapuram", "Ariyalur", "Kallakuruchi", "Nagarcoil", "Dharmapuri", "Tiruchirappalli", "Vellore", "Salem", "Namakkal", "Virudhunagar"].map((d) => (
                <span key={d} style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "#f4edff", color: "var(--violet)", fontWeight: 700, fontSize: "12px", padding: "5px 12px", borderRadius: "8px" }}>
                  <MapPin size={11} /> {d}
                </span>
              ))}
            </div>
          </div>
          <div className="content-card" style={{ padding: "36px", background: "linear-gradient(145deg,#e8fcff,#f4edff)" }}>
            <h3 style={{ marginTop: 0 }}>Interstate Migration States</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {migrationStates.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "22px" }}>{s.icon}</span>
                  <div>
                    <strong style={{ fontSize: "15px", display: "block" }}>{s.state}</strong>
                    <span style={{ fontSize: "12px", color: "var(--muted)" }}>{s.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Branch Offices */}
      <section className="section" id="branches" style={{ background: "#fff" }}>
        <div className="section-head">
          <div>
            <div className="section-label">Our Office Locations</div>
            <h2>Where to <em>Reach Us</em></h2>
          </div>
          <p>With our head office in Kanchipuram and an industrial branch at Sunguvarchatram, we are strategically positioned at the heart of Tamil Nadu's manufacturing corridor.</p>
        </div>
        <div className="grid-2" style={{ marginTop: "40px" }}>
          {branches.map((b, i) => (
            <div key={i} className="content-card" style={{ padding: "36px", borderTop: i === 0 ? "4px solid #7457f5" : "4px solid #f15ca4" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: i === 0 ? "linear-gradient(135deg,#ede9fe,#ddd6fe)" : "linear-gradient(135deg,#ffe4f0,#fecee4)", display: "grid", placeItems: "center" }}>
                  <Map size={22} color={i === 0 ? "#6d28d9" : "#db2777"} />
                </div>
                <div>
                  <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>{b.label}</span>
                  <h3 style={{ margin: "2px 0 0", fontSize: "18px" }}>Raptor Staffing Solutions</h3>
                </div>
              </div>
              <p style={{ margin: "0 0 8px", fontSize: "15px", fontWeight: 600, color: "var(--ink)", lineHeight: 1.5 }}>
                <MapPin size={14} style={{ display: "inline", marginRight: "4px", verticalAlign: "middle", color: i === 0 ? "#7457f5" : "#f15ca4" }} />
                {b.address}
              </p>
              <p style={{ margin: "0 0 12px", fontSize: "13px", color: "var(--muted)" }}>{b.state}</p>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--muted)", fontStyle: "italic" }}>{b.note}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Need manpower from a specific district or state?"
        subtitle="Share your requirements — district preference, skill category, headcount — and we'll match from our live database."
        tagline="Access Our Talent Network"
      />
    </main>
  );
}
