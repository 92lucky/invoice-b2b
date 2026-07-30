import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  metadataBase: new URL("https://domainmu.com"),

  title: {
    default: "Corvusion",
    template: "%s | Corvusion",
  },

  description: "Internal management platform for LPG agents.",

  keywords: [
    "invoice",
    "invoice generator",
    "internal management",
    "lpg",
    "dashboard",
    "nextjs",
  ],

  authors: [
    {
      name: "Yusran",
    },
  ],

  creator: "Yusran",

  openGraph: {
    title: "Corvusion",
    description: "Internal management platform for LPG agents.",

    type: "website",

    locale: "id_ID",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InvoiceB2B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
