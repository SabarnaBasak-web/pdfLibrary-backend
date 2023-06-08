"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const DbConfig_1 = require("./DbConfig");
const Ebook_1 = __importDefault(require("./models/Ebook"));
const Author_1 = require("./models/Author");
const EbookRouter_1 = require("./router/EbookRouter");
const Category_1 = require("./models/Category");
const CategoryRouter_1 = require("./router/CategoryRouter");
const User_model_1 = require("./models/User.model");
const UserRouter_1 = require("./router/UserRouter");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const app = (0, express_1.default)();
Author_1.Author.hasOne(Ebook_1.default);
Category_1.Category.hasMany(Ebook_1.default);
User_model_1.User.hasOne(Ebook_1.default);
app.use(express_1.default.json());
const PORT = process.env.PORT;
DbConfig_1.sequelize
    .authenticate()
    .then(() => console.log("Authenticated ✅"))
    .catch((err) => console.log(err));
DbConfig_1.sequelize
    .sync({ alter: true })
    .then(() => console.log("Synced ✔️"))
    .catch((err) => console.log(err));
app.use("/ebook", EbookRouter_1.router);
app.use("/category", CategoryRouter_1.router);
app.use("/user", UserRouter_1.router);
app.listen(PORT, () => {
    console.log(`🚀App listening to port➡️  ${PORT}`);
});
