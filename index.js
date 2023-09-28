const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db`)
);

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
  .then((data) => {
    switch (data.selection) {
      case "View all Employees":
        viewAllEmployees();
        break;
    }
  });

// need to add code: when user selects View all Employees, the table for employee must populate
function viewAllEmployees() {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
}
