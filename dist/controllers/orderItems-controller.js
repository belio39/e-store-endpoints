"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderItem = exports.getOrderItemById = exports.getAllOrderIitems = exports.createorderitems = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const dotenv_1 = __importDefault(require("dotenv"));
const orderItems_1 = require("../models/orderItems");
dotenv_1.default.config();
const createorderitems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { order_id, product_id } = req.body;
        let pool = yield mssql_1.default.connect(config_1.default);
        const { error } = orderItems_1.Order_ItemsSchema.validate(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        else {
            yield pool
                .request()
                .input("id", mssql_1.default.VarChar, id)
                .input("order_id", mssql_1.default.VarChar, order_id)
                .input("product_id", mssql_1.default.VarChar, product_id)
                .execute("createorderitems");
            res.status(200).json({
                message: "Product Created Successfully!",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.createorderitems = createorderitems;
const getAllOrderIitems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config_1.default);
        const orderItem = yield pool.request().execute("getAllOrderIitems");
        res.status(200).json({
            message: "Success",
            orderItem,
        });
    }
    catch (error) {
        res.status(200).json({ error: error.message });
    }
});
exports.getAllOrderIitems = getAllOrderIitems;
const getOrderItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const orderItem = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("getOrderItemById");
        if (!orderItem.recordset[0]) {
            res.status(400).json({
                message: `OrderItems with ${id} does not exits`,
            });
        }
        res.status(200).json({
            message: "Success",
            data: orderItem.recordset,
        });
    }
    catch (error) {
        res.status(200).json({
            error: error.message,
        });
    }
});
exports.getOrderItemById = getOrderItemById;
const deleteOrderItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const orderItem = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("getOrderItemById");
        if (!orderItem.recordset[0]) {
            return res.status(400).json({
                message: `OrderItems with ID : ${id} Does Not exist`,
            });
        }
        yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("deleteOrderItem");
        res.status(200).json({
            message: "Order Items Successfully deleted",
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
    console.log(req.body);
});
exports.deleteOrderItem = deleteOrderItem;
