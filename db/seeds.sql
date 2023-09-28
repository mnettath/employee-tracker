INSERT INTO department (id, name)
VALUES (1, "Engineering"),
       (2, "Finance"),
       (3, "Legal"),
       (4, "Sales");

INSERT INTO role ( title, salary, department_id)
VALUES ("Sales Lead", 100000, 4),
       ("Salesperson", 80000, 4),
       ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000, 1),
       ("Account Manager", 160000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", ),
       (),
       (),
       (),
       ();