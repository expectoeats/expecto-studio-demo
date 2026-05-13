"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, Phone } from "lucide-react";
import { SITE } from "@/lib/constants";

const PACKAGES = [
  {
    id: "basic",
    name: "Silver",
    emoji: "🥈",
    price: "₹18,000",
    duration: "4 Hours",
    tagline: "Perfect for intimate ceremonies",
    highlight: false,
    color: "var(--indigo)",
    colorPale: "rgba(75,63,216,0.08)",
    features: [
      { text: "1 Photographer", included: true },
      { text: "4 Hours Coverage", included: true },
      { text: "200+ Edited Photos", included: true },
      { text: "Online Gallery (1 year)", included: true },
      { text: "USB Delivery", included: true },
      { text: "2nd Photographer", included: false },
      { text: "Drone Coverage", included: false },
      { text: "Same-Day Highlights Reel", included: false },
      { text: "Pre-Wedding Shoot", included: false },
      { text: "Premium Album (40 pages)", included: false },
    ],
  },
  {
    id: "premium",
    name: "Gold",
    emoji: "🥇",
    price: "₹38,000",
    duration: "8 Hours",
    tagline: "Most popular — full day coverage",
    highlight: true,
    color: "var(--coral)",
    colorPale: "rgba(232,97,74,0.08)",
    features: [
      { text: "2 Photographers", included: true },
      { text: "8 Hours Coverage", included: true },
      { text: "500+ Edited Photos", included: true },
      { text: "Online Gallery (lifetime)", included: true },
      { text: "USB + Cloud Delivery", included: true },
      { text: "2nd Photographer", included: true },
      { text: "Drone Coverage", included: true },
      { text: "Same-Day Highlights Reel", included: false },
      { text: "Pre-Wedding Shoot", included: false },
      { text: "Premium Album (40 pages)", included: false },
    ],
  },
  {
    id: "luxury",
    name: "Platinum",
    emoji: "💎",
    price: "₹75,000",
    duration: "2 Days",
    tagline: "The complete wedding experience",
    highlight: false,
    color: "var(--amber-deep)",
    colorPale: "rgba(212,136,10,0.08)",
    features: [
      { text: "3 Photographers", included: true },
      { text: "2-Day Full Coverage", included: true },
      { text: "1000+ Edited Photos", included: true },
      { text: "Online Gallery (lifetime)", included: true },
      { text: "USB + Cloud + Print Delivery", included: true },
      { text: "2nd & 3rd Photographer", included: true },
      { text: "Drone Coverage", included: true },
      { text: "Same-Day Highlights Reel", included: true },
      { text: "Pre-Wedding Shoot Included", included: true },
      { text: "Premium Album (60 pages)", included: true },
    ],
  },
];

