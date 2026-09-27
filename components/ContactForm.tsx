"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, Mail, Send } from "lucide-react";

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

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Target destination email
  const destinationEmail = "raptorstaffingsolutions@gmail.com";

  // Resolve Formspree endpoint from env or fallback
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim();
  const formspreeEndpoint = formId
    ? formId.startsWith("http")
      ? formId
      : `https://formspree.io/f/${formId}`
    : `https://formspree.io/f/${destinationEmail}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Bot detection check
    if (formData._gotcha) {
      return;
    }

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
        // If Formspree requires form creation on dashboard
        if (data?.errors && Array.isArray(data.errors)) {
          const detail = data.errors.map((err: { message: string }) => err.message).join(", ");
          setErrorMessage(detail || "Submission could not be completed.");
        } else if (data?.error) {
          setErrorMessage(data.error);
        } else {
          setErrorMessage("Failed to send message via Formspree. Please check your connection or contact us directly.");
        }
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error occurred while submitting. Please try again or email us directly.");
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

  if (status === "success") {
    return (
      <div
        className="form-card contact-form"
        style={{
          textAlign: "center",
          padding: "50px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "68px",
            height: "68px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
            color: "#16a34a",
            display: "grid",
            placeItems: "center",
            marginBottom: "20px",
            boxShadow: "0 10px 25px rgba(22, 163, 74, 0.2)",
          }}
        >
          <CheckCircle2 size={36} />
        </div>

        <h3 style={{ fontSize: "24px", fontWeight: 800, color: "var(--ink)", marginBottom: "10px" }}>
          Requirement Received!
        </h3>

        <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.6, maxWidth: "460px", marginBottom: "24px" }}>
          Thank you, <strong>{formData.name}</strong>. Your manpower requirement has been forwarded to our team at{" "}
          <strong style={{ color: "#7457f5" }}>{destinationEmail}</strong>.
        </p>

        <div
          style={{
            width: "100%",
            maxWidth: "460px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "20px",
            textAlign: "left",
            marginBottom: "28px",
            fontSize: "13px",
            lineHeight: 1.7,
            color: "#475569",
          }}
        >
          <div><strong>Company:</strong> {formData.company}</div>
          <div><strong>Category:</strong> {formData.requirement_type || "General Staffing"}</div>
          {formData.headcount && <div><strong>Headcount:</strong> {formData.headcount} workers</div>}
          {formData.timeline && <div><strong>Timeline:</strong> {formData.timeline}</div>}
          <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px dashed #cbd5e1", color: "#16a34a", fontWeight: 600 }}>
            ✓ A deployment specialist will contact you within 24 hours.
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="submit-btn"
          style={{ maxWidth: "260px" }}
        >
          <span>Submit Another Requirement</span>
        </button>
      </div>
    );
  }

  return (
    <form className="form-card contact-form" onSubmit={handleSubmit}>
      {/* Honeypot field for spam prevention */}
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

      {status === "error" && (
        <div
          style={{
            background: "#fff1f2",
            border: "1px solid #fecdd3",
            borderRadius: "14px",
            padding: "16px 20px",
            marginBottom: "24px",
            color: "#9f1239",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: 700, marginBottom: "6px" }}>
            <AlertCircle size={18} color="#e11d48" />
            <span>Could not deliver through Formspree</span>
          </div>
          <p style={{ margin: "0 0 12px 0", color: "#881337" }}>
            {errorMessage}
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a
              href={mailtoLink}
              className="primary"
              style={{
                fontSize: "12px",
                padding: "8px 16px",
                borderRadius: "10px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
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
                border: "1px solid #fda4af",
                color: "#9f1239",
                borderRadius: "10px",
                padding: "8px 14px",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-input"
            placeholder="Your full name"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={status === "submitting"}
          />
        </div>
        <div className="form-group">
          <label htmlFor="company" className="form-label">
            Company Name *
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="form-input"
            placeholder="Your company"
            required
            value={formData.company}
            onChange={handleChange}
            disabled={status === "submitting"}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            placeholder="your@company.com"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={status === "submitting"}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="form-input"
            placeholder="+91 XXXXX XXXXX"
            required
            value={formData.phone}
            onChange={handleChange}
            disabled={status === "submitting"}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="requirement-type" className="form-label">
          Manpower Category Required *
        </label>
        <select
          id="requirement-type"
          name="requirement_type"
          className="form-select"
          required
          value={formData.requirement_type}
          onChange={handleChange}
          disabled={status === "submitting"}
        >
          <option value="">Select category</option>
          <option value="Skilled Workers">Skilled Workers</option>
          <option value="Semi-Skilled Workers">Semi-Skilled Workers</option>
          <option value="Unskilled / General Workers">Unskilled / General Workers</option>
          <option value="Supervisors / Team Leaders">Supervisors / Team Leaders</option>
          <option value="Quality Inspectors">Quality Inspectors</option>
          <option value="Packing & Assembly Operators">Packing & Assembly Operators</option>
          <option value="Interstate Migration Workers">Interstate Migration Workers</option>
          <option value="Payroll & HR Management Only">Payroll & HR Management Only</option>
          <option value="Multiple Categories">Multiple Categories</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="headcount" className="form-label">
            Headcount Required
          </label>
          <input
            id="headcount"
            name="headcount"
            type="number"
            className="form-input"
            placeholder="e.g. 50"
            min={1}
            value={formData.headcount}
            onChange={handleChange}
            disabled={status === "submitting"}
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeline" className="form-label">
            Required By
          </label>
          <select
            id="timeline"
            name="timeline"
            className="form-select"
            value={formData.timeline}
            onChange={handleChange}
            disabled={status === "submitting"}
          >
            <option value="">Select timeline</option>
            <option value="Within 1 week">Within 1 week</option>
            <option value="Within 2 weeks">Within 2 weeks</option>
            <option value="Within 1 month">Within 1 month</option>
            <option value="Within 3 months">Within 3 months</option>
            <option value="Flexible / ongoing requirement">Flexible / ongoing requirement</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Additional Requirements
        </label>
        <textarea
          id="message"
          name="message"
          className="form-textarea"
          rows={4}
          placeholder="Describe specific skill sets, shift patterns, site location, or any other requirements..."
          value={formData.message}
          onChange={handleChange}
          disabled={status === "submitting"}
        />
      </div>

      <button
        type="submit"
        className="submit-btn"
        disabled={status === "submitting"}
        style={{
          cursor: status === "submitting" ? "not-allowed" : "pointer",
          opacity: status === "submitting" ? 0.8 : 1,
        }}
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="spin-icon" style={{ animation: "spin 1s linear infinite" }} />
            <span>Sending Requirement...</span>
          </>
        ) : (
          <>
            <span>Send Requirement</span>
            <ArrowRight size={18} />
          </>
        )}
      </button>

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          fontSize: "12px",
          color: "var(--muted)",
        }}
      >
        <Send size={13} color="#7457f5" />
        <span>
          Submissions are dispatched directly to{" "}
          <strong style={{ color: "var(--ink)" }}>{destinationEmail}</strong>
        </span>
      </div>
    </form>
  );
}
