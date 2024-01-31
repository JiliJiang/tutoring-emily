const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
  },
{
   
    sequelize,
    timestamps: false,
    underscores: true,
    freezeTableName: true,
    modelName: "recipe",
  }
);

module.exports = Recipe;
