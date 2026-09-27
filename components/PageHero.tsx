import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Sparkles } from "lucide-react";
import React from "react";

interface PageHeroProps {
  badge: string;
  title: string;
  highlightedText?: string;
  description: string;
  breadcrumbCurrent: string;
  actionButton?: React.ReactNode;
  image?: string;
  imageAlt?: string;
}

export default function PageHero({
  badge,
  title,
  highlightedText,
  description,
  breadcrumbCurrent,
  actionButton,
  image,
  imageAlt,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="orb orb-a" style={{ opacity: 0.7 }} />
      <div className="orb orb-b" style={{ opacity: 0.5 }} />

      <div
        className="page-hero-inner"
        style={{
          display: image ? "grid" : "block",
          gridTemplateColumns: image ? "1.15fr 0.85fr" : undefined,
          gap: "40px",
          alignItems: "center",
          maxWidth: "1200px",
          position: "relative",
          zIndex: 2,
        }}
      >
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

        {image && (
          <div
            className="page-hero-visual"
            style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(50, 40, 90, 0.12)",
              border: "1px solid rgba(255,255,255,0.9)",
              aspectRatio: "16 / 11",
            }}
          >
            <Image
              src={image}
              alt={imageAlt || title}
              width={700}
              height={480}
              priority
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 40%, rgba(23, 32, 57, 0.75) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "20px",
                right: "20px",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              {imageAlt || "Raptor Staffing Solutions — Tamil Nadu"}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
