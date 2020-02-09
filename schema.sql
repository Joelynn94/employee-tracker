DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;
USE employee_DB;

CREATE TABLE department (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  employee_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL, 
  salary DECIMAL NOT NULL,
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
  manager_id INT NOT NULL,
	CONSTRAINT fk_manager FOREIGN KEY (manager_id)
		REFERENCES employee(id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;