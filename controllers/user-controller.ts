import { v4 as uuid } from "uuid";
import { RequestHandler, Request, Response } from "express";
import mssql from "mssql";
import { UserSchema } from "../models/user-schema";
import sqlConfig from "../config/config";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

dotenv.config();

interface RequestExtended extends Request {
  user?: any;
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const id = uuid();
    const { fullName, userName, email, password } = req.body as {
      fullName: string;
      userName: string;
      email: string;
      password: string;
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    let pool = await mssql.connect(sqlConfig);
    const { error } = UserSchema.validate(req.body);
    if (error) {
      return res.json(error.details[0].message);
    } else {
      await pool
        .request()
        .input("id", mssql.VarChar, id)
        .input("fullName", mssql.VarChar, fullName)
        .input("userName", mssql.VarChar, userName)
        .input("email", mssql.VarChar, email)
        .input("password", mssql.VarChar, hashedPassword)
        .execute("createusers");
      res.status(200).json({
        message: "User Created Successfully!",
      });
    }
  } catch (error: any) {
    res.json({ error: error.message });
  }
};

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    let pool = await mssql.connect(sqlConfig);
    const users = await pool.request().execute("getAllUsers");
    const data = users.recordset.map((record) => {
      const { password, ...rest } = record;
      return rest;
    });
    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error: any) {
    res.json({ error: error.message });
  }
};

export const getUserById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id = req.params.id;
    let pool = await mssql.connect(sqlConfig);
    const user = await pool
      .request()
      .input("id", mssql.VarChar, id)
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
  } catch (error: any) {
    res.json({ error: error.message });
  }
};

export const deleteUser = async (req: RequestExtended, res: Response) => {
  try {
    const id = req.params.id;
    let pool = await mssql.connect(sqlConfig);
    const user = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("getUserById");
    if (!user.recordset[0]) {
      return res.json({
        message: `No user with ${id} Does Not exist`,
      });
    }
    await pool.request().input("id", mssql.VarChar, id).execute("deleteUser");
    res.status(200).json({
      message: "User Successfully deleted",
      data: user.recordset,
    });
  } catch (error: any) {
    res.json({
      error: error.message,
    });
  }
};
