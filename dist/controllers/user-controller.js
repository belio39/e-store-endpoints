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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const user_schema_1 = require("../models/user-schema");
const config_1 = __importDefault(require("../config/config"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import jwt from "jsonwebtoken";
dotenv_1.default.config();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { fullName, userName, email, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        let pool = yield mssql_1.default.connect(config_1.default);
        const { error } = user_schema_1.UserSchema.validate(req.body);
        if (error) {
            return res.json(error.details[0].message);
        }
        else {
            yield pool
                .request()
                .input("id", mssql_1.default.VarChar, id)
                .input("fullName", mssql_1.default.VarChar, fullName)
                .input("userName", mssql_1.default.VarChar, userName)
                .input("email", mssql_1.default.VarChar, email)
                .input("password", mssql_1.default.VarChar, hashedPassword)
                .execute("createusers");
            res.status(200).json({
                message: "User Created Successfully!",
            });
        }
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config_1.default);
        const users = yield pool.request().execute("getAllUsers");
        const data = users.recordset.map((record) => {
            const { password } = record, rest = __rest(record, ["password"]);
            return rest;
        });
        res.status(200).json({
            message: "Success",
            data,
        });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const user = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("getUserById");
        if (!user.recordset[0]) {
            return res.json({
                message: `User with ${id} does not exits`,
            });
        }
        res.status(200).json({
            message: "Success",
            data: user.recordset,
        });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getUserById = getUserById;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const user = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("getUserById");
        if (!user.recordset[0]) {
            return res.json({
                message: `No user with ${id} Does Not exist`,
            });
        }
        yield pool.request().input("id", mssql_1.default.VarChar, id).execute("deleteUser");
        res.status(200).json({
            message: "User Successfully deleted",
            data: user.recordset,
        });
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
});
exports.deleteUser = deleteUser;
