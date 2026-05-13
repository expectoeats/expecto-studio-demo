"use client";
import { useEffect, useRef, useState } from "react";
import { Phone, MapPin, Camera, Package } from "@phosphor-icons/react";

const PANELS = [
  {
    num: "01",
    title: "First, We Talk.",
    body: "We understand your vision, your story, your people. No forms — just a real conversation.",
    bg: "var(--surface-0)",
    textColor: "var(--text-primary)",
    icon: Phone,
    iconAnim: "phone-ring",
  },
  {
    num: "02",
    title: "Then, We Plan.",
    body: "Locations, timing, special moments list. Every detail mapped so nothing is missed.",
    bg: "var(--sage)",
    textColor: "var(--text-primary)",
    icon: MapPin,
    iconAnim: "float-up",
  },
  {
    num: "03",
    title: "The Magic Day.",
    body: "Candid, emotional, real — no stiff poses needed. We blend in and capture everything.",
    bg: "var(--terracotta)",
    textColor: "var(--cream)",
    icon: Camera,
    iconAnim: "spin-slow",
  },
  {
    num: "04",
    title: "Your Story, Forever.",
    body: "Beautifully edited and delivered within 2–3 weeks. Yours to keep, forever.",
    bg: "var(--surface-0)",
    textColor: "var(--text-primary)",
    icon: Package,
    iconAnim: "float-up",
    cta: true,
  },
];

/* ── Pure CSS/SVG 3D floating shapes — zero imports ── */
function Background3D() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* ── Large rotating wireframe cube (CSS 3D) ── */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "6%",
          width: "180px",
          height: "180px",
          transformStyle: "preserve-3d",
          animation: "cube-spin 18s linear infinite",
          opacity: 0.12,
        }}
      >
        {/* 6 faces */}
        {[
          { transform: "rotateY(0deg)   translateZ(90px)" },
          { transform: "rotateY(180deg) translateZ(90px)" },
          { transform: "rotateY(90deg)  translateZ(90px)" },
          { transform: "rotateY(-90deg) translateZ(90px)" },
          { transform: "rotateX(90deg)  translateZ(90px)" },
          { transform: "rotateX(-90deg) translateZ(90px)" },
        ].map((face, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "180px",
              height: "180px",
              border: "1.5px solid var(--terracotta)",
              background: "transparent",
              transform: face.transform,
              backfaceVisibility: "visible",
            }}
          />
        ))}
      </div>

      {/* ── Medium torus ring (SVG) ── */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: "4%",
          animation: "ring-spin 12s linear infinite",
          opacity: 0.15,
        }}
      >
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <ellipse cx="70" cy="70" rx="60" ry="24" stroke="var(--forest)" strokeWidth="2" />
          <ellipse cx="70" cy="70" rx="60" ry="60" stroke="var(--forest)" strokeWidth="1.5" strokeDasharray="6 4" />
        </svg>
      </div>

      {/* ── Small cube top-left ── */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "2%",
          width: "80px",
          height: "80px",
          transformStyle: "preserve-3d",
          animation: "cube-spin 10s linear infinite reverse",
          opacity: 0.1,
        }}
      >
        {[
          { transform: "rotateY(0deg)   translateZ(40px)" },
          { transform: "rotateY(180deg) translateZ(40px)" },
          { transform: "rotateY(90deg)  translateZ(40px)" },
          { transform: "rotateY(-90deg) translateZ(40px)" },
          { transform: "rotateX(90deg)  translateZ(40px)" },
          { transform: "rotateX(-90deg) translateZ(40px)" },
        ].map((face, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "80px",
              height: "80px",
              border: "1px solid var(--mustard)",
              background: "transparent",
              transform: face.transform,
            }}
          />
        ))}
      </div>

      {/* ── Floating diamond (rotated square) ── */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          right: "3%",
          width: "60px",
          height: "60px",
          border: "1.5px solid var(--sage)",
          transform: "rotate(45deg)",
          animation: "diamond-float 7s ease-in-out infinite",
          opacity: 0.18,
        }}
      />

      {/* ── Dotted sphere (SVG circles) ── */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "45%",
          animation: "ring-spin 20s linear infinite",
          opacity: 0.08,
        }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          {/* Latitude lines */}
          {[30, 50, 70, 90, 110, 130, 150, 170].map((cy, i) => {
            const r = Math.sqrt(Math.max(0, 100 * 100 - (cy - 100) * (cy - 100)));
            return (
              <ellipse
                key={i}
                cx="100"
                cy={cy}
                rx={r}
                ry={r * 0.3}
                stroke="var(--terracotta)"
                strokeWidth="0.8"
                strokeDasharray="3 3"
              />
            );
          })}
          {/* Longitude lines */}
          {[0, 45, 90, 135].map((angle, i) => (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx="100"
              ry="30"
              stroke="var(--terracotta)"
              strokeWidth="0.8"
              strokeDasharray="3 3"
              transform={`rotate(${angle} 100 100)`}
            />
          ))}
        </svg>
      </div>

      {/* ── Scattered dots ── */}
      {[
        { top: "20%", left: "15%", size: 6, color: "var(--mustard)", delay: "0s" },
        { top: "70%", left: "20%", size: 4, color: "var(--electric)", delay: "1s" },
        { top: "40%", right: "15%", size: 8, color: "var(--terracotta)", delay: "0.5s" },
        { top: "80%", right: "25%", size: 5, color: "var(--sage)", delay: "1.5s" },
        { top: "60%", left: "50%", size: 4, color: "var(--lavender)", delay: "2s" },
      ].map((dot, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: dot.top,
            left: (dot as { left?: string }).left,
            right: (dot as { right?: string }).right,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            borderRadius: "50%",
            background: dot.color,
            opacity: 0.25,
            animation: `diamond-float 5s ${dot.delay} ease-in-out infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes cube-spin {
          from { transform: rotateX(20deg) rotateY(0deg); }
          to   { transform: rotateX(20deg) rotateY(360deg); }
        }
        @keyframes ring-spin {
          from { transform: rotateZ(0deg) rotateX(60deg); }
          to   { transform: rotateZ(360deg) rotateX(60deg); }
        }
        @keyframes diamond-float {
          0%, 100% { transform: rotate(45deg) translateY(0px); }
          50%       { transform: rotate(45deg) translateY(-14px); }
        }
      `}</style>
    </div>
  );
}

