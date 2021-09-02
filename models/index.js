const Department = require("./Department");
const Employee = require("./Employee");
const Role = require("./Role");

// Define a Driver as having many Cars, thus creating a foreign key in the `car` table
Department.hasMany(Role, {
  foreignKey: "department_id",
  onDelete: "CASCADE",
});

Role.hasMany(Employee, {
  foreignKey: "role_id",
  onDelete: "CASCADE",
});

Employee.hasMany(Employee, {
  foreignKey: "employee_id",
  onDelete: "CASCADE",
});

module.exports = { Employee, Role, Department };
