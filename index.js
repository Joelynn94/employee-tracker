const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: "",
  database: 'employee_DB'
});

connection.connect((err) => {
  if (err) {
    throw err
  }
  console.log(`\n \n Connected on thread: ${connection.threadId}`);
  startPrompts();
});

function startPrompts() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'Add Employee',
        'Add Department',
        'Add Role',
        'View Employees',
        'View Departments',
        'View Roles',
        'Update Employee Role'
      ]
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Add Employee':
          addEmployee();
          break;

        case 'Add Department':
          addDepartment();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'View Employees':
          viewEmployees();
          break;

        case 'View Departments':
          viewDepartments();
          break;

        case 'View Roles':
          viewRoles();
          break;

        case 'Update Employee Role':
          updateEmployeeRole();
          break;
      }
    })
}; 

function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: "What is the employee's first name?"
      },
      {
        name: 'lastName',
        type: 'input',
        message: "What is the employee's last name?"
      },
      {
        name: 'employeeRole',
        type: 'list',
        message: "What is the employee's role?",
        choices: [
          'Lead Engineer',
          'Software Engineer',
          'Salesman',
          'Marketing Coordinator',
          'Accountant'
        ]
      },
      {
        name: 'employeeManager',
        type: 'input',
        message: "Who is the employee's manager?"
        // how do I get the existing managers? 
      }
    ])
    .then(function({ firstName, lastName, employeeRole }) {
      connection.query('INSERT INTO employee SET ?', 
      {
        first_name: firstName,
        last_name: lastName
      },
      function(err) {
        if (err) {
          throw err
        }
        console.log('Your employee was created successfully!')
      });
      startPrompts()
    })
}



function addDepartment() {
  inquirer
    .prompt({
      name: 'addDepartment',
      type: 'input',
      message: 'What department would you like to add?'
    })
    .then((answer)=> {

      startPrompts();
    })
}


app.listen(PORT, () => {
  console.log(`Server is listening on: http://localhost${PORT}`);
});



