const productHandler = require("../domain/product_handler.js");

exports.create_product = (req, res) => {
  try {
    const product = req.body;
    res.status(201).json(productHandler.create(product));
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

exports.get_all_products = (req, res) => {
  try {
    res.status(200).json(productHandler.readAll());
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

exports.get_product = (req, res) => {
  try {
    const id = req.params.id;
    const product = productHandler.read(id);
    if (product == undefined) {
      res.status(404).send("Product not found!");
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

exports.put_product = (req, res) => {
  try {
    const id = req.params.id;
    const product = req.body;
    const oldProduct = productHandler.read(id);
    if (oldProduct == undefined) {
      res.status(404).send("Product not found!");
      return;
    }
    res.status(200).json(productHandler.update(id, product));
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

exports.delete_product = (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = productHandler.delete(id);
    if (!deletedProduct) {
      res.status(404).send("Product not found!");
      return;
    }
    res.status(200).json({ success: "Deleted the product successfully!" });
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};
