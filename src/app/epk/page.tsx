"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useEffect, useState, type ReactNode } from "react";
import {
  Instagram,
  ChevronDown,
  ExternalLink,
  Mail,
  Download,
  Music,
} from "lucide-react";

// ── EPK Palette ─────────────────────────────────────────────────────
const C = {
  base: "#0A0A0A",
  surface: "#111111",
  text: "#F5F0E8",
  accent: "#C9A96E",
  cool: "#4A7B7B",
  muted: "#6B6B6B",
  border: "#1E1E1E",
};

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── Data ────────────────────────────────────────────────────────────
const GENRES = ["house", "techno", "trance"];

const RELEASES = [
  {
    title: "mix by DDD // session 1",
    image: "/images/covers/deric-session-1.jpg",
    url: "https://soundcloud.com/musicbyddd/mix-by-ddd-session-1",
    type: "Mix",
  },
  {
    title: "Dua Lipa - Illusion (deric Remix)",
    image: "/images/covers/dua-lipa_illusion_deric-remix.png",
    url: "https://soundcloud.com/musicbyddd/dua-lipa-illusion-deric-remix",
    type: "Remix",
  },
];

type GalleryImage = {
  src: string;
  alt: string;
  gridClass: string;
  sizes?: string;
  quality?: number;
  objectClass?: string;
  framingClass?: string;
  cropBottom?: boolean;
};

const GALLERY: GalleryImage[] = [
  {
    src: "/images/profile/boat.jpg",
    alt: "ddd — boat party set",
    gridClass: "col-span-2 row-span-2 md:col-span-7",
    sizes: "(max-width: 768px) 100vw, 60vw",
    quality: 90,
    objectClass: "object-[center_78%]",
  },
  {
    src: "/images/profile/shrey2.jpg",
    alt: "ddd — late night session",
    gridClass: "md:col-span-5",
    sizes: "(max-width: 768px) 50vw, 44vw",
    quality: 90,
    objectClass: "object-[center_64%]",
  },
  {
    src: "/images/profile/shrey.jpg",
    alt: "ddd performing live — rooftop set",
    gridClass: "md:col-span-5",
    sizes: "(max-width: 768px) 50vw, 44vw",
    quality: 90,
    objectClass: "object-[center_68%]",
  },
  {
    src: "/images/profile/rooftop.jpg",
    alt: "ddd — rooftop DJ set, San Francisco",
    gridClass: "col-span-1 md:col-span-6 row-span-2",
    sizes: "(max-width: 768px) 50vw, 65vw",
    quality: 90,
    objectClass: "object-[90%_45%]",
    framingClass: "origin-[90%_45%] scale-[1.2]",
    cropBottom: true,
  },
  {
    src: "/images/profile/sybil.jpeg",
    alt: "ddd — sybil",
    gridClass: "col-span-1 md:col-span-6 row-span-2",
    sizes: "(max-width: 768px) 50vw, 52vw",
    quality: 90,
    cropBottom: true,
  },
];

const SOCIALS = [
  { name: "Instagram", url: "https://instagram.com/musicbyddd" },
  { name: "TikTok", url: "https://tiktok.com/@musicbyddd" },
  { name: "SoundCloud", url: "https://soundcloud.com/musicbyddd" },
];

// ── Icons ───────────────────────────────────────────────────────────
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function SocialIcon({ name, size = 18 }: { name: string; size?: number }) {
  switch (name) {
    case "Instagram":
      return <Instagram size={size} />;
    case "TikTok":
      return <TikTokIcon size={size} />;
    case "SoundCloud":
      return <Music size={size} />;
    default:
      return null;
  }
}

