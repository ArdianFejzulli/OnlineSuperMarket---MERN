const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/Product");
const User = require("../models/user");

exports.makeOrder = async (req, res) => {

  try {
    if (!(Array.isArray(req.body.items) && req.body.items.length)) {
      return res.status(400).json({
        message: "It must be an Array and it can't be empty!"
      });
    }

    const orderObj = {
      location: {
        type: "Point",
        coordinates: req.body.coordinates
      },
      user: req.body.userId,
    };

    let tmp = [];
    for (let item of req.body.items) {
      const prod = await getProdData(item.productId);

      tmp.push({
        productId: item.productId,
        name: prod.name,
        quantity: item.quantity,
        productPrice: prod.price,
        price: prod.price * item.quantity
      });
    }
    orderObj.items = tmp;

    let totalPrice = 0;
    orderObj.items.map(item => {
      totalPrice += item.price;
    });
    orderObj.orderTotal = totalPrice;

    const order = new Order(orderObj);

    const createdOrder = await order.save();

    const author = await User.findById(req.body.userId);
    if (!author) {
      throw new Error("User not found!");
    }

    author.orders.push(order);
    await author.save();

    return res.status(201).json({ createdOrder: createdOrder });
  } catch (err) {
    console.error(err)
    return res.status(500).json(err)
  }
}

const getProdData = async id => {
  try {
    const prod = await Product.findById(id);
    if (!prod) {
      throw new Error("Product not found!");
    }

    return prod;
  } catch (err) {
    throw err;
  }
}

exports.getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const delivered = req.body.delivered;
    const opt = { user: userId }

    if (delivered) opt.delivered = delivered;

    const orders = await Order.find(opt);
    res.status(200).json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, error })
  }
}

exports.getUndeliveredOrders = async (req, res) => {
  try {
    const orders = await Order.find({ delivered: false });
    res.status(200).json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, error })
  }
}

exports.setDelivered = async (req, res) => {
  try {
    const result = await Order.update(
      { _id: req.body.orderId },
      { $set: { delivered: req.body.delivered } }
    )

    console.log(result)
    if (result.nModified === 0) {
      throw new Error("Didn't find the order")
    }

    res.status(200).json(
      {
        message: "Order updated",
        success: true
      })
  }
  catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
}