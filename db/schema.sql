DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

-- tables go here -- 

-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/

USE employees_db;

CREATE TABLE department (
    id INT  NOT NULL ,
    name VARCHAR(30) NOT NULL ,
    CONSTRAINT PK_department PRIMARY KEY CLUSTERED (
        id ASC
    )
);

CREATE TABLE role (
    id INT  NOT NULL ,
    title VARCHAR(30)  NOT NULL ,
    salary DECIMAL  NOT NULL ,
    department_id INT  NOT NULL ,
    CONSTRAINT PK_role PRIMARY KEY CLUSTERED (
        id ASC
    )
);

CREATE TABLE employee (
    id INT  NOT NULL ,
    first_name VARCHAR(30)  NOT NULL ,
    last_name VARCHAR(30)  NOT NULL ,
    role_id INT  NOT NULL ,
    manager_id INT  NULL ,
    CONSTRAINT PK_employee PRIMARY KEY CLUSTERED (
        id ASC
    )
)

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;