// ── Reveal animation ────────────────────────────────────────────────
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Section label ───────────────────────────────────────────────────
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-12 md:mb-16">
      <span
        className="font-mono font-bold text-xs md:text-sm tracking-[.3em] uppercase shrink-0"
        style={{ color: C.accent }}
      >
        {children}
      </span>
      <div
        className="flex-1 h-px"
        style={{
          background: `linear-gradient(90deg, ${C.accent}40, transparent)`,
        }}
      />
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
// PAGE
// ═════════════════════════════════════════════════════════════════════
export default function EPKPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollSnapType = "none";
    return () => {
      document.documentElement.style.scrollSnapType = "";
    };
  }, []);

  async function downloadPressKit() {
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloadError(false);

    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      await Promise.all(
        GALLERY.map(async (img, i) => {
          const res = await fetch(img.src);
          if (!res.ok) throw new Error(`Failed to fetch ${img.src}`);
          const blob = await res.blob();
          const ext = img.src.split(".").pop()!;
          zip.file(`${String(i + 1).padStart(2, "0")}.${ext}`, blob);
        }),
      );

      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ddd-press-kit.zip";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Press kit download failed:", err);
      setDownloadError(true);
      setTimeout(() => setDownloadError(false), 3000);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div
      className="min-h-screen font-mono"
      style={{
        background: C.base,
        color: C.text,
      }}
    >
      {/* ── Film Grain Overlay ───────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none z-[40]"
        style={{
          backgroundImage: GRAIN_SVG,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          opacity: 0.035,
          mixBlendMode: "overlay",
        }}
      />

      {/* ═══════════════════════════════════════════════ */}
      {/* HERO                                           */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden flex flex-col justify-end"
      >
        <motion.div className="absolute inset-[-4%]" style={{ y: heroImageY }}>
          <Image
            src="/images/profile/shrey.jpg"
            alt="DDD performing live"
            fill
            className="object-cover object-[center_68%]"
            priority
            quality={90}
            sizes="100vw"
          />
        </motion.div>

        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              ${C.base}99 0%,
              transparent 30%,
              transparent 45%,
              ${C.base}B3 70%,
              ${C.base} 100%
            )`,
          }}
        />

        <motion.div
          className="relative z-10 px-6 md:px-16 lg:px-24 pb-16 md:pb-24"
          style={{ opacity: heroOpacity }}
        >
          <div className="flex w-fit flex-col items-start">
            <motion.h1
              initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-none w-fit font-header text-[20vw] md:text-[14vw] lg:text-[11vw] leading-[0.85] tracking-[-0.02em]"
              style={{
                textShadow: `0 0 80px ${C.accent}30`,
              }}
            >
              <span className="pointer-events-auto" data-text-cursor>
                DDD
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="relative z-10 mt-4 md:mt-6 w-fit text-xs md:text-sm lg:text-base xl:text-xl tracking-[.2em] uppercase"
              style={{ color: C.muted }}
              data-text-cursor
            >
              electronic musician
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-wrap justify-center gap-3 mt-5 md:mt-6"
            >
              {GENRES.map((g) => (
                <span
                  key={g}
                  data-cursor-generic
                  className="px-3.5 py-1 text-[10px] md:text-xs tracking-[.2em] uppercase rounded-full"
                  style={{
                    background: C.accent,
                    color: C.base,
                  }}
                >
                  {g}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} style={{ color: C.muted }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* ABOUT                                          */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-24 py-24 md:py-32 lg:py-40">
        <Reveal>
          <SectionLabel>About</SectionLabel>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="relative aspect-[5/5] overflow-hidden rounded-sm">
              <Image
                src="/images/profile/shrey2.jpg"
                alt="ddd — late night session"
                fill
                className="object-cover object-[center_60%]"
                quality={90}
                sizes="(max-width: 1024px) 90vw, 42vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${C.base}90, transparent 40%)`,
                }}
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7 flex flex-col gap-8">
            <Reveal delay={0.2}>
              <blockquote
                className="text-2xl md:text-3xl lg:text-[2.5rem] leading-snug"
                style={{
                  borderLeft: `3px solid ${C.accent}`,
                  paddingLeft: "1.5rem",
                }}
              >
                music by DDD:
              </blockquote>
            </Reveal>

            <Reveal delay={0.3}>
              <div
                className="space-y-5 text-sm md:text-[15px] leading-[1.8]"
                style={{ color: C.muted }}
              >
                <p>
                  <span className="font-bold">DDD</span> is a music producer and
                  DJ purely focused on electronic music - especially house,
                  techno, and trance. DDD is currently based in{" "}
                  <span className="font-bold">San Francisco, CA</span>.
                </p>
                <p>
                  From intimate rooftop sessions overlooking San Francisco to
                  boat parties under the Golden Gate Bridge, DDD crafts
                  immersive sets that take listeners on a journey.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* MUSIC                                          */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="px-6 md:px-16 lg:px-24 py-24 md:py-32"
        style={{ background: C.surface }}
      >
        <Reveal>
          <SectionLabel>Music</SectionLabel>
        </Reveal>

        <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 md:gap-6 max-w-3xl mx-auto">
          {RELEASES.map((release) => (
            <Link
              key={release.title}
              href={release.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div
                data-cursor-generic
                className="flex overflow-hidden rounded-sm font-mono transition-shadow duration-500 group-hover:shadow-[0_8px_40px_rgba(201,169,110,0.12)] sm:flex-col"
                style={{ border: `1px solid ${C.border}` }}
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden sm:h-auto sm:w-full sm:aspect-square">
                  <Image
                    src={release.image}
                    alt={release.title}
                    width={512}
                    height={512}
                    quality={90}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:aspect-square sm:h-auto"
                    sizes="(max-width: 640px) 80px, (max-width: 768px) 45vw, 320px"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to top, ${C.base}DD, transparent)`,
                    }}
                  />
                </div>

                <div
                  className="flex min-w-0 flex-1 flex-col justify-center p-3 sm:p-4 md:p-5"
                  style={{ background: C.surface }}
                >
                  <span
                    className="text-[9px] sm:text-[10px] tracking-[.2em] uppercase"
                    style={{ color: C.accent }}
                  >
                    {release.type}
                  </span>
                  <h3 className="font-mono mt-0.5 sm:mt-1 text-xs sm:text-base leading-tight line-clamp-2 md:min-h-[3.25rem] md:text-lg">
                    {release.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* GALLERY                                        */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="px-6 md:px-16 lg:px-24 py-24 md:py-32 lg:py-40">
        <Reveal>
          <SectionLabel>Gallery</SectionLabel>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-3 grid-rows-[220px_220px_200px_200px] md:grid-rows-[320px_320px_280px_280px] lg:grid-rows-[400px_400px_340px_340px]">
          {GALLERY.map((img, i) => (
            <Reveal
              key={img.src}
              className={img.gridClass}
              delay={0.05 + i * 0.1}
            >
              <div className="group relative w-full h-full overflow-hidden rounded-sm">
                <div
                  className={`absolute inset-x-0 top-0 transition-transform duration-700 group-hover:scale-105${img.cropBottom ? " h-[105.26%] origin-[50%_47.5%]" : " inset-0 h-full origin-center"}`}
                >
                  <div
                    className={`absolute inset-0${img.framingClass ? ` ${img.framingClass}` : ""}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      quality={img.quality ?? 90}
                      className={`object-cover${img.objectClass ? ` ${img.objectClass}` : ""}`}
                      sizes={img.sizes ?? "(max-width: 768px) 50vw, 33vw"}
                    />
                  </div>
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to top, ${C.accent}15, transparent)`,
                  }}
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 md:mt-16 flex justify-center">
            <button
              type="button"
              onClick={downloadPressKit}
              disabled={isDownloading}
              className="group flex items-center gap-3 px-8 py-3.5 text-[11px] tracking-[.2em] uppercase rounded-full transition-all duration-300 hover:scale-[1.03] disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
              style={{
                border: `1px solid ${C.accent}60`,
                color: C.accent,
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isDownloading) {
                  e.currentTarget.style.background = `${C.accent}15`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
              data-cursor-generic
            >
              <Download
                size={14}
                className={`transition-transform duration-300 ${isDownloading ? "animate-spin" : "group-hover:-translate-y-0.5"}`}
              />
              {isDownloading
                ? "Preparing…"
                : downloadError
                  ? "Download failed — try again"
                  : "Download Press Kit"}
            </button>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* CONTACT                                        */}
      {/* ═══════════════════════════════════════════════ */}
      <section
        className="font-mono px-6 md:px-16 lg:px-24 py-24 md:py-32"
        style={{ background: C.surface, borderTop: `1px solid ${C.border}` }}
      >
        <Reveal>
          <SectionLabel>Booking & Contact</SectionLabel>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <Reveal delay={0.1}>
            <div className="space-y-8">
              <div>
                <h3
                  className="font-mono text-[10px] md:text-xs tracking-[.25em] uppercase mb-3"
                  style={{ color: C.accent }}
                >
                  Booking Inquiries
                </h3>
                <a
                  href="mailto:booking@musicbyddd.com"
                  className="group flex w-full items-center transition-opacity duration-300 hover:opacity-70"
                >
                  <span
                    data-cursor-generic
                    className="inline-flex items-center gap-3 px-2 py-1 text-base md:text-lg"
                  >
                    <Mail size={16} style={{ color: C.accent }} />
                    booking@musicbyddd.com
                  </span>
                </a>
              </div>

              <div className="h-px" style={{ background: `${C.accent}25` }} />

              <div>
                <h3
                  className="font-mono text-[10px] md:text-xs tracking-[.25em] uppercase mb-3"
                  style={{ color: C.accent }}
                >
                  General Inquiries
                </h3>
                <a
                  href="mailto:hello@musicbyddd.com"
                  className="group flex w-full items-center transition-opacity duration-300 hover:opacity-70"
                >
                  <span
                    data-cursor-generic
                    className="inline-flex items-center gap-3 px-2 py-1 text-base md:text-lg"
                  >
                    <Mail size={16} style={{ color: C.accent }} />
                    hello@musicbyddd.com
                  </span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <h3
                className="font-mono text-[10px] md:text-xs tracking-[.25em] uppercase mb-6"
                style={{ color: C.accent }}
              >
                Connect
              </h3>
              <div className="flex flex-col gap-3">
                {SOCIALS.map((s) => (
                  <Link
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-generic
                    className="inline-flex w-fit items-center gap-3 px-2 py-1 transition-opacity duration-300 hover:opacity-70"
                  >
                    <span style={{ color: C.muted }}>
                      <SocialIcon name={s.name} size={18} />
                    </span>
                    <span className="text-base md:text-lg">{s.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div
            className="font-mono mt-24 md:mt-32 pt-8 text-center"
            style={{ borderTop: `1px solid ${C.border}` }}
          >
            <p
              className="font-mono text-[10px] md:text-xs tracking-[.15em] uppercase"
              style={{ color: C.muted }}
            >
              &copy; {new Date().getFullYear()} DDD. All rights reserved.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
