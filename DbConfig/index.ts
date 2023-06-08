import { Sequelize } from "sequelize";
import { dbConfigDetails } from "./DbConfig";

export const sequelize = new Sequelize(
  dbConfigDetails.database,
  dbConfigDetails.username,
  dbConfigDetails.password,
  {
    host: dbConfigDetails.host,
    port: dbConfigDetails.port,
    dialect: "postgres",
  }
);
