import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const runtime = 'nodejs';

export async function POST(request) {
  const formData = await request.formData();
  const files = formData.getAll('files');
  if (!files.length) {
    return NextResponse.json([], { status: 400 });
  }
  const urls = [];
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'image' }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }).end(buffer);
    });
    urls.push(upload.secure_url);
  }
  return NextResponse.json(urls);
} 