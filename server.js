const { prompt } = require("inquirer");
const router = require("express").Router();
const mysql = require("mysql2");
const { Department, Role, Employee } = require("./models");
const logo = require("asciiart-logo");
const cTable = require("console.table");

// Import the connection object
const sequelize = require("./config/connection");
const { response } = require("express");
// turn on connection to db and server
// force true to drop and recreate table(s) on every sync
start();
function start() {
  const logoText = logo({ name: "Employee CMS" }).render();
  console.log(logoText);
  sequelize
    .sync({ force: false, logging: false })
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
          value: "addEmpl",
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
    case "allRoles":
      return allRoles();
      break;
    case "allDepts":
      return allDepts();
      break;
    case "addEmpl":
      return addEmpl();
      break;
    case "updtEmplRole":
      return updateEmplRole();
      break;
    case "newDept":
      return addDept();
    case "newRole":
      return addRole();
      break;

    default:
      process.exit();
  }
}

async function allEmpls() {
  try {
    const employees = await Employee.findAll({
      attributes: ["id", "first_name", "last_name"],
      include: {
        model: Role,
        attributes: ["title"],
      },
    });
    const employeeClean = employees
      .map((empl) => empl.get({ plain: true }))
      .map((emp) => {
        emp.role = emp.role.title;
        return emp;
      });
    console.log(employeeClean);
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

function addDept() {
  const { newDept } = prompt([
    {
      type: "input",
      name: "deptName",
      message: "What is the name of the new department?",
    },
  ]).then((res) => {
    Department.create({
      name: res.deptName,
    });
    console.log("\n\n");
    console.log("The department has been added!");
    console.log("\n");
    mainMenu();
  });
}

async function addRole() {
  const deptRaw = await Department.findAll();
  const cleanDept = deptRaw
    .map((dept) => dept.get({ plain: true }))
    .map(({ name }) => name);
  const newRole = await prompt([
    {
      type: "input",
      name: "roleName",
      message: "What is the name of the new role?",
    },
    {
      type: "input",
      name: "salRange",
      message: "What is the salary range of the new role?",
    },
    {
      type: "list",
      name: "department",
      message: "What department does this new role belong to?",
      choices: cleanDept,
    },
  ]).then(async (res) => {
    const deptIdRaw = await Department.findOne({
      where: { name: res.department },
    });
    Role.create({
      title: res.roleName,
      salary: res.salRange,
      department_id: deptIdRaw.dataValues.id,
    });
    console.log("\n\n");
    console.log("The role has been added!");
    console.log("\n");
    mainMenu();
  });
}

async function addEmpl() {
  const roleRaw = await Role.findAll();
  const cleanRole = roleRaw
    .map((role) => role.get({ plain: true }))
    .map(({ title }) => title);
  const manRaw = await Employee.findAll();
  const cleanMan = manRaw
    .map((empl) => empl.get({ plain: true }))
    .map(({ id, first_name, last_name }) => {
      return id + " : " + first_name + " " + last_name;
    });

  const newEmpl = await prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?",
    },
    {
      type: "list",
      name: "role",
      message: "What is the employee's role?",
      choices: cleanRole,
    },
    {
      type: "list",
      name: "manager",
      message: "Who is the employee's manager?",
      choices: cleanMan,
    },
  ]).then(async (res) => {
    const roleIdRaw = await Role.findOne({
      where: { title: res.role },
    });
    const managerId = parseInt(res.manager.charAt(0));

    Employee.create({
      first_name: res.firstName,
      last_name: res.lastName,
      role_id: roleIdRaw.dataValues.id,
      manager_id: managerId,
    });
    console.log("\n\n");
    console.log("The employee has been added!");
    console.log("\n");
    mainMenu();
  });
}

async function updateEmplRole() {
  const roleRaw = await Role.findAll();
  const cleanRole = roleRaw
    .map((role) => role.get({ plain: true }))
    .map(({ title }) => title);

  const emplRaw = await Employee.findAll();
  const emplClean = emplRaw
    .map((empl) => empl.get({ plain: true }))
    .map(({ id, first_name, last_name }) => {
      return id + " : " + first_name + " " + last_name;
    });
  await prompt([
    {
      type: "list",
      name: "employee",
      message: "Who would you like to update?",
      choices: emplClean,
    },
    {
      type: "list",
      name: "role",
      message: "What is their new role?",
      choices: cleanRole,
    },
  ]).then(async (res) => {
    const roleIdRaw = await Role.findOne({
      where: { title: res.role },
    });

    const emplId = parseInt(res.employee.charAt(0));

    Employee.update(
      { role_id: roleIdRaw.dataValues.id },
      { where: { id: emplId } }
    );

    console.log("\n\n");
    console.log("The employee's role has been updated'!");
    console.log("\n");
    mainMenu();
  });
}
