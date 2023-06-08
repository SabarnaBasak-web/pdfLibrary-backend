import express, { Request, Response } from "express";
import dotEnv from "dotenv";
import path from "path";
import { sequelize } from "./DbConfig";
import Ebook from "./models/Ebook";
import { Author } from "./models/Author";
import { router as EbookRouter } from "./router/EbookRouter";
import { Category } from "./models/Category";
import { router as CategoryRouter } from "./router/CategoryRouter";
import { User as UserModel } from "./models/User.model";
import { router as UserRouter } from "./router/UserRouter";

dotEnv.config({ path: path.resolve(__dirname, "../.env") });
const app = express();

Author.hasOne(Ebook);
Category.hasMany(Ebook);
UserModel.hasOne(Ebook);

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
app.use("/category", CategoryRouter);
app.use("/user", UserRouter);
app.listen(PORT, () => {
  console.log(`🚀App listening to port➡️  ${PORT}`);
});
