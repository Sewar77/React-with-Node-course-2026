import {
  deleteUser,
  getAllUsers,
  updateUser,
  getUserById,
  updatePassword,
} from "../controllers/user.Controller.js";
import express from "express";
import { protect } from "../middleware/auth.Middleware.js";
import { adminOnly } from "../middleware/admin.Middleware.js";

const router = express.Router();

router.get("/admin/get-users", protect, adminOnly, getAllUsers);

router.get("/user/:id", protect, getUserById);

router.put("/user/password/:id", protect, updatePassword)

router.put("/user/:id", protect, updateUser);

router.delete("/user/:id", protect, deleteUser);

export default router;
