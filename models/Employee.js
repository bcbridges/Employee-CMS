const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "role",
        key: "id",
      },
    },
    manager_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "employee",
        key: "id",
      },
    },
  },
  {
    // If time allows, add hook to uppercase first letter of each department word
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "employee",
  }
);

module.exports = Employee;
