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
          value: "viewEmplsByDepts",
        },
        {
          name: "View All Employees By Manager",
          value: "ViewEmplsByMan",
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
          name: "exit",
          value: "exit",
        },
      ],
    },
  ]);
}
