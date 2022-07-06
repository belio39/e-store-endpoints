import cron from "node-cron";
import emailService from "./emailServices/email";

import {
  getPendingQueues,
  updateStatusRecord,
  deleteQueuedRecord,
} from "../controllers/queue-controller";

cron.schedule("*/4 * * * * *", async () => {
  const queue = await getPendingQueues();

  console.log(queue);

  for (let i = 0; i < queue.recordset.length; i++) {
    const element = queue.recordset[i];
    const { email, user_id, order_id } = element;

    try {
      await updateStatusRecord(`${user_id}`, `${order_id}`, "IN_PROGRESS");
      await emailService(email);
      await updateStatusRecord(`${user_id}`, `${order_id}`, "DONE");
      await deleteQueuedRecord(`${user_id}`, `${order_id}`);
    } catch (error) {}
  }
});
