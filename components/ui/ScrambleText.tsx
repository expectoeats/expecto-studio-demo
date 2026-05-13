"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

interface ScrambleTextProps {
  text: string;
  trigger?: boolean;
  className?: string;
  delay?: number;
}

export default function ScrambleText({ text, trigger = true, className = "", delay = 0 }: ScrambleTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const duration = 800;

  useEffect(() => {
    if (!trigger) return;
    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startRef.current) startRef.current = timestamp;
        const elapsed = timestamp - startRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const revealedCount = Math.floor(progress * text.length);

        const scrambled = text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < revealedCount) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");

        setDisplayed(scrambled);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayed(text);
          startRef.current = null;
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, text, delay]);

  return <span className={className}>{displayed}</span>;
}
