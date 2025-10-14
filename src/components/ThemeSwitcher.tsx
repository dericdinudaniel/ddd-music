"use client";

import { useEffect, useMemo, useState, useId, useRef } from "react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Monitor,
  Loader,
  ChevronUp,
  ChevronDown,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const iconMap = {
  light: <Sun className="mr-2 size-6" />,
  dark: <Moon className="mr-2 size-6" />,
  system: <Monitor className="mr-2 size-6" />,
};

const themeOptions = [
  { key: "light", label: "Light Mode", icon: iconMap.light },
  { key: "dark", label: "Dark Mode", icon: iconMap.dark },
  { key: "system", label: "System Theme", icon: iconMap.system },
];

const chevronTransition = { duration: 0.2 };

type ThemeSwitcherProps = {
  isScrolled: boolean;
  isMobile: boolean;
  animationDuration: number;
  formationDelayDuration: number;
};

const ThemeSwitcher = ({
  isScrolled,
  isMobile,
  animationDuration,
  formationDelayDuration,
}: ThemeSwitcherProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const labelId = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const currentIcon = useMemo(() => {
    if (!mounted || !resolvedTheme) {
      return <Loader className="animate-spin" />;
    }

    // Theme mode to use as key
    const key = theme === "system" ? "system" : resolvedTheme;
    return iconMap[key as keyof typeof iconMap];
  }, [mounted, resolvedTheme, theme]);

  return (
    <>
      <div ref={dropdownRef} className="pr-2 relative">
        <motion.button
          data-cursor-generic
          aria-labelledby={labelId}
          onClick={() => setIsOpen(!isOpen)}
          animate={{
            scale: isScrolled ? (isMobile ? 0.8 : 0.9) : 1,
          }}
          transition={{
            duration: animationDuration,
            delay: formationDelayDuration,
          }}
          className="flex items-center rounded-md px-3 py-1 sm:py-2 text-foreground transition-colors duration-200 active:bg-muted/30 focus-visible:outline-none"
        >
          <span id={labelId} className="sr-only">
            Theme toggle
          </span>

          <motion.span whileTap={{ scale: 0.9 }}>{currentIcon}</motion.span>

          <div className="ml-[-5] relative size-4 min-w-[1rem] flex items-center justify-center overflow-visible">
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.span
                  key="chevron-up"
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={chevronTransition}
                  className="absolute"
                >
                  <ChevronUp className="size-4" />
                </motion.span>
              )}
              {!isOpen && (
                <motion.span
                  key="chevron-down"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={chevronTransition}
                  className="absolute"
                >
                  <ChevronDown className="size-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: "60px",
              right: "16px",
              width: "176px",
              zIndex: 60,
            }}
            className="rounded-lg bg-background border border-border shadow-lg p-1"
          >
            {themeOptions.map(({ key, label, icon }) => (
              <button
                data-cursor-generic
                data-cursor-subcursor
                key={key}
                className="w-full flex items-center justify-between p-2 rounded-md text-sm text-foreground transition-all duration-200 hover:bg-muted/20 active:bg-muted/30 focus-visible:outline-none cursor-none text-left"
                onClick={() => {
                  setTheme(key);
                  setIsOpen(false);
                }}
              >
                <span className="flex items-center select-none">
                  {icon}
                  {label}
                </span>
                {theme === key && <Check className="size-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeSwitcher;
