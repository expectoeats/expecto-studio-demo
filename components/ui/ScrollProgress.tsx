"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const spring = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const pct = total > 0 ? current / total : 0;
      setProgress(pct);
      spring.set(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [spring]);

  return (
    <>
      {/* Top bar */}
      <motion.div
        className="fixed top-0 left-0 z-[200] h-[3px] origin-left"
        style={{
          scaleX: spring,
          background: "linear-gradient(90deg, var(--coral), var(--indigo), var(--amber))",
          boxShadow: "0 0 12px rgba(232,97,74,0.4)",
        }}
      />
      {/* Side dots */}
      <div
        className="fixed right-5 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-2"
      >
        {[0, 0.14, 0.28, 0.42, 0.56, 0.70, 0.84, 1].map((threshold, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: progress >= threshold ? 8 : 4,
              height: progress >= threshold ? 8 : 4,
              background: progress >= threshold ? "var(--coral)" : "rgba(26,22,20,0.2)",
              boxShadow: progress >= threshold ? "0 0 8px var(--coral)" : "none",
            }}
          />
        ))}
      </div>
    </>
  );
}
