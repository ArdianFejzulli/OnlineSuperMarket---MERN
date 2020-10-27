const mongoose = require("mongoose");
const Category = require("../models/Category");

exports.uploadCategory = async (req, res) => {
  try {
    const category = new Category({name: req.body.name});
    const savedCategory = await category.save();
    res.status(200).json({
      message: "Category added", 
      success: true, 
      savedCategory
    });
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, error })
  }
}

exports.deleteCategory = async (req, res) => {
  try{
    const deletedCategory = await Category.deleteOne({ _id: req.body._id });
    if(deletedCategory.n === 0) {
      throw new Error("Didn't find the category")
    }

    return res.status(200).json({
      message: "Category Deleted!",
      success: true
    })
  }catch(err){
    return res.status(404).json({
      success: false,
      message: err.message
    })
  }
}

exports.getCategoryById = async (req, res) => {
  try {
    const id = req.body._id;
    const category = await Category.findOne({_id: id});
    return res.status(200).json({ success: true, category })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}