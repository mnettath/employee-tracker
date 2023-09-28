const inquirer = require("inquirer");
const dbFunctions = require("./dbFunctions");

inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit",
      ],
      name: "selection",
    },
  ])
  .then((answer) => {
    switch (answer.selection) {
      case "View all Employees":
        dbFunctions.viewAllEmployees();
        break;
      case "Add Employee":
        dbFunctions.addEmployee();
        break;
      case "Update Employee Role":
        dbFunctions.updateRole();
        break;
      case "View All Roles":
        dbFunctions.viewAllRoles();
        break;
      case "Add Role":
        dbFunctions.addRole();
        break;
      case "View All Departments":
        dbFunctions.viewAllDepartments();
        break;
      case "Add Department":
        dbFunctions.addDepartment();
        break;
    }
  });
