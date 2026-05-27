import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EPK — deric",
  description:
    "Electronic Press Kit for deric — electronic music producer and DJ specializing in house, techno, and trance.",
};

export default function EPKLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
