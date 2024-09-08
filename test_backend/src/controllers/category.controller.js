const Category = require('../models/category.model');

// Create
exports.createCategory = (req, res) => {
  const categoryData = {
    title: req.body.title,
    description: req.body.description
  };

  Category.create(categoryData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating category', error: err });
    }
    res.status(201).json({ message: 'Category created successfully', categoryId: result.insertId });
  });
};

// Get All
exports.getAllCategories = (req, res) => {
  Category.findAll((err, categories) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving categories', error: err });
    }
    res.status(200).json(categories);
  });
};

// Get by ID
exports.getCategoryById = (req, res) => {
  const categoryId = req.params.id;

  Category.findById(categoryId, (err, category) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving category', error: err });
    }

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  });
};

// Update
exports.updateCategory = (req, res) => {
  const categoryId = req.params.id;
  const categoryData = {
    title: req.body.title,
    description: req.body.description
  };

  Category.update(categoryId, categoryData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating category', error: err });
    }
    res.status(200).json({ message: 'Category updated successfully' });
  });
};

// Delete
exports.deleteCategory = (req, res) => {
  const categoryId = req.params.id;

  Category.delete(categoryId, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting category', error: err });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  });
};