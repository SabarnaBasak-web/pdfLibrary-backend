import express, { Request, Response } from "express";
import dotEnv from "dotenv";
import path from "path";
import { Sequelize } from "sequelize";
import { dbConfigDetails } from "./DbConfig/DbConfig";
dotEnv.config({ path: path.resolve(__dirname, "../.env") });
const app = express();

const PORT = process.env.PORT;

const sequelise = new Sequelize(
  dbConfigDetails.database,
  dbConfigDetails.username,
  dbConfigDetails.password,
  {
    host: dbConfigDetails.host,
    port: dbConfigDetails.port,
    dialect: "postgres",
  }
);

sequelise
  .authenticate()
  .then((res) => console.log("Connection successfull ✔️"))
  .catch((error) => console.warn("An error occured ", error, "🔻"));
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Expressjs with typescript!!");
});
app.listen(PORT, () => {
  console.log(`🚀App listening to port➡️  ${PORT}`);
});
