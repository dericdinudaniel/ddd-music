"use client";

import Link from "next/link";
import { motion } from "motion/react";
import React from "react";
import { LucideIcon } from "lucide-react";
import Image from "next/image";

interface LinkCardProps {
  title: string;
  url: string;
  icon?: LucideIcon;
  image?: string;
  description?: string;
}

const LinkCard = ({
  title,
  url,
  icon: Icon,
  image,
  description,
}: LinkCardProps) => {
  return (
    <motion.div className="w-full max-w-xl">
      <Link
        href={url}
        target={url.startsWith("http") ? "_blank" : "_self"}
        rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
        data-cursor-generic
        data-cursor-subcursor
        className="block w-full bg-[var(--pill)] backdrop-blur-md border border-[var(--border)] shadow-[var(--shadow)] rounded-lg py-1 px-1 md:py-2 sm:px-3 transition-colors group"
      >
        <div className="flex items-center gap-2">
          {image ? (
            <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 shadow-sm border border-black/10 dark:border-white/10 hover:scale-105 transition-transform duration-300">
              <Image
                src={image}
                alt={title}
                fill
                sizes="80px"
                className="object-cover select-none"
              />
            </div>
          ) : Icon ? (
            <div className="text-foreground/80 flex-shrink-0 ml-3">
              <Icon className="w-6 h-6" />
            </div>
          ) : null}
          <div className="flex-1 text-center items-center justify-center px-1">
            <h3
              className="inline-block text-sm sm:text-lg font-semibold text-foreground underline-fade"
              data-text-cursor
            >
              {title}
            </h3>
            {description && (
              <p
                className="text-xs sm:text-sm text-muted-foreground"
                data-text-cursor
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default LinkCard;