export default function PackagesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [billing, setBilling] = useState<"wedding" | "prewedding">("wedding");

  return (
    <section
      id="packages"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: "var(--ink)",
        paddingTop: "clamp(80px,10vw,140px)",
        paddingBottom: "clamp(80px,10vw,140px)",
      }}
    >
      {/* Decorative */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "-8%",
          width: 400,
          height: 400,
          background: "var(--coral)",
          opacity: 0.06,
          animation: "morph 12s ease-in-out infinite",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14">
          <motion.div
            className="pill mb-5 inline-flex"
            style={{ background: "rgba(232,97,74,0.15)", borderColor: "rgba(232,97,74,0.3)", color: "var(--coral-light)" }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Transparent Pricing
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                fontFamily: "var(--font-plus)",
                fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                fontWeight: 900,
                color: "var(--cream)",
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
              }}
            >
              Choose Your{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, var(--coral), var(--amber))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Perfect Package
              </span>
            </motion.h2>

            {/* Toggle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex p-1 rounded-full flex-shrink-0"
              style={{ background: "rgba(245,240,232,0.08)", border: "1px solid rgba(245,240,232,0.1)" }}
            >
              {(["wedding", "prewedding"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setBilling(t)}
                  className="px-5 py-2 rounded-full text-xs font-semibold transition-all"
                  style={{
                    fontFamily: "var(--font-space)",
                    letterSpacing: "0.03em",
                    background: billing === t ? "var(--coral)" : "transparent",
                    color: billing === t ? "#fff" : "rgba(245,240,232,0.5)",
                  }}
                >
                  {t === "wedding" ? "Wedding" : "Pre-Wedding"}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative flex flex-col rounded-3xl overflow-hidden"
              style={{
                background: pkg.highlight ? pkg.colorPale : "rgba(245,240,232,0.04)",
                border: pkg.highlight ? `2px solid ${pkg.color}` : "1px solid rgba(245,240,232,0.08)",
                padding: "clamp(24px,3.5vw,40px)",
                transform: pkg.highlight ? "scale(1.03)" : "scale(1)",
              }}
              whileHover={{ y: -8, boxShadow: `0 24px 60px ${pkg.color}20` }}
            >
              {/* Popular badge */}
              {pkg.highlight && (
                <div
                  className="absolute top-0 right-6 px-4 py-1.5 rounded-b-2xl"
                  style={{
                    background: pkg.color,
                    fontFamily: "var(--font-space)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#fff",
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Emoji + name */}
              <div className="flex items-center gap-3 mb-6">
                <span style={{ fontSize: "2rem" }}>{pkg.emoji}</span>
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-space)",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(245,240,232,0.4)",
                    }}
                  >
                    {pkg.duration}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-plus)",
                      fontSize: "1.5rem",
                      fontWeight: 900,
                      color: pkg.highlight ? pkg.color : "var(--cream)",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    {pkg.name}
                  </h3>
                </div>
              </div>

              {/* Price */}
              <div className="mb-2">
                <span
                  style={{
                    fontFamily: "var(--font-plus)",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 900,
                    color: pkg.color,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {billing === "prewedding"
                    ? pkg.id === "basic" ? "₹8,000" : pkg.id === "premium" ? "₹18,000" : "₹35,000"
                    : pkg.price}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-space)",
                    fontSize: "12px",
                    color: "rgba(245,240,232,0.35)",
                    marginLeft: 6,
                  }}
                >
                  onwards
                </span>
              </div>

              <p
                className="mb-6"
                style={{
                  fontFamily: "var(--font-space)",
                  fontSize: "13px",
                  color: "rgba(245,240,232,0.45)",
                }}
              >
                {pkg.tagline}
              </p>

              <div className="h-px mb-6" style={{ background: "rgba(245,240,232,0.08)" }} />

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {pkg.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-3">
                    {f.included ? (
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: 18, height: 18, background: pkg.color }}
                      >
                        <Check size={10} color="#fff" strokeWidth={3} />
                      </div>
                    ) : (
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ width: 18, height: 18, background: "rgba(245,240,232,0.06)" }}
                      >
                        <X size={10} style={{ color: "rgba(245,240,232,0.2)" }} strokeWidth={2} />
                      </div>
                    )}
                    <span
                      style={{
                        fontFamily: "var(--font-space)",
                        fontSize: "13px",
                        color: f.included ? "rgba(245,240,232,0.75)" : "rgba(245,240,232,0.25)",
                        textDecoration: f.included ? "none" : "line-through",
                      }}
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={SITE.phoneHref}
                className="flex items-center justify-center gap-2 py-4 rounded-2xl transition-all hover:scale-[1.02]"
                style={{
                  fontFamily: "var(--font-space)",
                  fontSize: "13px",
                  fontWeight: 700,
                  background: pkg.highlight ? pkg.color : "rgba(245,240,232,0.08)",
                  color: pkg.highlight ? "#fff" : pkg.color,
                  border: pkg.highlight ? "none" : `1px solid ${pkg.color}40`,
                  letterSpacing: "0.02em",
                }}
              >
                <Phone size={13} />
                Book {pkg.name}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8"
          style={{
            fontFamily: "var(--font-space)",
            fontSize: "13px",
            color: "rgba(245,240,232,0.3)",
          }}
        >
          All packages include travel within 50km of Ballia. Custom packages available — call us to discuss.
        </motion.p>
      </div>
    </section>
  );
}
