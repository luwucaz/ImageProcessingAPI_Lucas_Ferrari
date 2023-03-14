import 'jasmine';
import request from 'supertest';
import fs from 'fs/promises';

import app from './../../src/app';

describe('GET /api/images', () => {
  const query = { filename: 'fjord.jpg', height: 200, width: 200 };

  const queryMissingParams = { filename: 'fjord.jpg' };

  const queryFileNotExists = {
    filename: 'unexistent-file.jpg',
    height: 200,
    width: 200,
  };

  it('should return a resized image', async () => {
    spyOn(fs, 'access').and.resolveTo();
    spyOn(fs, 'readFile').and.resolveTo();

    const response = await request(app).get('/api/images').query(query);

    expect(response.type).toBe('image/jpeg');
    expect(response.status).toBe(200);
  });

  it('should return an error when parameters are missing', async () => {
    spyOn(fs, 'access').and.resolveTo();
    spyOn(fs, 'readFile').and.resolveTo();

    const response = await request(app)
      .get('/api/images')
      .query(queryMissingParams);

    expect(response.text).toBe('["height is required","width is required"]');

    expect(response.status).toBe(400);
  });

  it('should return an error when the file is not found', async () => {
    spyOn(fs, 'access').and.rejectWith();

    const response = await request(app)
      .get('/api/images')
      .query(queryFileNotExists);

    expect(response.text).toBe(
      `The requested resource ./images/${queryFileNotExists.filename} was not found`
    );

    expect(response.status).toBe(404);
  });
});
