const express = require('express');
const router = express.Router();

const AdminAuth = require("../middleware/admin_auth");

const SubCategoryController = require('../controllers/subCategories');

router.post("/uploadSubCategory", AdminAuth, SubCategoryController.uploadSubCategory);

router.patch("/updateSubCategory", AdminAuth, SubCategoryController.updateSubCategory);

router.get("/getSubCategoryById", SubCategoryController.getSubCategoryById);

router.get("/getSubCategories", SubCategoryController.getSubCategories);

router.delete("/deleteSubCategory", AdminAuth, SubCategoryController.deleteSubCategory);

module.exports = router;