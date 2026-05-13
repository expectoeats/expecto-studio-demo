"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Lock, Eye, EyeOff, Download, Heart, Share2, X, ChevronLeft, ChevronRight, Camera, CheckCircle } from "lucide-react";

// Demo galleries — in production, fetch from backend/CMS
const DEMO_GALLERIES: Record<string, {
  couple: string; date: string; location: string;
  coverImage: string; totalPhotos: number;
  photos: { id: number; src: string; alt: string; favourite: boolean }[];
}> = {
  "RAHUL2024": {
    couple: "Rahul & Priya",
    date: "14 February 2024",
    location: "Ballia, Uttar Pradesh",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85",
    totalPhotos: 9,
    photos: [
      { id: 1, src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", alt: "Ceremony", favourite: true },
      { id: 2, src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80", alt: "Bride portrait", favourite: false },
      { id: 3, src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", alt: "Candid", favourite: true },
      { id: 4, src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80", alt: "Couple", favourite: false },
      { id: 5, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", alt: "Reception", favourite: false },
      { id: 6, src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80", alt: "Pre-wedding", favourite: true },
      { id: 7, src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80", alt: "Details", favourite: false },
      { id: 8, src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80", alt: "Flowers", favourite: false },
      { id: 9, src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80", alt: "Portrait", favourite: true },
    ],
  },
  "AYUSH2024": {
    couple: "Ayush & Sneha",
    date: "8 March 2024",
    location: "Varanasi, Uttar Pradesh",
    coverImage: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=85",
    totalPhotos: 6,
    photos: [
      { id: 1, src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80", alt: "Bride", favourite: true },
      { id: 2, src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", alt: "Ceremony", favourite: false },
      { id: 3, src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80", alt: "Couple", favourite: true },
      { id: 4, src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80", alt: "Golden hour", favourite: false },
      { id: 5, src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", alt: "Candid", favourite: false },
      { id: 6, src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80", alt: "Together", favourite: true },
    ],
  },
};

export default function ClientGalleryPortal() {
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState("");
  const [gallery, setGallery] = useState<typeof DEMO_GALLERIES[string] | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [favourites, setFavourites] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<"all" | "favourites">("all");

  const unlock = () => {
    const g = DEMO_GALLERIES[code.toUpperCase().trim()];
    if (g) { setGallery(g); setFavourites(new Set(g.photos.filter(p => p.favourite).map(p => p.id))); setError(""); }
    else setError("Invalid access code. Please check and try again.");
  };

  const photos = gallery
    ? filter === "favourites" ? gallery.photos.filter(p => favourites.has(p.id)) : gallery.photos
    : [];

  const prev = () => setLightbox(i => i !== null ? (i - 1 + photos.length) % photos.length : 0);
  const next = () => setLightbox(i => i !== null ? (i + 1) % photos.length : 0);

  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg-primary)" }}>
      {/* Navbar strip */}
      <div className="h-16 flex items-center px-6 md:px-12 border-b" style={{ borderColor: "rgba(184,134,11,0.12)", background: "#fff" }}>
        <a href="/" className="flex items-center gap-3" aria-label="Roop Sagar Studio">
          <div className="relative" style={{ width: 40, height: 40 }}>
            <Image src="/logo.png" alt="Roop Sagar Studio" fill className="object-contain" sizes="40px" />
          </div>
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.2rem", fontWeight: 300, fontStyle: "italic", color: "var(--color-text-dark)" }}>
            Roop Sagar Studio
          </span>
        </a>
        <span className="ml-3 px-3 py-1 rounded-full text-xs"
          style={{ background: "rgba(184,134,11,0.1)", color: "#B8860B", fontFamily: "var(--font-dm)", border: "1px solid rgba(184,134,11,0.2)" }}>
          Private Gallery
        </span>
      </div>

      <AnimatePresence mode="wait">
        {!gallery ? (
          /* ── Lock Screen ── */
          <motion.div key="lock" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md text-center"
            >
              {/* Lock icon */}
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(184,134,11,0.1)", border: "1.5px solid rgba(184,134,11,0.2)" }}>
                <Lock size={32} style={{ color: "#B8860B" }} />
              </div>

              <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "var(--color-text-dark)" }}>
                Your Private Gallery
              </h1>
              <p className="mt-3 mb-8" style={{ fontFamily: "var(--font-dm)", fontSize: "14px", color: "var(--color-text-light)", lineHeight: 1.7 }}>
                Enter the unique access code shared by Roop Sagar Studio to view your photos.
              </p>

              <div className="bg-white rounded-2xl p-6" style={{ border: "1.5px solid rgba(184,134,11,0.15)", boxShadow: "0 8px 40px rgba(184,134,11,0.08)" }}>
                <label style={{ fontFamily: "var(--font-dm)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
                  Access Code
                </label>
                <div className="relative mt-2 mb-4">
                  <input
                    type={showCode ? "text" : "password"}
                    value={code}
                    onChange={e => { setCode(e.target.value); setError(""); }}
                    onKeyDown={e => e.key === "Enter" && unlock()}
                    placeholder="e.g. RAHUL2024"
                    className="w-full px-4 py-3.5 rounded-xl outline-none text-center text-lg tracking-widest"
                    style={{ fontFamily: "var(--font-dm)", border: `1.5px solid ${error ? "rgba(139,101,8,0.4)" : "rgba(184,134,11,0.2)"}`, color: "var(--color-text-dark)", background: "#FAFAF7" }}
                  />
                  <button onClick={() => setShowCode(!showCode)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--color-text-muted)" }}>
                    {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mb-4 text-sm text-center" style={{ fontFamily: "var(--font-dm)", color: "#8B6508" }}>
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button onClick={unlock}
                  className="w-full py-3.5 rounded-xl font-medium transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg,#B8860B,#A0243E)", color: "#fff", fontFamily: "var(--font-dm)", fontSize: "14px", letterSpacing: "0.06em", boxShadow: "0 8px 24px rgba(184,134,11,0.3)" }}>
                  Unlock Gallery
                </button>

                <p className="mt-4 text-xs text-center" style={{ fontFamily: "var(--font-dm)", color: "var(--color-text-muted)" }}>
                  Demo codes: <strong>RAHUL2024</strong> or <strong>AYUSH2024</strong>
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          /* ── Gallery View ── */
          <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-6 md:px-12 py-10">
            {/* Cover + Info */}
            <div className="relative h-56 md:h-72 rounded-3xl overflow-hidden mb-8">
              <Image src={gallery.coverImage} alt="Cover" fill className="object-cover" sizes="100vw" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,22,18,0.85) 0%, transparent 50%)" }} />
              <div className="absolute bottom-6 left-6">
                <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 300, fontStyle: "italic", color: "#fff", lineHeight: 1 }}>
                  {gallery.couple}
                </h2>
                <p style={{ fontFamily: "var(--font-dm)", fontSize: "13px", color: "rgba(255,255,255,0.65)", marginTop: 4 }}>
                  {gallery.date} · {gallery.location}
                </p>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", color: "#fff", fontFamily: "var(--font-dm)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  {gallery.totalPhotos} Photos
                </span>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex gap-2">
                {(["all", "favourites"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className="px-4 py-2 rounded-full text-xs font-medium transition-all"
                    style={{
                      fontFamily: "var(--font-dm)",
                      background: filter === f ? "#B8860B" : "rgba(184,134,11,0.08)",
                      color: filter === f ? "#fff" : "var(--color-text-medium)",
                      border: `1.5px solid ${filter === f ? "#B8860B" : "rgba(184,134,11,0.15)"}`,
                    }}>
                    {f === "all" ? `All Photos (${gallery.photos.length})` : `❤️ Favourites (${favourites.size})`}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
                  style={{ background: "rgba(184,134,11,0.08)", color: "#B8860B", fontFamily: "var(--font-dm)", border: "1.5px solid rgba(184,134,11,0.2)" }}>
                  <Download size={13} /> Download All
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
                  style={{ background: "rgba(184,134,11,0.08)", color: "#B8860B", fontFamily: "var(--font-dm)", border: "1.5px solid rgba(184,134,11,0.2)" }}>
                  <Share2 size={13} /> Share
                </button>
              </div>
            </div>

            {/* Photo Grid */}
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
              {photos.map((photo, i) => (
                <motion.div key={photo.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative break-inside-avoid group rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => setLightbox(i)}
                >
                  <Image src={photo.src} alt={photo.alt} width={400} height={300}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ aspectRatio: i % 3 === 0 ? "3/4" : "4/3" }} />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3"
                    style={{ background: "linear-gradient(to top, rgba(26,22,18,0.7) 0%, transparent 60%)" }}>
                    <span style={{ fontFamily: "var(--font-dm)", fontSize: "11px", color: "rgba(255,255,255,0.8)" }}>{photo.alt}</span>
                    <button onClick={e => { e.stopPropagation(); setFavourites(prev => { const n = new Set(prev); n.has(photo.id) ? n.delete(photo.id) : n.add(photo.id); return n; }); }}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                      <Heart size={14} fill={favourites.has(photo.id) ? "#B8860B" : "transparent"} style={{ color: favourites.has(photo.id) ? "#B8860B" : "#fff" }} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
              {lightbox !== null && (
                <motion.div className="fixed inset-0 z-[200] flex items-center justify-center"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ background: "rgba(26,22,18,0.96)", backdropFilter: "blur(20px)" }}
                  onClick={() => setLightbox(null)}>
                  <motion.div className="relative max-w-4xl max-h-[85vh] w-full mx-6"
                    initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
                    onClick={e => e.stopPropagation()}>
                    <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden">
                      <Image src={photos[lightbox].src} alt={photos[lightbox].alt} fill className="object-contain" sizes="90vw" />
                    </div>
                    <button onClick={() => setLightbox(null)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}>
                      <X size={16} />
                    </button>
                    <button onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}>
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}>
                      <ChevronRight size={20} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                      <span style={{ fontFamily: "var(--font-dm)", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                        {lightbox + 1} / {photos.length}
                      </span>
                      <button onClick={() => setFavourites(prev => { const n = new Set(prev); n.has(photos[lightbox].id) ? n.delete(photos[lightbox].id) : n.add(photos[lightbox].id); return n; })}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                        style={{ background: "rgba(255,255,255,0.1)", color: favourites.has(photos[lightbox].id) ? "#B8860B" : "#fff", fontFamily: "var(--font-dm)", fontSize: "12px" }}>
                        <Heart size={13} fill={favourites.has(photos[lightbox].id) ? "#B8860B" : "transparent"} />
                        {favourites.has(photos[lightbox].id) ? "Favourited" : "Add to Favourites"}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
