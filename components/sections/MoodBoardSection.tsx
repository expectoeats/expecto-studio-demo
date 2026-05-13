"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { Check, ArrowRight, MessageCircle } from "lucide-react";

const STYLES = [
  {
    id: "classic",
    name: "Classic & Timeless",
    desc: "Elegant, traditional compositions. Warm tones, formal poses, heirloom quality.",
    tags: ["Formal", "Warm Tones", "Traditional"],
    emoji: "🏛️",
    color: "var(--amber-deep)",
    bg: "rgba(212,136,10,0.08)",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&q=80",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=500&q=80",
    ],
  },
  {
    id: "candid",
    name: "Candid & Emotional",
    desc: "Raw, unposed moments. Documentary style. Real emotions, real stories.",
    tags: ["Unposed", "Emotional", "Documentary"],
    emoji: "💛",
    color: "var(--coral)",
    bg: "rgba(232,97,74,0.08)",
    images: [
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500&q=80",
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=500&q=80",
    ],
  },
  {
    id: "cinematic",
    name: "Cinematic & Dramatic",
    desc: "Bold lighting, dramatic angles, film-like colour grading. Magazine-worthy.",
    tags: ["Bold", "Film Grade", "Editorial"],
    emoji: "🎬",
    color: "var(--indigo)",
    bg: "rgba(75,63,216,0.08)",
    images: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&q=80",
      "https://images.unsplash.com/photo-1529636798458-92182e662485?w=500&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=500&q=80",
    ],
  },
  {
    id: "airy",
    name: "Airy & Romantic",
    desc: "Soft light, pastel tones, dreamy bokeh. Light and ethereal feel.",
    tags: ["Soft Light", "Pastel", "Dreamy"],
    emoji: "🌸",
    color: "var(--coral)",
    bg: "rgba(232,97,74,0.06)",
    images: [
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=500&q=80",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80",
    ],
  },
];

const VIBES = ["Outdoor / Nature", "Indoor / Studio", "Heritage / Palace", "Beach / Riverside", "Urban / City", "Temple / Traditional"];
const TIMES = ["Golden Hour (Sunrise)", "Golden Hour (Sunset)", "Midday", "Night / Candlelight", "No Preference"];

