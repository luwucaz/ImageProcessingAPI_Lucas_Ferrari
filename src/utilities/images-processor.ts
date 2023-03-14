import sharp from 'sharp';

export async function resizeImage(
  filePath: string,
  height: number,
  width: number
): Promise<Buffer> {
  return await sharp(filePath).resize(width, height).toBuffer();
}
