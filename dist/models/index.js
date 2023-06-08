"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const DbConfig_1 = require("../DbConfig");
const EbookModel = DbConfig_1.sequelize.define("Ebook", {
    id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
}, {
    tableName: "Ebook",
});
module.exports = EbookModel;
