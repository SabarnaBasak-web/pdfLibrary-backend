"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const DbConfig_1 = require("./DbConfig");
const EbookRouter_1 = require("./router/EbookRouter");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const app = (0, express_1.default)();
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
app.listen(PORT, () => {
    console.log(`🚀App listening to port➡️  ${PORT}`);
});
