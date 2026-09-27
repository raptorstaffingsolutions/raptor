"use client";

import { useState, useRef, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  ArrowRight,
  Sparkles,
  Clock,
  Building2,
  Users,
  Check,
  Copy,
  ExternalLink,
  Briefcase,
  Calendar,
  Lock,
  Zap,
  FileCheck,
  ChevronDown,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  requirement_type: string;
  headcount: string;
  timeline: string;
  message: string;
  _gotcha: string;
}

const initialFormData: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  requirement_type: "",
  headcount: "",
  timeline: "",
  message: "",
  _gotcha: "",
};

const CATEGORY_OPTIONS = [
  "Skilled Workers",
  "Semi-Skilled Workers",
  "Unskilled / General Workers",
  "Supervisors / Team Leaders",
  "Quality Inspectors",
  "Packing & Assembly Operators",
  "Interstate Migration Workers",
  "Payroll & HR Management Only",
  "Multiple Categories",
];

const TIMELINE_OPTIONS = [
  "Within 1 week",
  "Within 2 weeks",
  "Within 1 month",
  "Within 3 months",
  "Flexible / ongoing requirement",
];

const POPULAR_HEADCOUNT_PRESETS = ["15", "50", "100", "250", "500+"];

export default function ContactFormSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const destinationEmail = "raptorstaffingsolutions@gmail.com";

  // Formspree resolution
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim();
  const formspreeEndpoint = formId
    ? formId.startsWith("http")
      ? formId
      : `https://formspree.io/f/${formId}`
    : `https://formspree.io/f/${destinationEmail}`;

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          leftColRef.current?.children ? Array.from(leftColRef.current.children) : [],
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.65, stagger: 0.12, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          formCardRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuickCategory = (cat: string) => {
    setFormData((prev) => ({ ...prev, requirement_type: cat }));
  };

  const handleQuickHeadcount = (count: string) => {
    setFormData((prev) => ({ ...prev, headcount: count.replace("+", "") }));
  };

  const handleCopy = (text: string, key: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData._gotcha) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          requirement_type: formData.requirement_type,
          headcount: formData.headcount,
          timeline: formData.timeline,
          message: formData.message,
          _subject: `New Manpower Requirement from ${formData.company || formData.name} - Raptor Staffing`,
          _replyto: formData.email,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok) {
        setStatus("success");
      } else {
        if (data?.errors && Array.isArray(data.errors)) {
          const detail = data.errors.map((err: { message: string }) => err.message).join(", ");
          setErrorMessage(detail || "Submission could not be completed.");
        } else if (data?.error) {
          setErrorMessage(data.error);
        } else {
          setErrorMessage(
            "Failed to send message via Formspree. Please check your connection or contact us directly."
          );
        }
        setStatus("error");
      }
    } catch {
      setErrorMessage(
        "Network error occurred while submitting. Please try again or email us directly."
      );
      setStatus("error");
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setStatus("idle");
    setErrorMessage("");
  };

  // Pre-fill email client fallback
  const mailtoSubject = encodeURIComponent(
    `Manpower Requirement: ${formData.company || formData.name || "Client Inquiry"}`
  );
  const mailtoBody = encodeURIComponent(
    `Full Name: ${formData.name}\n` +
      `Company Name: ${formData.company}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Category Required: ${formData.requirement_type}\n` +
      `Headcount: ${formData.headcount || "N/A"}\n` +
      `Timeline: ${formData.timeline || "N/A"}\n\n` +
      `Additional Notes:\n${formData.message || "None"}\n`
  );
  const mailtoLink = `mailto:${destinationEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

  // Calculate field completion progress
  const requiredFields = [
    Boolean(formData.name),
    Boolean(formData.company),
    Boolean(formData.email),
    Boolean(formData.phone),
    Boolean(formData.requirement_type),
  ];
  const totalCompleted =
    requiredFields.filter(Boolean).length +
    (formData.headcount ? 1 : 0) +
    (formData.timeline ? 1 : 0) +
    (formData.message ? 1 : 0);

  return (
    <section
      ref={sectionRef}
      id="contact-form"
      className="contact-section-cinematic"
      style={{
        position: "relative",
        padding: "120px max(5vw, 24px)",
        background: "linear-gradient(180deg, #070514 0%, #0d0928 50%, #070419 100%)",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Ambient Aurora Glows */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 240, 255, 0.16) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "-12%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(116, 87, 245, 0.2) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "25%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(241, 92, 164, 0.14) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Cyber Grid Texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.5,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div ref={headingRef} style={{ marginBottom: "56px", textAlign: "left" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "99px",
              background: "rgba(116, 87, 245, 0.14)",
              border: "1px solid rgba(116, 87, 245, 0.35)",
              color: "#a78bfa",
              fontSize: "12px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "16px",
              backdropFilter: "blur(12px)",
            }}
          >
            <Sparkles size={14} color="#00f0ff" />
            <span>Send a Message</span>
            <span
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.4)",
              }}
            />
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#10b981" }}>
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 8px #10b981",
                }}
              />
              DISPATCH DESK ACTIVE • 24-HR SLA
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(34px, 4.5vw, 54px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "#ffffff",
              marginBottom: "16px",
            }}
          >
            Tell Us Your{" "}
            <em
              style={{
                fontStyle: "normal",
                background: "linear-gradient(135deg, #00f0ff 0%, #7457f5 55%, #f15ca4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Manpower Requirement
            </em>
          </h2>

          <p
            style={{
              fontSize: "clamp(15px, 1.25vw, 18px)",
              lineHeight: 1.7,
              color: "#94a3b8",
              maxWidth: "760px",
            }}
          >
            Whether you need 10 workers or 500, skilled specialists or unskilled operators — describe your requirement and we'll prepare a tailored staffing plan for you.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "48px",
            alignItems: "flex-start",
          }}
        >
          {/* Left Column: Direct Communication Channels & Trust Dossier */}
          <div
            ref={leftColRef}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {/* Live Dispatch Status Pill */}
            <div
              style={{
                background: "rgba(20, 16, 52, 0.65)",
                border: "1px solid rgba(0, 240, 255, 0.25)",
                borderRadius: "20px",
                padding: "20px 24px",
                backdropFilter: "blur(20px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.35)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(116, 87, 245, 0.25))",
                    display: "grid",
                    placeItems: "center",
                    border: "1px solid rgba(0, 240, 255, 0.3)",
                  }}
                >
                  <Zap size={22} color="#00f0ff" />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#94a3b8",
                      fontWeight: 700,
                      display: "block",
                    }}
                  >
                    Direct Response SLA
                  </span>
                  <strong style={{ fontSize: "16px", color: "#ffffff", fontWeight: 800 }}>
                    Turnaround Within 4 Hours
                  </strong>
                </div>
              </div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#10b981",
                  background: "rgba(16, 185, 129, 0.12)",
                  padding: "5px 12px",
                  borderRadius: "99px",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#10b981",
                    boxShadow: "0 0 6px #10b981",
                  }}
                />
                Live
              </span>
            </div>

            {/* Direct Channels Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {/* Channel 1: Phone */}
              <div
                style={{
                  background: "rgba(22, 17, 56, 0.55)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "20px",
                  padding: "20px 24px",
                  backdropFilter: "blur(18px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(116, 87, 245, 0.5)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 12px 35px rgba(116, 87, 245, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "15px",
                      background: "linear-gradient(135deg, rgba(116, 87, 245, 0.25), rgba(241, 92, 164, 0.25))",
                      border: "1px solid rgba(116, 87, 245, 0.35)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={22} color="#a78bfa" />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#94a3b8",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        display: "block",
                      }}
                    >
                      Call our team
                    </span>
                    <a
                      href="tel:+919444169546"
                      style={{
                        fontSize: "17px",
                        fontWeight: 800,
                        color: "#00f0ff",
                        textDecoration: "none",
                        display: "block",
                        marginTop: "2px",
                      }}
                    >
                      +91 94441 69546
                    </a>
                    <span style={{ fontSize: "12px", color: "#64748b", marginTop: "2px", display: "block" }}>
                      Mon – Sat, 9 AM – 6 PM
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => handleCopy("+91 94441 69546", "phone")}
                    aria-label="Copy phone number"
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "10px",
                      padding: "8px 12px",
                      color: copiedKey === "phone" ? "#10b981" : "#cbd5e1",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {copiedKey === "phone" ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedKey === "phone" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Channel 2: Email */}
              <div
                style={{
                  background: "rgba(22, 17, 56, 0.55)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "20px",
                  padding: "20px 24px",
                  backdropFilter: "blur(18px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.5)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 12px 35px rgba(0, 240, 255, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "15px",
                      background: "linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(116, 87, 245, 0.2))",
                      border: "1px solid rgba(0, 240, 255, 0.35)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={22} color="#00f0ff" />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#94a3b8",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        display: "block",
                      }}
                    >
                      Email us directly
                    </span>
                    <a
                      href="mailto:raptorstaffingsolutions@gmail.com"
                      style={{
                        fontSize: "15px",
                        fontWeight: 800,
                        color: "#38bdf8",
                        textDecoration: "none",
                        display: "block",
                        marginTop: "2px",
                        wordBreak: "break-all",
                      }}
                    >
                      raptorstaffingsolutions@gmail.com
                    </a>
                    <span style={{ fontSize: "12px", color: "#64748b", marginTop: "2px", display: "block" }}>
                      Direct inbox — replied within 4 hours
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => handleCopy("raptorstaffingsolutions@gmail.com", "email")}
                    aria-label="Copy email address"
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "10px",
                      padding: "8px 12px",
                      color: copiedKey === "email" ? "#10b981" : "#cbd5e1",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {copiedKey === "email" ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedKey === "email" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Channel 3: Address */}
              <div
                style={{
                  background: "rgba(22, 17, 56, 0.55)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "20px",
                  padding: "20px 24px",
                  backdropFilter: "blur(18px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(241, 92, 164, 0.5)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 12px 35px rgba(241, 92, 164, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "15px",
                      background: "linear-gradient(135deg, rgba(241, 92, 164, 0.25), rgba(116, 87, 245, 0.25))",
                      border: "1px solid rgba(241, 92, 164, 0.35)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={22} color="#f472b6" />
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#94a3b8",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        display: "block",
                      }}
                    >
                      Visit Kanchipuram HQ
                    </span>
                    <strong
                      style={{
                        fontSize: "15px",
                        fontWeight: 800,
                        color: "#ffffff",
                        display: "block",
                        marginTop: "2px",
                      }}
                    >
                      No:6, Gandhi Road, Kanchipuram
                    </strong>
                    <span style={{ fontSize: "12px", color: "#64748b", marginTop: "2px", display: "block" }}>
                      9 AM – 6 PM weekdays
                    </span>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=No.+6,+First+Floor,+Gandhi+Road,+Kanchipuram+631501,+Tamil+Nadu"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    color: "#cbd5e1",
                    fontSize: "12px",
                    fontWeight: 700,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#00f0ff";
                    e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#cbd5e1";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                  }}
                >
                  <span>Map</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Statutory Compliance Guarantee Card */}
            <div
              style={{
                position: "relative",
                background: "linear-gradient(135deg, rgba(28, 20, 74, 0.85) 0%, rgba(17, 12, 48, 0.95) 100%)",
                border: "1px solid rgba(116, 87, 245, 0.35)",
                borderRadius: "24px",
                padding: "26px 28px",
                backdropFilter: "blur(24px)",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "160px",
                  height: "160px",
                  background: "radial-gradient(circle, rgba(116, 87, 245, 0.2) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "0 4px 14px rgba(16, 185, 129, 0.4)",
                  }}
                >
                  <ShieldCheck size={20} color="#ffffff" />
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#10b981",
                      fontWeight: 800,
                    }}
                  >
                    100% Legal Immunity
                  </span>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "17px",
                      fontWeight: 800,
                      color: "#ffffff",
                    }}
                  >
                    Statutory Compliance Guarantee
                  </strong>
                </div>
              </div>

              <p
                style={{
                  margin: "0 0 16px 0",
                  fontSize: "13.5px",
                  lineHeight: 1.65,
                  color: "#cbd5e1",
                }}
              >
                Every engagement comes with full PF, ESI, Bonus Act, and Labour Law compliance — plus monthly compliance reports at no additional cost.
              </p>

              {/* Compliance Trust Chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {[
                  "100% PF & ESI Remitted",
                  "CLRA Licensed",
                  "Zero Audit Liability",
                  "Monthly ECR Dossiers",
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "8px",
                      background: "rgba(16, 185, 129, 0.12)",
                      border: "1px solid rgba(16, 185, 129, 0.28)",
                      color: "#34d399",
                    }}
                  >
                    <CheckCircle2 size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Sourcing Metrics Bar */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                textAlign: "center",
              }}
            >
              {[
                { val: "3,064+", label: "Active Pool" },
                { val: "24–72h", label: "Mobilisation" },
                { val: "19 Hubs", label: "TN Districts" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(18, 14, 46, 0.45)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    borderRadius: "16px",
                    padding: "14px 10px",
                  }}
                >
                  <strong
                    style={{
                      display: "block",
                      fontSize: "18px",
                      fontWeight: 900,
                      color: i === 0 ? "#00f0ff" : i === 1 ? "#f15ca4" : "#a78bfa",
                    }}
                  >
                    {stat.val}
                  </strong>
                  <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600 }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: High-Performance Glassmorphic Form Card */}
          <div
            ref={formCardRef}
            style={{
              position: "relative",
              background: "rgba(17, 13, 44, 0.72)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(116, 87, 245, 0.3)",
              borderRadius: "32px",
              padding: "clamp(28px, 4vw, 44px)",
              boxShadow:
                "0 24px 70px rgba(0, 0, 0, 0.55), 0 0 40px rgba(116, 87, 245, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
              overflow: "hidden",
            }}
          >
            {/* Ambient Card Header Beam */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: "2px",
                background: "linear-gradient(90deg, transparent, #00f0ff, #7457f5, #f15ca4, transparent)",
                boxShadow: "0 0 12px rgba(0, 240, 255, 0.8)",
              }}
            />

            {/* Form Telemetry Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "20px",
                marginBottom: "24px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700 }}>
                <Lock size={13} color="#00f0ff" />
                <span style={{ letterSpacing: "0.06em", color: "#cbd5e1" }}>
                  SECURE 256-BIT DISPATCH GATEWAY
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "11px", color: "#64748b" }}>Progress:</span>
                <span
                  style={{
                    color: totalCompleted >= 5 ? "#10b981" : "#a78bfa",
                    fontWeight: 800,
                  }}
                >
                  {totalCompleted} / 8
                </span>
              </div>
            </div>

            {/* Success State */}
            {status === "success" ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "74px",
                    height: "74px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.35))",
                    border: "2px solid #10b981",
                    color: "#10b981",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: "22px",
                    boxShadow: "0 0 35px rgba(16, 185, 129, 0.4)",
                    animation: "pulse 2s infinite",
                  }}
                >
                  <CheckCircle2 size={40} />
                </div>

                <h3
                  style={{
                    fontSize: "26px",
                    fontWeight: 900,
                    color: "#ffffff",
                    marginBottom: "12px",
                  }}
                >
                  Requirement Received!
                </h3>

                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "15px",
                    lineHeight: 1.65,
                    maxWidth: "460px",
                    marginBottom: "28px",
                  }}
                >
                  Thank you, <strong style={{ color: "#00f0ff" }}>{formData.name}</strong>. Your manpower requirement has been forwarded to our team at{" "}
                  <strong style={{ color: "#a78bfa" }}>{destinationEmail}</strong>.
                </p>

                <div
                  style={{
                    width: "100%",
                    maxWidth: "480px",
                    background: "rgba(10, 7, 28, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "20px",
                    padding: "22px",
                    textAlign: "left",
                    marginBottom: "30px",
                    fontSize: "13.5px",
                    lineHeight: 1.8,
                    color: "#cbd5e1",
                  }}
                >
                  <div>
                    <strong style={{ color: "#94a3b8" }}>Company:</strong> {formData.company}
                  </div>
                  <div>
                    <strong style={{ color: "#94a3b8" }}>Category:</strong>{" "}
                    {formData.requirement_type || "General Staffing"}
                  </div>
                  {formData.headcount && (
                    <div>
                      <strong style={{ color: "#94a3b8" }}>Headcount:</strong> {formData.headcount} workers
                    </div>
                  )}
                  {formData.timeline && (
                    <div>
                      <strong style={{ color: "#94a3b8" }}>Timeline:</strong> {formData.timeline}
                    </div>
                  )}
                  <div
                    style={{
                      marginTop: "12px",
                      paddingTop: "12px",
                      borderTop: "1px dashed rgba(255, 255, 255, 0.15)",
                      color: "#34d399",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <CheckCircle2 size={16} />
                    <span>A deployment specialist will contact you within 24 hours.</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    background: "linear-gradient(115deg, #6d50ec, #ef60ad)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "16px",
                    padding: "15px 32px",
                    fontSize: "14px",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 10px 30px rgba(109, 80, 236, 0.35)",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  Submit Another Requirement
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Honeypot field for bot detection */}
                <input
                  type="text"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Error Banner */}
                {status === "error" && (
                  <div
                    style={{
                      background: "rgba(225, 29, 72, 0.12)",
                      border: "1px solid rgba(244, 63, 94, 0.35)",
                      borderRadius: "16px",
                      padding: "18px 20px",
                      marginBottom: "24px",
                      color: "#fecdd3",
                      fontSize: "13px",
                      lineHeight: 1.5,
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: 800,
                        marginBottom: "6px",
                        color: "#fb7185",
                      }}
                    >
                      <AlertCircle size={18} />
                      <span>Could not deliver through Formspree</span>
                    </div>
                    <p style={{ margin: "0 0 12px 0", color: "#fda4af" }}>{errorMessage}</p>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <a
                        href={mailtoLink}
                        style={{
                          fontSize: "12px",
                          padding: "8px 16px",
                          borderRadius: "10px",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          background: "#e11d48",
                          color: "#ffffff",
                          fontWeight: 700,
                        }}
                      >
                        <Mail size={14} />
                        <span>Send directly to {destinationEmail}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        style={{
                          background: "transparent",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          color: "#ffffff",
                          borderRadius: "10px",
                          padding: "8px 14px",
                          fontSize: "12px",
                          cursor: "pointer",
                          fontWeight: 700,
                        }}
                      >
                        Retry
                      </button>
                    </div>
                  </div>
                )}

                {/* Row 1: Name & Company */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "18px",
                    marginBottom: "18px",
                  }}
                >
                  <div>
                    <label
                      htmlFor="name"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#cbd5e1",
                        marginBottom: "8px",
                      }}
                    >
                      <span>Full Name *</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="cinematic-input"
                      placeholder="Your full name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      style={{
                        width: "100%",
                        padding: "13px 16px",
                        borderRadius: "14px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#ffffff",
                        fontSize: "14px",
                        outline: "none",
                        transition: "all 0.25s ease",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#cbd5e1",
                        marginBottom: "8px",
                      }}
                    >
                      <Building2 size={14} color="#00f0ff" />
                      <span>Company Name *</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="cinematic-input"
                      placeholder="Your company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      style={{
                        width: "100%",
                        padding: "13px 16px",
                        borderRadius: "14px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#ffffff",
                        fontSize: "14px",
                        outline: "none",
                        transition: "all 0.25s ease",
                      }}
                    />
                  </div>
                </div>

                {/* Row 2: Email & Phone */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "18px",
                    marginBottom: "18px",
                  }}
                >
                  <div>
                    <label
                      htmlFor="email"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#cbd5e1",
                        marginBottom: "8px",
                      }}
                    >
                      <Mail size={14} color="#a78bfa" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="cinematic-input"
                      placeholder="your@company.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      style={{
                        width: "100%",
                        padding: "13px 16px",
                        borderRadius: "14px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#ffffff",
                        fontSize: "14px",
                        outline: "none",
                        transition: "all 0.25s ease",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#cbd5e1",
                        marginBottom: "8px",
                      }}
                    >
                      <Phone size={14} color="#f472b6" />
                      <span>Phone Number *</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="cinematic-input"
                      placeholder="+91 XXXXX XXXXX"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      style={{
                        width: "100%",
                        padding: "13px 16px",
                        borderRadius: "14px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#ffffff",
                        fontSize: "14px",
                        outline: "none",
                        transition: "all 0.25s ease",
                      }}
                    />
                  </div>
                </div>

                {/* Field 3: Manpower Category Required */}
                <div style={{ marginBottom: "18px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <label
                      htmlFor="requirement-type"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#cbd5e1",
                      }}
                    >
                      <Briefcase size={14} color="#00f0ff" />
                      <span>Manpower Category Required *</span>
                    </label>
                  </div>

                  <div style={{ position: "relative" }}>
                    <select
                      id="requirement-type"
                      name="requirement_type"
                      required
                      value={formData.requirement_type}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      style={{
                        width: "100%",
                        padding: "13px 40px 13px 16px",
                        borderRadius: "14px",
                        background: "#16113b",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: formData.requirement_type ? "#ffffff" : "#94a3b8",
                        fontSize: "14px",
                        outline: "none",
                        appearance: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="" style={{ background: "#16113b", color: "#94a3b8" }}>
                        Select category
                      </option>
                      {CATEGORY_OPTIONS.map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          style={{ background: "#16113b", color: "#ffffff" }}
                        >
                          {opt}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={18}
                      color="#94a3b8"
                      style={{
                        position: "absolute",
                        right: "14px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>

                  {/* Interactive Quick-Pick Chips */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginTop: "10px",
                    }}
                  >
                    {[
                      "Skilled Workers",
                      "Packing & Assembly Operators",
                      "Quality Inspectors",
                      "Interstate Migration Workers",
                    ].map((chip) => {
                      const isSelected = formData.requirement_type === chip;
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleQuickCategory(chip)}
                          style={{
                            background: isSelected
                              ? "rgba(0, 240, 255, 0.18)"
                              : "rgba(255, 255, 255, 0.04)",
                            border: `1px solid ${
                              isSelected ? "#00f0ff" : "rgba(255, 255, 255, 0.1)"
                            }`,
                            color: isSelected ? "#00f0ff" : "#94a3b8",
                            padding: "4px 10px",
                            borderRadius: "8px",
                            fontSize: "11px",
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {chip}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Row 4: Headcount & Timeline */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "18px",
                    marginBottom: "18px",
                  }}
                >
                  <div>
                    <label
                      htmlFor="headcount"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#cbd5e1",
                        marginBottom: "8px",
                      }}
                    >
                      <Users size={14} color="#10b981" />
                      <span>Headcount Required</span>
                    </label>
                    <input
                      id="headcount"
                      name="headcount"
                      type="number"
                      placeholder="e.g. 50"
                      min={1}
                      value={formData.headcount}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      style={{
                        width: "100%",
                        padding: "13px 16px",
                        borderRadius: "14px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#ffffff",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />

                    {/* Quick Headcount Presets */}
                    <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                      {POPULAR_HEADCOUNT_PRESETS.map((cnt) => (
                        <button
                          key={cnt}
                          type="button"
                          onClick={() => handleQuickHeadcount(cnt)}
                          style={{
                            background:
                              formData.headcount === cnt.replace("+", "")
                                ? "rgba(16, 185, 129, 0.2)"
                                : "rgba(255, 255, 255, 0.04)",
                            border: `1px solid ${
                              formData.headcount === cnt.replace("+", "")
                                ? "#10b981"
                                : "rgba(255, 255, 255, 0.08)"
                            }`,
                            color:
                              formData.headcount === cnt.replace("+", "") ? "#34d399" : "#94a3b8",
                            padding: "3px 8px",
                            borderRadius: "6px",
                            fontSize: "10.5px",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          {cnt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="timeline"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#cbd5e1",
                        marginBottom: "8px",
                      }}
                    >
                      <Calendar size={14} color="#f472b6" />
                      <span>Required By</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        disabled={status === "submitting"}
                        style={{
                          width: "100%",
                          padding: "13px 40px 13px 16px",
                          borderRadius: "14px",
                          background: "#16113b",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: formData.timeline ? "#ffffff" : "#94a3b8",
                          fontSize: "14px",
                          outline: "none",
                          appearance: "none",
                          cursor: "pointer",
                        }}
                      >
                        <option value="" style={{ background: "#16113b", color: "#94a3b8" }}>
                          Select timeline
                        </option>
                        {TIMELINE_OPTIONS.map((t) => (
                          <option
                            key={t}
                            value={t}
                            style={{ background: "#16113b", color: "#ffffff" }}
                          >
                            {t}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        color="#94a3b8"
                        style={{
                          position: "absolute",
                          right: "14px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Field 5: Additional Requirements */}
                <div style={{ marginBottom: "26px" }}>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#cbd5e1",
                      marginBottom: "8px",
                    }}
                  >
                    Additional Requirements
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Describe specific skill sets, shift patterns, site location, or any other requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: "14px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#ffffff",
                      fontSize: "14px",
                      outline: "none",
                      resize: "vertical",
                      minHeight: "110px",
                      lineHeight: 1.6,
                    }}
                  />
                </div>

                {/* Animated Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  style={{
                    position: "relative",
                    width: "100%",
                    padding: "16px 24px",
                    borderRadius: "16px",
                    background: "linear-gradient(115deg, #6d50ec 0%, #a855f7 50%, #ec4899 100%)",
                    border: "none",
                    color: "#ffffff",
                    fontSize: "15px",
                    fontWeight: 800,
                    letterSpacing: "0.02em",
                    cursor: status === "submitting" ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    boxShadow: "0 12px 35px rgba(109, 80, 236, 0.4), 0 0 20px rgba(168, 85, 247, 0.3)",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    opacity: status === "submitting" ? 0.8 : 1,
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "submitting") {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 16px 45px rgba(109, 80, 236, 0.55), 0 0 30px rgba(168, 85, 247, 0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 35px rgba(109, 80, 236, 0.4), 0 0 20px rgba(168, 85, 247, 0.3)";
                  }}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={19} className="spin-icon" style={{ animation: "spin 1s linear infinite" }} />
                      <span>Sending Requirement...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Requirement</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                {/* Direct Dispatch Note */}
                <div
                  style={{
                    marginTop: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    fontSize: "12px",
                    color: "#94a3b8",
                  }}
                >
                  <Send size={13} color="#00f0ff" />
                  <span>
                    Submissions are dispatched directly to{" "}
                    <strong style={{ color: "#ffffff" }}>{destinationEmail}</strong>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
