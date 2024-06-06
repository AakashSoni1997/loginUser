const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getAllUser,
  deleteUser,
  updateUser,
  getUserById,
} = require("../controller/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/admin/users").get(getAllUser);
router.route("/admin/users/:id").get(getUserById);
router.route("/admin/user/:id").put(updateUser);
router.route("/admin/user/:id").delete(deleteUser);

module.exports = router;
