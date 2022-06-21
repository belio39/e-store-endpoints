import { v4 as uuid } from "uuid";
import { Request, RequestHandler, Response } from "express";
import mssql from "mssql";
import { ProductSchema } from "../models/product-schema";
import sqlConfig from "../config/config";
import dotenv from "dotenv";

dotenv.config();

interface RequestExtended extends Request {
  user?: any;
}

export const createProducts = async (req: Request, res: Response) => {
  try {
    const id = uuid();
    const { name, imageUrl, price, quantity } = req.body as {
      name: string;
      imageUrl: string;
      price: string;
      quantity: string;
    };
    let pool = await mssql.connect(sqlConfig);
    const { error } = ProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    } else {
      await pool
        .request()
        .input("id", mssql.VarChar, id)
        .input("name", mssql.VarChar, name)
        .input("price", mssql.VarChar, price)
        .input("imageUrl", mssql.VarChar, imageUrl)
        .input("quantity", mssql.VarChar, quantity)
        .execute("createProducts");

      res.status(200).json({
        message: "Product Created Successfully!",
      });
    }
  } catch (error: any) {
    res.json({ error: error.message });
  }
};

export const getAllProducts: RequestHandler = async (req, res) => {
  try {
    const { currentPage, itemsPerPage } = req.query;

    console.log({ currentPage, itemsPerPage });

    let pool = await mssql.connect(sqlConfig);
    const products = await pool
      .request()

      .input("itemsPerPage", mssql.VarChar, itemsPerPage)
      .input(
        "offset",
        mssql.VarChar,
        `${(Number(currentPage) - 1) * Number(itemsPerPage)}`
      )
      .execute("getAllProducts");

    const totalItems = products.recordsets[1][0].totalItems;
    const totalPages = Math.ceil(Number(totalItems) / Number(itemsPerPage));
    res.status(200).json({
      message: "Succcess",
      products: products.recordsets[0],
      totalItems,
      totalPages,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getProductById: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const id = req.params.id;
    let pool = await mssql.connect(sqlConfig);
    const product = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("getProductById");

    if (!product.recordset[0]) {
      res.status(400).json({
        message: `Product with ${id} does not exits`,
      });
    }
    res.status(200).json({
      message: "Success",
      data: product.recordset,
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const updateProduct: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const id = req.params.id;
    let pool = await mssql.connect(sqlConfig);
    const { name, imageUrl, price, quantity } = req.body as {
      name: string;
      imageUrl: string;
      price: string;
      quantity: string;
    };
    if (!name || !imageUrl || !price || !quantity) {
      return res.status(400).json({
        message: "Please fill in all the details to continue",
      });
    }
    const product = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("getProductById");
    if (!product.recordset[0]) {
      return res.status(400).json({
        message: `No Product with that ${id}`,
      });
    }
    await pool
      .request()
      .input("id", mssql.VarChar, product.recordset[0].id)
      .input("name", mssql.VarChar, name)
      .input("imageUrl", mssql.VarChar, imageUrl)
      .input("price", mssql.VarChar, price)
      .input("quantity", mssql.VarChar, quantity)
      .execute("updateProduct");

    res.status(200).json({
      message: "Product Update Successfully ",
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const deleteProduct = async (req: RequestExtended, res: Response) => {
  try {
    const id = req.params.id;
    let pool = await mssql.connect(sqlConfig);
    const product = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("getProductById");

    if (!product.recordset[0]) {
      return res.status(400).json({
        message: `Product with ID : ${id} Does Not exist`,
      });
    }
    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("deleteProduct");
    res.status(200).json({
      message: "Product Successfully deleted",
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};
