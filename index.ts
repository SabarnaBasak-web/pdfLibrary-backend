import express from "express";
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
import bodyParser from "body-parser";
import cors from "cors";
dotEnv.config({ path: path.resolve(__dirname, "../.env") });
const app = express();
const PORT = process.env.PORT;
Author.hasOne(Ebook);
Category.hasMany(Ebook);
UserModel.hasOne(Ebook);

var whitelist = ["http://127.0.0.1:5173"];
var corsOptions = {
  origin: function (origin: any, callback: any) {
    console.log("origin", origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

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
