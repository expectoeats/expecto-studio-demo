"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  maxMovement?: number;
  as?: "button" | "a";
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  maxMovement = 8,
  as: Tag = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const maxDist = Math.max(rect.width, rect.height);
    const factor = Math.min(1, distance / maxDist);
    setPosition({
      x: (deltaX / maxDist) * maxMovement * factor * 2,
      y: (deltaY / maxDist) * maxMovement * factor * 2,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const content = (
    <motion.div
      ref={ref}
      className={`magnetic-btn ${className}`}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );

  if (Tag === "a" && href) {
    return (
      <a href={href} onClick={onClick} style={{ display: "inline-block" }}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} style={{ background: "none", border: "none", padding: 0 }}>
      {content}
    </button>
  );
}