export default function MoodBoardSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const toggleVibe = (v: string) =>
    setSelectedVibes((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);

  const activeStyle = STYLES.find((s) => s.id === selectedStyle);

  const handleSend = () => {
    if (!selectedStyle) return;
    const msg = `Hi! My preferred photography style is *${activeStyle?.name}*, vibes: *${selectedVibes.join(", ") || "flexible"}*, timing: *${selectedTime || "flexible"}*. Please share a quote.`;
    window.open(`https://wa.me/918115473597?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section
      id="moodboard"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: "var(--cream-2)",
        paddingTop: "clamp(80px,10vw,140px)",
        paddingBottom: "clamp(80px,10vw,140px)",
      }}
    >
      {/* Decorative */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          left: "-8%",
          width: 400,
          height: 400,
          background: "var(--indigo)",
          opacity: 0.05,
          animation: "morph 13s ease-in-out infinite",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14">
          <motion.div
            className="pill pill-indigo mb-5 inline-flex"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Style Selector
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              fontFamily: "var(--font-plus)",
              fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
              fontWeight: 900,
              color: "var(--ink)",
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
            }}
          >
            Build Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--indigo), var(--coral))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Mood Board
            </span>
          </motion.h2>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 rounded-3xl"
              style={{ background: "var(--cream)", border: "1px solid rgba(26,22,20,0.06)" }}
            >
              <div
                className="rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ width: 64, height: 64, background: "rgba(232,97,74,0.1)" }}
              >
                <Check size={28} style={{ color: "var(--coral)" }} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-plus)",
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: "var(--ink)",
                  letterSpacing: "-0.03em",
                }}
              >
                Mood Board Sent! 🎉
              </h3>
              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-space)",
                  fontSize: "15px",
                  color: "var(--text-secondary)",
                }}
              >
                We&apos;ve received your style preferences. Our team will reach out shortly.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col gap-12"
            >
              {/* Step 1 — Style */}
              <div>
                <p
                  className="mb-6 flex items-center gap-3"
                  style={{
                    fontFamily: "var(--font-space)",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    className="rounded-full flex items-center justify-center"
                    style={{ width: 24, height: 24, background: "var(--coral)", color: "#fff", fontSize: "11px", fontWeight: 900 }}
                  >
                    1
                  </span>
                  Choose your photography style
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {STYLES.map((style, i) => (
                    <motion.button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="relative overflow-hidden text-left rounded-3xl"
                      style={{
                        background: selectedStyle === style.id ? style.bg : "var(--cream)",
                        border: selectedStyle === style.id ? `2px solid ${style.color}` : "1px solid rgba(26,22,20,0.06)",
                        boxShadow: selectedStyle === style.id ? `0 8px 32px ${style.color}20` : "none",
                        transition: "all 0.3s",
                      }}
                      whileHover={{ y: -4, boxShadow: `0 12px 40px ${style.color}15` }}
                    >
                      {/* Images collage */}
                      <div className="relative overflow-hidden rounded-t-3xl" style={{ aspectRatio: "16/9" }}>
                        <div className="grid grid-cols-3 h-full gap-0">
                          {style.images.map((src, si) => (
                            <div key={si} className="relative overflow-hidden">
                              <Image src={src} alt="" fill className="object-cover" sizes="120px" />
                            </div>
                          ))}
                        </div>
                        {selectedStyle === style.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3 rounded-full flex items-center justify-center"
                            style={{ width: 28, height: 28, background: style.color }}
                          >
                            <Check size={14} color="#fff" strokeWidth={3} />
                          </motion.div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span style={{ fontSize: "1.2rem" }}>{style.emoji}</span>
                          <h4
                            style={{
                              fontFamily: "var(--font-plus)",
                              fontSize: "0.95rem",
                              fontWeight: 800,
                              color: selectedStyle === style.id ? style.color : "var(--ink)",
                              letterSpacing: "-0.02em",
                              lineHeight: 1.2,
                            }}
                          >
                            {style.name}
                          </h4>
                        </div>
                        <p
                          style={{
                            fontFamily: "var(--font-space)",
                            fontSize: "12px",
                            color: "var(--text-muted)",
                            lineHeight: 1.6,
                            marginBottom: 10,
                          }}
                        >
                          {style.desc}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {style.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-full"
                              style={{
                                fontFamily: "var(--font-space)",
                                fontSize: "9px",
                                fontWeight: 600,
                                letterSpacing: "0.05em",
                                textTransform: "uppercase",
                                background: style.bg,
                                color: style.color,
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Step 2 — Vibe */}
              <div>
                <p
                  className="mb-5 flex items-center gap-3"
                  style={{
                    fontFamily: "var(--font-space)",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    className="rounded-full flex items-center justify-center"
                    style={{ width: 24, height: 24, background: "var(--indigo)", color: "#fff", fontSize: "11px", fontWeight: 900 }}
                  >
                    2
                  </span>
                  Preferred location vibe
                </p>
                <div className="flex flex-wrap gap-2">
                  {VIBES.map((v) => (
                    <button
                      key={v}
                      onClick={() => toggleVibe(v)}
                      className="px-4 py-2 rounded-full transition-all duration-300"
                      style={{
                        fontFamily: "var(--font-space)",
                        fontSize: "13px",
                        fontWeight: 600,
                        background: selectedVibes.includes(v) ? "var(--indigo)" : "var(--cream)",
                        color: selectedVibes.includes(v) ? "#fff" : "var(--text-secondary)",
                        border: `1px solid ${selectedVibes.includes(v) ? "var(--indigo)" : "rgba(26,22,20,0.1)"}`,
                        transform: selectedVibes.includes(v) ? "scale(1.05)" : "scale(1)",
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3 — Time */}
              <div>
                <p
                  className="mb-5 flex items-center gap-3"
                  style={{
                    fontFamily: "var(--font-space)",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    className="rounded-full flex items-center justify-center"
                    style={{ width: 24, height: 24, background: "var(--amber-deep)", color: "#fff", fontSize: "11px", fontWeight: 900 }}
                  >
                    3
                  </span>
                  Preferred shoot timing
                </p>
                <div className="flex flex-wrap gap-2">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className="px-4 py-2 rounded-full transition-all duration-300"
                      style={{
                        fontFamily: "var(--font-space)",
                        fontSize: "13px",
                        fontWeight: 600,
                        background: selectedTime === t ? "var(--amber-deep)" : "var(--cream)",
                        color: selectedTime === t ? "#fff" : "var(--text-secondary)",
                        border: `1px solid ${selectedTime === t ? "var(--amber-deep)" : "rgba(26,22,20,0.1)"}`,
                        transform: selectedTime === t ? "scale(1.05)" : "scale(1)",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Send */}
              <div
                className="flex items-center justify-between flex-wrap gap-4 pt-6"
                style={{ borderTop: "1px solid rgba(26,22,20,0.08)" }}
              >
                <div>
                  {activeStyle && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        fontFamily: "var(--font-space)",
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Selected:{" "}
                      <span style={{ color: "var(--coral)", fontWeight: 700 }}>{activeStyle.name}</span>
                      {selectedVibes.length > 0 && <> · {selectedVibes.join(", ")}</>}
                      {selectedTime && <> · {selectedTime}</>}
                    </motion.p>
                  )}
                </div>
                <motion.button
                  onClick={handleSend}
                  disabled={!selectedStyle}
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: "var(--font-space)",
                    fontSize: "14px",
                    fontWeight: 700,
                    background: "var(--coral)",
                    color: "#fff",
                    letterSpacing: "-0.01em",
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: "var(--coral-deep)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <MessageCircle size={16} />
                  Send My Mood Board
                  <ArrowRight size={15} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
