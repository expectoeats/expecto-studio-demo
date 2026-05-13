import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne:    ["var(--font-syne)", "sans-serif"],
        cabinet: ["var(--font-cabinet)", "sans-serif"],
      },
      colors: {
        sage:       "#8FAF9F",
        terracotta: "#D4785A",
        cream:      "#F2EDE4",
        sand:       "#E8DDD0",
        rust:       "#C45C3E",
        forest:     "#3D6B5E",
        electric:   "#4DFFB4",
        coral:      "#FF6B6B",
        lavender:   "#B8A9F5",
        mustard:    "#F5C842",
        "surface-0":    "#F5F0E8",
        "surface-1":    "#EDE7DC",
        "surface-2":    "#E0D9CE",
        "surface-dark": "#1C2421",
        "text-primary":   "#1C2421",
        "text-secondary": "#4A5568",
        "text-accent":    "#C45C3E",
      },
      animation: {
        "marquee-left": "marquee-left 25s linear infinite",
        "spin-slow":    "spin-slow 8s linear infinite",
        "float-up":     "float-up 6s ease-in-out infinite",
        "blob-morph":   "blob-morph 12s ease-in-out infinite",
        "phone-ring":   "phone-ring 2s ease-in-out infinite",
        "badge-spin":   "badge-spin 8s linear infinite",
      },
      keyframes: {
        "marquee-left": { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "spin-slow":    { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
        "float-up":     { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-12px)" } },
        "blob-morph":   {
          "0%,100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%":     { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        "phone-ring": {
          "0%,100%": { transform: "rotate(0deg)" },
          "10%":     { transform: "rotate(-15deg)" },
          "20%":     { transform: "rotate(15deg)" },
          "30%":     { transform: "rotate(-10deg)" },
          "40%":     { transform: "rotate(10deg)" },
          "50%":     { transform: "rotate(0deg)" },
        },
        "badge-spin": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
      },
    },
  },
  plugins: [],
};

export default config;
