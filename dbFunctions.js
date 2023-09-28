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

// User selects: "Add Employee"
// Prompts:
// what is the employee's first name?
// what is the employee's last name?
// what is the employee's role (list)
// who is the employee's manager (list)
// Message: this employee has been added to the db

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
        ],
        name: "role",
      },
      {
        type: "list",
        message: "Who is this employee's manager?",
        choices: [
          "John Doe",
          "Mike Chan",
          "Ashely Rodriguez",
          "Kevin Tupik",
          "Kunal Singh",
        ],
        name: "manager",
      },
    ])
    .then((answers) => {
      // matches the departments to their ids
      const roleMappings = {
        "Sales Lead": 1,
        Salesperson: 2,
        "Lead Engineer": 3,
        "Software Engineer": 4,
        "Account Manager": 5,
      };

      // matches the managers to their ids
      const managerMappings = {
        "John Doe": 1,
        "Mike Chan": 2,
        "Ashley Rodriguez": 3,
        "Kevin Tupik": 4,
        "Kunal Singh": 5,
      };

      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

      const roleId = roleMappings[answers.role];
      const managerId = managerMappings[answers.manager];

      db.query(
        query,
        [answers.firstName, answers.lastName, roleId, managerId],
        (err, res) => {
          if (err) {
            console.log("Error inserting employee:", err);
          } else {
            console.log("This employee has been added to the db.");
          }
        }
      );
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

// User selects: "Add Role"
// What is the name of this role? input
// What is the salary of this role? input
// Which department does this role belong to? list
// Added "name of role" to the db
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of this role?",
        name: "role",
      },
      {
        type: "input",
        message: "What is the salary of this role?",
        name: "salary",
      },
      {
        type: "list",
        message: "Which department does this role belong to?",
        choices: ["Engineering", "Finance", "Legal", "Sales"],
        name: "department",
      },
    ])
    .then((answers) => {
      const departmentMappings = {
        Engineering: 1,
        Finance: 2,
        Legal: 3,
        Sales: 4,
      };

      const query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

      const departmentId = departmentMappings[answers.department];

      db.query(
        query,
        [answers.role, answers.salary, departmentId],
        (err, res) => {
          if (err) {
            console.log("Error inserting role:", err);
          } else {
            console.log("This role has been added to the db.");
          }
        }
      );
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

module.exports = {
  viewAllEmployees,
  addEmployee,
  viewAllRoles,
  addRole,
  viewAllDepartments,
};
