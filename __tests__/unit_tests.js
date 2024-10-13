/**
 * @group unit
 */
const productHandler = require("../domain/product_handler.js");
const categoryHandler = require("../domain/category_handler.js");

let persistedCategoryId;

beforeEach(async () => {
  const category = categoryHandler.create({
    name: "Grönt te",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHfamFahLTBWDTLUKhzs6wYtrsZd5HHjmTtA&s",
  });
  persistedCategoryId = category.id;
});

describe("When testing categoryHandler", () => {
  describe("readAll", () => {
    it("should respond with an array", async () => {
      expect(Array.isArray(categoryHandler.readAll())).toBe(true);
    });
  });

  describe("create", () => {
    it("should add one category", async () => {
      let countBefore = categoryHandler.readAll().length;
      categoryHandler.create({
        name: "Svart te",
        image:
          "https://www.healthifyme.com/blog/wp-content/uploads/2020/02/Black-Tea-2-1.jpg",
      });
      expect(categoryHandler.readAll().length).toBe(countBefore + 1);
    });

    it("should create a category with an id", async () => {
      const category = categoryHandler.create({
        name: "Rött te",
        image: "https://kahlstkh.se/wp-content/uploads/2018/03/te-rooibos.jpg",
      });
      expect(category).toHaveProperty("id");
    });
  });

  describe("read", () => {
    it("should read saved category values", async () => {
      const category = categoryHandler.create({
        name: "Rött https://kahlstkh.se/wp-content/uploads/2018/03/te-rooibos.jpg",
        image: "https://kahlstkh.se/wp-content/uploads/2018/03/te-rooibos.jpg",
      });
      const savedCategory = categoryHandler.read(category.id);
      expect(category.id).toBe(savedCategory.id);
      expect(category.name).toBe(savedCategory.name);
      expect(category.image).toBe(savedCategory.image);
    });
  });

  describe("update", () => {
    it("should update category values", async () => {
      const category = categoryHandler.create({
        name: "Grönt te",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHfamFahLTBWDTLUKhzs6wYtrsZd5HHjmTtA&s",
      });
      const updatedCategory = categoryHandler.update(category.id, {
        name: "Svart te",
        image:
          "https://www.healthifyme.com/blog/wp-content/uploads/2020/02/Black-Tea-2-1.jpg",
      });
      const savedCategory = categoryHandler.read(category.id);
      expect(updatedCategory.id).toBe(savedCategory.id);
      expect(updatedCategory.name).toBe(savedCategory.name);
      expect(updatedCategory.image).toBe(savedCategory.image);
    });
  });

  describe("delete", () => {
    it("should remove one category", async () => {
      const category = categoryHandler.create({
        name: "Rött te",
        image: "https://kahlstkh.se/wp-content/uploads/2018/03/te-rooibos.jpg",
      });
      let countBefore = categoryHandler.readAll().length;
      categoryHandler.delete(category.id);
      expect(categoryHandler.readAll().length).toBe(countBefore - 1);
    });
  });
});

// Test suite for productHandler
describe("When testing productHandler", () => {
  describe("readAll", () => {
    it("should respond with array", async () => {
      expect.arrayContaining(productHandler.readAll());
    });
  });

  describe("create", () => {
    it("should add one", async () => {
      let countBefore = productHandler.readAll().length;
      productHandler.create({
        name: "Jasmine te",
        image:
          "https://blog.piquelife.com/wp-content/uploads/2020/08/Jasmine-Tea-Benefits-5-Research-Backed-Benefits-of-Jasmine-Tea.png",
        effect:
          "hjälper till att lugna, förbättra mental klarhet och stärka ditt immunförsvar",
        type: "Grönt, svart & vitt",
        caffeine: "Låg koffein",
        categoryId: 1,
      });
      expect(productHandler.readAll().length).toBe(countBefore + 1);
    });

    it("should create id", async () => {
      const product = productHandler.create({
        name: "Matcha",
        image:
          "https://media.post.rvohealth.io/wp-content/uploads/2020/08/matcha-green-tea-732x549-thumbnail.jpg",
        effect:
          "minska risken för flera kroniska sjukdomar, förbättra uppmärksamhet, minne och reaktionstid.",
        type: "Grönt",
        caffeine: "Medium koffein",
        categoryId: 1,
      });
      expect(product).toHaveProperty("id");
    });
  });

  describe("read", () => {
    it("should read saved values", async () => {
      const product = productHandler.create({
        name: "Matcha",
        image:
          "https://media.post.rvohealth.io/wp-content/uploads/2020/08/matcha-green-tea-732x549-thumbnail.jpg",
        effect:
          "minska risken för flera kroniska sjukdomar, förbättra uppmärksamhet, minne och reaktionstid.",
        type: "Grönt",
        caffeine: "Medium koffein",
        categoryId: 1,
      });
      const savedProduct = productHandler.read(product.id);
      expect(product.id).toBe(savedProduct.id);
      expect(product.name).toBe(savedProduct.name);
      expect(product.image).toBe(savedProduct.image);
      expect(product.effect).toBe(savedProduct.effect);
      expect(product.type).toBe(savedProduct.type);
      expect(product.caffeine).toBe(savedProduct.caffeine);
      expect(product.categoryId).toBe(savedProduct.categoryId);
    });
  });

  describe("update", () => {
    it("should update values", async () => {
      const product = productHandler.create({
        name: "Matcha",
        image:
          "https://media.post.rvohealth.io/wp-content/uploads/2020/08/matcha-green-tea-732x549-thumbnail.jpg",
        effect:
          "minska risken för flera kroniska sjukdomar, förbättra uppmärksamhet, minne och reaktionstid.",
        type: "Grönt",
        caffeine: "Medium koffein",
        categoryId: persistedCategoryId,
      });
      const updatedProduct = productHandler.update(product.id, {
        name: "Yogi te green tea matcha lemonnewName",
        image: "https://www.foodfolder.se/media/5807/img_8874.jpg",
        effect: "Hög koncentration av antioxidanter",
        type: "Grönt",
        caffeine: "Medium caffeine",
        categoryId: persistedCategoryId,
      });
      const savedProduct = productHandler.read(product.id);
      expect(updatedProduct.id).toBe(savedProduct.id);
      expect(updatedProduct.name).toBe(savedProduct.name);
      expect(updatedProduct.image).toBe(savedProduct.image);
      expect(updatedProduct.effect).toBe(savedProduct.effect);
      expect(updatedProduct.type).toBe(savedProduct.type);
      expect(updatedProduct.caffeine).toBe(savedProduct.caffeine);
    });
  });

  describe("delete", () => {
    it("should remove one", async () => {
      const product = productHandler.create({
        name: "Jasmine te",
        image:
          "https://blog.piquelife.com/wp-content/uploads/2020/08/Jasmine-Tea-Benefits-5-Research-Backed-Benefits-of-Jasmine-Tea.png",
        effect:
          "hjälper till att lugna, förbättra mental klarhet och stärka ditt immunförsvar",
        type: "Grönt, svart & vitt",
        caffeine: "Låg koffein",
        categoryId: persistedCategoryId,
      });
      let countBefore = productHandler.readAll().length;
      productHandler.delete(product.id);
      expect(productHandler.readAll().length).toBe(countBefore - 1);
    });
  });
});
