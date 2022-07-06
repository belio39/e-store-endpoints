import express from "express";
import { createorderitems } from "../controllers/orderItems-controller";
import { VerifyToken } from "../middleware/verify";

const router = express.Router();

router.post("/", VerifyToken, createorderitems);

export default router;
