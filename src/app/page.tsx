"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import {
  getTranslation,
  formatFileSize,
  type Locale,
  locales,
  localeNames,
  localeFlags,
  defaultLocale,
} from "@/lib/i18n";

interface FileInfo {
  name: string;
  size: number;
  type: string;
  file: File;
}

interface CompressedFile {
  originalName: string;
  compressedName: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  base64Data: string;
}

export default function Home() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [compressionLevel, setCompressionLevel] = useState(80);
  const [selectedFileType, setSelectedFileType] = useState<string>("");
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressedFiles, setCompressedFiles] = useState<CompressedFile[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dosya türüne göre özel sıkıştırma ayarları
  const getCompressionSettings = (fileType: string) => {
    switch (fileType) {
      case "jpeg":
        return { min: 10, max: 100, default: 85, step: 5 };
      case "png":
        return { min: 10, max: 100, default: 90, step: 5 };
      case "webp":
        return { min: 10, max: 100, default: 80, step: 5 };
      case "documents":
        return { min: 10, max: 100, default: 70, step: 10 };
      default:
        return { min: 10, max: 100, default: 80, step: 5 };
    }
  };

  useEffect(() => {
    setMounted(true);
    // Local storage'dan dil tercihini al
    const savedLocale = localStorage.getItem("locale") as Locale;
    if (savedLocale && locales.includes(savedLocale)) {
      setLocale(savedLocale);
    }

    // Structured Data ekle
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Resizer Pro",
      description:
        "Free online file compression tool. Compress images and documents with advanced algorithms.",
      url: "https://resizer-pro.vercel.app",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Image compression (JPEG, PNG, WebP, GIF)",
        "Document compression (PDF, DOC, DOCX, TXT)",
        "Batch processing",
        "Quality control",
        "Dark/Light mode",
        "Multi-language support",
      ],
      author: {
        "@type": "Organization",
        name: "Resizer Pro Team",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Seçilen dosya türüne göre sıkıştırma seviyesini güncelle
  useEffect(() => {
    const settings = getCompressionSettings(selectedFileType);
    setCompressionLevel(settings.default);
  }, [selectedFileType]);

  if (!mounted) {
    return null;
  }

  const t = (key: string) => getTranslation(locale, key);

  // Dosya türü seçenekleri (sadece çıktı formatı)
  const fileTypeOptions = [
    { value: "jpeg", label: t("jpegOptimization"), icon: "��" },
    { value: "jpg", label: "JPG", icon: "🖼️" },
    { value: "png", label: t("pngOptimization"), icon: "🖼️" },
    { value: "webp", label: t("webpConversion"), icon: "🌐" },
  ];

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
    setShowLanguageMenu(false);
  };

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: FileInfo[] = Array.from(selectedFiles).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCompress = async () => {
    if (files.length === 0) return;
    if (!selectedFileType) {
      alert("Lütfen bir çıktı formatı seçin (jpeg, jpg, png veya webp)");
      return;
    }

    setIsCompressing(true);
    setShowResults(false);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file.file);
      });
      formData.append("compressionLevel", compressionLevel.toString());
      formData.append("fileType", selectedFileType);

      const response = await fetch("/api/compress", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setCompressedFiles(result.files);
        setShowResults(true);
        setFiles([]);
      } else {
        alert(t("compressionError") + ": " + result.error);
      }
    } catch (error) {
      console.error("Sıkıştırma hatası:", error);
      alert(t("compressionError"));
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = (compressedFile: CompressedFile) => {
    try {
      // Base64'ten blob oluştur
      const byteCharacters = atob(compressedFile.base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/octet-stream" });

      // Download link oluştur
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = compressedFile.compressedName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("İndirme hatası:", error);
      alert(t("downloadError"));
    }
  };

  const resetApp = () => {
    setFiles([]);
    setCompressedFiles([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      {/* Header */}
      <header className="backdrop-blur-md bg-overlay border-b border-custom sticky top-0 z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <h1 className="text-2xl font-bold text-gradient">
                {t("appName")}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {showResults && (
                <button
                  onClick={resetApp}
                  className="px-6 py-2.5 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium rounded-xl transition-all duration-300 shadow-custom hover:shadow-custom-hover transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {t("newFile")}
                </button>
              )}

              {/* Dil Seçici */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="px-4 py-3 rounded-xl bg-overlay hover:bg-card transition-all duration-300 shadow-custom hover:shadow-custom-hover backdrop-blur-sm border border-custom flex items-center justify-center space-x-2 hover:scale-105 min-w-[100px]"
                >
                  <span className="text-xl">{localeFlags[locale]}</span>
                  <span className="text-sm font-medium text-primary whitespace-nowrap">
                    {localeNames[locale]}
                  </span>
                  <svg
                    className={`w-4 h-4 text-primary transition-transform duration-300 ${
                      showLanguageMenu ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showLanguageMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-card rounded-xl shadow-custom-hover border border-custom backdrop-blur-sm z-50 transition-all duration-300 overflow-hidden">
                    {locales.map((lang, index) => (
                      <button
                        key={lang}
                        onClick={() => changeLocale(lang)}
                        className={`w-full px-4 py-3 text-left hover:bg-muted transition-all duration-200 flex items-center justify-between ${
                          locale === lang ? "bg-accent" : ""
                        } ${index === 0 ? "rounded-t-xl" : ""} ${
                          index === locales.length - 1 ? "rounded-b-xl" : ""
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{localeFlags[lang]}</span>
                          <span className="font-medium text-primary">
                            {localeNames[lang]}
                          </span>
                        </div>
                        {locale === lang && (
                          <svg
                            className="w-4 h-4 text-primary"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tema Değiştirici */}
              <button
                onClick={toggleTheme}
                className="p-3 rounded-xl bg-overlay hover:bg-card transition-all duration-300 shadow-custom hover:shadow-custom-hover backdrop-blur-sm border border-custom hover:scale-105 group"
                aria-label={
                  resolvedTheme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                <div className="relative w-6 h-6">
                  {/* Güneş ikonu */}
                  <svg
                    className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
                      resolvedTheme === "dark"
                        ? "opacity-100 rotate-0 text-yellow-500"
                        : "opacity-0 -rotate-90 text-yellow-500"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                  </svg>
                  {/* Ay ikonu */}
                  <svg
                    className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
                      resolvedTheme === "light"
                        ? "opacity-100 rotate-0 text-blue-400"
                        : "opacity-0 rotate-90 text-blue-400"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showResults ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 transition-colors duration-500">
                {t("heroTitle")
                  .split(" ")
                  .map((word, index) =>
                    index === 0 ? (
                      <span key={index}>{word} </span>
                    ) : (
                      <span key={index} className="text-gradient">
                        {word}
                      </span>
                    )
                  )}
              </h2>
              <p className="text-xl text-secondary max-w-2xl mx-auto transition-colors duration-500">
                {t("heroSubtitle")}
              </p>
            </div>

            {/* Dosya Yükleme Alanı */}
            <div className="mb-12">
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-500 ${
                  isDragging
                    ? "border-primary bg-gradient-light scale-105"
                    : "border-custom hover:border-primary hover:bg-muted"
                } backdrop-blur-sm bg-overlay`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="space-y-6">
                  <div className="text-8xl animate-bounce">📁</div>
                  <div>
                    <h3 className="text-2xl font-semibold text-primary mb-2 transition-colors duration-500">
                      {t("dragDropTitle")}
                    </h3>
                    <p className="text-secondary text-lg transition-colors duration-500">
                      {t("dragDropSubtitle")}
                    </p>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`px-8 py-4 font-semibold rounded-xl transition-all duration-300 shadow-custom hover:shadow-custom-hover transform hover:-translate-y-1 active:translate-y-0 ${
                      files.length > 0
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                        : "bg-gradient-primary hover:from-blue-600 hover:to-purple-700 text-white"
                    }`}
                  >
                    {files.length > 0 ? (
                      <span className="flex items-center space-x-2">
                        <span>✓</span>
                        <span>Selected ({files.length})</span>
                      </span>
                    ) : (
                      t("selectFile")
                    )}
                  </button>
                </div>

                {/* Arka plan dekoratif elementler */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-3 h-3 bg-primary rounded-full animate-pulse delay-100"></div>
                <div className="absolute bottom-6 left-8 w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
                accept="image/*"
              />
            </div>

            {/* Sıkıştırma Ayarları */}
            {files.length > 0 && (
              <div className="bg-card rounded-2xl shadow-custom-hover border border-custom p-8 mb-8 backdrop-blur-sm transition-all duration-500">
                <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center transition-colors duration-500">
                  {t("compressionSettings")}
                </h3>
                <div className="space-y-6">
                  {/* Dosya Türü Seçici */}
                  <div>
                    <label className="text-lg font-medium text-secondary transition-colors duration-500 mb-3 block">
                      {t("fileTypeSelection")}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {fileTypeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setSelectedFileType(option.value)}
                          type="button"
                          className={`flex flex-col items-start p-5 rounded-2xl border-2 shadow-md transition-all duration-300 text-left space-y-2 w-full h-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                            ${
                              selectedFileType === option.value
                                ? "border-primary bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 scale-105 ring-2 ring-primary"
                                : "border-custom bg-white dark:bg-gray-900 hover:border-primary hover:bg-blue-50 dark:hover:bg-gray-800"
                            }
                          `}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-3xl">{option.icon}</span>
                            <span className="font-bold text-lg text-primary">
                              {option.label}
                            </span>
                          </div>
                          <span className="text-sm text-secondary opacity-80">
                            {option.value === "jpeg" &&
                              "Tüm görseller JPEG formatına dönüştürülür ve optimize edilir."}
                            {option.value === "jpg" &&
                              "Tüm görseller JPG formatına dönüştürülür ve optimize edilir."}
                            {option.value === "png" &&
                              "Tüm görseller PNG formatına dönüştürülür ve optimize edilir."}
                            {option.value === "webp" &&
                              "Tüm görseller WebP formatına dönüştürülür ve optimize edilir."}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sıkıştırma Seviyesi */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-lg font-medium text-secondary transition-colors duration-500">
                        {t("compressionLevel")}
                      </label>
                      <span className="text-2xl font-bold text-gradient">
                        {compressionLevel}%
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min={getCompressionSettings(selectedFileType).min}
                        max={getCompressionSettings(selectedFileType).max}
                        step={getCompressionSettings(selectedFileType).step}
                        value={compressionLevel}
                        onChange={(e) =>
                          setCompressionLevel(Number(e.target.value))
                        }
                        className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-sm text-muted mt-2 transition-colors duration-500">
                        <span>{t("highCompression")}</span>
                        <span>{t("lowCompression")}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCompress}
                    disabled={isCompressing || !selectedFileType}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-custom hover:shadow-custom-hover transform hover:-translate-y-1 disabled:transform-none active:translate-y-0"
                  >
                    {isCompressing ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        {t("compressing")}
                      </span>
                    ) : (
                      t("compressFiles")
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Dosya Listesi */}
            {files.length > 0 && (
              <div className="bg-card rounded-2xl shadow-custom-hover border border-custom backdrop-blur-sm transition-all duration-500">
                <div className="px-8 py-6 border-b border-custom">
                  <h3 className="text-2xl font-semibold text-primary flex items-center transition-colors duration-500">
                    {t("selectedFiles")} ({files.length})
                  </h3>
                </div>
                <div className="divide-y divide-custom">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="px-8 py-6 flex items-center justify-between hover:bg-muted transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">
                          {file.type.startsWith("image/")
                            ? t("image")
                            : t("document")}
                        </div>
                        <div>
                          <p className="text-lg font-medium text-primary transition-colors duration-500">
                            {file.name}
                          </p>
                          <p className="text-secondary transition-colors duration-500">
                            {formatFileSize(file.size, locale)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="p-2 text-destructive hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 hover:scale-110"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Sonuçlar */
          <div className="bg-card rounded-2xl shadow-custom-hover border border-custom backdrop-blur-sm transition-all duration-500">
            <div className="px-8 py-6 border-b border-custom">
              <h3 className="text-2xl font-semibold text-primary flex items-center transition-colors duration-500">
                {t("compressionResults")}
              </h3>
            </div>
            <div className="divide-y divide-custom">
              {compressedFiles.map((file, index) => (
                <div
                  key={index}
                  className="px-8 py-6 hover:bg-muted transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-primary transition-colors duration-500">
                      {file.originalName}
                    </h4>
                    <button
                      onClick={() => handleDownload(file)}
                      className="px-6 py-2.5 bg-gradient-primary hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 shadow-custom hover:shadow-custom-hover transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      {t("download")}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
                      <span className="font-semibold text-gray-900 dark:text-blue-300 transition-colors duration-500">
                        {t("originalSize")}
                      </span>
                      <p className="text-lg font-bold text-black dark:text-blue-100 transition-colors duration-500">
                        {formatFileSize(file.originalSize, locale)}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
                      <span className="font-semibold text-gray-900 dark:text-green-300 transition-colors duration-500">
                        {t("compressedSize")}
                      </span>
                      <p className="text-lg font-bold text-black dark:text-green-100 transition-colors duration-500">
                        {formatFileSize(file.compressedSize, locale)}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
                      <span className="font-semibold text-gray-900 dark:text-purple-300 transition-colors duration-500">
                        {t("compressionRatio")}
                      </span>
                      <p className="text-lg font-bold text-black dark:text-purple-100 transition-colors duration-500">
                        {file.compressionRatio.toFixed(1)}%
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl transition-all duration-500 border border-gray-200 dark:border-gray-700">
                      <span className="font-semibold text-gray-900 dark:text-orange-300 transition-colors duration-500">
                        {t("savings")}
                      </span>
                      <p className="text-lg font-bold text-black dark:text-orange-100 transition-colors duration-500">
                        {formatFileSize(
                          Math.max(0, file.originalSize - file.compressedSize),
                          locale
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Dil menüsü dışına tıklandığında kapatma */}
      {showLanguageMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowLanguageMenu(false)}
        />
      )}
    </div>
  );
}
