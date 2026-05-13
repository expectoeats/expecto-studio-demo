"use client";
import { useEffect, useRef, useState } from "react";

/* second ref for the glow path — keep in sync */
function WavyUnderlineFull({
  color = "#F5C842",
  visible = true,
  delay = 0,
}: {
  color?: string;
  visible?: boolean;
  delay?: number;
}) {
  const mainRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const rafRef  = useRef<number>(0);

  const buildPath = (t: number, W: number, H: number) => {
    const amp   = H * 0.36;
    const freq  = 2.4;
    const cy    = H * 0.55;
    const steps = 140;
    let d = `M 0 ${cy}`;
    for (let i = 1; i <= steps; i++) {
      const x  = (i / steps) * W;
      const y  = cy + amp * Math.sin((i / steps) * Math.PI * 2 * freq - t);
      const px = ((i - 0.5) / steps) * W;
      const py = cy + amp * Math.sin(((i - 0.5) / steps) * Math.PI * 2 * freq - t);
      d += ` Q ${px} ${py} ${x} ${y}`;
    }
    return d;
  };

  useEffect(() => {
    if (!visible) return;
    const animate = (ts: number) => {
      const t    = ts * 0.0011;
      const main = mainRef.current;
      const glow = glowRef.current;
      if (main && glow) {
        const svg = main.closest("svg") as SVGSVGElement | null;
        if (svg) {
          const W = svg.viewBox.baseVal.width  || 300;
          const H = svg.viewBox.baseVal.height || 14;
          const d = buildPath(t, W, H);
          main.setAttribute("d", d);
          glow.setAttribute("d", d);
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible]);

  return (
    <span
      style={{
        display: "block",
        width: "100%",
        height: "14px",
        marginTop: "2px",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.9s ${delay}s ease`,
        pointerEvents: "none",
      }}
    >
      <svg
        viewBox="0 0 300 14"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <path
          ref={glowRef}
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          opacity="0.15"
        />
        <path
          ref={mainRef}
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.92"
        />
      </svg>
    </span>
  );
}

/* ── Eyebrow label ── */
function Eyebrow({ mounted }: { mounted: boolean }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-cabinet)",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.45em",
        textTransform: "uppercase",
        color: "rgba(245,240,232,0.65)",
        marginBottom: "24px",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.7s 0.2s, transform 0.7s 0.2s",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "32px",
          height: "1px",
          background: "var(--terracotta)",
          flexShrink: 0,
        }}
      />
      Wedding &amp; Lifestyle Photography · Ballia, UP
    </div>
  );
}

/* ══════════════════════════════════════════════════════ */
export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  // 0 = Photos visible, 1 = Emotions visible — cycles infinitely
  const [activeWord, setActiveWord] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Start cycling after initial entrance (1.8s), then every 3s
    const startTimer = setTimeout(() => {
      setActiveWord(1); // first swap: Photos → Emotions
      const interval = setInterval(() => {
        setActiveWord((prev) => (prev === 0 ? 1 : 0));
      }, 3000);
      return () => clearInterval(interval);
    }, 1800);

    const onScroll = () => {
      if (!contentRef.current) return;
      const y = window.scrollY;
      // Fade out only — no translateY to avoid overflow bleed
      contentRef.current.style.opacity = `${Math.max(0, 1 - y / 500)}`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(startTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100svh",
        minHeight: "640px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        isolation: "isolate",   /* creates new stacking context — nothing bleeds out */
      }}
    >
      {/* ── FULLSCREEN VIDEO ── */}
      <video
        autoPlay muted loop playsInline preload="metadata"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
          zIndex: 0,
        }}
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* ── OVERLAYS ── */}
      <div style={{ position:"absolute", inset:0, zIndex:1,
        background:"linear-gradient(to bottom,rgba(28,36,33,0.4) 0%,rgba(28,36,33,0.6) 55%,rgba(28,36,33,0.82) 100%)" }} />
      <div style={{ position:"absolute", inset:0, zIndex:2,
        background:"rgba(196,92,62,0.1)", mixBlendMode:"multiply" }} />
      <div style={{ position:"absolute", inset:0, zIndex:2,
        background:"radial-gradient(ellipse 80% 100% at 30% 60%,transparent 40%,rgba(28,36,33,0.45) 100%)" }} />

      {/* ── MAIN CONTENT ── */}
      <div
        ref={contentRef}
        style={{
          position: "relative", zIndex: 10,
          width: "100%", maxWidth: "1400px",
          padding: "0 clamp(24px, 6vw, 100px)",
          paddingTop: "clamp(80px, 10vh, 120px)",
          display: "flex", flexDirection: "column",
          alignItems: "flex-start", alignSelf: "center",
        }}
      >
        <Eyebrow mounted={mounted} />

        {/* ── H1 ── */}
        <h1
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: 0,
            marginBottom: "28px",
          }}
        >
          {/* Line 1 — "We Don't Take" */}
          <div style={{ overflow: "hidden", display: "block" }}>
            <span
              style={{
                display: "block",
                fontSize: "clamp(2rem, 4.5vw, 5rem)",
                color: "var(--cream)",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(100%)",
                transition: "opacity 0.7s 0.4s, transform 0.7s 0.4s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              We Don&apos;t Take
            </span>
          </div>

          {/* Line 2 — Photos ↔ Emotions infinite loop */}
          <div
            style={{
              display: "block",
              position: "relative",
              overflow: "hidden",
              height: "clamp(2.6rem, 5.8vw, 6.4rem)",
            }}
          >
            {/* PHOTOS
                activeWord=0 → visible (translateY 0)
                activeWord=1 → exited upward (-105%)
                before mount  → waiting below (105%)               */}
            <span
              style={{
                display: "block",
                fontSize: "clamp(2.4rem, 5.5vw, 6rem)",
                color: "var(--terracotta)",
                lineHeight: 1,
                position: "absolute",
                top: 0, left: 0,
                whiteSpace: "nowrap",
                transform: !mounted
                  ? "translateY(105%)"
                  : activeWord === 0
                  ? "translateY(0)"
                  : "translateY(-105%)",
                transition: mounted
                  ? "transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)"
                  : "none",
              }}
            >
              Photos.
            </span>

            {/* EMOTIONS
                activeWord=1 → visible (translateY 0)
                activeWord=0 → waiting below (105%)                */}
            <span
              style={{
                display: "block",
                fontSize: "clamp(2.4rem, 5.5vw, 6rem)",
                color: "var(--mustard)",
                fontStyle: "italic",
                lineHeight: 1,
                position: "absolute",
                top: 0, left: 0,
                whiteSpace: "nowrap",
                transform: activeWord === 1
                  ? "translateY(0)"
                  : "translateY(105%)",
                transition: mounted
                  ? "transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)"
                  : "none",
              }}
            >
              Emotions.
            </span>
          </div>

          {/* Line 3 — "We Craft Memories." + wavy underline */}
          <div style={{ overflow: "hidden", display: "block" }}>
            <span
              style={{
                display: "block",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(100%)",
                transition: "opacity 0.7s 0.7s, transform 0.7s 0.7s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(2rem, 4.5vw, 5rem)",
                  color: "var(--cream)",
                  lineHeight: 1.05,
                }}
              >
                We Craft{" "}
                <em style={{ fontStyle: "italic", color: "var(--electric)" }}>
                  Memories.
                </em>
              </span>
              {/* ── WAVY UNDERLINE under Memories ── */}
              <WavyUnderlineFull
                color="#4DFFB4"
                visible={mounted}
                delay={0.9}
              />
            </span>
          </div>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-cabinet)",
            fontSize: "clamp(14px, 1.4vw, 17px)",
            fontWeight: 400,
            lineHeight: 1.7,
            color: "rgba(245,240,232,0.7)",
            maxWidth: "480px",
            marginBottom: "40px",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s 0.9s, transform 0.7s 0.9s",
          }}
        >
          Freeze Time. Feel Everything. — Real moments, real emotions,
          beautifully preserved for a lifetime.
        </p>

        {/* CTA Row */}
        <div
          style={{
            display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s 1.1s, transform 0.7s 1.1s",
          }}
        >
          <a
            href="#gallery"
            className="hero-cta-primary"
            style={{
              fontFamily: "var(--font-cabinet)", fontWeight: 600,
              fontSize: "14px", letterSpacing: "0.04em",
              background: "var(--terracotta)", color: "var(--cream)",
              padding: "16px 40px", textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: "10px",
              position: "relative", overflow: "hidden", transition: "color 0.3s",
            }}
          >
            <span style={{ position: "relative", zIndex: 1 }}>See Our Work</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
              style={{ position:"relative", zIndex:1, transition:"transform 0.3s" }}
              className="hero-arrow">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hero-cta-bg" style={{
              position:"absolute", inset:0, background:"var(--rust)",
              transform:"translateX(-101%)",
              transition:"transform 0.35s cubic-bezier(0.76,0,0.24,1)",
            }} />
          </a>

          <a
            href="#cta"
            style={{
              fontFamily: "var(--font-cabinet)", fontWeight: 600,
              fontSize: "14px", letterSpacing: "0.04em",
              background: "transparent", color: "var(--cream)",
              padding: "15px 40px",
              border: "1.5px solid rgba(245,240,232,0.45)",
              textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: "8px",
              transition: "border-color 0.3s, background 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--cream)";
              e.currentTarget.style.background  = "rgba(245,240,232,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(245,240,232,0.45)";
              e.currentTarget.style.background  = "transparent";
            }}
          >
            Book a Session
          </a>
        </div>

        {/* Stats row */}
        <div
          style={{
            marginTop: "48px",
            display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.7s 1.4s",
          }}
        >
          {[
            { num: "450+", label: "Weddings" },
            { num: "12",   label: "Years"    },
            { num: "4.5★", label: "Rating"   },
          ].map((stat, i) => (
            <div key={i} style={{ display:"flex", alignItems:"baseline", gap:"8px" }}>
              <span style={{
                fontFamily: "var(--font-syne)", fontWeight: 800,
                fontSize: "clamp(1.2rem, 2.2vw, 1.8rem)",
                color: "var(--terracotta)", letterSpacing: "-0.02em",
              }}>
                {stat.num}
              </span>
              <span style={{
                fontFamily: "var(--font-cabinet)", fontSize: "12px",
                color: "rgba(245,240,232,0.5)",
                letterSpacing: "0.1em", textTransform: "uppercase",
              }}>
                {stat.label}
              </span>
              {i < 2 && (
                <span style={{
                  marginLeft: "24px", width: "1px", height: "20px",
                  background: "rgba(245,240,232,0.15)", display: "inline-block",
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div style={{
        position:"absolute", bottom:"36px", right:"clamp(24px,5vw,80px)",
        zIndex:10, display:"flex", flexDirection:"column",
        alignItems:"center", gap:"10px",
        opacity: mounted ? 0.7 : 0, transition:"opacity 0.7s 2s",
      }}>
        <span style={{
          fontFamily:"var(--font-cabinet)", fontSize:"9px",
          letterSpacing:"0.35em", color:"rgba(245,240,232,0.6)",
          textTransform:"uppercase", writingMode:"vertical-rl",
        }}>Scroll</span>
        <div style={{
          width:"1px", height:"48px",
          background:"linear-gradient(to bottom,rgba(245,240,232,0.6),transparent)",
          animation:"float-up 2.5s ease-in-out infinite",
        }} />
      </div>

      {/* ── LOCATION BADGE ── */}
      <div style={{
        position:"absolute", bottom:"36px", left:"clamp(24px,6vw,100px)",
        zIndex:10, opacity: mounted ? 1 : 0, transition:"opacity 0.7s 1.6s",
        display:"flex", alignItems:"center", gap:"8px",
      }}>
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
          <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 6 3.5a1.5 1.5 0 0 1 0 3z"
            fill="var(--terracotta)" />
        </svg>
        <span style={{
          fontFamily:"var(--font-cabinet)", fontSize:"12px",
          color:"rgba(245,240,232,0.55)", letterSpacing:"0.05em",
        }}>
          Ballia, Uttar Pradesh
        </span>
      </div>

      <style>{`
        .hero-cta-primary:hover .hero-cta-bg { transform: translateX(0) !important; }
        .hero-cta-primary:hover .hero-arrow  { transform: translateX(4px); }
        @media (max-width: 640px) {
          #hero h1 span { white-space: normal !important; }
        }
      `}</style>
    </section>
  );
}
