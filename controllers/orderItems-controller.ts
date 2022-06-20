import { v4 as uuid } from "uuid";
import { Request, RequestHandler, Response } from "express";
import mssql from "mssql";
import sqlConfig from "../config/config";
import dotenv from "dotenv";
import { Order_ItemsSchema } from "../models/orderItems";

dotenv.config();

interface RequestExtended extends Request {
  order?: any;
}

export const createorderitems = async (req: Request, res: Response) => {
  try {
    const id = uuid();
    const { order_id, product_id } = req.body as {
      order_id: string;
      product_id: string;
    };
    let pool = await mssql.connect(sqlConfig);
    const { error } = Order_ItemsSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    } else {
      await pool
        .request()
        .input("id", mssql.VarChar, id)
        .input("order_id", mssql.VarChar, order_id)
        .input("product_id", mssql.VarChar, product_id)
        .execute("createorderitems");

      res.status(200).json({
        message: "Product Created Successfully!",
      });
    }
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const getAllOrderIitems: RequestHandler = async (req, res) => {
  try {
    let pool = await mssql.connect(sqlConfig);
    const orderItem = await pool.request().execute("getAllOrderIitems");
    res.status(200).json({
      message: "Success",
      orderItem,
    });
  } catch (error: any) {
    res.status(200).json({ error: error.message });
  }
};

export const getOrderItemById: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const id = req.params.id;
    let pool = await mssql.connect(sqlConfig);
    const orderItem = await pool
      .request()
      .input("id", mssql.VarChar, id)
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
  } catch (error: any) {
    res.status(200).json({
      error: error.message,
    });
  }
};

export const deleteOrderItem = async (req: RequestExtended, res: Response) => {
  try {
    const id = req.params.id;
    let pool = await mssql.connect(sqlConfig);
    const orderItem = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("getOrderItemById");

    if (!orderItem.recordset[0]) {
      return res.status(400).json({
        message: `OrderItems with ID : ${id} Does Not exist`,
      });
    }
    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("deleteOrderItem");
    res.status(200).json({
      message: "Order Items Successfully deleted",
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
  console.log(req.body);
};
