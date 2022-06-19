"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order-controller");
const router = express_1.default.Router();
router.post("/", order_controller_1.createOrders);
router.get("/", order_controller_1.getAllOrders);
router.get("/:id", order_controller_1.getOrderById);
router.delete("/:id", order_controller_1.deleteOrder);
exports.default = router;
