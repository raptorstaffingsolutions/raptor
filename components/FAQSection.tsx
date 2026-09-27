"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Search,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Users2,
  Zap,
  MapPin,
  Clock,
  PhoneCall,
  Mail,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Building2,
  FileCheck,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FAQItem {
  id: string;
  q: string;
  a: string;
  category: "all" | "workforce" | "compliance" | "deployment";
  categoryLabel: string;
  tag: string;
  takeaway: string;
  actionText?: string;
  actionHref?: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-1",
    q: "What types of workers do you supply to manufacturing facilities?",
    a: "We supply skilled, semi-skilled, and unskilled workers across all core industrial operational categories required by manufacturing plants. This includes assembly operators, SMT technicians, quality control inspectors, CNC/VMC machine operators, shopfloor supervisors, warehouse logistics handlers, packing staff, and industrial housekeeping. Every candidate is screened and verified to match your plant's standard operating procedures and shift demands.",
    category: "workforce",
    categoryLabel: "Workforce & Sourcing",
    tag: "Talent Categories",
    takeaway: "Assembly line operators, machine technicians, QA inspectors & logistics staff",
    actionText: "Explore our workforce roles",
    actionHref: "/services",
  },
  {
    id: "faq-2",
    q: "Are your staffing services 100% compliant with Indian Labour Laws?",
    a: "Yes — 100% without exception. We maintain strict compliance under the Employees' Provident Fund Act (EPF), Employees' State Insurance Act (ESI), Contract Labour (Regulation & Abolition) Act (CLRA), Payment of Bonus Act, Tamil Nadu Minimum Wages Act, and Industrial Disputes Act. We furnish audited monthly compliance dossiers, ECR challans, and bank remittance proofs directly to your HR team for complete audit immunity.",
    category: "compliance",
    categoryLabel: "Compliance & Legal",
    tag: "Statutory Shield",
    takeaway: "100% statutory adherence with audited monthly compliance dossiers",
    actionText: "View our compliance standards",
    actionHref: "/services#compliance",
  },
  {
    id: "faq-3",
    q: "How quickly can you deploy manpower after receiving our requirement brief?",
    a: "For standard manufacturing batches (unskilled and semi-skilled assembly roles), we deploy a fully verified, medically cleared cohort within 7 to 14 working days. For urgent plant ramp-ups utilizing our active candidate repository across 19 districts, initial deployment batches can be mobilized within 72 hours.",
    category: "deployment",
    categoryLabel: "Deployment & SLAs",
    tag: "Turnaround Speed",
    takeaway: "72h emergency mobilization • 7–14 days for bulk verified batches",
    actionText: "See our deployment SLAs",
    actionHref: "/process#sla",
  },
  {
    id: "faq-4",
    q: "Do you charge candidates any registration, training, or placement fees?",
    a: "Strictly no. Raptor Staffing operates on an ethical, employer-retained service model. Job seekers and candidates are never charged any registration, processing, uniform, medical, or placement fees. This ethical practice ensures high employee morale, zero debt bondage, and industry-leading shopfloor retention rates.",
    category: "workforce",
    categoryLabel: "Workforce & Sourcing",
    tag: "Ethical Recruitment",
    takeaway: "Strict Zero-Fee Policy — 100% free for workers and candidates",
    actionText: "Review candidate onboarding journey",
    actionHref: "/process",
  },
  {
    id: "faq-5",
    q: "Can you source manpower from districts outside our immediate industrial corridor?",
    a: "Yes. Our direct sourcing network spans 19 key districts across Tamil Nadu, supported by 81+ partner colleges and rural community talent hubs. In addition, for large-scale headcount requirements, we operate a structured interstate sourcing pipeline from Odisha, West Bengal, Andhra Pradesh, Assam, and Kerala, providing full hostel and transit coordination.",
    category: "workforce",
    categoryLabel: "Workforce & Sourcing",
    tag: "Regional Reach",
    takeaway: "19 TN source districts + structured interstate talent pipelines",
    actionText: "Explore our recruitment network",
    actionHref: "/network",
  },
  {
    id: "faq-6",
    q: "Do you manage payroll and statutory filings for all deployed workers?",
    a: "Yes. We execute end-to-end payroll processing: biometric attendance reconciliation, shift allowance calculations, PF/ESI deductions, electronic payslip generation, and direct bank transfers. We manage all statutory returns, UAN generation, and employee grievance settlement with zero administrative burden on your plant HR team.",
    category: "compliance",
    categoryLabel: "Compliance & Legal",
    tag: "Payroll Management",
    takeaway: "Complete end-to-end payroll computation & statutory e-filings",
    actionText: "Learn about payroll services",
    actionHref: "/services",
  },
  {
    id: "faq-7",
    q: "What is your 240-day workforce management policy under the Industrial Disputes Act?",
    a: "Under Section 25B of the Industrial Disputes Act, continuous service of 240 days confers statutory rights. We maintain an automated rolling 240-day tracker for every deployed worker, actively scheduling rotational deployment, tenure reviews, and proactive advisory reports to ensure full statutory alignment without unplanned legal liabilities for our clients.",
    category: "compliance",
    categoryLabel: "Compliance & Legal",
    tag: "ID Act Risk Mitigation",
    takeaway: "Automated rolling 240-day tracker to eliminate statutory exposure",
    actionText: "Read about 240-day management",
    actionHref: "/services",
  },
  {
    id: "faq-8",
    q: "Do you have physical branch offices near SIPCOT industrial parks?",
    a: "Yes. Our dedicated industrial branch office is located at Vijay Complex, Walajabad Road, Sunguvarchatram – 602106, situated immediately adjacent to SIPCOT Phase II. This enables our field managers to reach client plant gates within 15 minutes for emergency shift escalations, attendance checks, and worker welfare support.",
    category: "deployment",
    categoryLabel: "Deployment & Locations",
    tag: "Strategic Presence",
    takeaway: "Sunguvarchatram industrial branch directly at SIPCOT Phase II corridor",
    actionText: "Get directions to our branch",
    actionHref: "https://maps.google.com/?q=Vijay+Complex,+Walajabad+Road,+Sunguvarchatram+602106,+Tamil+Nadu",
  },
];

