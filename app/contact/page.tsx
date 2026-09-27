import type { Metadata } from "next";
import Link from "next/link";
import ContactHeroSection from "@/components/ContactHeroSection";
import ContactFormSection from "@/components/ContactFormSection";
import FAQSection from "@/components/FAQSection";
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

export default function ContactPage() {
  return (
    <main>
      <ContactHeroSection />

      {/* Office Locations */}
      <section id="locations" className="section" style={{ background: "#fff" }}>
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
                  <a
                    href="https://maps.google.com/?q=No.+6,+First+Floor,+Gandhi+Road,+Kanchipuram+631501,+Tamil+Nadu"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: 0, fontSize: "14px", color: "var(--muted)", lineHeight: 1.6, textDecoration: "none", display: "block" }}
                  >
                    No: 6, First Floor, Gandhi Road,<br />
                    Kanchipuram – 631 501,<br />
                    Tamil Nadu, India
                  </a>
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
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <Phone size={18} color="#7457f5" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <strong style={{ display: "block", fontSize: "14px", marginBottom: "2px" }}>Direct Contact</strong>
                  <a
                    href="tel:+919444169546"
                    style={{ margin: 0, fontSize: "14px", color: "var(--violet)", fontWeight: 700, textDecoration: "none" }}
                  >
                    +91 94441 69546
                  </a>
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
                  <a
                    href="https://maps.google.com/?q=Vijay+Complex,+Walajabad+Road,+Sunguvarchatram+602106,+Tamil+Nadu"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: 0, fontSize: "14px", color: "var(--muted)", lineHeight: 1.6, textDecoration: "none", display: "block" }}
                  >
                    No: 365/2C, Vijay Complex (F02),<br />
                    Walajabad Road, Sunguvarchatram – 602 106,<br />
                    Tamil Nadu, India
                  </a>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <Phone size={18} color="#f15ca4" style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <strong style={{ display: "block", fontSize: "14px", marginBottom: "2px" }}>Direct Contact</strong>
                  <a
                    href="tel:+919444169546"
                    style={{ margin: 0, fontSize: "14px", color: "#db2777", fontWeight: 700, textDecoration: "none" }}
                  >
                    +91 94441 69546
                  </a>
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

      {/* Rich Send a Message Section */}
      <ContactFormSection />

      {/* FAQ Cosmic Architecture */}
      <FAQSection />
    </main>
  );
}