export default function ProcessSection() {
  const [activePanel, setActivePanel] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top > 0 || rect.bottom < 0) return;
      const progress = Math.abs(rect.top) / (rect.height - window.innerHeight);
      const panel = Math.min(PANELS.length - 1, Math.floor(progress * PANELS.length));
      setActivePanel(panel);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        background: "var(--surface-dark)",
        padding: "clamp(60px, 10vw, 120px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── 3D Background ── */}
      <Background3D />

      <div className="container-site" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "60px", textAlign: "center" }}>
          <span
            style={{
              fontFamily: "var(--font-cabinet)",
              fontSize: "10px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--terracotta)",
              display: "block",
              marginBottom: "12px",
            }}
          >
            How It Works
          </span>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.03em",
              color: "var(--cream)",
            }}
          >
            THE JOURNEY
          </h2>
        </div>

        {/* Panels */}
        <div
          ref={containerRef}
          className="process-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
            border: "1px solid rgba(245,240,232,0.08)",
            overflow: "hidden",
          }}
        >
          {PANELS.map((panel, i) => {
            const Icon = panel.icon;
            const isActive = activePanel === i;
            return (
              <div
                key={i}
                onClick={() => setActivePanel(i)}
                className="process-panel"
                style={{
                  background: isActive ? panel.bg : "rgba(245,240,232,0.03)",
                  borderRight: i < PANELS.length - 1
                    ? "1px solid rgba(245,240,232,0.08)"
                    : "none",
                  padding: "clamp(24px, 4vw, 48px) clamp(20px, 3vw, 36px)",
                  cursor: "pointer",
                  transition: "background 0.4s",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: "360px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Big number watermark */}
                <div
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 800,
                    fontSize: "clamp(3rem, 5vw, 6rem)",
                    WebkitTextStroke: `2px ${
                      isActive
                        ? panel.textColor === "var(--cream)"
                          ? "rgba(245,240,232,0.2)"
                          : "rgba(28,36,33,0.12)"
                        : "rgba(245,240,232,0.06)"
                    }`,
                    color: "transparent",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    position: "absolute",
                    bottom: "16px",
                    right: "16px",
                    transition: "all 0.4s",
                    userSelect: "none",
                  }}
                >
                  {panel.num}
                </div>

                <div>
                  {/* Icon */}
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background: isActive
                        ? panel.textColor === "var(--cream)"
                          ? "rgba(255,255,255,0.2)"
                          : "var(--terracotta)"
                        : "rgba(245,240,232,0.08)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "24px",
                      animation: isActive ? `${panel.iconAnim} 2s ease-in-out infinite` : "none",
                      transition: "background 0.4s",
                    }}
                  >
                    <Icon
                      size={22}
                      weight="bold"
                      color={isActive ? "var(--cream)" : "rgba(245,240,232,0.4)"}
                    />
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 800,
                      fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                      letterSpacing: "-0.02em",
                      color: isActive ? panel.textColor : "rgba(245,240,232,0.7)",
                      marginBottom: "12px",
                      transition: "color 0.4s",
                    }}
                  >
                    {panel.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-cabinet)",
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: isActive
                        ? panel.textColor === "var(--cream)"
                          ? "rgba(245,240,232,0.85)"
                          : "var(--text-secondary)"
                        : "rgba(245,240,232,0.35)",
                      transition: "color 0.4s",
                    }}
                  >
                    {panel.body}
                  </p>
                </div>

                {panel.cta && isActive && (
                  <a
                    href="#cta"
                    style={{
                      fontFamily: "var(--font-cabinet)",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--cream)",
                      background: "var(--terracotta)",
                      padding: "12px 24px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "20px",
                      width: "fit-content",
                      animation: "slide-up-in 0.4s forwards",
                    }}
                  >
                    Start Your Journey →
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "32px",
            alignItems: "center",
          }}
        >
          {PANELS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActivePanel(i)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              <div
                style={{
                  width: activePanel === i ? "32px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: activePanel === i ? "var(--terracotta)" : "rgba(245,240,232,0.15)",
                  transition: "width 0.3s, background 0.3s",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-cabinet)",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  color: activePanel === i ? "var(--terracotta)" : "rgba(245,240,232,0.3)",
                  textTransform: "uppercase",
                  transition: "color 0.3s",
                }}
              >
                {["MEET", "PLAN", "SHOOT", "DELIVER"][i]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #process .process-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          #process .process-panel {
            min-height: auto !important;
            padding: 24px 20px !important;
          }
        }
        @media (max-width: 480px) {
          #process .process-grid {
            grid-template-columns: 1fr !important;
          }
          #process .process-panel {
            min-height: auto !important;
            padding: 20px 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
