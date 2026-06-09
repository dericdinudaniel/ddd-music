import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EPK — DDD",
  description:
    "Electronic Press Kit for DDD — electronic music producer and DJ specializing in house, techno, and trance.",
};

export default function EPKLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
