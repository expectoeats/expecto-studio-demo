"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { SERVICES } from "@/lib/siteData";
import ScrambleText from "@/components/ui/ScrambleText";

/* ─── Auto-scrolling marquee row with drag support ─── */
function MarqueeRow({
  items,
  direction,
  speed = 0.5,
}: {
  items: (typeof SERVICES);
  direction: "left" | "right";
  speed?: number;
}) {
  const trackRef  = useRef<HTMLDivElement>(null);
  const posRef    = useRef(0);
  const rafRef    = useRef<number>(0);
  const dragRef   = useRef({ active: false, startX: 0, startPos: 0 });
  const pauseRef  = useRef(false);

  // Duplicate items so the loop is seamless
  const doubled = [...items, ...items, ...items];
  const dir = direction === "left" ? -1 : 1;

  const animate = useCallback(() => {
    if (!trackRef.current) { rafRef.current = requestAnimationFrame(animate); return; }
    if (!pauseRef.current && !dragRef.current.active) {
      posRef.current += speed * dir;
    }
    // Reset when one full set has scrolled
    const cardW = 200 + 12; // card width + gap
    const setW  = items.length * cardW;
    if (dir < 0 && posRef.current < -setW) posRef.current += setW;
    if (dir > 0 && posRef.current > 0)     posRef.current -= setW;

    trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    rafRef.current = requestAnimationFrame(animate);
  }, [dir, items.length, speed]);

  useEffect(() => {
    // Start offset for right-direction row so it doesn't start at 0
    if (direction === "right") posRef.current = -(items.length * (200 + 12));
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate, direction, items.length]);

  /* Touch drag */
  const onTouchStart = (e: React.TouchEvent) => {
    dragRef.current = { active: true, startX: e.touches[0].clientX, startPos: posRef.current };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.touches[0].clientX - dragRef.current.startX;
    posRef.current = dragRef.current.startPos + dx;
  };
  const onTouchEnd = () => { dragRef.current.active = false; };

  /* Mouse drag */
  const onMouseDown = (e: React.MouseEvent) => {
    dragRef.current = { active: true, startX: e.clientX, startPos: posRef.current };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current.active) return;
    posRef.current = dragRef.current.startPos + (e.clientX - dragRef.current.startX);
  };
  const onMouseUp = () => { dragRef.current.active = false; };

  return (
    <div
      style={{ overflow: "hidden", cursor: "grab", userSelect: "none" }}
      onMouseEnter={() => { pauseRef.current = true; }}
      onMouseLeave={() => { pauseRef.current = false; dragRef.current.active = false; }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "12px",
          willChange: "transform",
          width: "max-content",
        }}
      >
        {doubled.map((service, i) => (
          <MarqueeCard key={`${service.id}-${i}`} service={service} />
        ))}
      </div>
    </div>
  );
}

function MarqueeCard({ service }: { service: (typeof SERVICES)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "200px",
        height: "260px",
        flexShrink: 0,
        overflow: "hidden",
        cursor: "pointer",
        borderRadius: "4px",
      }}
    >
      <Image
        src={service.image!}
        alt={service.name}
        fill
        sizes="200px"
        style={{
          objectFit: "cover",
          transform: hovered ? "scale(1.08)" : "scale(1.02)",
          transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          filter: hovered ? "brightness(0.7)" : "brightness(0.55)",
        }}
        draggable={false}
      />
      {/* Gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: hovered
          ? `linear-gradient(to top,${service.color}CC 0%,transparent 70%)`
          : "linear-gradient(to top,rgba(28,36,33,0.9) 0%,rgba(28,36,33,0.2) 70%,transparent 100%)",
        transition: "background 0.4s",
      }} />
      {/* Dot */}
      <div style={{
        position: "absolute", top: "12px", left: "12px",
        width: "7px", height: "7px", borderRadius: "50%",
        background: service.color, boxShadow: `0 0 8px ${service.color}`,
      }} />
      {/* Number */}
      <div style={{
        position: "absolute", top: "10px", right: "12px",
        fontFamily: "var(--font-syne)", fontWeight: 800,
        fontSize: "11px", color: "rgba(245,240,232,0.45)",
      }}>
        {String(SERVICES.findIndex(s => s.id === service.id) + 1).padStart(2, "0")}
      </div>
      {/* Name */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 14px",
      }}>
        <div style={{
          fontFamily: "var(--font-syne)", fontWeight: 800,
          fontSize: "1rem", color: "var(--cream)", lineHeight: 1.1,
          marginBottom: hovered ? "8px" : "0", transition: "margin 0.3s",
        }}>
          {service.name}
        </div>
        <a href="#cta" style={{
          fontFamily: "var(--font-cabinet)", fontSize: "11px", fontWeight: 600,
          letterSpacing: "0.05em", textTransform: "uppercase",
          color: "var(--cream)", textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: "4px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.3s, transform 0.3s",
        }}>
          Enquire <ArrowUpRight size={12} weight="bold" />
        </a>
      </div>
    </div>
  );
}

