"use client";
import { useRef, useState } from "react";

interface MagneticTextProps {
  children: string;
  className?: string;
  strength?: number;
}

export default function MagneticText({ children, className = "", strength = 8 }: MagneticTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [offsets, setOffsets] = useState<{ x: number; y: number; r: number }[]>(
    () => children.split("").map(() => ({ x: 0, y: 0, r: 0 }))
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const letters = containerRef.current.querySelectorAll<HTMLSpanElement>("[data-letter]");
    const newOffsets = Array.from(letters).map((el) => {
      const elRect = el.getBoundingClientRect();
      const elCx = elRect.left - rect.left + elRect.width / 2;
      const elCy = elRect.top - rect.top + elRect.height / 2;
      const dx = mx - elCx;
      const dy = my - elCy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 80;
      if (dist < maxDist) {
        const factor = (1 - dist / maxDist) * strength;
        return {
          x: -(dx / dist) * factor,
          y: -(dy / dist) * factor,
          r: (Math.random() - 0.5) * 8 * (1 - dist / maxDist),
        };
      }
      return { x: 0, y: 0, r: 0 };
    });
    setOffsets(newOffsets);
  };

  const handleMouseLeave = () => {
    setOffsets(children.split("").map(() => ({ x: 0, y: 0, r: 0 })));
  };

  return (
    <span
      ref={containerRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-flex", flexWrap: "wrap" }}
    >
      {children.split("").map((char, i) => (
        <span
          key={i}
          data-letter
          style={{
            display: "inline-block",
            transform: `translate(${offsets[i]?.x ?? 0}px, ${offsets[i]?.y ?? 0}px) rotate(${offsets[i]?.r ?? 0}deg)`,
            transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
