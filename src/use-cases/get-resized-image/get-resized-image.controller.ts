import { Request } from 'express';

import {
  GetResizedImageOutput,
  ImageToProcess,
} from './get-resized-image.model';

import { resizeImage } from './../../utilities/images-processor';

import {
  REGEXP_TYPES_VALIDATOR,
  validateRequest,
} from './../../utilities/request-validator';

import {
  createFile,
  fileExists,
  readFile,
} from './../../utilities/files-handler';

export default class GetResizedImageController {
  public async execute(input: Request): Promise<GetResizedImageOutput> {
    const { filename, height, width } = input.query;

    const imageToProcess: ImageToProcess = {
      filename: filename as string,
      height: Number(height),
      width: Number(width),
    };

    let output;

    try {
      validateRequest(this.propertiesToValidate(), input);

      const image = await this.process(imageToProcess);

      output = { success: true, data: image };
    } catch (err) {
      output = { success: false, error: err };
    }

    return output;
  }

  private propertiesToValidate() {
    return {
      query: [
        { field: 'filename', required: true },

        {
          field: 'height',
          required: true,
          shouldMatchType: REGEXP_TYPES_VALIDATOR.INTEGER,
        },

        {
          field: 'width',
          required: true,
          shouldMatchType: REGEXP_TYPES_VALIDATOR.INTEGER,
        },
      ],
    };
  }

  private async process(imageToProcess: ImageToProcess): Promise<Buffer> {
    const unprocessedImagePath = this.getUnprocessedImagePath(imageToProcess);

    await this.checkIfImageFileExists(unprocessedImagePath);

    const processedImagePath = this.getProcessedImagePath(imageToProcess);

    if (await fileExists(processedImagePath)) {
      return await readFile(processedImagePath);
    }

    return await this.processAndSaveImage(imageToProcess);
  }

  private async checkIfImageFileExists(imagePath: string) {
    if (!(await fileExists(imagePath))) {
      throw {
        code: 404,
        message: `The requested resource ${imagePath} was not found`,
      };
    }
  }

  private getUnprocessedImagePath(imageToProcess: ImageToProcess) {
    const { filename } = imageToProcess;

    const unprocessedImagePath = `./images/${filename}`;

    return unprocessedImagePath;
  }

  private getProcessedImagePath(imageToProcess: ImageToProcess) {
    const { filename, height, width } = imageToProcess;

    const splittedFilename = filename.split('.');

    const processedImagePath = `./images/processed/${splittedFilename[0]}-${width}-${height}.${splittedFilename[1]}`;

    return processedImagePath;
  }

  private async processAndSaveImage(imageToProcess: ImageToProcess) {
    const imagePath = this.getUnprocessedImagePath(imageToProcess);
    const pathToSave = this.getProcessedImagePath(imageToProcess);

    const { height, width } = imageToProcess;

    const processedImage = await resizeImage(imagePath, height, width);

    await createFile(pathToSave, processedImage);

    return processedImage;
  }
}
