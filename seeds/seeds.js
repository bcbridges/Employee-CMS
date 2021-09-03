const sequelize = require("../config/connection");
const { Department, Role, Employee } = require("../models");

const departmentSeedData = require("./departmentSeedData.json");
const roleSeedData = require("./roleSeedData.json");
const employeeSeedData = require("./employeeSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const department = await Department.bulkCreate(departmentSeedData);
  const role = await Role.bulkCreate(roleSeedData);
  const employee = await Employee.bulkCreate(employeeSeedData);

  process.exit(0);
};

seedDatabase();
