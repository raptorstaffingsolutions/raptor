import Link from "next/link";
import { ArrowRight, Building2, MapPin } from "lucide-react";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
}

export default function CTASection({
  title = "Ready for a staffing partner who keeps moving?",
  subtitle = "Whether you need 20 machine operators next week or a comprehensive 500-headcount factory ramp-up, our sourcing network delivers.",
  tagline = "Build your workforce with us",
}: CTASectionProps) {
  return (
    <section className="cta-section">
      <div className="cta-panel reveal">
        <div>
          <div className="section-label light">{tagline}</div>
          <h2>{title}</h2>
          <p className="cta-desc">{subtitle}</p>
        </div>

        <div className="cta-actions">
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link href="/contact" className="light-btn">
              <span>Request Manpower</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.4)",
                padding: "14px 20px",
                borderRadius: "15px",
                fontWeight: 700,
                fontSize: "14px",
                backdropFilter: "blur(6px)",
              }}
            >
              <span>Explore All Solutions</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ marginTop: "12px" }}>
            <p>
              <Building2 size={18} style={{ flexShrink: 0 }} />
              <span>Head Office: No. 6, First Floor, Gandhi Road, Kanchipuram – 631501</span>
            </p>
            <p style={{ marginTop: "8px" }}>
              <MapPin size={18} style={{ flexShrink: 0 }} />
              <span>Branch: Vijay Complex, Walajabad Road, Sunguvarchatram – 602106</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
