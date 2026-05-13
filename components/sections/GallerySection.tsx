"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { GALLERY_IMAGES } from "@/lib/siteData";

const FILTERS = ["ALL", "WEDDING", "PORTRAIT", "CANDID", "EVENTS"];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeFilter === "ALL"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      style={{
        background: "var(--surface-1)",
        padding: "clamp(60px, 10vw, 120px) 0",
      }}
    >
      <div className="container-site">
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-cabinet)",
                fontSize: "10px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "var(--terracotta)",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Our Work
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
              STORIES
              <br />
              <span style={{ color: "var(--terracotta)" }}>WE&apos;VE</span>
              <br />
              <span style={{ WebkitTextStroke: "2px var(--text-primary)", color: "transparent" }}>
                TOLD.
              </span>
            </h2>
          </div>

          {/* Filter pills */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  fontFamily: "var(--font-cabinet)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  padding: "8px 20px",
                  background: activeFilter === f ? "var(--terracotta)" : "transparent",
                  color: activeFilter === f ? "var(--cream)" : "var(--text-secondary)",
                  border: `1.5px solid ${activeFilter === f ? "var(--terracotta)" : "var(--surface-2)"}`,
                  borderRadius: "0",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <div
          style={{
            columns: "3 280px",
            gap: "8px",
          }}
        >
          {filtered.map((img, i) => (
            <GalleryCard key={`${img.src}-${i}`} img={img} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({
  img,
  index,
  inView,
}: {
  img: (typeof GALLERY_IMAGES)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateY(0) rotateX(0)";
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        breakInside: "avoid",
        marginBottom: "8px",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.5s ${index * 0.08}s, transform 0.5s ${index * 0.08}s`,
        display: "block",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: img.tall ? "140%" : "75%",
          overflow: "hidden",
        }}
      >
        <Image
          src={img.src}
          alt={img.category}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `rgba(212,120,90,${hovered ? 0.7 : 0})`,
            transition: "background 0.3s",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "20px",
          }}
        >
          <div
            style={{
              transform: hovered ? "translateY(0)" : "translateY(20px)",
              opacity: hovered ? 1 : 0,
              transition: "transform 0.3s, opacity 0.3s",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-cabinet)",
                fontSize: "10px",
                letterSpacing: "0.3em",
                color: "rgba(245,240,232,0.8)",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              {img.category}
            </div>
            <div
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "var(--cream)",
              }}
            >
              {img.year}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
