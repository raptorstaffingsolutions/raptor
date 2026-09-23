"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Process", href: "/process" },
    { label: "Network", href: "/network" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <>
      <header className="nav">
        <Link href="/" className="brand" aria-label="Raptor Staffing Solutions">
          <span>R</span>
          <div>
            <b>Raptor</b> Staffing
          </div>
        </Link>

        <nav className="nav-links" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link href="/contact" className="nav-cta">
            <span>Hire Manpower</span>
            <ArrowRight size={16} />
          </Link>

          <button
            type="button"
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="mobile-nav-backdrop"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
            <div className="mobile-nav-header">
              <Link
                href="/"
                className="brand"
                onClick={() => setMobileOpen(false)}
              >
                <span>R</span>
                <div>
                  <b>Raptor</b> Staffing
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                style={{
                  background: "none",
                  border: 0,
                  color: "var(--ink)",
                  padding: "6px",
                }}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mobile-nav-links">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive(link.href) ? "active" : ""}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{link.label}</span>
                  <ArrowRight size={14} opacity={0.6} />
                </Link>
              ))}
            </div>

            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link
                href="/contact"
                className="primary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setMobileOpen(false)}
              >
                <span>Request Manpower</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
