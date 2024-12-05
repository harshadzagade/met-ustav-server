const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const { name, addBy } = req.body;
        const category = await Category.create({
            name,
            addBy,
            addDate: new Date(),
        });
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error creating category' });
    }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error getting categories' });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error getting categories' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    const updatedCategory = await category.update(req.body);
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error updating category' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }
    await category.destroy();
    res.json({ msg: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error deleting category' });
  }
};