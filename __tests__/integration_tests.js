/**
 * @group integration
 */

const request = require("supertest");
const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || `http://localhost:${PORT}`;
const container = request(HOST);

let persistedCategoryId = undefined;

beforeEach(async () => {
  const res = await container.post("/api/category/").send({
    name: "Grönt te",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHfamFahLTBWDTLUKhzs6wYtrsZd5HHjmTtA&s",
  });
  persistedCategoryId = res.body.id;
});

describe("When testing /api/category", () => {
  describe("POST", () => {
    it("should create a new category", async () => {
      const res = await container.post("/api/category/").send({
        name: "Svart te",
        image:
          "https://www.healthifyme.com/blog/wp-content/uploads/2020/02/Black-Tea-2-1.jpg",
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.name).toEqual("Svart te");
      expect(res.body.image).toEqual(
        "https://www.healthifyme.com/blog/wp-content/uploads/2020/02/Black-Tea-2-1.jpg"
      );
    });
  });
});

describe("When testing /api/category", () => {
  describe("GET All", () => {
    it("should retrieve all categories", async () => {
      const res = await container.get("/api/category/");
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});

describe("When testing /api/category", () => {
  describe("GET", () => {
    it("should retrieve a single category by ID", async () => {
      const res = await container.get("/api/category/" + persistedCategoryId);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body.id).toEqual(persistedCategoryId);
      expect(res.body.name).toEqual("Svart te");
      expect(res.body.image).toEqual(
        "https://www.healthifyme.com/blog/wp-content/uploads/2020/02/Black-Tea-2-1.jpg"
      );
    });
  });
});

describe("When testing /api/category", () => {
  describe("PUT", () => {
    it("should update a category's details", async () => {
      const newName = "Rött te";
      const newImage =
        "https://kahlstkh.se/wp-content/uploads/2018/03/te-rooibos.jpg";
      const res = await container
        .put("/api/category/" + persistedCategoryId)
        .send({ name: newName, image: newImage });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body.name).toEqual(newName);
      expect(res.body.image).toEqual(newImage);
    });
  });
});

describe("When testing /api/category", () => {
  describe("DELETE", () => {
    it("should delete a category by ID", async () => {
      const res = await container.delete(
        "/api/category/" + persistedCategoryId
      );
      expect(res.statusCode).toEqual(204);
    });
  });
});

let persisted_id = undefined;

beforeEach(async () => {
  const res = await container.post("/api/product/").send({
    name: "Jasmine te",
    image:
      "https://blog.piquelife.com/wp-content/uploads/2020/08/Jasmine-Tea-Benefits-5-Research-Backed-Benefits-of-Jasmine-Tea.png",
    effect:
      "hjälper till att lugna, förbättra mental klarhet och stärka ditt immunförsvar",
    type: "Grönt, svart & vitt",
    caffeine: "Låg koffein",
    categoryId: 1,
  });
  persisted_id = res.body.id;
});

describe("When testing /api/product", () => {
  describe("Post", () => {
    it("should work", async () => {
      const res = await container.post("/api/product/").send({
        name: "Matcha",
        image:
          "https://media.post.rvohealth.io/wp-content/uploads/2020/08/matcha-green-tea-732x549-thumbnail.jpg",
        effect:
          "minska risken för flera kroniska sjukdomar, förbättra uppmärksamhet, minne och reaktionstid.",
        type: "Grönt",
        caffeine: "Medium koffein",
        categoryId: 1,
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("id");
    });
  });
});

describe("When testing /api/product", () => {
  describe("GET All", () => {
    it("should work", async () => {
      const res = await container.get("/api/product/");
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});

describe("When testing /api/product", () => {
  describe("GET", () => {
    it("should work", async () => {
      const res = await container.get("/api/product/" + persisted_id);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id");
    });
  });
});

describe("When testing /api/product", () => {
  describe("PUT", () => {
    it("should work", async () => {
      const res = await container.put("/api/product/" + persisted_id).send({
        name: "Yogi te green tea matcha lemonnewName",
        image: "https://www.foodfolder.se/media/5807/img_8874.jpg",
        effect: "Hög koncentration av antioxidanter",
        type: "Grönt",
        caffeine: "Medium caffeine",
        categoryId: 1,
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id");
    });
  });
});

describe("When testing /api/product", () => {
  describe("DELETE", () => {
    it("should work", async () => {
      const res = await container.delete("/api/product/" + persisted_id);
      expect(res.statusCode).toEqual(204);
    });
  });
});
