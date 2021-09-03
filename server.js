const { prompt } = require("inquirer");
const router = require("express").Router();
const mysql = require("mysql2");
const { Department, Role, Employee } = require("./models");
const logo = require("asciiart-logo");
const cTable = require("console.table");

// Import the connection object
const sequelize = require("./config/connection");
// turn on connection to db and server
// force true to drop and recreate table(s) on every sync
start();
function start() {
  const logoText = logo({ name: "Employee CMS" }).render();
  console.log(logoText);
  sequelize
    .sync({ force: false })
    .then(mainMenu())
    .catch((err) => console.log(err));
}

async function mainMenu() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "Welcome! What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "viewEmpls",
        },
        {
          name: "Add Employee",
          value: "newEmpl",
        },
        {
          name: "Update Employee Role",
          value: "updtEmplRole",
        },
        {
          name: "View All Roles",
          value: "allRoles",
        },
        {
          name: "Add Role",
          value: "newRole",
        },
        {
          name: "View All Departments",
          value: "allDepts",
        },
        {
          name: "Add Department",
          value: "newDept",
        },
        {
          name: "Exit",
          value: "exit",
        },
      ],
    },
  ]);
  switch (choice) {
    case "viewEmpls":
      return allEmpls();
      break;
    case "addEmpl":
      return "Add Empl Fn";
      break;
    case "updtEmplRole":
      return "Update Empl Role Fn";
      break;
    case "updtEmplMan":
      return "Update Empl Man Fn";
      break;
    case "allRoles":
      return allRoles();
      break;
    case "allDepts":
      return allDepts();
      break;
    case "newDept":
      return "Add a new dept Fn";
      break;

    // BONUS Q's
    // case "viewEmplsByDept":
    //   return "View all Empls by Dept Fn";
    //   break;
    // case "viewEmplsByMan":
    //   return "View Empls by Man Fn";
    //   break;
    // case "removeEmpl":
    //   return "Remove an Empl Fn";
    //   break;
    // case "removeRole":
    //   return "Remove role Fn";
    //   break;
    // case "removeDept":
    //   return "Remove a dept Fn";
    //   break;

    default:
      process.exit();
  }
}

async function allEmpls() {
  try {
    const employees = await Employee.findAll();
    const employeeClean = employees.map((empl) => empl.get({ plain: true }));
    console.log("\n\n");
    console.table(employeeClean);
    mainMenu();
  } catch (err) {
    console.log("allEmpl API error.");
  }
}

async function allRoles() {
  try {
    const roles = await Role.findAll();
    const roleClean = roles.map((role) => role.get({ plain: true }));
    console.log("\n\n");
    console.table(roleClean);
    mainMenu();
  } catch (err) {
    console.log("allRole API error.");
  }
}

async function allDepts() {
  try {
    const depts = await Department.findAll();
    const deptClean = depts.map((dept) => dept.get({ plain: true }));
    console.log("\n\n");
    console.table(deptClean);
    mainMenu();
  } catch (err) {
    console.log("allDept API error.");
  }
}
