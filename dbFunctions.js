const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db`)
);

// User selects: "View all Employees"
// Table for employee must populate
function viewAllEmployees() {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
}

// User selects: "View All Roles"
// Table for Roles must populate
function viewAllRoles() {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
}

// User selects: "View All Departments"
// Table for departments must populate
function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(results);
    }
  });
}

module.exports = { viewAllEmployees, viewAllRoles, viewAllDepartments };
