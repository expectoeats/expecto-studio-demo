"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Calendar, Phone, MessageCircle, ArrowRight, Download, Clock, MapPin, Camera } from "lucide-react";
import { SITE } from "@/lib/constants";

const NEXT_STEPS = [
  { icon: Phone,    title: "We'll call you",       desc: "Our team will call within 2 hours to confirm details and answer any questions.", time: "Within 2 hours" },
  { icon: Calendar, title: "Pre-shoot consultation", desc: "A 30-minute call to discuss your vision, locations, and shot list.", time: "3–5 days before" },
  { icon: Camera,   title: "The shoot day",          desc: "We arrive 1 hour early, fully prepared. Just relax and be yourself.", time: "Your booked date" },
  { icon: Download, title: "Gallery delivery",       desc: "Your edited gallery delivered to your private portal within 3–4 weeks.", time: "3–4 weeks after" },
];

const CHECKLIST = [
  "Confirm your venue address with us",
  "Share your shot list / must-have moments",
  "Discuss outfit colours (avoid neon/white)",
  "Plan golden hour timing for outdoor shots",
  "Add our number to your contacts",
];

export default function BookingConfirmation() {
  const [confNo] = useState(() => "RS" + Math.floor(100000 + Math.random() * 900000));
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-primary)" }}>
      {/* Top bar */}
      <div className="h-16 flex items-center px-6 md:px-12 border-b" style={{ borderColor: "rgba(184,134,11,0.12)", background: "#fff" }}>
        <a href="/" className="flex items-center gap-3" aria-label="Roop Sagar Studio">
          <div className="relative" style={{ width: 40, height: 40 }}>
            <Image src="/logo.png" alt="Roop Sagar Studio" fill className="object-contain" sizes="40px" />
          </div>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 300, fontStyle: "italic", color: "var(--color-text-dark)" }}>
            Roop Sagar Studio
          </span>
        </a>
      </div>

      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">

        {/* Hero confirmation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          {/* Animated check */}
          <motion.div
            initial={{ scale: 0 }} animate={visible ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "rgba(184,134,11,0.1)", border: "2px solid rgba(184,134,11,0.3)" }}
          >
            <CheckCircle size={44} style={{ color: "#B8860B" }} />
          </motion.div>

          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 300, color: "var(--color-text-dark)", lineHeight: 1.1 }}>
            You&apos;re All Set!
          </h1>
          <p className="mt-3 mb-6" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontStyle: "italic", color: "#B8860B" }}>
            Your booking enquiry has been received.
          </p>

          {/* Confirmation card */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 rounded-2xl"
            style={{ background: "#fff", border: "1.5px solid rgba(184,134,11,0.2)", boxShadow: "0 4px 24px rgba(184,134,11,0.1)" }}>
            <div className="text-center sm:text-left">
              <p style={{ fontFamily: "var(--font-dm)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
                Confirmation Number
              </p>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 400, fontStyle: "italic", color: "#B8860B", lineHeight: 1 }}>
                {confNo}
              </p>
            </div>
            <div className="h-px sm:h-10 w-full sm:w-px" style={{ background: "rgba(184,134,11,0.15)" }} />
            <div className="text-center sm:text-left">
              <p style={{ fontFamily: "var(--font-dm)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
                Studio Contact
              </p>
              <a href={SITE.phoneHref} style={{ fontFamily: "var(--font-dm)", fontSize: "15px", fontWeight: 500, color: "#B8860B" }}>
                {SITE.phone}
              </a>
            </div>
          </div>
        </motion.div>

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-10"
        >
          <h2 className="mb-6" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.8rem", fontWeight: 300, color: "var(--color-text-dark)" }}>
            What happens next?
          </h2>
          <div className="flex flex-col gap-4">
            {NEXT_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -20 }} animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white"
                  style={{ border: "1.5px solid rgba(184,134,11,0.12)", boxShadow: "0 2px 12px rgba(184,134,11,0.06)" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(184,134,11,0.1)" }}>
                    <Icon size={20} style={{ color: "#B8860B" }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h3 style={{ fontFamily: "var(--font-dm)", fontSize: "14px", fontWeight: 600, color: "var(--color-text-dark)" }}>
                        {step.title}
                      </h3>
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs flex-shrink-0"
                        style={{ background: "rgba(184,134,11,0.08)", color: "#B8860B", fontFamily: "var(--font-dm)", border: "1px solid rgba(184,134,11,0.15)" }}>
                        <Clock size={10} />
                        {step.time}
                      </span>
                    </div>
                    <p className="mt-1" style={{ fontFamily: "var(--font-dm)", fontSize: "13px", color: "var(--color-text-light)", lineHeight: 1.6 }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Preparation checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mb-10 p-6 rounded-2xl"
          style={{ background: "rgba(184,134,11,0.05)", border: "1.5px solid rgba(184,134,11,0.15)" }}
        >
          <h2 className="mb-4" style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", fontWeight: 300, color: "var(--color-text-dark)" }}>
            Preparation Checklist
          </h2>
          <ul className="flex flex-col gap-3">
            {CHECKLIST.map((item, i) => (
              <motion.li key={i}
                initial={{ opacity: 0, x: -10 }} animate={visible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.07 }}
                className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(184,134,11,0.15)" }}>
                  <CheckCircle size={12} style={{ color: "#B8860B" }} />
                </div>
                <span style={{ fontFamily: "var(--font-dm)", fontSize: "14px", color: "var(--color-text-medium)" }}>
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <a href={`https://wa.me/918115473597?text=Hi, my confirmation number is ${confNo}. I'd like to discuss my booking.`}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-medium transition-all hover:scale-105"
            style={{ background: "#25D366", color: "#fff", fontFamily: "var(--font-dm)", fontSize: "13px", letterSpacing: "0.06em" }}>
            <MessageCircle size={16} />
            Chat on WhatsApp
          </a>
          <a href="/"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-medium transition-all hover:scale-105"
            style={{ background: "rgba(184,134,11,0.08)", color: "#B8860B", fontFamily: "var(--font-dm)", fontSize: "13px", border: "1.5px solid rgba(184,134,11,0.2)" }}>
            Back to Home
            <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Studio address */}
        <motion.div
          initial={{ opacity: 0 }} animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-8 flex items-center justify-center gap-2"
          style={{ fontFamily: "var(--font-dm)", fontSize: "12px", color: "var(--color-text-muted)" }}>
          <MapPin size={13} style={{ color: "#B8860B" }} />
          {SITE.address}
        </motion.div>
      </div>
    </div>
  );
}
