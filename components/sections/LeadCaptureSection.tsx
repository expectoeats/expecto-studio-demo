"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Phone, User, Heart, CheckCircle, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

const SERVICES_LIST = [
  "Wedding Photography",
  "Pre-Wedding Shoot",
  "Reception & Ceremony",
  "Portrait & Lifestyle",
  "Baby & Maternity",
  "Corporate & Events",
];

const BUDGETS = ["Under ₹20,000", "₹20,000 – ₹40,000", "₹40,000 – ₹80,000", "₹80,000+"];
const BOOKED_DATES = ["2025-02-14", "2025-02-15", "2025-03-08", "2025-03-22", "2025-04-05", "2025-04-12"];

export default function LeadCaptureSection() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({ name: "", phone: "", service: "", date: "", budget: "", message: "" });
  const [dateStatus, setDateStatus] = useState<"idle" | "available" | "booked">("idle");
  const [submitted, setSubmitted] = useState(false);

  const checkDate = () => {
    if (!form.date) return;
    setDateStatus(BOOKED_DATES.includes(form.date) ? "booked" : "available");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const inputBase = {
    fontFamily: "var(--font-space)",
    fontSize: "14px",
    background: "var(--cream)",
    border: "1px solid rgba(26,22,20,0.12)",
    color: "var(--ink)",
    padding: "14px 16px",
    width: "100%",
    outline: "none",
    borderRadius: "12px",
  };

  return (
    <section
      id="enquiry"
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
          top: "20%",
          right: "-8%",
          width: 400,
          height: 400,
          background: "var(--coral)",
          opacity: 0.06,
          animation: "morph 12s ease-in-out infinite",
        }}
      />

      <div className="max-w-2xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            className="pill pill-coral mb-5 inline-flex"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Free Consultation
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              fontFamily: "var(--font-plus)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 900,
              color: "var(--ink)",
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
            }}
          >
            Check Your Date &{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--coral), var(--indigo))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Get a Quote
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4"
            style={{
              fontFamily: "var(--font-space)",
              fontSize: "15px",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
            }}
          >
            Fill in 3 quick steps — we&apos;ll confirm availability and send a personalised quote within 2 hours.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 rounded-3xl"
              style={{ background: "var(--cream)", border: "1px solid rgba(26,22,20,0.06)" }}
            >
              <div
                className="rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ width: 64, height: 64, background: "rgba(232,97,74,0.1)" }}
              >
                <CheckCircle size={28} style={{ color: "var(--coral)" }} />
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
                Enquiry Received! 🎉
              </h3>
              <p
                className="mt-3 mb-8"
                style={{
                  fontFamily: "var(--font-space)",
                  fontSize: "15px",
                  color: "var(--text-secondary)",
                }}
              >
                Thank you, <strong>{form.name}</strong>. We&apos;ll call you on <strong>{form.phone}</strong> within 2 hours.
              </p>
              <a
                href={`https://wa.me/${SITE.phone.replace(/\s/g, "")}?text=Hi, I just submitted an enquiry for ${form.service} on ${form.date}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
                style={{
                  background: "#25D366",
                  color: "#fff",
                  fontFamily: "var(--font-space)",
                  fontSize: "13px",
                  fontWeight: 700,
                }}
              >
                <MessageCircle size={15} />
                Also message on WhatsApp
              </a>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl overflow-hidden"
              style={{ background: "var(--cream)", border: "1px solid rgba(26,22,20,0.06)", boxShadow: "var(--shadow-md)" }}
            >
              {/* Step indicator */}
              <div
                className="flex"
                style={{ borderBottom: "1px solid rgba(26,22,20,0.06)" }}
              >
                {[
                  { n: 1, label: "Your Details", emoji: "👤" },
                  { n: 2, label: "Date & Service", emoji: "📅" },
                  { n: 3, label: "Budget & Message", emoji: "💬" },
                ].map((s) => (
                  <button
                    key={s.n}
                    onClick={() => step > s.n && setStep(s.n as 1 | 2 | 3)}
                    className="flex-1 py-5 flex flex-col items-center gap-1.5 transition-all"
                    style={{
                      background: step === s.n ? "rgba(232,97,74,0.05)" : "transparent",
                      borderBottom: step === s.n ? "2px solid var(--coral)" : "2px solid transparent",
                    }}
                  >
                    <span style={{ fontSize: "1.1rem" }}>{s.emoji}</span>
                    <span
                      className="text-xs hidden sm:block"
                      style={{
                        fontFamily: "var(--font-space)",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: step === s.n ? "var(--coral)" : "var(--text-muted)",
                      }}
                    >
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                <AnimatePresence mode="wait">
                  {/* Step 1 */}
                  {step === 1 && (
                    <motion.div
                      key="s1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-6"
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-plus)",
                          fontSize: "1.5rem",
                          fontWeight: 900,
                          color: "var(--ink)",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        Tell us about yourself 👋
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <LightInput icon={User} label="Your Name" type="text" value={form.name} onChange={(v) => set("name", v)} placeholder="Rahul Sharma" required inputBase={inputBase} />
                        <LightInput icon={Phone} label="Phone Number" type="tel" value={form.phone} onChange={(v) => set("phone", v)} placeholder="+91 98765 43210" required inputBase={inputBase} />
                      </div>
                      <div className="flex justify-end">
                        <motion.button
                          type="button"
                          onClick={() => form.name && form.phone && setStep(2)}
                          className="px-7 py-3.5 rounded-full"
                          style={{
                            fontFamily: "var(--font-space)",
                            fontSize: "14px",
                            fontWeight: 700,
                            background: "var(--coral)",
                            color: "#fff",
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Next →
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <motion.div
                      key="s2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-6"
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-plus)",
                          fontSize: "1.5rem",
                          fontWeight: 900,
                          color: "var(--ink)",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        When & what occasion? 📅
                      </h3>

                      <div>
                        <label style={{ fontFamily: "var(--font-space)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: 10 }}>
                          Service
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {SERVICES_LIST.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => set("service", s)}
                              className="px-3 py-2.5 rounded-xl text-left transition-all"
                              style={{
                                fontFamily: "var(--font-space)",
                                fontSize: "12px",
                                fontWeight: 600,
                                background: form.service === s ? "var(--coral)" : "var(--cream-2)",
                                color: form.service === s ? "#fff" : "var(--text-secondary)",
                                border: `1px solid ${form.service === s ? "var(--coral)" : "rgba(26,22,20,0.08)"}`,
                              }}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label style={{ fontFamily: "var(--font-space)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: 10 }}>
                          Event Date
                        </label>
                        <div className="flex gap-3">
                          <input
                            type="date"
                            value={form.date}
                            onChange={(e) => { set("date", e.target.value); setDateStatus("idle"); }}
                            className="flex-1"
                            style={inputBase}
                          />
                          <motion.button
                            type="button"
                            onClick={checkDate}
                            className="px-4 rounded-xl flex items-center justify-center"
                            style={{ background: "var(--coral)", color: "#fff" }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Calendar size={16} />
                          </motion.button>
                        </div>
                        <AnimatePresence>
                          {dateStatus !== "idle" && (
                            <motion.div
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="mt-2 px-4 py-3 flex items-center gap-2 rounded-xl"
                              style={{
                                background: dateStatus === "available" ? "rgba(232,97,74,0.08)" : "rgba(239,68,68,0.08)",
                                border: `1px solid ${dateStatus === "available" ? "rgba(232,97,74,0.3)" : "rgba(239,68,68,0.3)"}`,
                              }}
                            >
                              {dateStatus === "available" ? (
                                <>
                                  <CheckCircle size={14} style={{ color: "var(--coral)" }} />
                                  <span style={{ fontFamily: "var(--font-space)", fontSize: "13px", color: "var(--coral)", fontWeight: 600 }}>
                                    Great news! This date is available.
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span style={{ fontSize: 14 }}>⚠️</span>
                                  <span style={{ fontFamily: "var(--font-space)", fontSize: "13px", color: "rgb(239,68,68)", fontWeight: 600 }}>
                                    This date is already booked. Please choose another.
                                  </span>
                                </>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="flex justify-between">
                        <button type="button" onClick={() => setStep(1)} className="px-5 py-3 rounded-full" style={{ fontFamily: "var(--font-space)", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", border: "1px solid rgba(26,22,20,0.12)" }}>
                          ← Back
                        </button>
                        <motion.button type="button" onClick={() => form.service && form.date && setStep(3)} className="px-7 py-3 rounded-full" style={{ fontFamily: "var(--font-space)", fontSize: "14px", fontWeight: 700, background: "var(--coral)", color: "#fff" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                          Next →
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <motion.div
                      key="s3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-6"
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-plus)",
                          fontSize: "1.5rem",
                          fontWeight: 900,
                          color: "var(--ink)",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        Budget & anything else? 💬
                      </h3>

                      <div>
                        <label style={{ fontFamily: "var(--font-space)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: 10 }}>
                          Approximate Budget
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {BUDGETS.map((b) => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => set("budget", b)}
                              className="px-3 py-3 rounded-xl transition-all"
                              style={{
                                fontFamily: "var(--font-space)",
                                fontSize: "13px",
                                fontWeight: 600,
                                background: form.budget === b ? "var(--indigo)" : "var(--cream-2)",
                                color: form.budget === b ? "#fff" : "var(--text-secondary)",
                                border: `1px solid ${form.budget === b ? "var(--indigo)" : "rgba(26,22,20,0.08)"}`,
                              }}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label style={{ fontFamily: "var(--font-space)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", display: "block", marginBottom: 10 }}>
                          Anything specific? (optional)
                        </label>
                        <textarea
                          rows={3}
                          value={form.message}
                          onChange={(e) => set("message", e.target.value)}
                          placeholder="E.g. outdoor shoot, drone coverage, same-day edit..."
                          className="resize-none"
                          style={inputBase}
                        />
                      </div>

                      <div className="flex justify-between">
                        <button type="button" onClick={() => setStep(2)} className="px-5 py-3 rounded-full" style={{ fontFamily: "var(--font-space)", fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", border: "1px solid rgba(26,22,20,0.12)" }}>
                          ← Back
                        </button>
                        <motion.button
                          type="submit"
                          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full"
                          style={{ fontFamily: "var(--font-space)", fontSize: "14px", fontWeight: 700, background: "var(--coral)", color: "#fff" }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Heart size={14} />
                          Send Enquiry
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex items-center justify-center gap-4 flex-wrap"
        >
          <span style={{ fontFamily: "var(--font-space)", fontSize: "13px", color: "var(--text-muted)" }}>
            Prefer to chat directly?
          </span>
          <a
            href="https://wa.me/918115473597?text=Hi, I'd like to enquire about photography services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{ background: "#25D366", color: "#fff", fontFamily: "var(--font-space)", fontSize: "13px", fontWeight: 700 }}
          >
            <MessageCircle size={14} />
            WhatsApp Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function LightInput({ icon: Icon, label, type, value, onChange, placeholder, required, inputBase }: {
  icon: React.ElementType; label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string; required?: boolean;
  inputBase: React.CSSProperties;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label style={{ fontFamily: "var(--font-space)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
        {label}
      </label>
      <div className="relative">
        <Icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--coral)", opacity: 0.7 }} />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          style={{ ...inputBase, paddingLeft: 40 }}
        />
      </div>
    </div>
  );
}
