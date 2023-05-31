import path from "path";
import dotEnv from "dotenv";

dotEnv.config({ path: path.resolve(__dirname, "../../.env") });
export const dbConfigDetails = {
  host: process.env.DB_HOST || "",
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",
  port: parseInt(process.env.DB_PORT || "0") || 0,
  database: process.env.DB_DATABASE || "",
};
