"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const DbConfig_1 = require("./DbConfig/DbConfig");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const sequelise = new sequelize_1.Sequelize(DbConfig_1.dbConfigDetails.database, DbConfig_1.dbConfigDetails.username, DbConfig_1.dbConfigDetails.password, {
    host: DbConfig_1.dbConfigDetails.host,
    port: DbConfig_1.dbConfigDetails.port,
    dialect: "postgres",
});
sequelise
    .authenticate()
    .then((res) => console.log("Connection successfull ✔️"))
    .catch((error) => console.warn("An error occured ", error, "🔻"));
app.get("/", (req, res) => {
    res.send("Hello Expressjs with typescript!!");
});
app.listen(PORT, () => {
    console.log(`🚀 App listening to port ${PORT}`);
});
