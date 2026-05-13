"use client";
import { useEffect, useRef, useState } from "react";
import { Phone, List, X } from "@phosphor-icons/react";
import { NAV_LINKS } from "@/lib/siteData";

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [activeSection, setActive]  = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered]       = useState(-1);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linkRefs     = useRef<(HTMLAnchorElement | null)[]>([]);
  const navRef       = useRef<HTMLDivElement>(null);

  /* ── Scroll: shrink + active section detection ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      // Detect which section is in view
      const sections = NAV_LINKS.map(l => document.querySelector(l.href) as HTMLElement | null);
      let current = "";
      sections.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 120) current = NAV_LINKS[i].href;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Move indicator pill ── */
  const moveIndicator = (index: number) => {
    const el  = linkRefs.current[index];
    const nav = navRef.current;
    if (!el || !nav || !indicatorRef.current) return;
    const navRect = nav.getBoundingClientRect();
    const elRect  = el.getBoundingClientRect();
    indicatorRef.current.style.left    = `${elRect.left - navRect.left}px`;
    indicatorRef.current.style.width   = `${elRect.width}px`;
    indicatorRef.current.style.opacity = "1";
  };
  const hideIndicator = () => {
    if (indicatorRef.current) indicatorRef.current.style.opacity = "0";
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: scrolled ? "16px" : "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          width: "calc(100% - 40px)",
          maxWidth: "780px",
          transition: "top 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            background: scrolled
              ? "rgba(20,27,24,0.97)"
              : "rgba(28,36,33,0.82)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: scrolled
              ? "1px solid rgba(212,120,90,0.2)"
              : "1px solid rgba(245,240,232,0.08)",
            borderRadius: "100px",
            padding: scrolled ? "8px 20px" : "10px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(212,120,90,0.1)"
              : "0 4px 24px rgba(0,0,0,0.15)",
            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* ── Logo ── */}
          <a
            href="/"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "1.3rem",
              color: "var(--terracotta)",
              textDecoration: "none",
              letterSpacing: "-0.02em",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{
              display: "inline-flex",
              width: "32px", height: "32px",
              background: "var(--terracotta)",
              borderRadius: "8px",
              alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-syne)", fontWeight: 800,
              fontSize: "13px", color: "var(--cream)",
              letterSpacing: "-0.01em",
              flexShrink: 0,
            }}>RS</span>
            <span className="logo-text" style={{
              fontFamily: "var(--font-cabinet)",
              fontWeight: 600, fontSize: "12px",
              color: "rgba(245,240,232,0.5)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}>
              Studio
            </span>
          </a>

          {/* ── Desktop nav links ── */}
          <div
            ref={navRef}
            className="nav-links-wrap"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              position: "relative",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {/* Sliding indicator */}
            <div
              ref={indicatorRef}
              style={{
                position: "absolute",
                height: "30px",
                background: "rgba(245,240,232,0.1)",
                borderRadius: "100px",
                border: "1px solid rgba(245,240,232,0.12)",
                transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1), width 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s",
                opacity: 0,
                pointerEvents: "none",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 0,
              }}
            />

            {NAV_LINKS.map((link, i) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  ref={el => { linkRefs.current[i] = el; }}
                  onMouseEnter={() => { setHovered(i); moveIndicator(i); }}
                  onMouseLeave={() => { setHovered(-1); hideIndicator(); }}
                  style={{
                    fontFamily: "var(--font-cabinet)",
                    fontSize: "13px",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive
                      ? "var(--terracotta)"
                      : hovered === i
                      ? "rgba(245,240,232,0.95)"
                      : "rgba(245,240,232,0.6)",
                    textDecoration: "none",
                    padding: "6px 14px",
                    borderRadius: "100px",
                    position: "relative",
                    zIndex: 1,
                    transition: "color 0.2s",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {/* Active dot */}
                  {isActive && (
                    <span style={{
                      width: "4px", height: "4px",
                      borderRadius: "50%",
                      background: "var(--terracotta)",
                      flexShrink: 0,
                    }} />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* ── Right side ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            {/* Phone icon — mobile only */}
            <a
              href="tel:+918115473597"
              className="nav-phone-btn"
              style={{
                display: "none",
                width: "36px", height: "36px",
                background: "var(--terracotta)",
                borderRadius: "50%",
                alignItems: "center", justifyContent: "center",
                color: "var(--cream)",
                textDecoration: "none",
                flexShrink: 0,
              }}
              aria-label="Call us"
            >
              <Phone size={15} weight="fill" />
            </a>

            {/* Book button — desktop */}
            <a
              href="#cta"
              className="nav-book-btn"
              style={{
                fontFamily: "var(--font-cabinet)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.04em",
                background: "var(--terracotta)",
                color: "var(--cream)",
                padding: "8px 18px",
                borderRadius: "100px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "background 0.2s, transform 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--rust)";
                e.currentTarget.style.transform  = "scale(1.04)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "var(--terracotta)";
                e.currentTarget.style.transform  = "scale(1)";
              }}
            >
              <Phone size={13} weight="fill" />
              Book
            </a>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="nav-hamburger"
              style={{
                display: "none",
                background: "rgba(245,240,232,0.08)",
                border: "1px solid rgba(245,240,232,0.1)",
                borderRadius: "50%",
                width: "36px", height: "36px",
                cursor: "pointer",
                alignItems: "center", justifyContent: "center",
                color: "var(--cream)",
                flexShrink: 0,
                transition: "background 0.2s",
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <X size={16} weight="bold" />
                : <List size={16} weight="bold" />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile fullscreen menu ── */}
      <div
        className="mobile-menu"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "rgba(20,27,24,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 clamp(32px,8vw,64px)",
          gap: "0",
          pointerEvents: mobileOpen ? "all" : "none",
          opacity: mobileOpen ? 1 : 0,
          transition: "opacity 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Close area */}
        <button
          onClick={() => setMobileOpen(false)}
          style={{
            position: "absolute", top: "24px", right: "24px",
            background: "rgba(245,240,232,0.08)",
            border: "1px solid rgba(245,240,232,0.1)",
            borderRadius: "50%",
            width: "40px", height: "40px",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--cream)",
          }}
        >
          <X size={16} weight="bold" />
        </button>

        {/* Brand */}
        <div style={{
          fontFamily: "var(--font-cabinet)", fontSize: "11px",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "rgba(245,240,232,0.3)", marginBottom: "48px",
        }}>
          Roop Sagar Studio
        </div>

        {/* Links */}
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(2.2rem,10vw,3.5rem)",
              color: activeSection === link.href ? "var(--terracotta)" : "rgba(245,240,232,0.85)",
              textDecoration: "none",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateX(0)" : "translateX(-24px)",
              transition: `opacity 0.5s ${0.05 + i * 0.07}s, transform 0.5s ${0.05 + i * 0.07}s cubic-bezier(0.16,1,0.3,1), color 0.2s`,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span style={{
              fontFamily: "var(--font-cabinet)", fontSize: "11px",
              fontWeight: 500, color: "rgba(245,240,232,0.25)",
              letterSpacing: "0.1em",
            }}>
              0{i + 1}
            </span>
            {link.label}
          </a>
        ))}

        {/* CTA */}
        <a
          href="#cta"
          onClick={() => setMobileOpen(false)}
          style={{
            marginTop: "40px",
            fontFamily: "var(--font-cabinet)", fontSize: "14px", fontWeight: 600,
            background: "var(--terracotta)", color: "var(--cream)",
            padding: "14px 36px", borderRadius: "100px",
            textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: "8px",
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.5s ${0.05 + NAV_LINKS.length * 0.07}s, transform 0.5s ${0.05 + NAV_LINKS.length * 0.07}s`,
          }}
        >
          <Phone size={14} weight="fill" />
          Book a Session
        </a>

        {/* Bottom info */}
        <div style={{
          position: "absolute", bottom: "32px", left: "clamp(32px,8vw,64px)",
          fontFamily: "var(--font-cabinet)", fontSize: "12px",
          color: "rgba(245,240,232,0.25)", letterSpacing: "0.05em",
        }}>
          081154 73597 · Ballia, UP
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .nav-hamburger  { display: flex !important; }
          .nav-book-btn   { display: none !important; }
          .nav-phone-btn  { display: flex !important; }
          .nav-links-wrap { display: none !important; }
          .logo-text      { display: none !important; }
        }
      `}</style>
    </>
  );
}
