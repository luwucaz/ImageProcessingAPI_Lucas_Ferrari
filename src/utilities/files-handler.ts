import fs from 'fs/promises';
import { dirname } from 'path';

export async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);

    return true;
  } catch {
    return false;
  }
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export async function createFile(filePath: string, content: any) {
  await fs.mkdir(dirname(filePath), { recursive: true });

  return await fs.writeFile(filePath, content);
}

export async function readFile(filePath: string) {
  return await fs.readFile(filePath);
}
