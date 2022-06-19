import express from "express";
import { VerifyToken } from "../middleware/verify";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  login,
  resetPassWord,
} from "../controllers/user-controller";
const router = express.Router();
router.post("/", createUser);
router.get("/", VerifyToken, getAllUsers);
router.get("/:id", VerifyToken, getUserById);
router.delete("/:id", VerifyToken, deleteUser);
router.post("/login", login);
router.patch("/resetpassword/:id", VerifyToken, resetPassWord);
export default router;
