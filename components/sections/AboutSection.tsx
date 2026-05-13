"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: "var(--surface-0)",
        padding: "clamp(80px, 12vw, 140px) 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle background accent */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, var(--sage) 0%, transparent 70%)",
          opacity: 0.08,
          pointerEvents: "none",
        }}
      />

      <div className="container-site" style={{ position: "relative", zIndex: 1 }}>

        {/* ── Top row: big "12" + label ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "64px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s 0.1s, transform 0.7s 0.1s",
          }}
        >
          {/* Fixed-size "12" — no scroll-reactive sizing */}
          <div
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(6rem, 14vw, 13rem)",
              WebkitTextStroke: "2px var(--terracotta)",
              color: "transparent",
              lineHeight: 1,
              letterSpacing: "-0.05em",
              userSelect: "none",
              flexShrink: 0,
            }}
          >
            12
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-cabinet)",
                fontSize: "10px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "var(--terracotta)",
                marginBottom: "8px",
              }}
            >
              Years of Excellence
            </div>
            <div
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Capturing Ballia&apos;s
              <br />
              most precious moments.
            </div>
          </div>
        </div>

        {/* ── 3-column content grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr 1fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* Col 1 — Stat */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s 0.25s, transform 0.6s 0.25s",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(3rem, 5vw, 4.5rem)",
                color: "var(--terracotta)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              450+
            </div>
            <div
              style={{
                fontFamily: "var(--font-cabinet)",
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginTop: "8px",
                letterSpacing: "0.02em",
              }}
            >
              Love stories preserved
            </div>

            {/* Divider */}
            <div
              style={{
                width: "40px",
                height: "2px",
                background: "var(--terracotta)",
                margin: "24px 0",
                opacity: 0.4,
              }}
            />

            <div
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "var(--forest)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              102
            </div>
            <div
              style={{
                fontFamily: "var(--font-cabinet)",
                fontSize: "13px",
                color: "var(--text-secondary)",
                marginTop: "8px",
              }}
            >
              5-star reviews
            </div>
          </div>

          {/* Col 2 — Text */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s 0.4s, transform 0.6s 0.4s",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                color: "var(--text-primary)",
                marginBottom: "20px",
              }}
            >
              12 years of finding beauty in{" "}
              <em style={{ color: "var(--terracotta)", fontStyle: "italic" }}>
                real moments.
              </em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-cabinet)",
                fontSize: "15px",
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                marginBottom: "32px",
              }}
            >
              From intimate Ballia weddings to grand celebrations, we&apos;ve
              preserved over 450 love stories. Every frame is a feeling — not
              just a photograph.
            </p>

            {/* Inline quote */}
            <div
              style={{
                borderLeft: "3px solid var(--terracotta)",
                paddingLeft: "20px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cabinet)",
                  fontSize: "14px",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  color: "var(--text-secondary)",
                }}
              >
                &ldquo;We don&apos;t just take photos — we craft memories that
                last a lifetime.&rdquo;
              </p>
            </div>
          </div>

          {/* Col 3 — Polaroid */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "rotate(-2deg) translateY(0)" : "rotate(-2deg) translateY(30px)",
              transition: "opacity 0.6s 0.55s, transform 0.6s 0.55s",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "10px 10px 36px",
                boxShadow: "6px 12px 32px rgba(28,36,33,0.18)",
                display: "block",
                width: "100%",
              }}
            >
              {/* Fixed aspect ratio container — no overflow bleed */}
              <div
                style={{
                  width: "100%",
                  paddingBottom: "100%",
                  position: "relative",
                  overflow: "hidden",
                  background: "var(--surface-2)",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=85"
                  alt="Wedding photography by Roop Sagar Studio"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-cabinet)",
                  fontSize: "11px",
                  textAlign: "center",
                  marginTop: "10px",
                  color: "var(--text-secondary)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Ballia, 2024
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about .container-site > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
          #about .container-site > div:last-child > div:last-child {
            display: none;
          }
        }
        @media (max-width: 560px) {
          #about .container-site > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
