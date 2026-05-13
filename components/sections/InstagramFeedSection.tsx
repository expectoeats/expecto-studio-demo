"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Instagram, ExternalLink, Heart, Grid3X3 } from "lucide-react";

const POSTS = [
  "https://www.instagram.com/p/DYM3CRqwNA-/",
  "https://www.instagram.com/p/DYHWS7Js29B/",
  "https://www.instagram.com/p/DXRd-GeEll5/",
];

const MARQUEE_ITEMS = [
  "Wedding Photography",
  "Pre-Wedding Shoots",
  "Candid Moments",
  "Portrait Sessions",
  "Reception Coverage",
  "Lifestyle Photography",
];

const STATS = [
  { value: "15.2K", label: "Followers", icon: Heart },
  { value: "294", label: "Posts", icon: Grid3X3 },
  { value: "12+", label: "Years", icon: Instagram },
];

declare global {
  interface Window { instgrm?: { Embeds: { process: () => void } } }
}

export default function InstagramFeedSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [embedsLoaded, setEmbedsLoaded] = useState(false);

  useEffect(() => {
    if (document.getElementById("ig-embed-script")) {
      window.instgrm?.Embeds.process();
      setEmbedsLoaded(true);
      return;
    }
    const s = document.createElement("script");
    s.id = "ig-embed-script";
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    s.onload = () => { setEmbedsLoaded(true); window.instgrm?.Embeds.process(); };
    document.body.appendChild(s);
  }, []);

  return (
    <section
      ref={ref}
      id="instagram"
      className="relative overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      {/* Marquee strip top */}
      <div
        className="overflow-hidden py-3"
        style={{ borderBottom: "1px solid rgba(26,22,20,0.06)", background: "var(--cream-2)" }}
      >
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "scrollLeft 28s linear infinite", width: "max-content" }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 mx-8"
              style={{
                fontFamily: "var(--font-space)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--coral)" }} />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-6 md:px-12"
        style={{
          paddingTop: "clamp(80px,10vw,140px)",
          paddingBottom: "clamp(80px,10vw,140px)",
        }}
      >
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <motion.div
              className="pill pill-coral mb-5 inline-flex"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Instagram
            </motion.div>

            <h2
              style={{
                fontFamily: "var(--font-plus)",
                fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                fontWeight: 900,
                color: "var(--ink)",
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
              }}
            >
              Follow Our{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, var(--coral), var(--indigo))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Visual Journey
              </span>
            </h2>

            <p
              className="mt-5 max-w-sm"
              style={{
                fontFamily: "var(--font-space)",
                fontSize: "15px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}
            >
              Behind every great photo is a story. Follow us on Instagram for daily inspiration, behind-the-scenes moments, and real wedding magic from Ballia.
            </p>

            {/* Stats */}
            <div className="flex gap-6 mt-8">
              {STATS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                    className="flex flex-col gap-1 p-4 rounded-2xl"
                    style={{ background: "var(--cream-2)", border: "1px solid rgba(26,22,20,0.06)" }}
                  >
                    <Icon size={14} style={{ color: "var(--coral)" }} strokeWidth={2} />
                    <span
                      style={{
                        fontFamily: "var(--font-plus)",
                        fontSize: "1.5rem",
                        fontWeight: 900,
                        color: "var(--ink)",
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                      }}
                    >
                      {s.value}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-space)",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                      }}
                    >
                      {s.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <motion.a
              href="https://www.instagram.com/roopsagarstudioballia/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-full w-fit"
              style={{
                background: "linear-gradient(135deg, var(--coral), var(--indigo))",
                color: "#fff",
                fontFamily: "var(--font-space)",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Instagram size={16} />
              @roopsagarstudioballia
              <ExternalLink size={12} />
            </motion.a>
            <p
              style={{
                fontFamily: "var(--font-space)",
                fontSize: "13px",
                color: "var(--text-muted)",
              }}
            >
              New posts every week · Real weddings · Behind the scenes
            </p>
          </motion.div>
        </div>

        {/* Embeds */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {POSTS.map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
                className="rounded-3xl overflow-hidden"
                style={{
                  border: "1px solid rgba(26,22,20,0.06)",
                  background: "var(--cream-2)",
                  minHeight: 480,
                }}
              >
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={url}
                  data-instgrm-version="14"
                  style={{
                    background: "transparent",
                    border: 0,
                    borderRadius: 0,
                    boxShadow: "none",
                    margin: 0,
                    maxWidth: "100%",
                    minWidth: 0,
                    padding: 0,
                    width: "100%",
                  }}
                >
                  {!embedsLoaded && (
                    <div
                      className="flex flex-col items-center justify-center h-64 gap-3"
                      style={{ background: "var(--cream-3)" }}
                    >
                      <Instagram size={24} style={{ color: "var(--coral)", opacity: 0.5 }} />
                      <span
                        style={{
                          fontFamily: "var(--font-space)",
                          fontSize: "12px",
                          color: "var(--text-muted)",
                          fontWeight: 500,
                        }}
                      >
                        Loading post...
                      </span>
                    </div>
                  )}
                </blockquote>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Marquee strip bottom */}
      <div
        className="overflow-hidden py-3"
        style={{ borderTop: "1px solid rgba(26,22,20,0.06)", background: "var(--cream-2)" }}
      >
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: "scrollRight 32s linear infinite",
            width: "max-content",
            transform: "translateX(-50%)",
          }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 mx-8"
              style={{
                fontFamily: "var(--font-space)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--indigo)" }} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
