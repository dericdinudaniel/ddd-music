"use client";

import Background from "@/components/Background";
import LinkCard from "@/components/LinkCard";
import SocialLinks from "@/components/SocialLinks";
import { SlideFadeIn } from "@/components/SlideFadeIn";
import { Music, Code, PenTool, User } from "lucide-react";
import Image from "next/image";

const links = [
  {
    title: "first link",
    url: "https://example.com",
    icon: Music,
    description: "a description",
  },
  {
    title: "second link",
    url: "https://example.com",
    icon: PenTool,
    description: "a description",
  },
  {
    title: "third link",
    url: "https://example.com",
    icon: User,
    description: "a description",
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen relative w-full overflow-hidden flex flex-col items-center justify-center">
      <Background className="flex items-center justify-center w-full h-full">
        <div className="z-10 w-full max-w-2xl px-4 py-20 flex flex-col items-center gap-5 h-full overflow-y-auto no-scrollbar">
          {/* Profile Section */}
          <div className="flex flex-col items-center gap-4 text-center mt-10">
            {/* Placeholder for Profile Pic - using div for now or could use an icon if no image */}
            <SlideFadeIn delay={0.1} direction="left" inMargin="0px">
              <div className="relative w-28 h-28 rounded-full border-2 border-[var(--border)] shadow-lg overflow-hidden">
                <Image
                  src="/images/rooftop.jpg"
                  alt="Profile Picture"
                  fill
                  className="object-cover scale-[3.0] object-[center_28%] -translate-x-5"
                  priority
                  unoptimized
                />
              </div>
            </SlideFadeIn>

            <div className="">
              <SlideFadeIn delay={0.2} direction="left">
                <h1
                  className="text-4xl md:text-5xl font-semibold font-header tracking-wide"
                  data-text-cursor
                >
                  music by deric
                </h1>
              </SlideFadeIn>
            </div>
          </div>

          <SlideFadeIn delay={0.25} direction="left">
            <SocialLinks />
          </SlideFadeIn>

          {/* Links Section */}
          <div className="w-full flex flex-col items-center gap-4 mt-4">
            {links.map((link, index) => (
              <SlideFadeIn
                key={link.title}
                delay={0.3 + index * 0.1}
                direction={"left"}
                className="w-full flex justify-center"
              >
                <LinkCard {...link} />
              </SlideFadeIn>
            ))}
          </div>
        </div>
      </Background>
    </div>
  );
}
