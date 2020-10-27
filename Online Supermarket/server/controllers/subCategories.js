const mongoose = require("mongoose");
const SubCategory = require("../models/subCategory");

exports.uploadSubCategory = async (req, res) => {
  const subCategory = new SubCategory({
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
  })

  try {
    const result = await subCategory.save();
    return res.status(200).json({
      message: "A subCategory is created",
      createdSubCategory: result
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Couldn't save in database!"
    })
  }
}

exports.updateSubCategory = async (req, res) => {
  const id = req.body._id

  const updateField = {}

  if (req.body.name) {
    updateField.name = req.body.name;
  }
  if (req.body.category) {
    updateField.category = req.body.category;
  }

  try {
    const updatedSubCategory = await SubCategory.updateOne({ _id: id }, { $set: updateField })
    if (updatedSubCategory.nModified === 0) {
      throw new Error("Didn't update any field.")
    }

    return res.status(200).json({
      message: "SubCategory Updated",
      success: true
    })
  } catch (error) {
    return res.status(500).json(error)
  }
}

exports.getSubCategoryById = async (req, res) => {
  const id = req.body._id;
  try {
    const subCategory = await SubCategory.findOne({
      _id: id
    })
    return res.status(200).json(subCategory)
  } catch (error) {
    return res.status(404).json(error)
  }
}

exports.getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    return res.status(200).json(subCategories)
  } catch (error) {
    return res.status(404).json(error)
  }
}

exports.deleteSubCategory = async (req, res) => {
  try {
    const deletedSubCategory = await SubCategory.deleteOne({ _id: req.body._id });

    if (deletedSubCategory.n === 0) {
      throw new Error("Didn't find the subcategory")
    }

    return res.status(200).json({
      message: "SubCategory Deleted!"
    })
  } catch (err) {
    console.log(err)
    return res.status(404).json(err)
  }
}