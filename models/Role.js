const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Department = require("./Department");

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    salary: {
      type: DataTypes.DECIMAL,
      allowNull: false,
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
    modelName: "role",
  }
);

Department.hasMany(Role);

module.exports = Role;
