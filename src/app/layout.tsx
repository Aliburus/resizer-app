import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resizer Pro - Online Image Converter & Compressor (JPEG, PNG, WebP)",
  description:
    "Convert and compress your images to JPEG, PNG, or WebP instantly. Modern, secure, multi-language, and SEO-optimized file converter. Reduce file size, change format, and keep quality.",
  keywords: [
    "image converter",
    "jpeg converter",
    "png converter",
    "webp converter",
    "image compression",
    "online compressor",
    "file format conversion",
    "modern image tool",
    "multi-language",
    "SEO optimized",
    "free image converter",
    "secure file conversion",
    "webp to jpeg",
    "png to jpeg",
    "jpeg to webp",
    "image optimizer",
    "file optimizer",
  ],
  authors: [{ name: "Resizer Pro Team" }],
  creator: "Resizer Pro",
  publisher: "Resizer Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://resizer-pro.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "tr-TR": "/tr",
      "fr-FR": "/fr",
      "zh-CN": "/zh",
      "de-DE": "/de",
    },
  },
  openGraph: {
    title:
      "Resizer Pro - Online Image Converter & Compressor (JPEG, PNG, WebP)",
    description:
      "Convert and compress your images to JPEG, PNG, or WebP instantly. Modern, secure, multi-language, and SEO-optimized file converter.",
    url: "https://resizer-pro.vercel.app",
    siteName: "Resizer Pro",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resizer Pro - Online Image Converter & Compressor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Resizer Pro - Online Image Converter & Compressor (JPEG, PNG, WebP)",
    description:
      "Convert and compress your images to JPEG, PNG, or WebP instantly. Modern, secure, multi-language, and SEO-optimized file converter.",
    images: ["/og-image.png"],
    creator: "@resizerpro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Resizer Pro" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        {/* Google AdSense Doğrulama */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2671030595283126"
          crossOrigin="anonymous"
        />

        {/* Hreflang tags for multilingual SEO */}
        <link
          rel="alternate"
          hrefLang="en"
          href="https://resizer-pro.vercel.app/en"
        />
        <link
          rel="alternate"
          hrefLang="tr"
          href="https://resizer-pro.vercel.app/tr"
        />
        <link
          rel="alternate"
          hrefLang="fr"
          href="https://resizer-pro.vercel.app/fr"
        />
        <link
          rel="alternate"
          hrefLang="zh"
          href="https://resizer-pro.vercel.app/zh"
        />
        <link
          rel="alternate"
          hrefLang="de"
          href="https://resizer-pro.vercel.app/de"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://resizer-pro.vercel.app"
        />

        {/* Language-specific meta tags */}
        <meta name="language" content="English" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="geo.position" content="37.0902;-95.7129" />
        <meta name="ICBM" content="37.0902, -95.7129" />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
