import mssql from "mssql";
import sqlConfig from "../config/config";
import dotenv from "dotenv";

dotenv.config();

export const getPendingQueues: any = async () => {
  try {
    let pool = await mssql.connect(sqlConfig);
    return await pool.request().execute("getPendingQueues");
  } catch (error: any) {
    console.log(error);
  }
};

export const updateStatusRecord: any = async (
  user_id: any,
  order_id: any,
  status: any
) => {
  try {
    let pool = await mssql.connect(sqlConfig);
    return await pool
      .request()
      .input("user_id", mssql.VarChar, user_id)
      .input("order_id", mssql.VarChar, order_id)
      .input("status", mssql.VarChar, status)
      .execute("updateStatusRecord");
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteQueuedRecord: any = async () => {
  try {
    let pool = await mssql.connect(sqlConfig);
    return await pool.request().execute("deleteQueuedRecord");
  } catch (error: any) {
    console.log(error);
  }
};
