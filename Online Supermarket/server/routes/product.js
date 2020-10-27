const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product');

const AdminAuth = require("../middleware/admin_auth");

const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = this.path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only png and jpg'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).array("file", 10)


// PRODUCTS

// router.post("/uploadProduct", AdminAuth, upload, ProductController.uploadProduct);
router.post("/uploadProduct", upload, ProductController.uploadProduct);

router.get("/getProducts", ProductController.getProducts);

// ?id=${productId}&type=single
router.get("/getProductById/:id", ProductController.getProductById);

router.get("/getProductsBySubCategoryId/:id", ProductController.getProductsBySubCategoryId);

router.delete("/deleteProduct/:id", ProductController.deleteProduct); //admin auth to be added 

router.patch("/updateProduct/:id", ProductController.updateProduct); //admin auth to be added 

module.exports = router;
