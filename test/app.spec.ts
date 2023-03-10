import request from "supertest";
import app from "../src/app";

describe("Test the image resizing API", () => {
  it("should return a resized image", async () => {
    const response = await request(app)
      .get("/api/images")
      .query({ filename: "image1.jpg", height: 200, width: 200 });

    expect(response.status).toBe(200);
    expect(response.type).toBe("image/jpeg");
  });

  it("should return an error when parameters are missing", async () => {
    const response = await request(app).get("/api/images");

    expect(response.status).toBe(400);
    expect(response.text).toBe("Bad Request: Missing parameters");
  });

  it("should return an error when the file is not found", async () => {
    const response = await request(app)
      .get("/api/images")
      .query({ filename: "nonexistent.jpg", height: 200, width: 200 });

    expect(response.status).toBe(500);
    expect(response.text).toBe("Internal Server Error");
  });
});
