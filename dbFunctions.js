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
      console.table(results);
      ``;
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

// UPDATE EMPLOYEE ROLE
// which employee's role would you like to update? (list)
// which role do you want to assign to the selected employee? (list)
// updated employee's role?
function updateRole() {
  db.query(
    // going into employee table and setting first_name and last_name to employee_name
    "SELECT CONCAT (first_name, ' ', last_name) AS employee_name FROM employee",
    (err, res) => {
      if (err) {
        console.log(err);
        return;
      }

      // creates a new array given the results from the db query
      // we want to return the employee_name
      const employeeNames = res.map((result) => result.employee_name);

      // going into the role table and selecting the titles
      db.query("SELECT title FROM role", (err, res) => {
        if (err) {
          console.log(err);
          return;
        }
        // creates a new array given the results from the db query, we want to return only titles
        const roles = res.map((result) => result.title);

        inquirer
          .prompt([
            {
              type: "list",
              message: "Which employee's role would you like to update?",
              choices: employeeNames,
              name: "reassignedEmployee",
            },
            {
              type: "list",
              message:
                "Which role do you want to assign to the selected employee?",
              choices: roles,
              name: "reassignedRole",
            },
          ])
          .then((answers) => {
            console.log("Updated employee's role.");
          });
      });
    }
  );
}

// User selects: "View All Roles"
// Table for Roles must populate
function viewAllRoles() {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.table(results);
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
      console.table(results);
    }
  });
}

// ADD DEPARTMENT
// What is the name of the department?
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "department",
      },
    ])
    .then((answers) => {
      const query = `INSERT INTO department (name) VALUES (?)`;

      db.query(query, [answers.department], (err, res) => {
        if (err) {
          console.log("Error inserting department:", err);
        } else {
          console.log("This department has been added to the db.");
        }
      });
    });
}

// QUIT?

module.exports = {
  viewAllEmployees,
  updateRole,
  addEmployee,
  viewAllRoles,
  addRole,
  viewAllDepartments,
  addDepartment,
};
