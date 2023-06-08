"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const sequelize_1 = require("sequelize");
const DbConfig_1 = require("../DbConfig");
class Author extends sequelize_1.Model {
}
exports.Author = Author;
Author.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
}, { tableName: "Author", sequelize: DbConfig_1.sequelize });
