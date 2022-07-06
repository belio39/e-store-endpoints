import express from "express";
import {
  createOrders,
  deleteOrder,
  getAllOrders,
  getOrderById,
} from "../controllers/order-controller";
import { VerifyToken } from "../middleware/verify";

const router = express.Router();
router.post("/", VerifyToken, createOrders);
router.get("/", VerifyToken, getAllOrders);
router.get("/:id", VerifyToken, getOrderById);
router.delete("/:id", VerifyToken, deleteOrder);
export default router;
