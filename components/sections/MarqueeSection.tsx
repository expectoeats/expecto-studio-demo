"use client";

const items = [
  { text: "WEDDING PHOTOGRAPHY", accent: false },
  { text: "✦", accent: true },
  { text: "CANDID MOMENTS", accent: false },
  { text: "✦", accent: true },
  { text: "LIFESTYLE PORTRAITS", accent: false },
  { text: "✦", accent: true },
  { text: "BALLIA, UP", accent: false },
  { text: "✦", accent: true },
  { text: "CAPTURING REAL EMOTIONS", accent: false },
  { text: "✦", accent: true },
  { text: "EST. 2010", accent: false },
  { text: "✦", accent: true },
];

export default function MarqueeSection() {
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        background: "var(--surface-dark)",
        borderTop: "2px solid var(--terracotta)",
        borderBottom: "2px solid var(--terracotta)",
        height: "80px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 10,
      }}
      className="marquee-track"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
          whiteSpace: "nowrap",
          animation: "marquee-left 25s linear infinite",
          willChange: "transform",
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "1.1rem",
              letterSpacing: "0.05em",
              color: item.accent
                ? "var(--terracotta)"
                : i % 4 === 0
                ? "var(--cream)"
                : "var(--electric)",
              flexShrink: 0,
            }}
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
