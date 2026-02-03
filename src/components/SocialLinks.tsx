"use client";

import React, { useState } from "react";
import { Instagram } from "lucide-react";
import { SlideFadeIn } from "./SlideFadeIn";
import Link from "next/link";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const TikTok = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SoundCloud = ({ className }: { className?: string }) => (
  <div className={twMerge(className, "size-8 md:size-8 xl:size-10")}>
    <Image
      src="/icons/soundcloud-black.png"
      alt="SoundCloud"
      fill
      className="object-contain block dark:hidden"
      unoptimized
    />
    <Image
      src="/icons/soundcloud-white.png"
      alt="SoundCloud"
      fill
      className="object-contain hidden dark:block"
      unoptimized
    />
  </div>
);

const socials = [
  {
    name: "Instagram",
    icon: Instagram,
    link: "https://instagram.com/musicbyderic",
  },
  {
    name: "TikTok",
    icon: TikTok,
    link: "https://tiktok.com/@musicbyderic",
  },
  {
    name: "SoundCloud",
    icon: SoundCloud,
    link: "https://soundcloud.com/musicbyderic",
  },
] as const;

type Social = (typeof socials)[number];

const SocialLinkItem = ({ name, icon: Icon, link }: Social) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-tooltip-hover={hovered}
      data-tooltip-name={name}
    >
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
      >
        <Icon className="size-7 md:size-7 xl:size-8 hover:scale-115 hover:rotate-1 transition-transform duration-290" />
      </Link>
    </div>
  );
};

const SocialLinks = () => {
  return (
    <div className="flex gap-x-8 items-center">
      {socials.map((social, index) => (
        <SlideFadeIn
          key={social.name}
          slideOffset={20}
          delay={(socials.length - index) * 0.06}
        >
          <SocialLinkItem {...social} />
        </SlideFadeIn>
      ))}
    </div>
  );
};

export default SocialLinks;
