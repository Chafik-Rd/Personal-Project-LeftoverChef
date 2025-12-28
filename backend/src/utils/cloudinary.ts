import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadImage = async (
  imageObject: Express.Multer.File
): Promise<UploadApiResponse> => {
  return await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "leftover_recipes",
          resource_type: "auto",
          transformation: [
            { width: 800, height: 800, crop: "limit" }, // ถ้ารูปใหญ่เกิน 800px ให้ย่อลงมาแต่ไม่เสียสัดส่วน
            { quality: "auto" }, // ปรับคุณภาพให้เหมาะสม (ลดขนาดไฟล์ได้มหาศาลโดยที่ตายังดูไม่ออก)
            { fetch_format: "auto" }, // เปลี่ยนเป็นไฟล์ยุคใหม่เช่น WebP อัตโนมัติถ้า Browser รองรับ
          ],
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return reject(new Error("Cloudinary upload result is undefined"));
          }
          return resolve(result);
        }
      )
      .end(imageObject.buffer);
  });
};

export const deleteImage = async (publicId: string): Promise<any> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok") {
      console.warn(
        `Cloudinary delete warning: ${result.result} for ID: ${publicId}`
      );
    }

    return result;
  } catch (err) {
    console.error("Cloudinary delete error:", err);
  }
};
