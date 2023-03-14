import 'jasmine';
import Sharp from 'sharp';

import { resizeImage } from '../../../src/utilities/images-processor';

describe('Images processor utility', () => {
  it('should resize a image', async () => {
    spyOn(Sharp.prototype, 'resize').and.resolveTo();

    const resizedImage = resizeImage('file.png', 200, 200);

    expect(Sharp.prototype.resize).toHaveBeenCalledTimes(1);
    expect(resizedImage).toBeDefined();
  });
});
