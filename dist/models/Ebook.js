"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ebook = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../DbConfig/index");
class Ebook extends sequelize_1.Model {
}
exports.Ebook = Ebook;
Ebook.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    fileName: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    tableName: "Ebook",
    sequelize: index_1.sequelize, // This is the Sequelize instance
});
exports.default = Ebook;
