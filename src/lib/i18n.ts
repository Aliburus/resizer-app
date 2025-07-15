export type Locale = "tr" | "en";

export const defaultLocale: Locale = "tr";

export const locales: Locale[] = ["tr", "en"];

export const localeNames: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
};

export const localeFlags: Record<Locale, string> = {
  tr: "🇹🇷",
  en: "🇺🇸",
};

// Dil çevirileri
export const translations = {
  tr: {
    // Header
    appName: "Resizer Pro",
    newFile: "✨ Yeni Dosya",

    // Hero Section
    heroTitle: "Dosyalarınızı Sıkıştırın",
    heroSubtitle:
      "Resimlerinizi ve dosyalarınızı hızlıca sıkıştırın, boyutlarını küçültün ve performansı artırın",

    // File Upload
    dragDropTitle: "Dosyaları buraya sürükleyin",
    dragDropSubtitle: "veya dosya seçmek için tıklayın",
    selectFile: "📂 Dosya Seç",

    // Compression Settings
    compressionSettings: "⚙️ Sıkıştırma Ayarları",
    compressionLevel: "Sıkıştırma Seviyesi",
    highCompression: "🔴 Yüksek Sıkıştırma",
    lowCompression: "🟢 Düşük Sıkıştırma",
    compressFiles: "🚀 Dosyaları Sıkıştır",
    compressing: "Sıkıştırılıyor...",

    // File List
    selectedFiles: "📋 Seçilen Dosyalar",

    // Results
    compressionResults: "🎉 Sıkıştırma Sonuçları",
    originalSize: "Orijinal Boyut:",
    compressedSize: "Sıkıştırılmış Boyut:",
    compressionRatio: "Sıkıştırma Oranı:",
    savings: "Kazanç:",
    download: "⬇️ İndir",

    // Errors
    fileNotFound: "Dosya bulunamadı",
    tooManyFiles: "Maksimum 10 dosya yükleyebilirsiniz",
    unsupportedFileType: "Desteklenmeyen dosya türü",
    fileTooLarge: "Dosya boyutu çok büyük",
    compressionError: "Sıkıştırma hatası",
    downloadError: "Dosya indirme hatası",
    tooManyRequests: "Çok fazla istek gönderdiniz. Lütfen 1 dakika bekleyin.",
    invalidCompressionLevel: "Geçersiz sıkıştırma seviyesi",
    invalidContentType: "Geçersiz content type",
    invalidFileName: "Geçersiz dosya adı",
    invalidFilePath: "Geçersiz dosya yolu",
    fileProcessingError: "Dosya işlenirken hata oluştu",
    filesCompressedSuccessfully: "dosya başarıyla sıkıştırıldı",

    // File Types
    image: "🖼️",
    document: "📄",
  },
  en: {
    // Header
    appName: "Resizer Pro",
    newFile: "✨ New File",

    // Hero Section
    heroTitle: "Compress Your Files",
    heroSubtitle:
      "Quickly compress your images and files, reduce their size and improve performance",

    // File Upload
    dragDropTitle: "Drag files here",
    dragDropSubtitle: "or click to select files",
    selectFile: "📂 Select Files",

    // Compression Settings
    compressionSettings: "⚙️ Compression Settings",
    compressionLevel: "Compression Level",
    highCompression: "🔴 High Compression",
    lowCompression: "🟢 Low Compression",
    compressFiles: "🚀 Compress Files",
    compressing: "Compressing...",

    // File List
    selectedFiles: "📋 Selected Files",

    // Results
    compressionResults: "🎉 Compression Results",
    originalSize: "Original Size:",
    compressedSize: "Compressed Size:",
    compressionRatio: "Compression Ratio:",
    savings: "Savings:",
    download: "⬇️ Download",

    // Errors
    fileNotFound: "File not found",
    tooManyFiles: "You can upload maximum 10 files",
    unsupportedFileType: "Unsupported file type",
    fileTooLarge: "File size too large",
    compressionError: "Compression error",
    downloadError: "Download error",
    tooManyRequests: "Too many requests. Please wait 1 minute.",
    invalidCompressionLevel: "Invalid compression level",
    invalidContentType: "Invalid content type",
    invalidFileName: "Invalid file name",
    invalidFilePath: "Invalid file path",
    fileProcessingError: "Error processing file",
    filesCompressedSuccessfully: "files compressed successfully",

    // File Types
    image: "🖼️",
    document: "📄",
  },
};

export function getTranslation(locale: Locale, key: string): string {
  return (
    translations[locale][key as keyof (typeof translations)[typeof locale]] ||
    key
  );
}

export function formatFileSize(bytes: number, locale: Locale): string {
  if (bytes === 0) return locale === "tr" ? "0 Bytes" : "0 Bytes";
  const k = 1024;
  const sizes =
    locale === "tr" ? ["Bytes", "KB", "MB", "GB"] : ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
