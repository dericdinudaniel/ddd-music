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
  title: "Deric Dinu Daniel",
  description: "Built by Deric",
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
