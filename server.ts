import express from "express";
import mssql from "mssql";
import cors from "cors";
import donenv from "dotenv";
import sqlConfig from "./config/config";
import userRouter from "./routes/user-routes";
import productRouter from "./routes/products-routes";
import orderRouter from "./routes/order-routes";
import orderItemsRouter from "./routes/orderItems-routes";

donenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/orderItems", orderItemsRouter);
const connection = async () => {
  try {
    const conn = await mssql.connect(sqlConfig);
    if (conn.connected) {
      console.log("Connected to DB");
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

connection();

const port = process.env.Port || 3000;
app.listen(port, () => {
  console.log(`App listening to ${port}`);
});
