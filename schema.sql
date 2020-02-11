DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_DB;

-- Run this query if SQL is giving and error - Example.... Client does not support authentication protocol requested by server; consider upgrading MySQL client',
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourRootPassword';

CREATE TABLE department (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL, 
  salary DECIMAL NOT NULL default 0,
  department_id INT NOT NULL,
  CONSTRAINT fk_department FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
	CONSTRAINT fk_role FOREIGN KEY (role_id) 
		REFERENCES role(id),
  manager_id INT NULL,
	CONSTRAINT fk_manager FOREIGN KEY (manager_id)
		REFERENCES employee(id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;


INSERT INTO department (department_name) 
VALUES 
('Engineer'), 
('Sales'), 
('Marketing'), 
('Finance'), 
('Human Resources');


INSERT INTO role (title, salary, department_id) 
VALUES 
('Lead Engineer', 150000, 1), 
('Software Engineer', 80000, 1), 
('Salesperson', 100000, 2), 
('Marketing Coordinator', 60000, 3), 
('Accountant', 90000, 4), 
('Human Resource Generalist', 65000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
('Jane', 'Austen', 2, null), 
('Mark', 'Twain', 3, null), 
('Lewis', 'Carroll', 1, null), 
('Andre', 'Asselin', 5, null), 
("Lou", "Reed", 6, null), 
("Johnny", "Rotton", 4, null);

