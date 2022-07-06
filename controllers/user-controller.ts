import { v4 as uuid } from "uuid";
import { RequestHandler, Request, Response } from "express";
import { UserSchema } from "../models/user-schema";
import mssql from "mssql";
import sqlConfig from "../config/config";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

interface RequestExtended extends Request {
  user?: any;
}

export const createUser = async (req: Request, res: Response) => {
  const id = uuid();

  // console.log({ req, id });

  try {
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
      const user = await pool
        .request()
        .input("id", mssql.VarChar, id)
        .input("fullName", mssql.VarChar, fullName)
        .input("userName", mssql.VarChar, userName)
        .input("email", mssql.VarChar, email)
        .input("password", mssql.VarChar, hashedPassword)
        .execute("createusers");

      const queue = await pool
        .request()
        .input("user_id", mssql.VarChar, id)
        .input("order_id", mssql.VarChar, "")
        .input("type", mssql.VarChar, "REGISTRATION")
        .execute("createQueue");

      res.status(200).json({
        message: "User Created Successfully!",
      });

      console.log({ queue });
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
    console.log({ error });

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

export const login: RequestHandler = async (req, res) => {
  try {
    let pool = await mssql.connect(sqlConfig);
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password!",
      });
    }

    const user = await pool
      .request()
      .input("email", mssql.VarChar, email)
      .execute("getUserByEmail");

    if (!user.recordset[0]) {
      return res.status(400).json({
        message: `Invalid credentials`,
      });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      user.recordset[0].password
    );
    if (!passwordMatch) {
      return res.status(400).json({ message: `Invalid credentials` });
    }
    const { password: _, ...details } = user.recordset[0];

    const token = await jwt.sign(
      { id: details.id },
      process.env.SECRET_KEY as string,
      { expiresIn: "24h" }
    );

    res.json({ message: "Login Successfulll", user: details, token });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const resetPassWord: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    let pool = await mssql.connect(sqlConfig);
    const { password } = req.body as { password: string };
    const user = await pool
      .request()
      .input("id", mssql.VarChar, id)
      .execute("getUserById");
    if (!user.recordset[0]) {
      return res.status(400).json({
        message: `No user with that ID ${id}`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool
      .request()
      .input("id", mssql.VarChar, id)
      .input("password", mssql.VarChar, hashedPassword)
      .execute("resetPassWord");
    res.status(200).json({
      messege: "Password reset was successful",
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};
