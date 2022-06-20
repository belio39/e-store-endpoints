import express from "express";
import { createorderitems } from "../controllers/orderItems-controller";

const router = express.Router();

router.post("/", createorderitems);

export default router;
