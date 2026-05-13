"use client";
import { InstagramLogo, FacebookLogo, YoutubeLogo, Camera } from "@phosphor-icons/react";
import MagneticText from "@/components/ui/MagneticText";
import { SITE, NAV_LINKS } from "@/lib/siteData";

export default function Footer() {
  return (
    <footer style={{ background: "var(--terracotta)", overflow: "hidden" }}>
      {/* Top — huge text */}
      <div
        style={{
          padding: "clamp(60px, 10vw, 100px) clamp(20px, 5vw, 80px) 40px",
          textAlign: "center",
          borderBottom: "1px solid rgba(245,240,232,0.15)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            fontSize: "clamp(2.5rem, 8vw, 8rem)",
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
          }}
        >
          <div
            style={{
              WebkitTextStroke: "2px var(--cream)",
              color: "transparent",
              display: "block",
            }}
          >
            LET&apos;S CREATE
          </div>
          <div style={{ color: "var(--cream)", display: "block" }}>
            <MagneticText strength={12}>SOMETHING REAL</MagneticText>
          </div>
        </div>
      </div>

      {/* Middle grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0",
          padding: "60px clamp(20px, 5vw, 80px)",
          borderBottom: "1px solid rgba(245,240,232,0.15)",
        }}
      >
        {/* Col 1 — Brand */}
        <div style={{ paddingRight: "40px" }}>
          <div
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "var(--cream)",
              marginBottom: "8px",
            }}
          >
            {SITE.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-cabinet)",
              fontSize: "13px",
              color: "rgba(245,240,232,0.7)",
              marginBottom: "16px",
              fontStyle: "italic",
            }}
          >
            {SITE.tagline}
          </div>
          <div
            style={{
              fontFamily: "var(--font-cabinet)",
              fontSize: "13px",
              color: "rgba(245,240,232,0.6)",
            }}
          >
            {SITE.location}
          </div>
        </div>

        {/* Col 2 — Links */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-cabinet)",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.5)",
              marginBottom: "20px",
            }}
          >
            Navigate
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: "var(--font-cabinet)",
                  fontSize: "1rem",
                  color: "var(--cream)",
                  textDecoration: "none",
                  display: "inline-block",
                  position: "relative",
                  width: "fit-content",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.paddingLeft = "16px";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.paddingLeft = "0";
                }}
              >
                <span style={{ transition: "padding-left 0.2s" }}>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Col 3 — Contact */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-cabinet)",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.5)",
              marginBottom: "20px",
            }}
          >
            Get In Touch
          </div>

          <a
            href={`tel:${SITE.phoneRaw}`}
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "var(--cream)",
              textDecoration: "none",
              display: "block",
              marginBottom: "8px",
            }}
          >
            {SITE.phone}
          </a>

          <a
            href={`https://${SITE.website}`}
            style={{
              fontFamily: "var(--font-cabinet)",
              fontSize: "14px",
              color: "rgba(245,240,232,0.7)",
              textDecoration: "underline",
              display: "block",
              marginBottom: "24px",
            }}
          >
            {SITE.website}
          </a>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "16px" }}>
            {[
              { Icon: InstagramLogo, href: "#", label: "Instagram" },
              { Icon: FacebookLogo, href: "#", label: "Facebook" },
              { Icon: YoutubeLogo, href: "#", label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  color: "var(--cream)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  border: "1px solid rgba(245,240,232,0.3)",
                  borderRadius: "50%",
                  transition: "transform 0.3s, background 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1) rotate(360deg)";
                  e.currentTarget.style.background = "rgba(245,240,232,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Icon size={18} weight="bold" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          background: "var(--rust)",
          padding: "16px clamp(20px, 5vw, 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-cabinet)",
            fontSize: "12px",
            color: "rgba(245,240,232,0.7)",
          }}
        >
          © 2024 {SITE.name}
        </span>

        {/* Camera shutter icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            const cam = e.currentTarget.querySelector(".cam-icon") as HTMLElement;
            if (cam) cam.style.animation = "spin-slow 0.5s linear";
          }}
          onMouseLeave={(e) => {
            const cam = e.currentTarget.querySelector(".cam-icon") as HTMLElement;
            if (cam) cam.style.animation = "none";
          }}
        >
          <Camera
            size={18}
            weight="fill"
            color="rgba(245,240,232,0.5)"
            className="cam-icon"
            style={{ transition: "transform 0.3s" }}
          />
        </div>

        <span
          style={{
            fontFamily: "var(--font-cabinet)",
            fontSize: "12px",
            color: "rgba(245,240,232,0.7)",
          }}
        >
          Made with ❤ in Ballia
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer > div:nth-child(2) {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
}
