"use client";

import { useTheme } from "next-themes";

// Hook to determine dark mode
export const useIsDarkTheme = () => {
  const { theme, resolvedTheme } = useTheme();
  return Boolean(theme?.includes("dark") || resolvedTheme?.includes("dark"));
};

