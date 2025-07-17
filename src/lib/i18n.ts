export type Locale = "tr" | "en" | "fr" | "zh" | "de";

export const defaultLocale: Locale = "en";

export const locales: Locale[] = ["tr", "en", "fr", "zh", "de"];

export const localeNames: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
  fr: "Français",
  zh: "中文",
  de: "Deutsch",
};

export const localeFlags: Record<Locale, string> = {
  tr: "🇹🇷",
  en: "🇺🇸",
  fr: "🇫🇷",
  zh: "🇨🇳",
  de: "🇩🇪",
};

// SEO için dil kodları
export const localeCodes: Record<Locale, string> = {
  tr: "tr-TR",
  en: "en-US",
  fr: "fr-FR",
  zh: "zh-CN",
  de: "de-DE",
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
    selectFile: "📂 Görsel Seç",

    // Compression Settings
    compressionSettings: "⚙️ Sıkıştırma Ayarları",
    compressionLevel: "Sıkıştırma Seviyesi",
    highCompression: "🔴 Yüksek Sıkıştırma",
    lowCompression: "🟢 Düşük Sıkıştırma",
    compressFiles: "🚀 Dosyaları Sıkıştır",
    compressing: "Sıkıştırılıyor...",

    // File List
    selectedFiles: "📋 Seçilen Dosyalar",
    imageIcon: "🖼️",
    selectedImage: "Seçili Görsel",
    selectedImages: "Seçili Görseller",

    // Results
    compressionResults: "🎉 Sıkıştırma Sonuçları",
    originalSize: "Orijinal Boyut:",
    compressedSize: "Sıkıştırılmış Boyut:",
    compressionRatio: "Sıkıştırma Oranı:",
    savings: "Kazanç:",
    download: "⬇️ İndir",

    // Errors
    fileNotFound: "Dosya bulunamadı",
    tooManyFiles: "Maksimum 5 dosya yükleyebilirsiniz",
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
    fileTooLargeClient: "10MB'den büyük görseller yüklenemez",

    // File Types
    image: "🖼️",
    document: "📄",
    fileTypeSelection: "📁 Dosya Türü Seçimi",
    allFiles: "🎯 Tüm Dosyalar",
    imagesOnly: "🖼️ Sadece Resimler",
    documentsOnly: "📄 Sadece Belgeler",
    jpegOptimization: "📸 JPEG Optimizasyonu",
    pngOptimization: "🖼️ PNG Optimizasyonu",
    webpConversion: "🌐 WebP Dönüştürme",
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
    imageIcon: "🖼️",
    selectedImage: "Selected Image",
    selectedImages: "Selected Images",

    // Results
    compressionResults: "🎉 Compression Results",
    originalSize: "Original Size:",
    compressedSize: "Compressed Size:",
    compressionRatio: "Compression Ratio:",
    savings: "Savings:",
    download: "⬇️ Download",

    // Errors
    fileNotFound: "File not found",
    tooManyFiles: "You can upload maximum 5 files",
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
    fileTooLargeClient: "Images larger than 10MB cannot be uploaded",

    // File Types
    image: "🖼️",
    document: "📄",
    fileTypeSelection: "📁 File Type Selection",
    allFiles: "🎯 All Files",
    imagesOnly: "🖼️ Images Only",
    documentsOnly: "📄 Documents Only",
    jpegOptimization: "📸 JPEG Optimization",
    pngOptimization: "🖼️ PNG Optimization",
    webpConversion: "🌐 WebP Conversion",
  },
  fr: {
    // Header
    appName: "Resizer Pro",
    newFile: "✨ Nouveau Fichier",

    // Hero Section
    heroTitle: "Compressez Vos Fichiers",
    heroSubtitle:
      "Compressez rapidement vos images et fichiers, réduisez leur taille et améliorez les performances",

    // File Upload
    dragDropTitle: "Glissez les fichiers ici",
    dragDropSubtitle: "ou cliquez pour sélectionner des fichiers",
    selectFile: "📂 Sélectionner des Fichiers",

    // Compression Settings
    compressionSettings: "⚙️ Paramètres de Compression",
    compressionLevel: "Niveau de Compression",
    highCompression: "🔴 Compression Élevée",
    lowCompression: "🟢 Compression Faible",
    compressFiles: "🚀 Compresser les Fichiers",
    compressing: "Compression en cours...",

    // File List
    selectedFiles: "📋 Fichiers Sélectionnés",
    imageIcon: "🖼️",
    selectedImage: "Image sélectionnée",
    selectedImages: "Images sélectionnées",

    // Results
    compressionResults: "🎉 Résultats de Compression",
    originalSize: "Taille Originale:",
    compressedSize: "Taille Compressée:",
    compressionRatio: "Ratio de Compression:",
    savings: "Économies:",
    download: "⬇️ Télécharger",

    // Errors
    fileNotFound: "Fichier non trouvé",
    tooManyFiles: "Vous pouvez télécharger maximum 5 fichiers",
    unsupportedFileType: "Type de fichier non pris en charge",
    fileTooLarge: "Fichier trop volumineux",
    compressionError: "Erreur de compression",
    downloadError: "Erreur de téléchargement",
    tooManyRequests: "Trop de requêtes. Veuillez attendre 1 minute.",
    invalidCompressionLevel: "Niveau de compression invalide",
    invalidContentType: "Type de contenu invalide",
    invalidFileName: "Nom de fichier invalide",
    invalidFilePath: "Chemin de fichier invalide",
    fileProcessingError: "Erreur lors du traitement du fichier",
    filesCompressedSuccessfully: "fichiers compressés avec succès",
    fileTooLargeClient:
      "Les images de plus de 10 Mo ne peuvent pas être téléchargées",

    // File Types
    image: "🖼️",
    document: "📄",
    fileTypeSelection: "📁 Sélection du Type de Fichier",
    allFiles: "🎯 Tous les Fichiers",
    imagesOnly: "🖼️ Images Seulement",
    documentsOnly: "📄 Documents Seulement",
    jpegOptimization: "📸 Optimisation JPEG",
    pngOptimization: "🖼️ Optimisation PNG",
    webpConversion: "🌐 Conversion WebP",
  },
  zh: {
    // Header
    appName: "Resizer Pro",
    newFile: "✨ 新文件",

    // Hero Section
    heroTitle: "压缩您的文件",
    heroSubtitle: "快速压缩您的图片和文件，减小文件大小并提高性能",

    // File Upload
    dragDropTitle: "将文件拖放到此处",
    dragDropSubtitle: "或点击选择文件",
    selectFile: "📂 选择文件",

    // Compression Settings
    compressionSettings: "⚙️ 压缩设置",
    compressionLevel: "压缩级别",
    highCompression: "🔴 高压缩",
    lowCompression: "🟢 低压缩",
    compressFiles: "🚀 压缩文件",
    compressing: "压缩中...",

    // File List
    selectedFiles: "📋 已选文件",
    imageIcon: "🖼️",
    selectedImage: "已选图片",
    selectedImages: "已选图片",

    // Results
    compressionResults: "🎉 压缩结果",
    originalSize: "原始大小:",
    compressedSize: "压缩后大小:",
    compressionRatio: "压缩比率:",
    savings: "节省:",
    download: "⬇️ 下载",

    // Errors
    fileNotFound: "文件未找到",
    tooManyFiles: "您最多可以上传5个文件",
    unsupportedFileType: "不支持的文件类型",
    fileTooLarge: "文件太大",
    compressionError: "压缩错误",
    downloadError: "下载错误",
    tooManyRequests: "请求过多。请等待1分钟。",
    invalidCompressionLevel: "无效的压缩级别",
    invalidContentType: "无效的内容类型",
    invalidFileName: "无效的文件名",
    invalidFilePath: "无效的文件路径",
    fileProcessingError: "文件处理错误",
    filesCompressedSuccessfully: "文件压缩成功",
    fileTooLargeClient: "无法上传大于10MB的图片",

    // File Types
    image: "🖼️",
    document: "📄",
    fileTypeSelection: "📁 文件类型选择",
    allFiles: "🎯 所有文件",
    imagesOnly: "🖼️ 仅图片",
    documentsOnly: "📄 仅文档",
    jpegOptimization: "📸 JPEG 优化",
    pngOptimization: "🖼️ PNG 优化",
    webpConversion: "🌐 WebP 转换",
  },
  de: {
    // Header
    appName: "Resizer Pro",
    newFile: "✨ Neue Datei",

    // Hero Section
    heroTitle: "Komprimieren Sie Ihre Dateien",
    heroSubtitle:
      "Komprimieren Sie schnell Ihre Bilder und Dateien, reduzieren Sie deren Größe und verbessern Sie die Leistung",

    // File Upload
    dragDropTitle: "Dateien hierher ziehen",
    dragDropSubtitle: "oder klicken, um Dateien auszuwählen",
    selectFile: "📂 Dateien Auswählen",

    // Compression Settings
    compressionSettings: "⚙️ Komprimierungseinstellungen",
    compressionLevel: "Komprimierungsgrad",
    highCompression: "🔴 Hohe Komprimierung",
    lowCompression: "🟢 Niedrige Komprimierung",
    compressFiles: "🚀 Dateien Komprimieren",
    compressing: "Komprimierung läuft...",

    // File List
    selectedFiles: "📋 Ausgewählte Dateien",
    imageIcon: "🖼️",
    selectedImage: "Ausgewähltes Bild",
    selectedImages: "Ausgewählte Bilder",

    // Results
    compressionResults: "🎉 Komprimierungsergebnisse",
    originalSize: "Ursprüngliche Größe:",
    compressedSize: "Komprimierte Größe:",
    compressionRatio: "Komprimierungsverhältnis:",
    savings: "Einsparungen:",
    download: "⬇️ Herunterladen",

    // Errors
    fileNotFound: "Datei nicht gefunden",
    tooManyFiles: "Sie können maximal 5 Dateien hochladen",
    unsupportedFileType: "Nicht unterstützter Dateityp",
    fileTooLarge: "Datei zu groß",
    compressionError: "Komprimierungsfehler",
    downloadError: "Downloadfehler",
    tooManyRequests: "Zu viele Anfragen. Bitte warten Sie 1 Minute.",
    invalidCompressionLevel: "Ungültiger Komprimierungsgrad",
    invalidContentType: "Ungültiger Inhaltstyp",
    invalidFileName: "Ungültiger Dateiname",
    invalidFilePath: "Ungültiger Dateipfad",
    fileProcessingError: "Fehler bei der Dateiverarbeitung",
    filesCompressedSuccessfully: "Dateien erfolgreich komprimiert",
    fileTooLargeClient: "Bilder über 10MB können nicht hochgeladen werden",

    // File Types
    image: "🖼️",
    document: "📄",
    fileTypeSelection: "📁 Dateityp-Auswahl",
    allFiles: "🎯 Alle Dateien",
    imagesOnly: "🖼️ Nur Bilder",
    documentsOnly: "📄 Nur Dokumente",
    jpegOptimization: "📸 JPEG-Optimierung",
    pngOptimization: "🖼️ PNG-Optimierung",
    webpConversion: "🌐 WebP-Konvertierung",
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
