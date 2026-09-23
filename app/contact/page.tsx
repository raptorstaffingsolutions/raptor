import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ArrowRight, Building2, Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Raptor Staffing Solutions — Kanchipuram & Sunguvarchatram",
  description:
    "Contact Raptor Staffing Solutions for manpower requirements. Head Office: No. 6, First Floor, Gandhi Road, Kanchipuram – 631501. Industrial Branch: Sunguvarchatram – 602106. Serving SIPCOT manufacturers across Tamil Nadu.",
  keywords: [
    "contact Raptor Staffing Solutions",
    "manpower company Kanchipuram address",
    "staffing agency Sunguvarchatram",
    "manpower consultant SIPCOT Tamil Nadu",
    "recruitment agency contact Tamil Nadu",
    "Kanchipuram staffing phone",
  ],
};

const faqs = [
  {
    q: "What types of workers do you supply?",
    a: "We supply skilled, semi-skilled, and unskilled workers across all categories required by manufacturing plants — including production operators, assembly workers, quality inspectors, machine operators, supervisors, packing staff, housekeeping, and logistics support.",
  },
  {
    q: "Are your staffing services compliant with Labour Laws?",
    a: "Yes — 100%. We maintain full compliance under the Employees' Provident Fund Act (EPF), Employees' State Insurance Act (ESI), Contract Labour (Regulation & Abolition) Act, Payment of Bonus Act, Minimum Wages Act, and Industrial Disputes Act. Monthly compliance dossiers are shared with our clients.",
  },
  {
    q: "How quickly can you deploy manpower after receiving a requirement?",
    a: "For standard unskilled and semi-skilled roles, we can deploy a verified, medically cleared batch within 7–14 working days. For urgent requirements with existing headcount availability in our database, we can mobilise candidates within 72 hours.",
  },
  {
    q: "Do you charge candidates for placement?",
    a: "No — our placement services are completely free for candidates. We operate on an employer-funded model, meaning job seekers are never charged any registration or placement fees.",
  },
  {
    q: "Can you source manpower from districts outside our immediate area?",
    a: "Yes. We have an active sourcing network across 19 districts in Tamil Nadu, and we also source interstate migration workers from Odisha, West Bengal, Andhra Pradesh, Assam, and Kerala — depending on client requirements and role profiles.",
  },
  {
    q: "Do you manage payroll and statutory compliance for deployed workers?",
    a: "Yes. We handle the complete payroll cycle including salary computation, PF/ESI deductions, payslip generation, and bank transfers. We also manage all statutory filings, bonus calculations, and grievance resolution for every worker we deploy.",
  },
  {
    q: "What is your 240-day workforce management policy?",
    a: "Under the Industrial Disputes Act, a workman becomes eligible for additional statutory benefits after 240 continuous days of service. We maintain a rolling 240-day tracker for all deployed workers and proactively report this data to our clients to prevent unplanned statutory exposure.",
  },
  {
    q: "Do you have presence near SIPCOT industrial parks?",
    a: "Yes — our Sunguvarchatram industrial branch office (No. 365/2C, Vijay Complex, Walajabad Road, Sunguvarchatram – 602106) is located close to the SIPCOT Industrial Park Phase II and serves clients including Bharat FIH, Rising Stars Hi-Tech, WOWTEK, and others.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        badge="Get In Touch"
        title="Let's Build Your"
        highlightedText="Workforce Together"
        description="Share your manpower requirement with our team — we'll respond with a tailored headcount plan, skill category breakdown, and compliance framework within 24 hours."
        breadcrumbCurrent="Contact"
        actionButton={
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link href="#contact-form" className="primary"><span>Send a Message</span><ArrowRight size={16} /></Link>
            <Link href="/network" className="secondary-btn"><span>View Our Network</span></Link>
          </div>
        }
      />

      {/* Office Locations */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="section-head">
          <div>
            <div className="section-label">Our Offices</div>
            <h2>Visit Us at Our <em>Tamil Nadu Offices</em></h2>
          </div>
          <p>Two strategically located offices — one in Kanchipuram city and one at the SIPCOT industrial corridor in Sunguvarchatram.</p>
        </div>

        <div className="grid-2" style={{ marginTop: "48px" }}>
          {/* Head Office */}
          <div className="content-card" style={{ padding: "40px", borderTop: "4px solid #7457f5" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(135deg,#ede9fe,#ddd6fe)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <Building2 size={26} color="#6d28d9" />
              </div>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>Head Office</span>
                <h3 style={{ margin: "4px 0 0", fontSize: "20px", fontWeight: 800 }}>Raptor Staffing Solutions</h3>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <MapPin size={18} color="#7457f5" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <strong style={{ display: "block", fontSize: "14px", marginBottom: "2px" }}>Address</strong>
                  <p style={{ margin: 0, fontSize: "14px", color: "var(--muted)", lineHeight: 1.6 }}>
                    No: 6, First Floor, Gandhi Road,<br />
                    Kanchipuram – 631 501,<br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <Clock size={18} color="#7457f5" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <strong style={{ display: "block", fontSize: "14px", marginBottom: "2px" }}>Office Hours</strong>
                  <p style={{ margin: 0, fontSize: "14px", color: "var(--muted)" }}>
                    Monday – Saturday: 9:00 AM – 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Industrial Branch */}
          <div className="content-card" style={{ padding: "40px", borderTop: "4px solid #f15ca4" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(135deg,#ffe4f0,#fecee4)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <ShieldCheck size={26} color="#db2777" />
              </div>
              <div>
                <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>Industrial Branch</span>
                <h3 style={{ margin: "4px 0 0", fontSize: "20px", fontWeight: 800 }}>Sunguvarchatram Office</h3>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <MapPin size={18} color="#f15ca4" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <strong style={{ display: "block", fontSize: "14px", marginBottom: "2px" }}>Address</strong>
                  <p style={{ margin: 0, fontSize: "14px", color: "var(--muted)", lineHeight: 1.6 }}>
                    No: 365/2C, Vijay Complex (F02),<br />
                    Walajabad Road, Sunguvarchatram – 602 106,<br />
                    Tamil Nadu, India
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <Building2 size={18} color="#f15ca4" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <strong style={{ display: "block", fontSize: "14px", marginBottom: "2px" }}>Serving Nearby</strong>
                  <p style={{ margin: 0, fontSize: "14px", color: "var(--muted)", lineHeight: 1.6 }}>
                    Bharat FIH, Rising Stars Hi-Tech, WOWTEK, KIML, KYOWA, Motherson — SIPCOT Industrial Park, Sriperumbudur
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section" id="contact-form" style={{ background: "linear-gradient(180deg,#faf9ff,#f5f9ff)" }}>
        <div className="contact-layout">
          <div className="contact-info">
            <div className="section-label">Send a Message</div>
            <h2 style={{ marginBottom: "16px" }}>Tell Us Your <em>Manpower Requirement</em></h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: "32px" }}>
              Whether you need 10 workers or 500, skilled specialists or unskilled operators — describe your requirement and we'll prepare a tailored staffing plan for you.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { icon: Phone, label: "Call our team", val: "+91 XXXXX XXXXX", note: "Mon – Sat, 9 AM – 6 PM" },
                { icon: Mail, label: "Email us", val: "info@raptorstaffing.com", note: "We reply within 4 hours" },
                { icon: MapPin, label: "Visit Kanchipuram HQ", val: "No:6, Gandhi Road, Kanchipuram", note: "9 AM – 6 PM weekdays" },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ width: "46px", height: "46px", borderRadius: "14px", background: "linear-gradient(135deg,#ede9fe,#fce7f3)", display: "grid", placeItems: "center", flexShrink: 0 }}>
                      <Icon size={20} color="#7457f5" />
                    </div>
                    <div>
                      <span style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>{c.label}</span>
                      <strong style={{ display: "block", fontSize: "15px", marginTop: "2px" }}>{c.val}</strong>
                      <span style={{ fontSize: "12px", color: "var(--muted)" }}>{c.note}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "32px", padding: "20px 24px", background: "linear-gradient(135deg,#1e1550,#3d2480)", borderRadius: "20px", color: "#fff" }}>
              <strong style={{ display: "block", marginBottom: "6px", fontSize: "15px" }}>Statutory Compliance Guarantee</strong>
              <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.6, color: "#c4b9f5" }}>
                Every engagement comes with full PF, ESI, Bonus Act, and Labour Law compliance — plus monthly compliance reports at no additional cost.
              </p>
            </div>
          </div>

          <form className="form-card contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name *</label>
                <input id="name" type="text" className="form-input" placeholder="Your full name" required />
              </div>
              <div className="form-group">
                <label htmlFor="company" className="form-label">Company Name *</label>
                <input id="company" type="text" className="form-input" placeholder="Your company" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address *</label>
                <input id="email" type="email" className="form-input" placeholder="your@company.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number *</label>
                <input id="phone" type="tel" className="form-input" placeholder="+91 XXXXX XXXXX" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="requirement-type" className="form-label">Manpower Category Required *</label>
              <select id="requirement-type" className="form-select">
                <option value="">Select category</option>
                <option>Skilled Workers</option>
                <option>Semi-Skilled Workers</option>
                <option>Unskilled / General Workers</option>
                <option>Supervisors / Team Leaders</option>
                <option>Quality Inspectors</option>
                <option>Packing & Assembly Operators</option>
                <option>Interstate Migration Workers</option>
                <option>Payroll & HR Management Only</option>
                <option>Multiple Categories</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="headcount" className="form-label">Headcount Required</label>
                <input id="headcount" type="number" className="form-input" placeholder="e.g. 50" min={1} />
              </div>
              <div className="form-group">
                <label htmlFor="timeline" className="form-label">Required By</label>
                <select id="timeline" className="form-select">
                  <option value="">Select timeline</option>
                  <option>Within 1 week</option>
                  <option>Within 2 weeks</option>
                  <option>Within 1 month</option>
                  <option>Within 3 months</option>
                  <option>Flexible / ongoing requirement</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Additional Requirements</label>
              <textarea id="message" className="form-textarea" rows={4} placeholder="Describe specific skill sets, shift patterns, site location, or any other requirements..." />
            </div>
            <button type="submit" className="submit-btn">
              <span>Send Requirement</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="section-head">
          <div>
            <div className="section-label">Frequently Asked Questions</div>
            <h2>Everything You Need to <em>Know</em></h2>
          </div>
          <p>Answers to the most common questions from our manufacturing and industrial clients.</p>
        </div>
        <div className="faq-list" style={{ marginTop: "48px" }}>
          {faqs.map((faq, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-question">{faq.q}</summary>
              <div className="faq-answer">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