/* ─── Desktop grid card (unchanged) ─── */
function ServiceCard({
  service, index, inView, isActive, onEnter, onLeave,
}: {
  service: (typeof SERVICES)[0]; index: number; inView: boolean;
  isActive: boolean; onEnter: () => void; onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "relative", height: "380px", overflow: "hidden", cursor: "pointer",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ${index * 0.07}s, transform 0.6s ${index * 0.07}s`,
      }}
    >
      <Image src={service.image!} alt={service.name} fill
        sizes="25vw"
        style={{
          objectFit: "cover",
          transform: isActive ? "scale(1.08)" : "scale(1.02)",
          transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          filter: isActive ? "brightness(0.75)" : "brightness(0.6)",
        }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: isActive
          ? `linear-gradient(to top,${service.color}CC 0%,${service.color}44 50%,transparent 100%)`
          : "linear-gradient(to top,rgba(28,36,33,0.92) 0%,rgba(28,36,33,0.4) 55%,transparent 100%)",
        transition: "background 0.5s",
      }} />
      <div style={{
        position: "absolute", top: "16px", right: "16px",
        fontFamily: "var(--font-syne)", fontWeight: 800,
        fontSize: "13px", color: "rgba(245,240,232,0.5)",
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>
      <div style={{
        position: "absolute", top: "18px", left: "18px",
        width: "8px", height: "8px", borderRadius: "50%",
        background: service.color, boxShadow: `0 0 12px ${service.color}`,
        opacity: isActive ? 1 : 0.7, transition: "opacity 0.3s",
      }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 20px" }}>
        <h3 style={{
          fontFamily: "var(--font-syne)", fontWeight: 800,
          fontSize: "clamp(1.1rem,1.8vw,1.4rem)", letterSpacing: "-0.02em",
          color: "var(--cream)", marginBottom: isActive ? "10px" : "0",
          transition: "margin 0.3s", lineHeight: 1.1,
        }}>{service.name}</h3>
        <div style={{
          maxHeight: isActive ? "80px" : "0", overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <p style={{
            fontFamily: "var(--font-cabinet)", fontSize: "13px",
            lineHeight: 1.6, color: "rgba(245,240,232,0.8)", marginBottom: "14px",
          }}>{service.description}</p>
        </div>
        <a href="#cta" style={{
          fontFamily: "var(--font-cabinet)", fontSize: "12px", fontWeight: 600,
          letterSpacing: "0.06em", textTransform: "uppercase",
          color: "var(--cream)", textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: "6px",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.3s 0.1s, transform 0.3s 0.1s",
        }}>
          Enquire <ArrowUpRight size={14} weight="bold" />
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
export default function ServicesSection() {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const row1 = SERVICES.slice(0, 4);
  const row2 = SERVICES.slice(4, 8);

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        background: "var(--surface-0)",
        padding: "clamp(60px, 10vw, 120px) 0",
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <div className="container-site">
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "56px", flexWrap: "wrap", gap: "24px",
        }}>
          <div>
            <span style={{
              fontFamily: "var(--font-cabinet)", fontSize: "10px",
              letterSpacing: "0.4em", textTransform: "uppercase",
              color: "var(--terracotta)", display: "block", marginBottom: "12px",
            }}>
              What We Do
            </span>
            <h2 style={{
              fontFamily: "var(--font-syne)", fontWeight: 800,
              fontSize: "clamp(2.5rem,6vw,5rem)", letterSpacing: "-0.03em",
              lineHeight: 0.95, color: "var(--text-primary)",
            }}>
              <ScrambleText text="EVERY" trigger={inView} className="" /><br />
              <span style={{ color: "var(--terracotta)" }}>
                <ScrambleText text="OCCASION" trigger={inView} delay={200} />
              </span><br />
              <span style={{ WebkitTextStroke: "2px var(--text-primary)", color: "transparent" }}>
                <ScrambleText text="COVERED." trigger={inView} delay={400} />
              </span>
            </h2>
          </div>
          <p style={{
            fontFamily: "var(--font-cabinet)", fontSize: "15px",
            lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "340px",
            opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s 0.4s, transform 0.6s 0.4s",
          }}>
            From intimate ceremonies to grand celebrations — we cover every
            chapter of your story with the same passion.
          </p>
        </div>
      </div>

      {/* ── DESKTOP: 4-col grid ── */}
      <div className="container-site services-desktop">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px" }}>
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.id} service={service} index={i} inView={inView}
              isActive={activeService === i}
              onEnter={() => setActiveService(i)}
              onLeave={() => setActiveService(null)}
            />
          ))}
        </div>
      </div>

      {/* ── MOBILE: dual auto-scroll rows ── */}
      <div className="services-mobile" style={{ display: "none", flexDirection: "column", gap: "12px" }}>
        {/* Hint label */}
        <div style={{
          fontFamily: "var(--font-cabinet)", fontSize: "10px",
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "var(--text-secondary)", textAlign: "center",
          marginBottom: "4px", opacity: 0.6,
        }}>
          ← drag to explore →
        </div>
        {/* Row 1 — left to right */}
        <MarqueeRow items={row1} direction="right" speed={0.4} />
        {/* Row 2 — right to left */}
        <MarqueeRow items={row2} direction="left" speed={0.4} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-desktop { display: none !important; }
          .services-mobile  { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
