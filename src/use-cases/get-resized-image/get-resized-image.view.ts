import { Response } from 'express';

import { GetResizedImageOutput } from './get-resized-image.model';

export default class GetResizedImageView {
  public show(output: GetResizedImageOutput, response: Response): void {
    if (output.success) {
      response.set('Content-Type', 'image/jpeg');

      response.send(output.data);

      return;
    }

    const { code, message } = this.handleError(output.error);

    response.status(code).send(message);
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  private handleError(error: any): { code: number; message: string } {
    if (error.code && error.message) {
      return error;
    }

    if (
      error.toString().replace(/(\r\n|\n|\r)/gm, '') ===
      'Error: affine: output coordinates out of range'
    ) {
      return {
        code: 400,
        message: 'Error processing image: width or height out of range',
      };
    }

    return {
      code: 500,
      message: 'Internal Server Error',
    };
  }
}
