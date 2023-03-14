export interface ImageToProcess {
  filename: string;
  height: number;
  width: number;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface GetResizedImageOutput {
  success: boolean;
  data?: Buffer;
  error?: any;
}
