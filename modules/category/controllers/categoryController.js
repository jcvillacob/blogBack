const Category = require('../models/categoryModel');



///////////////////////////////////////////////////////////////////
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).send(err);
  }
};



///////////////////////////////////////////////////////////////////
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).send(err);
  }
};



///////////////////////////////////////////////////////////////////
exports.createCategory = async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const category = await newCategory.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).send(err);
  }
};



///////////////////////////////////////////////////////////////////
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).send(err);
  }
};



///////////////////////////////////////////////////////////////////
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};