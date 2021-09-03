const inquirer = require("inquirer");
const { Department, Role, Employee } = require("../models");

class Questions {
  newDepartment() {
    inquirer
      .prompt({
        type: "input",
        message: "What is the name of the new department?",
        name: "newDeptName",
      })
      .then((res) => {
        Department.create({
          name: res.newDeptName,
        });
      });
  }
}

module.exports = Questions;
