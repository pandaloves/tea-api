const categoryHandler = require("../domain/category_handler.js");

exports.create_category = (req, res) => {
  try {
    const category = req.body;
    res.status(201).json(categoryHandler.create(category));
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

exports.get_all_categories = (req, res) => {
  try {
    res.status(200).json(categoryHandler.readAll());
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

exports.get_category = (req, res) => {
  try {
    const id = req.params.id;
    const category = categoryHandler.read(id);
    if (!category) {
      res.status(404).send("Category not found!");
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

exports.put_category = (req, res) => {
  try {
    const id = req.params.id;
    const category = req.body;
    const updatedCategory = categoryHandler.update(id, category);
    if (!updatedCategory) {
      res.status(404).send("Category not found!");
      return;
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

exports.delete_category = (req, res) => {
  try {
    const id = req.params.id;
    const deletedCategory = categoryHandler.delete(id);
    if (!deletedCategory) {
      res.status(404).send("Category not found!");
      return;
    }
    res.status(200).json({ success: "Deleted the category successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};
