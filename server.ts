import express from "express";
import mssql from "mssql";
import donenv from "dotenv";
import sqlConfig from "./config/config";
import router from "./routes/user-routes";

donenv.config();

const app = express();
app.use(express.json());
app.use("/", router);

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
