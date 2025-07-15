import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://resizer-pro.vercel.app";
  const languages = ["en", "tr", "fr", "zh", "de"];

  const sitemapEntries = [
    // Ana sayfa (tüm diller)
    ...languages.map((lang) => ({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    })),

    // Ana sayfa (varsayılan)
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },

    // API endpoint
    {
      url: `${baseUrl}/api/compress`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },

    // Özellik sayfaları (gelecekte eklenebilir)
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  return sitemapEntries;
}
