import { Model, DataTypes } from "sequelize";
import { sequelize } from "../DbConfig";

export class Author extends Model {
  public id!: number;
  public name!: string;
}

Author.init(
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
  { tableName: "Author", sequelize }
);
