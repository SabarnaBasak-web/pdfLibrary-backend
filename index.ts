import express, { Request, Response } from "express";
import dotEnv from "dotenv";
import path from "path";
import { sequelize } from "./DbConfig";
import Ebook from "./models/Ebook";
import { router as EbookRouter } from "./router/EbookRouter";
dotEnv.config({ path: path.resolve(__dirname, "../.env") });
const app = express();

app.use(express.json());
const PORT = process.env.PORT;

sequelize
  .authenticate()
  .then(() => console.log("Authenticated ✅"))
  .catch((err) => console.log(err));

sequelize
  .sync({ alter: true })
  .then(() => console.log("Synced ✔️"))
  .catch((err) => console.log(err));
app.use("/ebook", EbookRouter);
app.listen(PORT, () => {
  console.log(`🚀App listening to port➡️  ${PORT}`);
});
