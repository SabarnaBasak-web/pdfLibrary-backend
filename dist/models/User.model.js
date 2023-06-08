"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const DbConfig_1 = require("../DbConfig");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, { tableName: "User", sequelize: DbConfig_1.sequelize });
