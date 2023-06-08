import { Model, DataTypes } from "sequelize";
import { sequelize } from "../DbConfig/index";

export class Ebook extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public fileName!: string;
}

Ebook.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    fileName: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Ebook",
    sequelize, // This is the Sequelize instance
  }
);

export default Ebook;
