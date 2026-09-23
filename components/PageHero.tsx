import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import React from "react";

interface PageHeroProps {
  badge: string;
  title: string;
  highlightedText?: string;
  description: string;
  breadcrumbCurrent: string;
  actionButton?: React.ReactNode;
}

export default function PageHero({
  badge,
  title,
  highlightedText,
  description,
  breadcrumbCurrent,
  actionButton,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="orb orb-a" style={{ opacity: 0.7 }} />
      <div className="orb orb-b" style={{ opacity: 0.5 }} />

      <div className="page-hero-content">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <span>{breadcrumbCurrent}</span>
        </nav>

        <div className="badge-pill">
          <Sparkles size={14} />
          <span>{badge}</span>
        </div>

        <h1>
          {title}{" "}
          {highlightedText && (
            <span className="gradient-text">{highlightedText}</span>
          )}
        </h1>

        <p className="hero-lede">{description}</p>

        {actionButton && (
          <div style={{ marginTop: "24px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {actionButton}
          </div>
        )}
      </div>
    </section>
  );
}
