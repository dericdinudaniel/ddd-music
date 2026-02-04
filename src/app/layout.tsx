import type { Metadata } from "next";
import { JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Head from "next/head";
import Header from "@/components/Header";
import { CustomCursorProvider } from "@/components/CustomCursorProvider";
import CustomCursor from "@/components/CustomCursor";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const fonts = [jetbrainsMono.variable, instrumentSerif.variable];
const fontVariables = fonts.join(" ");

export const metadata: Metadata = {
  metadataBase: new URL("https://musicbyderic.com"),
  title: "music by deric",
  description: "music by deric",
  openGraph: {
    title: "music by deric",
    description: "music by deric",
    url: "/",
    siteName: "music by deric",
    images: [
      {
        url: "/images/shrey.jpg",
        width: 1200,
        height: 630,
        alt: "music by deric",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "music by deric",
    description: "music by deric",
    images: ["/images/shrey.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar" suppressHydrationWarning>
      <body
        className={`${fontVariables} antialiased bg-background overscroll-y-auto sm:overscroll-y-none scroll-smooth`}
      >
        <ThemeProvider enableSystem={true} disableTransitionOnChange={true}>
          <CustomCursorProvider>
            <CustomCursor />
            <Header />
            {children}
          </CustomCursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
