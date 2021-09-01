const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Role = require("./Role");

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
    modelName: "employee",
  }
);

// Defines association to dbo.role
Role.hasMany(Employee);

// Defines self-association from manager_id to id
Employee.hasMany(Employee);

module.exports = Employee;
