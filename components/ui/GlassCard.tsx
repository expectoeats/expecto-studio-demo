"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = false,
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass rounded-sm ${className}`}
      whileHover={
        hover
          ? {
              background: "rgba(255, 248, 235, 0.07)",
              borderColor: "rgba(201, 169, 110, 0.3)",
              transition: { duration: 0.3 },
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );
}
