const express = require('express');
const router = express.Router();
const UsersController = require("../controllers/users")

const AdminAuth = require("../middleware/admin_auth");

// router.get("/auth", UsersController.auth);

router.post("/register", UsersController.register);

router.post("/login", UsersController.login);

router.delete("/deleteUser", AdminAuth, UsersController.delete);

router.get("/logout/:_id", UsersController.logout);

router.get("/getUsers", AdminAuth, UsersController.getUsers);

router.post("/email", UsersController.email);

router.get("/getUserById/:id", UsersController.getUserById);

module.exports = router;