const { prompt } = require("inquirer");
const express = require("express");
const mysql = require("mysql2");

const app = express();

// Import the connection object
const sequelize = require("./config/connection");

// turn on connection to db and server
// force true to drop and recreate table(s) on every sync
sequelize
  .sync({ force: false })
  .then(mainMenu())
  .catch((err) => console.log(err));

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
          name: "View All Employees By Department",
          value: "viewEmplsByDept",
        },
        {
          name: "View All Employees By Manager",
          value: "viewEmplsByMan",
        },
        {
          name: "Add Employee",
          value: "newEmpl",
        },
        {
          name: "Remove Employee",
          value: "removeEmpl",
        },
        {
          name: "Update Employee Role",
          value: "updtEmplRole",
        },
        {
          name: "Update Employee Manager",
          value: "updtEmplMan",
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
          name: "Remove Role",
          value: "removeRole",
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
          name: "Remove Department",
          value: "removeDept",
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
      return "View All Employee Fn";
      break;
    case "viewEmplsByDept":
      return "View all Empls by Dept Fn";
      break;
    case "viewEmplsByMan":
      return "View Empls by Man Fn";
      break;
    case "addEmpl":
      return "Add an Empls Fn";
      break;
    case "removeEmpl":
      return "Remove an Empl Fn";
      break;
    case "updtEmplRole":
      return "Update Empl Role Fn";
      break;
    case "updtEmplMan":
      return "Update Empl Man Fn";
      break;
    case "allRoles":
      return "Show all roles Fn";
      break;
    case "removeRole":
      return "Remove role Fn";
      break;
    case "allDepts":
      return "Show all Depts Fn";
      break;
    case "newDept":
      return "Add a new dept Fn";
      break;
    case "removeDept":
      return "Remove a dept Fn";
      break;
    default:
      console.log("Exited out of the program");
  }
}
