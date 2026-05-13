"use client";
import { useEffect, useRef, useState } from "react";
import { Phone } from "@phosphor-icons/react";
import { SITE } from "@/lib/siteData";
import Image from "next/image";

const POLAROID_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=85",
    alt: "Candid wedding moment",
    rot: -8, top: "10%", left: "5%", delay: "0s",
  },
  {
    src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=85",
    alt: "Portrait photography",
    rot: 5, top: "12%", right: "6%", delay: "1s",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=85",
    alt: "Wedding celebration",
    rot: -3, bottom: "12%", left: "6%", delay: "2s",
  },
];

export default function CTASection() {
  const [typed, setTyped] = useState("");
  const [inView, setInView] = useState(false);
  const [phoneHovered, setPhoneHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const fullText = "READY TO START?";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [inView]);

  const polaroids = POLAROID_IMAGES;

  return (
    <section
      id="cta"
      ref={sectionRef}
      style={{
        background: "var(--forest)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "clamp(60px, 10vw, 120px) 0",
      }}
    >
      {/* Morphing blob background */}
      <div
        style={{
          position: "absolute",
          width: "60vw",
          height: "60vw",
          background: "var(--cream)",
          opacity: 0.06,
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          animation: "blob-morph 12s ease-in-out infinite",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating polaroids */}
      {polaroids.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: p.top,
            left: (p as { left?: string }).left,
            right: (p as { right?: string }).right,
            bottom: (p as { bottom?: string }).bottom,
            width: "120px",
            background: "white",
            padding: "8px 8px 28px",
            boxShadow: "6px 12px 28px rgba(0,0,0,0.3)",
            transform: `rotate(${p.rot}deg)`,
            animation: `polaroid-float 8s ease-in-out infinite`,
            animationDelay: p.delay,
            opacity: 0.85,
            zIndex: 0,
          }}
        >
          <div
            style={{
              width: "100%",
              paddingBottom: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="120px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      ))}

      {/* Main content */}
      <div
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          padding: "0 clamp(20px, 5vw, 80px)",
        }}
      >
        {/* Eyebrow with typing cursor */}
        <div
          style={{
            fontFamily: "var(--font-cabinet)",
            fontSize: "11px",
            letterSpacing: "0.4em",
            color: "rgba(245,240,232,0.6)",
            textTransform: "uppercase",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2px",
          }}
        >
          {typed}
          <span
            style={{
              display: "inline-block",
              width: "2px",
              height: "12px",
              background: "var(--electric)",
              animation: "typing-cursor 1s ease-in-out infinite",
              marginLeft: "2px",
            }}
          />
        </div>

        {/* Main heading */}
        <div
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "clamp(3rem, 8vw, 8rem)",
              color: "var(--cream)",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s 0.3s, transform 0.6s 0.3s",
            }}
          >
            Your Story
          </div>
          <div
            style={{
              fontSize: "clamp(3rem, 8vw, 8rem)",
              color: "var(--mustard)",
              fontStyle: "italic",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s 0.5s, transform 0.6s 0.5s",
            }}
          >
            Starts With
          </div>
          <div
            style={{
              fontSize: "clamp(3rem, 8vw, 8rem)",
              color: "var(--cream)",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.6s 0.7s, transform 0.6s 0.7s",
              position: "relative",
              display: "inline-block",
            }}
          >
            One Call.
            {/* SVG underline that draws itself */}
            <svg
              style={{
                position: "absolute",
                bottom: "-8px",
                left: 0,
                width: "100%",
                height: "8px",
                overflow: "visible",
              }}
              viewBox="0 0 300 8"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 4 Q 75 0 150 4 Q 225 8 300 4"
                stroke="var(--mustard)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 300,
                  strokeDashoffset: inView ? 0 : 300,
                  transition: "stroke-dashoffset 1s 1.2s ease",
                }}
              />
            </svg>
          </div>
        </div>

        {/* Phone number */}
        <div
          onMouseEnter={() => setPhoneHovered(true)}
          onMouseLeave={() => setPhoneHovered(false)}
          style={{
            display: "inline-block",
            position: "relative",
            marginBottom: "48px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-8px -20px",
              background: "var(--terracotta)",
              borderRadius: "100px",
              opacity: phoneHovered ? 1 : 0,
              transition: "opacity 0.3s",
              zIndex: 0,
            }}
          />
          <a
            href={`tel:${SITE.phoneRaw}`}
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(1.5rem, 4vw, 4rem)",
              color: "var(--cream)",
              textDecoration: "none",
              letterSpacing: phoneHovered ? "0.1em" : "0",
              transition: "letter-spacing 0.3s",
              position: "relative",
              zIndex: 1,
            }}
          >
            {SITE.phone}
          </a>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          <a
            href={`tel:${SITE.phoneRaw}`}
            style={{
              fontFamily: "var(--font-cabinet)",
              fontWeight: 600,
              fontSize: "15px",
              background: "var(--cream)",
              color: "var(--forest)",
              padding: "16px 40px",
              borderRadius: "0",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--forest)";
              e.currentTarget.style.color = "var(--cream)";
              e.currentTarget.style.border = "2px solid var(--cream)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--cream)";
              e.currentTarget.style.color = "var(--forest)";
              e.currentTarget.style.border = "2px solid transparent";
            }}
          >
            <Phone size={18} weight="fill" className="animate-phone-ring" />
            Book Your Session
          </a>

          <a
            href={`https://wa.me/${SITE.phoneRaw.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-cabinet)",
              fontWeight: 600,
              fontSize: "15px",
              background: "transparent",
              color: "var(--cream)",
              padding: "16px 40px",
              border: "2px solid rgba(245,240,232,0.4)",
              borderRadius: "0",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--mustard)";
              e.currentTarget.style.borderColor = "var(--mustard)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(245,240,232,0.4)";
              e.currentTarget.style.color = "var(--cream)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us
          </a>
        </div>

        {/* Small print */}
        <div
          style={{
            fontFamily: "var(--font-cabinet)",
            fontSize: "12px",
            color: "rgba(245,240,232,0.4)",
            letterSpacing: "0.05em",
          }}
        >
          {SITE.website} · {SITE.location} · Open till 9pm
        </div>
      </div>

      <style>{`
        @keyframes polaroid-float {
          0%, 100% { transform: translateY(0px) rotate(var(--rot, -3deg)); }
          50% { transform: translateY(-20px) rotate(var(--rot, -3deg)); }
        }
      `}</style>
    </section>
  );
}
