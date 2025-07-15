"use client";

import { useEffect } from "react";

interface AdSenseProps {
  adSlot: string;
  adFormat?: "auto" | "fluid";
  style?: React.CSSProperties;
  className?: string;
  fullWidthResponsive?: boolean;
}

export default function AdSense({
  adSlot,
  adFormat = "auto",
  style = {},
  className = "",
  fullWidthResponsive = true,
}: AdSenseProps) {
  useEffect(() => {
    try {
      // AdSense yüklendiyse reklamları göster
      if (typeof window !== "undefined" && (window as any).adsbygoogle) {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID) {
    return null;
  }

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}

// Önceden tanımlanmış reklam boyutları
export const AdBanner = () => (
  <AdSense
    adSlot="1234567890"
    className="w-full h-90 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center"
    style={{ minHeight: "90px" }}
  />
);

export const AdSidebar = () => (
  <AdSense
    adSlot="0987654321"
    className="w-full h-600 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center"
    style={{ minHeight: "600px" }}
  />
);

export const AdContent = () => (
  <AdSense
    adSlot="1122334455"
    className="w-full h-250 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center my-4"
    style={{ minHeight: "250px" }}
  />
);
