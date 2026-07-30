import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://corvusion-invoice.vercel.app"),

  title: {
    default: "InvoiceB2B",
    template: "%s | InvoiceB2B",
  },

  description:
    "Create professional invoices, manage reports, and streamline your business workflow with InvoiceB2B.",

  keywords: [
    "invoice",
    "invoice generator",
    "invoice pdf",
    "report",
    "business",
    "nextjs",
  ],

  authors: [
    {
      name: "Yusran",
    },
  ],

  creator: "Yusran",

  openGraph: {
    title: "InvoiceB2B",
    description: "Create professional invoices and manage reports online.",

    url: "https://corvusion-invoice.vercel.app/",

    siteName: "InvoiceB2B",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InvoiceB2B",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "InvoiceB2B",

    description: "Create professional invoices and manage reports online.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
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
