import { Model, DataTypes } from "sequelize";
import { sequelize } from "../DbConfig";

export class Category extends Model {
  public id!: number;
  public name!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { tableName: "Category", sequelize }
);
