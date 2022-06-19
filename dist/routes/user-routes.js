"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verify_1 = require("../middleware/verify");
const user_controller_1 = require("../controllers/user-controller");
const router = express_1.default.Router();
router.post("/", user_controller_1.createUser);
router.get("/", verify_1.VerifyToken, user_controller_1.getAllUsers);
router.get("/:id", verify_1.VerifyToken, user_controller_1.getUserById);
router.delete("/:id", verify_1.VerifyToken, user_controller_1.deleteUser);
router.post("/login", user_controller_1.login);
router.patch("/resetpassword/:id", verify_1.VerifyToken, user_controller_1.resetPassWord);
exports.default = router;
