import express from "express";
import {
  createOrders,
  deleteOrder,
  getAllOrders,
  getOrderById,
} from "../controllers/order-controller";

const router = express.Router();
router.post("/", createOrders);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrder);
export default router;
