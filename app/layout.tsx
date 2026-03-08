import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth-context";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  params: {
    id: string;
  };
};

// Global metadata for the entire application
export const metadata: Metadata = {
  metadataBase: new URL("https://melodypass.vercel.app"),

  title: {
    default: "MelodyPass — Book Concert Tickets Seamlessly",
    template: "%s | MelodyPass",
  },

  description:
    "MelodyPass is a modern concert ticket booking platform with interactive seat selection, secure ticket verification, and real-time event discovery.",

  keywords: [
    "concert tickets",
    "event booking",
    "seat booking system",
    "ticket booking platform",
    "concert events",
    "MelodyPass",
    "music events",
  ],

  authors: [
    {
      name: "Snehashish Mishra",
    },
  ],

  creator: "Snehashish Mishra",

  openGraph: {
    title: "MelodyPass — Discover and Book Live Music Events",
    description:
      "Explore upcoming concerts, select seats interactively, and download secure QR-based tickets with MelodyPass.",

    url: "https://melodypass.vercel.app",

    siteName: "MelodyPass",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MelodyPass Concert Ticket Booking Platform",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "MelodyPass — Concert Ticket Booking Platform",
    description:
      "Discover concerts, book seats, and download QR tickets with MelodyPass.",

    images: ["og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
  },

  applicationName: "MelodyPass",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-120px)] mt-12">{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
