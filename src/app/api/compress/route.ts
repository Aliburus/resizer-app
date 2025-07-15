import { NextRequest, NextResponse } from "next/server";
import Jimp from "jimp";
import {
  validateFileUpload,
  checkRateLimit,
  getClientIP,
  createSafeFilePath,
  isIPBlacklisted,
  checkSuspiciousIP,
  validateFileSignature,
  getSecurityHeaders,
} from "@/lib/security";

export async function POST(request: NextRequest) {
  try {
    // IP kontrolü
    const clientIP = getClientIP(request);

    // Development ortamında IP kontrolünü atla
    if (process.env.NODE_ENV === "development" && clientIP === "invalid") {
      console.warn(
        "Development ortamında geçersiz IP tespit edildi, devam ediliyor..."
      );
    }

    // IP kara liste kontrolü
    if (isIPBlacklisted(clientIP)) {
      return NextResponse.json({ error: "Erişim engellendi" }, { status: 403 });
    }

    // Şüpheli IP kontrolü
    if (checkSuspiciousIP(clientIP)) {
      return NextResponse.json(
        { error: "Şüpheli aktivite tespit edildi" },
        { status: 429 }
      );
    }

    // Rate limiting kontrolü
    const rateLimitKey = `compress_${clientIP}`;

    if (!checkRateLimit(rateLimitKey, 3, 60000)) {
      // 3 istek/dakika (daha sıkı)
      return NextResponse.json(
        { error: "Çok fazla istek gönderdiniz. Lütfen 1 dakika bekleyin." },
        { status: 429 }
      );
    }

    // Content-Type kontrolü
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Geçersiz content type" },
        { status: 400 }
      );
    }

    // User-Agent kontrolü
    const userAgent = request.headers.get("user-agent");
    if (!userAgent || userAgent.length < 10) {
      return NextResponse.json(
        { error: "Geçersiz user agent" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const compressionLevel =
      parseInt(formData.get("compressionLevel") as string) || 80;
    const fileType = (formData.get("fileType") as string) || "all";

    // Dosya validasyonu
    const validation = validateFileUpload(files);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Sıkıştırma seviyesi kontrolü
    if (compressionLevel < 10 || compressionLevel > 100) {
      return NextResponse.json(
        { error: "Geçersiz sıkıştırma seviyesi" },
        { status: 400 }
      );
    }

    const compressedFiles: Array<{
      originalName: string;
      compressedName: string;
      originalSize: number;
      compressedSize: number;
      compressionRatio: number;
      base64Data: string;
    }> = [];

    for (const file of files) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Dosya imza kontrolü
        if (!validateFileSignature(buffer, file.type)) {
          return NextResponse.json(
            { error: `Dosya imza kontrolü başarısız: ${file.name}` },
            { status: 400 }
          );
        }

        const originalSize = buffer.length;
        const originalName = file.name;

        let compressedBuffer: Buffer = buffer;
        let compressedName: string = createSafeFilePath(originalName);

        // Sıkıştırma işlemi - seçili formata göre dönüştür
        if (["jpeg", "png", "webp"].includes(fileType)) {
          try {
            const image = await Jimp.read(buffer);

            if (fileType === "jpeg") {
              compressedBuffer = await image
                .quality(compressionLevel)
                .getBufferAsync(Jimp.MIME_JPEG);
              compressedName = createSafeFilePath(
                originalName.replace(/\.[^/.]+$/, "") + ".jpg"
              );
            } else if (fileType === "png") {
              compressedBuffer = await image
                .quality(compressionLevel)
                .getBufferAsync(Jimp.MIME_PNG);
              compressedName = createSafeFilePath(
                originalName.replace(/\.[^/.]+$/, "") + ".png"
              );
            } else if (fileType === "webp") {
              // Jimp WebP desteği sınırlı, PNG olarak kaydet
              compressedBuffer = await image
                .quality(compressionLevel)
                .getBufferAsync(Jimp.MIME_PNG);
              compressedName = createSafeFilePath(
                originalName.replace(/\.[^/.]+$/, "") + ".png"
              );
            }
          } catch (imageError) {
            console.error("Image processing error:", imageError);
            // Hata durumunda orijinal dosyayı kullan
            compressedBuffer = buffer;
            compressedName = createSafeFilePath(originalName);
          }
        }

        const compressedSize = compressedBuffer.length;

        // Eğer sıkıştırma başarısızsa (dosya büyüdüyse), orijinal dosyayı kullan
        if (compressedSize >= originalSize) {
          compressedBuffer = buffer;
          compressedName = createSafeFilePath(originalName);
        }

        const finalCompressedSize = compressedBuffer.length;
        const compressionRatio = Math.max(
          0,
          ((originalSize - finalCompressedSize) / originalSize) * 100
        );

        // Dosyayı base64'e çevir (kaydetmeden)
        const base64Data = compressedBuffer.toString("base64");

        compressedFiles.push({
          originalName,
          compressedName,
          originalSize,
          compressedSize: finalCompressedSize,
          compressionRatio,
          base64Data, // Base64 verisi
        });
      } catch (fileError) {
        console.error(`Dosya işleme hatası (${file.name}):`, fileError);
        return NextResponse.json(
          { error: `Dosya işlenirken hata oluştu: ${file.name}` },
          { status: 500 }
        );
      }
    }

    // Başarılı yanıt
    const response = NextResponse.json({
      success: true,
      files: compressedFiles,
      message: `${compressedFiles.length} dosya başarıyla sıkıştırıldı`,
      rateLimit: {
        remaining: 2, // Kalan istek sayısı
        resetTime: Date.now() + 60000, // Reset zamanı
      },
    });

    // Güvenlik header'larını ekle
    Object.entries(getSecurityHeaders()).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    console.error("Sıkıştırma hatası:", error);
    return NextResponse.json(
      { error: "Dosya sıkıştırma sırasında hata oluştu" },
      { status: 500 }
    );
  }
}
