const express = require('express');
const router = express.Router();
// const { Category } = require("../models/Category");
const CategoriesControllers = require("../controllers/categories");

const AdminAuth = require("../middleware/admin_auth");

router.post("/uploadCategory", CategoriesControllers.uploadCategory);

router.get("/getCategories", CategoriesControllers.getCategories);

router.delete("/deleteCategory", AdminAuth, CategoriesControllers.deleteCategory); //Admin auth to be added

router.get("/getCategoryById", CategoriesControllers.getCategoryById); //Admin auth to be added

module.exports = router;