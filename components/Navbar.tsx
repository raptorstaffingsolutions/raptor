"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* ─── GSAP Stunning Animations ─── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // 1. Dramatic Entrance Animation
      const tl = gsap.timeline();
      tl.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.1, clearProps: "all" }
      )
      .fromTo(
        logoRef.current,
        { x: -20, opacity: 0, rotateX: 90 },
        { x: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.8"
      )
      .fromTo(
        ".nav-links a",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "back.out(1.5)" },
        "-=0.6"
      )
      .fromTo(
        ".nav-cta",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" },
        "-=0.4"
      );

      // 2. Dynamic Scroll-Triggered Shrink & Glass Effect
      ScrollTrigger.create({
        start: "top -50",
        end: 99999,
        toggleClass: { className: "nav-scrolled", targets: navRef.current },
      });
      
    });

    return () => ctx.revert();
  }, []);

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
      <header className={`nav ${pathname === "/" || pathname === "/about" || pathname === "/services" || pathname === "/process" || pathname === "/network" || pathname === "/contact" ? "nav-home" : ""}`} ref={navRef}>
        <Link href="/" className="brand" aria-label="Raptor Staffing Solutions" ref={logoRef}>
          <div className="brand-logo-wrap">
            <Image
              src="/logo.png"
              alt="Raptor Staffing Solutions"
              width={240}
              height={120}
              priority
              className="brand-logo"
            />
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
                aria-label="Raptor Staffing Solutions"
              >
                <Image
                  src="/logo.png"
                  alt="Raptor Staffing Solutions"
                  width={150}
                  height={75}
                  priority
                  className="brand-logo"
                />
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
