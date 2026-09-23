import Link from "next/link";
import Image from "next/image";
import { Building2, MapPin, Mail, Phone, ShieldCheck, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand" aria-label="Raptor Staffing Solutions">
            <div className="brand-logo-wrap" style={{ background: "rgba(11,13,23,0.7)", padding: "6px 12px" }}>
              <Image
                src="/logo.png"
                alt="Raptor Staffing Solutions"
                width={140}
                height={70}
                className="brand-logo"
                style={{ height: "60px", width: "auto" }}
              />
            </div>
          </Link>
          <p>
            Raptor Staffing Solutions connects ambitious manufacturing plants, logistics hubs, and industrial enterprises with skilled, semi-skilled, and general workforce—quickly, responsibly, and at scale.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#6ee7b7", fontSize: "13px", fontWeight: 700 }}>
            <ShieldCheck size={18} />
            <span>100% Statutory Compliant (PF, ESI & CLRA)</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/services">Staffing Solutions</Link></li>
            <li><Link href="/process">Recruitment Process</Link></li>
            <li><Link href="/network">Pan-India Network</Link></li>
            <li><Link href="/contact">Employer Inquiry</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Solutions</h4>
          <ul>
            <li><Link href="/services#industrial">Industrial Manpower</Link></li>
            <li><Link href="/services#recruitment">Volume Recruitment</Link></li>
            <li><Link href="/services#contract">Contract & Temp-to-Hire</Link></li>
            <li><Link href="/services#payroll">Payroll & Compliance</Link></li>
            <li><Link href="/services#welfare">Worker Welfare & Hostel</Link></li>
            <li><Link href="/process#sla">SLA & Turnaround</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Office Locations</h4>
          <div className="footer-contact-item">
            <Building2 size={18} />
            <div>
              <strong style={{ color: "#fff" }}>Head Office:</strong><br />
              No. 6, First Floor, Gandhi Road,<br />
              Kanchipuram – 631501, Tamil Nadu
            </div>
          </div>
          <div className="footer-contact-item">
            <MapPin size={18} />
            <div>
              <strong style={{ color: "#fff" }}>Industrial Branch:</strong><br />
              Vijay Complex, Walajabad Road,<br />
              Sunguvarchatram – 602106, Tamil Nadu
            </div>
          </div>
          <div className="footer-contact-item">
            <Mail size={18} />
            <div>
              <a href="mailto:info@raptorstaffing.in" style={{ color: "#38d2e3" }}>info@raptorstaffing.in</a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          © {new Date().getFullYear()} Raptor Staffing Solutions. All rights reserved.
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <span>We always serve to give improved solutions.</span>
        </div>
      </div>
    </footer>
  );
}
