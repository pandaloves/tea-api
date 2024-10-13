const router = require("express").Router();
const productController = require("../controllers/product_controller.js");

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               effect:
 *                 type: string
 *               type:
 *                 type: string
 *               caffeine:
 *                 type: string
 *               categoryId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Something went wrong
 */
router.post("/", productController.create_product);

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   image:
 *                    type: string
 *                   effect:
 *                    type: string
 *                   type:
 *                    type: string
 *                   caffeine:
 *                    type: string
 *                   categoryId:
 *                    type: number
 *       500:
 *         description: Something went wrong
 */
router.get("/", productController.get_all_products);

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product details
 *       404:
 *         description: Product not found
 *       500:
 *         description: Something went wrong
 */
router.get("/:id", productController.get_product);

/**
 * @swagger
 * /api/product/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               effect:
 *                 type: string
 *               type:
 *                 type: string
 *               caffeine:
 *                 type: string
 *               categoryId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Something went wrong
 */
router.put("/:id", productController.put_product);

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The product ID
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Something went wrong
 */
router.delete("/:id", productController.delete_product);

module.exports = router;
