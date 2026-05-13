"use client";
import { useEffect, useRef, useState } from "react";

export default function LoadingScreen() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [lettersVisible, setLettersVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const studioName = "ROOP SAGAR STUDIO";

  useEffect(() => {
    // Count up 0→100 over ~1.8s
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.floor(Math.random() * 4) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(intervalRef.current!);
        setLettersVisible(true);
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => setVisible(false), 800);
        }, 600);
      }
      setCount(current);
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "var(--surface-0)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        transition: exiting ? "clip-path 0.8s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
        clipPath: exiting ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)",
      }}
    >
      {/* 3D-style camera icon (CSS) */}
      <div
        style={{
          width: "80px",
          height: "60px",
          position: "relative",
          animation: "spin-slow 4s linear infinite",
        }}
      >
        {/* Camera body */}
        <div
          style={{
            width: "80px",
            height: "52px",
            background: "var(--terracotta)",
            borderRadius: "8px",
            position: "absolute",
            bottom: 0,
            boxShadow: "4px 4px 0 var(--rust)",
          }}
        />
        {/* Viewfinder bump */}
        <div
          style={{
            width: "24px",
            height: "14px",
            background: "var(--rust)",
            borderRadius: "4px 4px 0 0",
            position: "absolute",
            top: 0,
            left: "12px",
          }}
        />
        {/* Lens ring */}
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "4px solid var(--cream)",
            borderRadius: "50%",
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <div
          style={{
            width: "16px",
            height: "16px",
            background: "var(--cream)",
            borderRadius: "50%",
            position: "absolute",
            bottom: "18px",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0.4,
          }}
        />
      </div>

      {/* Counter */}
      <div
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 800,
          fontSize: "clamp(4rem, 12vw, 7rem)",
          color: "var(--text-primary)",
          lineHeight: 1,
          overflow: "hidden",
        }}
      >
        <span
          style={{
            display: "block",
            animation: "count-up-clip 0.1s ease-out",
          }}
        >
          {count}
        </span>
      </div>

      {/* Studio name letter by letter */}
      <div
        style={{
          fontFamily: "var(--font-cabinet)",
          fontSize: "11px",
          letterSpacing: "0.4em",
          color: "var(--text-secondary)",
          display: "flex",
          gap: "2px",
        }}
      >
        {studioName.split("").map((char, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: lettersVisible ? 1 : 0,
              transform: lettersVisible ? "translateY(0)" : "translateY(10px)",
              transition: `opacity 0.3s ${i * 0.04}s, transform 0.3s ${i * 0.04}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
}
