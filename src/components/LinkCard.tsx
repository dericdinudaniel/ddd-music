"use client";

import Link from "next/link";
import { motion } from "motion/react";
import React from "react";
import { LucideIcon } from "lucide-react";

interface LinkCardProps {
  title: string;
  url: string;
  icon?: LucideIcon;
  description?: string;
}

const LinkCard = ({ title, url, icon: Icon, description }: LinkCardProps) => {
  return (
    <motion.div className="w-full max-w-md">
      <Link
        href={url}
        target={url.startsWith("http") ? "_blank" : "_self"}
        rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
        data-cursor-generic
        data-cursor-subcursor
        className="block w-full bg-[var(--pill)] backdrop-blur-md border border-[var(--border)] shadow-[var(--shadow)] rounded-lg py-4 px-6 transition-colors group"
      >
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="text-foreground/80">
              <Icon className="w-6 h-6" />
            </div>
          )}
          <div className="flex-1 text-center items-center justify-center">
            <h3
              className="text-base sm:text-lg font-semibold text-foreground"
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
          {/* Spacer to balance icon if present, specifically for centered text */}
          {Icon && <div className="w-6" />}
        </div>
      </Link>
    </motion.div>
  );
};

export default LinkCard;
