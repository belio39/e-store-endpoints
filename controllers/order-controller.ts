import { v4 as uuid } from "uuid";
import { Request, RequestHandler, Response } from "express";
import mssql from "mssql";
import sqlConfig from "../config/config";
import dotenv from "dotenv";
import { OrderSchema } from "../models/order-schema";

dotenv.config();

interface RequestExtended extends Request {
  order?: any;
}

export const createOrders = async (req: Request, res: Response) => {
  try {
    const id = uuid();
    const { user_id, total } = req.body as {
      user_id: string;
      total: number;
    };
    let pool = await mssql.connect(sqlConfig);
    const { error } = OrderSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    } else {
      await pool
        .request()
        .input("id", mssql.VarChar, id)
        .input("user_id", mssql.VarChar, user_id)
        .input("total", mssql.VarChar, total)
        .execute("createorders");

      res.status(200).json({
        message: "Product Created Successfully!",
      });
    }
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
  console.log(req.body);
};

export const getAllOrders: RequestHandler = async (req, res) => {
  try {
    let pool = await mssql.connect(sqlConfig);
    const orders = await pool.request().execute("getAllOrders");
    res.status(200).json({
      message: "Success",
      orders,
    });
  } catch (error: any) {
    res.status(200).json({ error: error.message });
  }
};

export const getOrderById: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const id = req.params.id;
    let pool = await mssql.connect(sqlConfig);
    const order = await pool
      .request()
      .input("id", mssql.VarChar, id)
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
  } catch (error: any) {
    res.status(200).json({
      error: error.message,
    });
  }
};

export const deleteOrder = async (req: RequestExtended, res: Response) => {
  try {
    const id = req.params.id;
    let pool = await mssql.connect(sqlConfig);
    const order = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("getOrderById");

    if (!order.recordset[0]) {
      return res.status(400).json({
        message: `Product with ID : ${id} Does Not exist`,
      });
    }
    await pool.request().input("id", mssql.VarChar, id).execute("deleteOrder");
    res.status(200).json({
      message: "Order Successfully deleted",
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};
