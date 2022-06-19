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
exports.deleteOrder = exports.getOrderById = exports.getAllOrders = exports.createOrders = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const dotenv_1 = __importDefault(require("dotenv"));
const order_schema_1 = require("../models/order-schema");
dotenv_1.default.config();
const createOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { user_id, total } = req.body;
        let pool = yield mssql_1.default.connect(config_1.default);
        const { error } = order_schema_1.OrderSchema.validate(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        else {
            yield pool
                .request()
                .input("id", mssql_1.default.VarChar, id)
                .input("user_id", mssql_1.default.VarChar, user_id)
                .input("total", mssql_1.default.VarChar, total)
                .execute("createorders");
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
    console.log(req.body);
});
exports.createOrders = createOrders;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config_1.default);
        const orders = yield pool.request().execute("getAllOrders");
        res.status(200).json({
            message: "Success",
            orders,
        });
    }
    catch (error) {
        res.status(200).json({ error: error.message });
    }
});
exports.getAllOrders = getAllOrders;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const order = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("getOrderById");
        if (!order.recordset[0]) {
            res.status(400).json({
                message: `Product with ${id} does not exits`,
            });
        }
        res.status(200).json({
            message: "Success",
            data: order.recordset,
        });
    }
    catch (error) {
        res.status(200).json({
            error: error.message,
        });
    }
});
exports.getOrderById = getOrderById;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const order = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("getOrderById");
        if (!order.recordset[0]) {
            return res.status(400).json({
                message: `Product with ID : ${id} Does Not exist`,
            });
        }
        yield pool.request().input("id", mssql_1.default.VarChar, id).execute("deleteOrder");
        res.status(200).json({
            message: "Order Successfully deleted",
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.deleteOrder = deleteOrder;