const CATEGORIES = [
  { key: "all", label: "All Questions", icon: HelpCircle },
  { key: "workforce", label: "Workforce & Sourcing", icon: Users2 },
  { key: "compliance", label: "Compliance & Legal", icon: ShieldCheck },
  { key: "deployment", label: "Deployment & SLAs", icon: Zap },
];

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".faq-header > *",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );

      // Search & Tabs
      gsap.fromTo(
        ".faq-control-bar",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-control-bar",
            start: "top 85%",
          },
        }
      );

      // Accordion Items
      gsap.fromTo(
        ".faq-card-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
          },
        }
      );

      // Concierge Card
      gsap.fromTo(
        ".faq-concierge-card",
        { y: 35, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: ".faq-concierge-card",
            start: "top 88%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.takeaway.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section ref={sectionRef} className="faq-cosmic-section" id="faqs">
      {/* Dynamic Ambient Glowing Orbs */}
      <div className="faq-ambient-orb faq-orb-1" />
      <div className="faq-ambient-orb faq-orb-2" />
      <div className="faq-ambient-orb faq-orb-3" />

      {/* Futuristic Mesh Grid Pattern */}
      <div className="faq-mesh-grid" />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        {/* Header Block */}
        <div className="faq-header">
          <div className="faq-badge-pill">
            <span className="faq-badge-dot" />
            <Sparkles size={13} className="faq-badge-icon" />
            <span>KNOWLEDGE HUB & AUDIT FAQS</span>
          </div>

          <h2 className="faq-title">
            Everything You Need to Know:{" "}
            <span className="faq-gradient-text">Clear Answers. Zero Guesswork.</span>
          </h2>

          <p className="faq-subtitle">
            Transparent answers regarding our industrial workforce mobilization, 100% PF/ESI statutory compliance, deployment turnaround times, and on-ground SIPCOT presence.
          </p>

          {/* Quick Assurance Badges */}
          <div className="faq-quick-stats">
            <div className="faq-stat-chip">
              <ShieldCheck size={14} color="#00f0ff" />
              <span>100% Statutory Immunity</span>
            </div>
            <div className="faq-stat-chip">
              <Clock size={14} color="#7457f5" />
              <span>72h – 14d Deployment SLAs</span>
            </div>
            <div className="faq-stat-chip">
              <MapPin size={14} color="#f15ca4" />
              <span>Kanchipuram & Sunguvarchatram Hubs</span>
            </div>
            <div className="faq-stat-chip">
              <CheckCircle2 size={14} color="#10b981" />
              <span>Strict Zero-Fee Candidate Placement</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="faq-control-bar">
          {/* Category Tabs */}
          <div className="faq-category-tabs">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.key;
              const count =
                cat.key === "all"
                  ? FAQS_DATA.length
                  : FAQS_DATA.filter((f) => f.category === cat.key).length;

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`faq-cat-btn ${isActive ? "active" : ""}`}
                >
                  <Icon size={15} />
                  <span>{cat.label}</span>
                  <span className="faq-cat-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="faq-search-box">
            <Search size={16} className="faq-search-icon" />
            <input
              type="text"
              placeholder="Search by keyword (e.g. PF, ESI, 240-day, SLA, fees)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="faq-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="faq-search-clear"
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Results Counter / Filter Feedback */}
        {(searchQuery || selectedCategory !== "all") && (
          <div className="faq-filter-feedback">
            <span>
              Showing <strong>{filteredFaqs.length}</strong> {filteredFaqs.length === 1 ? "answer" : "answers"}
              {searchQuery && <> for &ldquo;<strong>{searchQuery}</strong>&rdquo;</>}
              {selectedCategory !== "all" && <> in <strong>{CATEGORIES.find((c) => c.key === selectedCategory)?.label}</strong></>}
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="faq-reset-link"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Layout: Main Accordion + Concierge Sidebar Card */}
        <div className="faq-layout-split">
          {/* Accordion List Column */}
          <div ref={listRef} className="faq-accordion-col">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openId === faq.id;
                const paddedIndex = String(index + 1).padStart(2, "0");

                return (
                  <div
                    key={faq.id}
                    className={`faq-card-item ${isOpen ? "faq-open" : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(faq.id)}
                      className="faq-question-btn"
                      aria-expanded={isOpen}
                    >
                      <div className="faq-q-left">
                        <span className="faq-index-num">{paddedIndex}</span>
                        <div className="faq-q-text-group">
                          <div className="faq-meta-tags">
                            <span className="faq-category-tag">{faq.categoryLabel}</span>
                            <span className="faq-subtag">
                              <span className="faq-subtag-dot" />
                              {faq.tag}
                            </span>
                          </div>
                          <h3 className="faq-question-text">{faq.q}</h3>
                        </div>
                      </div>

                      <div className="faq-toggle-disc">
                        <ChevronDown size={18} className="faq-chevron" />
                      </div>
                    </button>

                    <div
                      className={`faq-answer-collapse ${isOpen ? "expanded" : ""}`}
                    >
                      <div className="faq-answer-inner">
                        <p className="faq-answer-text">{faq.a}</p>

                        {/* Executive Highlight Pill */}
                        <div className="faq-takeaway-box">
                          <CheckCircle2 size={16} color="#00f0ff" className="faq-takeaway-icon" />
                          <div className="faq-takeaway-content">
                            <span className="faq-takeaway-label">Key Takeaway & Assurance</span>
                            <strong className="faq-takeaway-value">{faq.takeaway}</strong>
                          </div>
                        </div>

                        {/* Action Link if provided */}
                        {faq.actionText && faq.actionHref && (
                          <div className="faq-action-row">
                            <Link
                              href={faq.actionHref}
                              className="faq-inline-link"
                              target={faq.actionHref.startsWith("http") ? "_blank" : undefined}
                              rel={faq.actionHref.startsWith("http") ? "noopener noreferrer" : undefined}
                            >
                              <span>{faq.actionText}</span>
                              <ArrowRight size={14} />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="faq-empty-state">
                <HelpCircle size={44} color="#7457f5" />
                <h4>No matching questions found</h4>
                <p>We couldn't find any questions matching your query. Try searching for different keywords or contact our team directly.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="faq-empty-btn"
                >
                  View All Questions
                </button>
              </div>
            )}
          </div>

          {/* Support Concierge Side Card */}
          <div className="faq-concierge-col">
            <div className="faq-concierge-card">
              <div className="faq-concierge-glow" />

              <div className="faq-concierge-top">
                <div className="faq-concierge-icon-disc">
                  <MessageSquare size={24} color="#00f0ff" />
                </div>
                <span className="faq-concierge-badge">DIRECT ASSISTANCE</span>
              </div>

              <h4 className="faq-concierge-title">Have a Specific Plant Requirement?</h4>
              <p className="faq-concierge-desc">
                Speak directly with our industrial staffing advisors for customized headcount models, wage benchmarking, and compliance audits.
              </p>

              <div className="faq-concierge-channels">
                <a
                  href="#contact-form"
                  className="faq-concierge-channel-item"
                >
                  <div className="faq-channel-icon">
                    <FileCheck size={18} color="#7457f5" />
                  </div>
                  <div>
                    <strong>Submit Manpower RFQ</strong>
                    <span>Tailored staffing plan within 24 hours</span>
                  </div>
                </a>

                <a
                  href="mailto:raptorstaffingsolutions@gmail.com"
                  className="faq-concierge-channel-item"
                >
                  <div className="faq-channel-icon">
                    <Mail size={18} color="#f15ca4" />
                  </div>
                  <div>
                    <strong>Email Direct Desk</strong>
                    <span>raptorstaffingsolutions@gmail.com</span>
                  </div>
                </a>

                <div className="faq-concierge-channel-item">
                  <div className="faq-channel-icon">
                    <Building2 size={18} color="#10b981" />
                  </div>
                  <div>
                    <strong>Walk-In Consultation</strong>
                    <span>Kanchipuram HQ &amp; Sunguvarchatram SIPCOT</span>
                  </div>
                </div>
              </div>

              <div className="faq-concierge-sla">
                <Clock size={16} color="#00f0ff" />
                <span>
                  <strong>Guaranteed SLA: </strong>
                  Inquiries acknowledged within 4 business hours.
                </span>
              </div>

              <Link href="#contact-form" className="faq-concierge-cta-btn">
                <span>Start Direct Conversation</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
