"use client";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) return;
    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
      else setCount(target);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger, target, duration]);

  return count;
}

export default function StatsSection() {
  const [inView, setInView] = useState(false);
  const [confettiBurst, setConfettiBurst] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const weddings = useCountUp(450, 3000, inView);
  const years = useCountUp(12, 2000, inView);
  const reviews = useCountUp(102, 2500, inView);
  const moments = useCountUp(25000, 3000, inView);

  const handleWeddingsClick = async () => {
    setConfettiBurst(true);
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D4785A", "#F5C842", "#8FAF9F", "#FF6B6B", "#4DFFB4"],
      });
    } catch {}
    setTimeout(() => setConfettiBurst(false), 1000);
  };

  return (
    <section
      id="stats"
      ref={sectionRef}
      style={{
        background: "var(--surface-dark)",
        padding: "clamp(60px, 10vw, 120px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid dot texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(245,240,232,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />

      <div className="container-site" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "60px" }}>
          <span
            style={{
              fontFamily: "var(--font-cabinet)",
              fontSize: "10px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--electric)",
              display: "block",
              marginBottom: "12px",
            }}
          >
            By The Numbers
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
            THE PROOF IS
            <br />
            <span style={{ color: "var(--electric)" }}>IN THE NUMBERS.</span>
          </h2>
        </div>

        {/* Asymmetric stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "0",
            borderTop: "1px dashed rgba(196,92,62,0.4)",
          }}
        >
          {/* BIG 450+ */}
          <div
            style={{
              padding: "48px 40px 48px 0",
              borderRight: "1px dashed rgba(196,92,62,0.4)",
              cursor: "pointer",
            }}
            onClick={handleWeddingsClick}
          >
            <div
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(5rem, 12vw, 12rem)",
                color: "var(--electric)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                transform: confettiBurst ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.2s",
              }}
            >
              {weddings}+
            </div>
            <div
              style={{
                fontFamily: "var(--font-cabinet)",
                fontSize: "12px",
                letterSpacing: "0.3em",
                color: "rgba(245,240,232,0.5)",
                textTransform: "uppercase",
                marginTop: "8px",
              }}
            >
              Weddings Captured
            </div>
            <div
              style={{
                fontFamily: "var(--font-cabinet)",
                fontSize: "11px",
                color: "rgba(245,240,232,0.3)",
                marginTop: "4px",
              }}
            >
              Click to celebrate 🎉
            </div>
          </div>

          {/* 12 years */}
          <div
            style={{
              padding: "48px 32px",
              borderRight: "1px dashed rgba(196,92,62,0.4)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(3rem, 7vw, 7rem)",
                color: "var(--electric)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              {years}
            </div>
            <div
              style={{
                fontFamily: "var(--font-cabinet)",
                fontSize: "12px",
                letterSpacing: "0.3em",
                color: "rgba(245,240,232,0.5)",
                textTransform: "uppercase",
                marginTop: "8px",
              }}
            >
              Years of Excellence
            </div>
          </div>

          {/* 102 reviews */}
          <div
            style={{
              padding: "48px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(3rem, 7vw, 7rem)",
                color: "var(--electric)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              {reviews}
            </div>
            <div
              style={{
                fontFamily: "var(--font-cabinet)",
                fontSize: "12px",
                letterSpacing: "0.3em",
                color: "rgba(245,240,232,0.5)",
                textTransform: "uppercase",
                marginTop: "8px",
              }}
            >
              5-Star Reviews
            </div>
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                gap: "2px",
              }}
            >
              {"★★★★★".split("").map((s, i) => (
                <span key={i} style={{ color: "var(--mustard)", fontSize: "14px" }}>{s}</span>
              ))}
              <span
                style={{
                  fontFamily: "var(--font-cabinet)",
                  fontSize: "12px",
                  color: "rgba(245,240,232,0.5)",
                  marginLeft: "6px",
                  alignSelf: "center",
                }}
              >
                4.5
              </span>
            </div>
          </div>
        </div>

        {/* Bottom stripe */}
        <div
          style={{
            borderTop: "1px dashed rgba(196,92,62,0.4)",
            paddingTop: "32px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 5rem)",
              color: "var(--electric)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            {moments.toLocaleString()}+
          </div>
          <div
            style={{
              fontFamily: "var(--font-cabinet)",
              fontSize: "12px",
              letterSpacing: "0.3em",
              color: "rgba(245,240,232,0.5)",
              textTransform: "uppercase",
            }}
          >
            Precious Moments Preserved Forever
          </div>
        </div>
      </div>
    </section>
  );
}
