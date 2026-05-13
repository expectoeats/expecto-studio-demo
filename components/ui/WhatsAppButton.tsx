"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href="https://wa.me/918115473597?text=Hi, I'd like to enquire about photography services"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-[100] flex items-center gap-3 rounded-full"
      style={{
        bottom: 28,
        right: 28,
        background: "#25D366",
        color: "#fff",
        boxShadow: "0 8px 32px rgba(37,211,102,0.35)",
        padding: hovered ? "14px 20px" : "14px",
        transition: "padding 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 300, damping: 20 }}
    >
      <MessageCircle size={22} strokeWidth={2.5} />
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: "var(--font-space)",
              fontSize: "13px",
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            Chat on WhatsApp
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
