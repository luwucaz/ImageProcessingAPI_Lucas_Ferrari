import express, { Request, Response } from 'express';

import GetResizedImageRoute from './routes/get-resized-image.route';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));

app.get('/api/images', (req: Request, res: Response) => {
  const route = new GetResizedImageRoute();

  return route.execute(req, res);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
