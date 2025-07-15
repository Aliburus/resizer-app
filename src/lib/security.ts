import { NextRequest } from "next/server";
import crypto from "crypto";

// Dosya türü kontrolü
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

// Dosya boyutu limiti (30MB - daha sıkı)
export const MAX_FILE_SIZE = 30 * 1024 * 1024;

// Maksimum dosya sayısı
export const MAX_FILES = 5; // Daha sıkı

// Dosya imza kontrolü (Magic Numbers)
export const FILE_SIGNATURES: { [key: string]: string[] } = {
  "image/jpeg": ["FFD8FF"],
  "image/png": ["89504E47"],
  "image/webp": ["52494646"],
  "image/gif": ["47494638"],
  "application/pdf": ["25504446"],
  "application/msword": ["D0CF11E0"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    "504B0304",
  ],
  "text/plain": [], // Text dosyaları için imza kontrolü yok
};

// IP kara listesi (örnek)
const BLACKLISTED_IPS = new Set<string>([
  // Buraya kara liste IP'leri eklenebilir
]);

// Şüpheli IP'ler
const SUSPICIOUS_IPS = new Map<string, { count: number; firstSeen: number }>();

// Güvenli dosya adı oluşturma
export function sanitizeFileName(fileName: string): string {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, "_")
    .replace(/_{2,}/g, "_")
    .replace(/^_+|_+$/g, "") // Başta ve sonda _ kaldır
    .substring(0, 50); // Daha kısa limit
}

// Dosya türü kontrolü
export function isAllowedFileType(fileType: string): boolean {
  return ALLOWED_FILE_TYPES.includes(fileType);
}

// Dosya boyutu kontrolü
export function isFileSizeValid(fileSize: number): boolean {
  return fileSize <= MAX_FILE_SIZE && fileSize > 0;
}

// Dosya imza kontrolü
export function validateFileSignature(
  buffer: Buffer,
  expectedType: string
): boolean {
  const signatures = FILE_SIGNATURES[expectedType];
  if (!signatures || signatures.length === 0) return true; // Text dosyaları için kontrol yok

  const hex = buffer.toString("hex").toUpperCase();

  return signatures.some((signature) => hex.startsWith(signature));
}

// IP adresi alma
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  let ip = "unknown";

  if (forwarded) {
    ip = forwarded.split(",")[0].trim();
  } else if (realIP) {
    ip = realIP;
  } else if (cfConnectingIP) {
    ip = cfConnectingIP;
  }

  // IP format kontrolü
  if (!isValidIP(ip)) {
    return "invalid";
  }

  return ip;
}

// IP format kontrolü
function isValidIP(ip: string): boolean {
  // Localhost ve özel IP'ler için
  if (ip === "localhost" || ip === "127.0.0.1" || ip === "::1") {
    return true;
  }

  // IPv4 regex (daha esnek)
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  // IPv6 regex (daha esnek)
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){1,7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;

  // Private IP ranges
  const privateIPRanges = [
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
    /^192\.168\./,
    /^169\.254\./,
    /^127\./,
    /^::1$/,
    /^fe80:/,
    /^fc00:/,
    /^fd00:/,
  ];

  // Temel kontroller
  if (
    ip === "unknown" ||
    ip === "localhost" ||
    ip === "127.0.0.1" ||
    ip === "::1"
  ) {
    return true;
  }

  // IPv4 kontrolü
  if (ipv4Regex.test(ip)) {
    return true;
  }

  // IPv6 kontrolü
  if (ipv6Regex.test(ip)) {
    return true;
  }

  // Private IP range kontrolü
  for (const range of privateIPRanges) {
    if (range.test(ip)) {
      return true;
    }
  }

  // Eğer hiçbiri değilse, geçerli kabul et (development için)
  return true;
}

// IP kara liste kontrolü
export function isIPBlacklisted(ip: string): boolean {
  return BLACKLISTED_IPS.has(ip);
}

// Şüpheli IP kontrolü
export function checkSuspiciousIP(ip: string): boolean {
  const now = Date.now();
  const suspicious = SUSPICIOUS_IPS.get(ip);

  if (!suspicious) {
    SUSPICIOUS_IPS.set(ip, { count: 1, firstSeen: now });
    return false;
  }

  // 5 dakika içinde 10'dan fazla istek
  if (now - suspicious.firstSeen < 300000 && suspicious.count > 10) {
    return true;
  }

  // 1 saat sonra sıfırla
  if (now - suspicious.firstSeen > 3600000) {
    SUSPICIOUS_IPS.set(ip, { count: 1, firstSeen: now });
  } else {
    suspicious.count++;
  }

  return false;
}

// Rate limiting için basit token bucket
class TokenBucket {
  private tokens: number;
  private lastRefill: number;
  private readonly capacity: number;
  private readonly refillRate: number;

  constructor(capacity: number, refillRate: number) {
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  consume(tokens: number = 1): boolean {
    this.refill();

    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    return false;
  }

  private refill(): void {
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    const tokensToAdd = (timePassed / 1000) * this.refillRate;

    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }

  getTokens(): number {
    this.refill();
    return this.tokens;
  }
}

// Rate limiter instance'ları
const rateLimiters = new Map<string, TokenBucket>();

// Rate limiting kontrolü
export function checkRateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000
): boolean {
  if (!rateLimiters.has(identifier)) {
    rateLimiters.set(
      identifier,
      new TokenBucket(limit, limit / (windowMs / 1000))
    );
  }

  const limiter = rateLimiters.get(identifier)!;
  return limiter.consume();
}

// Dosya yükleme validasyonu
export function validateFileUpload(files: File[]): {
  valid: boolean;
  error?: string;
} {
  if (files.length === 0) {
    return { valid: false, error: "Dosya bulunamadı" };
  }

  if (files.length > MAX_FILES) {
    return {
      valid: false,
      error: `Maksimum ${MAX_FILES} dosya yükleyebilirsiniz`,
    };
  }

  // Toplam boyut kontrolü
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > MAX_FILE_SIZE * 2) {
    return {
      valid: false,
      error: "Toplam dosya boyutu çok büyük",
    };
  }

  for (const file of files) {
    // Dosya adı kontrolü
    if (!file.name || file.name.length > 100) {
      return { valid: false, error: "Geçersiz dosya adı" };
    }

    // Dosya adı karakter kontrolü
    if (/[<>:"/\\|?*]/.test(file.name)) {
      return { valid: false, error: "Dosya adında geçersiz karakterler var" };
    }

    if (!isAllowedFileType(file.type)) {
      return { valid: false, error: `Desteklenmeyen dosya türü: ${file.type}` };
    }

    if (!isFileSizeValid(file.size)) {
      return { valid: false, error: `Dosya boyutu çok büyük: ${file.name}` };
    }
  }

  return { valid: true };
}

// Güvenli dosya yolu oluşturma
export function createSafeFilePath(originalName: string): string {
  const sanitizedName = sanitizeFileName(originalName);
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString("hex");

  return `${timestamp}_${randomString}_${sanitizedName}`;
}

// Content-Type kontrolü
export function getContentType(fileName: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase();

  const mimeTypes: { [key: string]: string } = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    txt: "text/plain",
  };

  return mimeTypes[ext || ""] || "application/octet-stream";
}

// Güvenlik header'ları
export function getSecurityHeaders(): { [key: string]: string } {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Content-Security-Policy":
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self';",
  };
}

// Dosya temizleme (eski dosyaları sil)
export function cleanupOldFiles(): void {
  // Bu fonksiyon cron job ile çağrılabilir
  // 24 saatten eski dosyaları sil
  // Dosya temizleme işlemi burada yapılacak
}
