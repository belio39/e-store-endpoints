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
exports.deleteQueuedRecord = exports.updateStatusRecord = exports.getPendingQueues = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getPendingQueues = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config_1.default);
        return yield pool.request().execute("getPendingQueues");
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPendingQueues = getPendingQueues;
const updateStatusRecord = (user_id, order_id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config_1.default);
        return yield pool
            .request()
            .input("user_id", mssql_1.default.VarChar, user_id)
            .input("order_id", mssql_1.default.VarChar, order_id)
            .input("status", mssql_1.default.VarChar, status)
            .execute("updateStatusRecord");
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateStatusRecord = updateStatusRecord;
const deleteQueuedRecord = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config_1.default);
        return yield pool.request().execute("deleteQueuedRecord");
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteQueuedRecord = deleteQueuedRecord;
