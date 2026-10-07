"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

interface CustomCursorContextType {
  isCursorVisible: boolean;
  customCursorNoneTW: string;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}

const CustomCursorContext = createContext<CustomCursorContextType | undefined>(
  undefined
);

const subscribeResize = (callback: () => void) => {
  window.addEventListener("resize", callback, { passive: true });
  return () => window.removeEventListener("resize", callback);
};

const getIsDesktop = () => {
  if (typeof navigator === "undefined") return false;
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileDevice =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent
    );
  return !isMobileDevice;
};

const getServerSnapshot = () => false;

export function CustomCursorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = React.useSyncExternalStore(
    subscribeResize,
    getIsDesktop,
    getServerSnapshot
  );
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Memoize derived values with stable references
  const isCursorVisible = useMemo(() => isDesktop, [isDesktop]);

  const customCursorNoneTW = useMemo(
    () => (isCursorVisible ? "cursor-none" : ""),
    [isCursorVisible]
  );

  // Memoize context value with stable references
  const contextValue = useMemo(
    () => ({
      isCursorVisible,
      customCursorNoneTW,
      sectionRef,
    }),
    [isCursorVisible, customCursorNoneTW]
  );

  return (
    <CustomCursorContext.Provider value={contextValue}>
      {children}
    </CustomCursorContext.Provider>
  );
}

// Memoize the hook to prevent unnecessary re-renders
export const useCustomCursor = (() => {
  const context = useContext(CustomCursorContext);
  if (context === undefined) {
    throw new Error(
      "useCustomCursor must be used within a CustomCursorProvider"
    );
  }
  return context;
}) as () => CustomCursorContextType;
