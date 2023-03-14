import { Request, Response } from 'express';

import GetResizedImageController from './../use-cases/get-resized-image/get-resized-image.controller';
import GetResizedImageView from './../use-cases/get-resized-image/get-resized-image.view';

export default class GetResizedImageRoute {
  public async execute(request: Request, response: Response) {
    const controller = new GetResizedImageController();
    const view = new GetResizedImageView();

    const output = await controller.execute(request);

    view.show(output, response);
  }
}
