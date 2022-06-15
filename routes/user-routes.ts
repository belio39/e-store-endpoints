import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from "../controllers/user-controller";
const router = express.Router();
router.post("/create", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
export default router;
