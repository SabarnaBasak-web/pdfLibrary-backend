"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const DbConfig_1 = require("./DbConfig");
exports.sequelize = new sequelize_1.Sequelize(DbConfig_1.dbConfigDetails.database, DbConfig_1.dbConfigDetails.username, DbConfig_1.dbConfigDetails.password, {
    host: DbConfig_1.dbConfigDetails.host,
    port: DbConfig_1.dbConfigDetails.port,
    dialect: "postgres",
});
