"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.OrderSchema = joi_1.default.object({
    user_id: joi_1.default.string().required(),
    total: joi_1.default.number().min(0).max(10).required(),
});
