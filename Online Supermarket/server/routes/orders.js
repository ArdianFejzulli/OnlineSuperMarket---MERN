const express = require("express");
const router = express.Router();

// Controller reference
const OrdersController = require("../controllers/orders");

const AdminAuth = require("../middleware/admin_auth");
const UserAuth = require("../middleware/user_auth");

// Get Orders
router.get("/getOrdersByUserId/:userId", UserAuth, OrdersController.getOrdersByUserId);

router.get("/getUndeliveredOrders", AdminAuth, OrdersController.getUndeliveredOrders);

// Add Order
router.post("/makeOrder", UserAuth, OrdersController.makeOrder); //User Auth to be added 

router.patch("/setDelivered", AdminAuth, OrdersController.setDelivered);

module.exports = router;