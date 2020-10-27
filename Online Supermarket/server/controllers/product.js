const Product = require("../models/Product");

exports.uploadProduct = async (req, res) => {
  try {
    const images = req.files.map(i => i.path);

    const {
      title,
      description,
      price,
      subCategory
    } = req.body;

    const product = new Product({
      title,
      description,
      price,
      subCategory,
      images,
    });

    const result = await product.save();
    console.log(result)
    res.status(201).json({ success: true, newProduct: result });
  }
  catch (err) {
    res.status(400).json({ success: false, err })
  }
}

exports.getProducts = async (req, res) => {

  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  let term = req.body.searchTerm;

  if (term) {
    Product.find()
      .find({ $text: { $search: term } })
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err })

        return res.status(200).json({ success: true, products, postSize: products.length })
      })
  } else {
    Product.find()
      .sort([[sortBy, order]])
      // .skip(skip)
      .limit(limit)
      .exec((err, products) => {
        if (err) return res.status(400).json({ success: false, err })

        return res.status(200).json({ success: true, products, postSize: products.length })
      })
  }

}

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product)
  } catch (error) {
    return res.status(404).json(error)
  }
}

exports.getProductsBySubCategoryId = async (req, res) => {
  try {
    const products = await Product.find({ subCategory: req.params.id });
    return res.status(200).json(products)
  } catch (error) {
    return res.status(404).json(error)
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const updateFields = {}
    for (const ops of Object.keys(req.body)) {
      if (ops != 'images')
        updateFields[ops] = req.body[ops];
    }

    const updatedProduct = await Product.updateOne({ _id: productId }, { $set: updateFields })
    if (updatedProduct.nModified === 0) {
      throw new Error("Didn't update any field.")
    }

    return res.status(200).json({
      message: "Product Updated",
      success: true
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json(error.message)
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.deleteOne({ _id: productId });
    if (deletedProduct.n === 0) {
      throw new Error("Didn't find the product")
    }

    return res.status(200).json({
      message: "Product Deleted!"
    })
  } catch (err) {
    console.log(err)
    return res.status(404).json(err)
  }
}