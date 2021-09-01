const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Department extends Model {}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
  },
  {
    // If time allows, add hook to uppercase first letter of each department word

    // hooks: {
    //   beforeCreate: async (newDepartmentData) => {
    //     newUserData.email = await newUserData.email.toLowerCase();
    //     return newUserData;
    //   },
    //   beforeUpdate: async (updatedUserData) => {
    //     updatedUserData.email = await updatedUserData.email.toLowerCase();
    //     return updatedUserData;
    //   },
    // },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "department",
  }
);

module.exports = Department;
