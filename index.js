const inquirer = require("inquirer");

// Import the connection object
const sequelize = require("./config/connection");

//Inquirer example
inquirer.prompt([
  {
    type: "input",
    message: questions[0],
    name: "appTitle",
  },
]);

// Add function to ask view all depts, view all roles, view all employees, add a dept, add a role, add an empl, and update employee role.

// depts - department names & roles

// roles - job title, role id, the dept that role belongs to, the salary for that role

// empls - employee id, first name, last name, job titles, departments, salaries, managers

// add dept - enter department name

// add role - name, salary, and department for that role

// add empl - first name, last name, role, & manager

// add empl role - select empl from list and update their role

// BONUS

// Update empl managers
// View empls by manager
// View empls by dept
// Delete depts, roles, and empls
// View the total utilized budget of a department
