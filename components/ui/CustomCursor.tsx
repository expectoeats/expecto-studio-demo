"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const outerPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterLink = () => {
      if (outerRef.current) {
        outerRef.current.style.width = "50px";
        outerRef.current.style.height = "50px";
        outerRef.current.style.borderRadius = "8px";
        outerRef.current.style.transform = `translate(-50%, -50%) rotate(45deg)`;
      }
    };
    const onLeaveLink = () => {
      if (outerRef.current) {
        outerRef.current.style.width = "30px";
        outerRef.current.style.height = "30px";
        outerRef.current.style.borderRadius = "50%";
        outerRef.current.style.transform = `translate(-50%, -50%) rotate(0deg)`;
      }
    };

    document.addEventListener("mousemove", onMove);

    const links = document.querySelectorAll("a, button, [data-cursor]");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${pos.current.x}px`;
        cursorRef.current.style.top = `${pos.current.y}px`;
      }
      // Lerp outer
      outerPos.current.x += (pos.current.x - outerPos.current.x) * 0.12;
      outerPos.current.y += (pos.current.y - outerPos.current.y) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.left = `${outerPos.current.x}px`;
        outerRef.current.style.top = `${outerPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Crosshair dot */}
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          position: "fixed",
          width: "6px",
          height: "6px",
          background: "var(--terracotta)",
          borderRadius: "50%",
          zIndex: 99999,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="custom-cursor"
        style={{
          position: "fixed",
          width: "30px",
          height: "30px",
          border: "1.5px solid var(--terracotta)",
          borderRadius: "50%",
          zIndex: 99998,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s, height 0.3s, border-radius 0.3s",
          opacity: 0.7,
        }}
      />
    </>
  );
}
