import express, { Request, Response } from "express";
import sharp from "sharp";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));

app.get("/api/images", async (req: Request, res: Response) => {
  const filename = req.query.filename as string;
  const height = Number(req.query.height);
  const width = Number(req.query.width);

  if (!filename || !height || !width) {
    return res.status(400).send("Bad Request: Missing parameters");
  }

  try {
    const image = await sharp(`./images/${filename}`)
      .resize(width, height)
      .toBuffer();

    res.set("Content-Type", "image/jpeg");
    res.send(image);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
