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
const node_cron_1 = __importDefault(require("node-cron"));
const email_1 = __importDefault(require("./emailServices/email"));
const queue_controller_1 = require("../controllers/queue-controller");
node_cron_1.default.schedule("*/4 * * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    const queue = yield (0, queue_controller_1.getPendingQueues)();
    console.log(queue);
    for (let i = 0; i < queue.recordset.length; i++) {
        const element = queue.recordset[i];
        const { email, user_id, order_id } = element;
        try {
            yield (0, queue_controller_1.updateStatusRecord)(`${user_id}`, `${order_id}`, "IN_PROGRESS");
            yield (0, email_1.default)(email);
            yield (0, queue_controller_1.updateStatusRecord)(`${user_id}`, `${order_id}`, "DONE");
            yield (0, queue_controller_1.deleteQueuedRecord)(`${user_id}`, `${order_id}`);
        }
        catch (error) { }
    }
}));
