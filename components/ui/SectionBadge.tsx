"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SectionBadgeProps {
  text: string;
  icon?: LucideIcon;
  delay?: number;
  inView?: boolean;
}

export default function SectionBadge({ text, icon: Icon, delay = 0, inView = true }: SectionBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center mb-5"
    >
      {/* Outer glow container */}
      <div className="relative inline-flex items-center gap-2.5 group">

        {/* Animated border gradient ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            padding: "1.5px",
            background: "linear-gradient(135deg, #8B1A3A, #A0243E, #6B1030, #8B1A3A)",
            backgroundSize: "300% 300%",
            animation: "badgeBorderSpin 4s linear infinite",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Badge body */}
        <div
          className="relative flex items-center gap-2.5 px-4 py-2 rounded-full"
          style={{
            background: "rgba(139,26,58,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Left dot with pulse */}
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{
                background: "#8B1A3A",
                animation: "badgePulse 2s cubic-bezier(0.455,0.03,0.515,0.955) infinite",
              }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ background: "#8B1A3A" }}
            />
          </span>

          {/* Icon if provided */}
          {Icon && (
            <Icon size={11} style={{ color: "#8B1A3A", flexShrink: 0 }} strokeWidth={2.5} />
          )}

          {/* Text */}
          <span
            style={{
              fontFamily: "var(--font-dm)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#8B1A3A",
              lineHeight: 1,
            }}
          >
            {text}
          </span>

          {/* Right decorative lines */}
          <span className="flex items-center gap-0.5 flex-shrink-0">
            <span className="block w-3 h-px rounded-full" style={{ background: "rgba(139,26,58,0.5)" }} />
            <span className="block w-1.5 h-px rounded-full" style={{ background: "rgba(139,26,58,0.3)" }} />
          </span>
        </div>

        {/* Subtle glow behind badge */}
        <div
          className="absolute inset-0 rounded-full -z-10 blur-md opacity-30"
          style={{ background: "radial-gradient(ellipse, rgba(139,26,58,0.4) 0%, transparent 70%)" }}
        />
      </div>

      {/* Keyframes injected once via style tag */}
      <style>{`
        @keyframes badgeBorderSpin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes badgePulse {
          0%, 100% { transform: scale(1);   opacity: 0.75; }
          50%       { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}
