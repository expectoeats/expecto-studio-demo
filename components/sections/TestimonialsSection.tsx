"use client";
import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "@/lib/siteData";
import TiltCard from "@/components/ui/TiltCard";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    intervalRef.current = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        setAnimating(false);
      }, 500);
    }, 5000);

    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (i: number) => {
    if (i === activeIndex) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex(i);
      setAnimating(false);
    }, 300);
  };

  const active = TESTIMONIALS[activeIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        background: "var(--surface-0)",
        padding: "clamp(60px, 10vw, 120px) 0",
      }}
    >
      <div className="container-site">
        {/* Header */}
        <div style={{ marginBottom: "60px" }}>
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
            What They Say
          </span>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              color: "var(--text-primary)",
            }}
          >
            REAL WORDS,
            <br />
            <span style={{ color: "var(--terracotta)" }}>REAL PEOPLE.</span>
          </h2>
        </div>

        {/* Floating cards row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "80px",
          }}
        >
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <TiltCard
              key={i}
              className=""
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.5s ${i * 0.1}s, transform 0.5s ${i * 0.1}s`,
              } as React.CSSProperties}
            >
              <div
                style={{
                  background: "white",
                  border: "1px solid var(--sage)",
                  padding: "28px",
                  height: "100%",
                }}
              >
                <div style={{ marginBottom: "12px" }}>
                  {"★".repeat(t.stars).split("").map((s, j) => (
                    <span key={j} style={{ color: "var(--terracotta)", fontSize: "14px" }}>{s}</span>
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-cabinet)",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "var(--text-secondary)",
                    marginBottom: "16px",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
                <div
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 700,
                    fontSize: "13px",
                    color: "var(--text-primary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.name}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Featured review — auto-cycling */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
            position: "relative",
            minHeight: "200px",
          }}
        >
          {/* Big quote mark */}
          <div
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "8rem",
              color: "var(--terracotta)",
              opacity: 0.15,
              lineHeight: 1,
              position: "absolute",
              top: "-20px",
              left: "50%",
              transform: "translateX(-50%)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            &ldquo;
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 1,
              clipPath: animating ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
              transition: "clip-path 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-cabinet)",
                fontSize: "clamp(1rem, 2vw, 1.3rem)",
                lineHeight: 1.8,
                color: "var(--text-primary)",
                marginBottom: "24px",
              }}
            >
              &ldquo;{active.text}&rdquo;
            </p>

            <div style={{ marginBottom: "8px" }}>
              {"★".repeat(active.stars).split("").map((s, j) => (
                <span key={j} style={{ color: "var(--terracotta)", fontSize: "16px" }}>{s}</span>
              ))}
            </div>

            <div
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: "14px",
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              — {active.name}
            </div>
          </div>

          {/* Dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "32px",
            }}
          >
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: activeIndex === i ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: activeIndex === i ? "var(--terracotta)" : "var(--surface-2)",
                  border: "none",
                  cursor: "pointer",
                  transition: "width 0.3s, background 0.3s",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #testimonials .container-site > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
