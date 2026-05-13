"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";

const PROBLEMS = [
  {
    id: 1,
    problem: "Photographer missed the key moments",
    solution: "We arrive 1 hour early, scout every angle, and use a 2-shooter system so zero moments are missed — ever.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=85",
    tag: "Timing",
    color: "var(--coral)",
    bg: "rgba(232,97,74,0.08)",
  },
  {
    id: 2,
    problem: "Photos looked dull, dark & lifeless",
    solution: "We use professional lighting rigs + golden-hour scheduling. Every frame is colour-graded to feel warm, vivid and cinematic.",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=700&q=85",
    tag: "Lighting",
    color: "var(--indigo)",
    bg: "rgba(75,63,216,0.08)",
  },
  {
    id: 3,
    problem: "Stiff, awkward & unnatural poses",
    solution: "We guide you with gentle direction and capture candid in-between moments — so you look like yourself, not a mannequin.",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&q=85",
    tag: "Posing",
    color: "var(--amber-deep)",
    bg: "rgba(212,136,10,0.08)",
  },
  {
    id: 4,
    problem: "Waited months, got blurry low-res files",
    solution: "Edited gallery delivered in 3–4 weeks. Full-resolution files, private online gallery, and USB backup — guaranteed.",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=700&q=85",
    tag: "Delivery",
    color: "var(--coral)",
    bg: "rgba(232,97,74,0.08)",
  },
];

const TRUST = [
  { num: "100%", label: "Satisfaction Guarantee", emoji: "✅" },
  { num: "3–4 wks", label: "Delivery Promise", emoji: "⚡" },
  { num: "2-Shooter", label: "Every Wedding", emoji: "📸" },
  { num: "Free", label: "Consultation", emoji: "💬" },
];

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -80px 0px" });
  const [openId, setOpenId] = useState<number | null>(1);

  const activeItem = PROBLEMS.find((p) => p.id === openId) ?? PROBLEMS[0];

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: "var(--cream)",
        paddingTop: "clamp(80px,10vw,140px)",
        paddingBottom: "clamp(80px,10vw,140px)",
      }}
    >
      {/* Decorative */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          right: "-8%",
          width: 400,
          height: 400,
          background: "var(--coral)",
          opacity: 0.06,
          animation: "morph 11s ease-in-out infinite",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            className="pill pill-coral mb-5 inline-flex"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Why Choose Us
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
            We Solve Every Problem{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--coral), var(--indigo))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Other Studios Don&apos;t
            </span>
          </motion.h2>
        </div>

        {/* Accordion + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          {/* Left — Accordion */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {PROBLEMS.map((item, i) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  style={{ borderTop: "1px solid rgba(26,22,20,0.08)" }}
                >
                  <button
                    className="w-full flex items-center justify-between py-5 text-left group"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          width: 32,
                          height: 32,
                          background: isOpen ? item.color : "rgba(26,22,20,0.06)",
                          transition: "background 0.3s",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-plus)",
                            fontSize: "11px",
                            fontWeight: 900,
                            color: isOpen ? "#fff" : "var(--text-muted)",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-space)",
                          fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
                          fontWeight: 600,
                          color: isOpen ? "var(--ink)" : "var(--text-secondary)",
                          transition: "color 0.3s",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        &ldquo;{item.problem}&rdquo;
                      </span>
                    </div>
                    <div
                      className="flex-shrink-0 ml-4 rounded-xl flex items-center justify-center"
                      style={{
                        width: 32,
                        height: 32,
                        background: isOpen ? item.bg : "rgba(26,22,20,0.04)",
                        border: `1px solid ${isOpen ? item.color + "40" : "rgba(26,22,20,0.08)"}`,
                        transition: "all 0.3s",
                      }}
                    >
                      {isOpen ? (
                        <Minus size={13} style={{ color: item.color }} />
                      ) : (
                        <Plus size={13} style={{ color: "var(--text-muted)" }} />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="solution"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div
                          className="pb-5 pl-12 pr-4 rounded-2xl mb-3"
                          style={{ background: item.bg }}
                        >
                          <p
                            className="pt-4"
                            style={{
                              fontFamily: "var(--font-space)",
                              fontSize: "14px",
                              color: "var(--text-secondary)",
                              lineHeight: 1.8,
                            }}
                          >
                            {item.solution}
                          </p>
                          <span
                            className="inline-block mt-3 px-3 py-1 rounded-full"
                            style={{
                              fontFamily: "var(--font-space)",
                              fontSize: "10px",
                              fontWeight: 700,
                              background: item.color,
                              color: "#fff",
                              letterSpacing: "0.05em",
                              textTransform: "uppercase",
                            }}
                          >
                            {item.tag} — Solved ✓
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            <div style={{ borderTop: "1px solid rgba(26,22,20,0.08)" }} />
          </motion.div>

          {/* Right — Dynamic image */}
          <motion.div
            className="relative lg:sticky lg:top-28"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotate: 2 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="relative overflow-hidden rounded-3xl"
                style={{ aspectRatio: "4/5", boxShadow: "var(--shadow-lg)" }}
              >
                <Image
                  src={activeItem.image}
                  alt={activeItem.tag}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(26,22,20,0.4) 0%, transparent 50%)" }}
                />
                {/* Tag */}
                <div
                  className="absolute top-5 left-5 px-4 py-2 rounded-full"
                  style={{
                    fontFamily: "var(--font-space)",
                    fontSize: "11px",
                    fontWeight: 700,
                    background: activeItem.color,
                    color: "#fff",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {activeItem.tag} — Solved ✓
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {TRUST.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center py-8 px-6 rounded-3xl"
              style={{ background: "var(--cream-2)", border: "1px solid rgba(26,22,20,0.06)" }}
              whileHover={{ y: -6, boxShadow: "var(--shadow-sm)" }}
            >
              <span style={{ fontSize: "1.8rem", marginBottom: 8 }}>{item.emoji}</span>
              <span
                style={{
                  fontFamily: "var(--font-plus)",
                  fontSize: "1.6rem",
                  fontWeight: 900,
                  color: "var(--coral)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {item.num}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-space)",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
