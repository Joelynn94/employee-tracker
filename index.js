const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');

// Sets up the 
const PORT = process.env.PORT || 3000;
const app = express();

// Create the connection to mysql database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: "June199$",
  database: 'employee_DB'
});

// Connecting to the database 
connection.connect((err) => {
  if (err) {
    throw err
  }
  console.log(`\n \n Connected on thread: ${connection.threadId}`);
  startPrompts();
});

// Starts the user prompts using inquire
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
    .then(({ action }) => {
      // checks what the user selects and then runs a function based on user input
      switch (action) {
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
  // Gets the role table
  connection.query('SELECT * FROM role', function(err, result){
    if (err) throw err;

    connection.query(`SELECT employee.first_name, employee.last_name, employee.id, role.title
                      FROM role
                      INNER JOIN employee ON role.id = employee.role_id`, function(err, managerResult){
                        if (err) throw err;
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
          }
          // {
          //   name: 'employeeRole',
          //   type: 'list',
          //   message: "What is the employee's role?",
          //   // creates a new array that returns the array of role title's
          //   choices: result.map(role => role.title)
          // }
          // {
          //   name: 'employeeManager',
          //   type: 'list',
          //   message: "Who is the employee's manager?",
          //   choices: managerResult.map(manager => manager.first_name + ' ' + manager.last_name)
          // }
        ])
        .then(({ firstName, lastName, employeeRole }) => {
          findRoleId = result.find(role => role.title == employeeRole)

          connection.query('INSERT INTO employee SET ?', 
          {
            first_name: firstName,
            last_name: lastName
            // role_id: findRoleId
            // manager_id: employeeManager
          },
          function(err) {
            if (err) {
              throw err
            }
            console.log('Your employee was created successfully!')
            startPrompts()
          });
        });
      })
  });
}


function addDepartment() {
  inquirer
    .prompt({
      name: 'addDepartment',
      type: 'input',
      message: 'What department would you like to add?'
    })
    .then(({ addDepartment })=> {
      // Inserts what the user entered - into the department table as a new department 
      connection.query('INSERT INTO department SET ?', { department_name: addDepartment });
      // Selects all of the columns for the department table
      connection.query('SELECT * FROM department', function(err, result) {
        // if there is an error, throw the error 
        if(err) throw err;
        // Prints out the sql table in the console
        console.table(result);
        // Starts the user prompts
        startPrompts();
      });
    });
};

function viewEmployees() {
  // Selects all of the columns from the employee table
  connection.query('SELECT * FROM employee', function(err, result){
    // if there is an error, throw the error
    if(err) throw err;
    // prints the current amount of employees
    console.log('There are: ' + res.length + ' total employees');
    // Prints out the SQL employee table in the console
    console.table(result);
    // Starts the user prompts
    startPrompts();
  });
};

function viewDepartments() {
  // Selects all of the columns from the department table 
  connection.query('SELECT * FROM department', function(err, result){
    // If there is an error, throw the error
    if(err) throw err;
    // Prints out the SQL department table in the console 
    console.table(result);
    // Starts the user prompts
    startPrompts();
  })
}

function viewRoles() {
  // Selects all of the columns from the roles table
  connection.query('SELECT * FROM role', function(err, result){
    // If there is an error, throw the error
    if(err) throw err;
    // Prints out the SQL role table in the console
    console.table(result);
    // Starts the user prompts
    startPrompts();
  })
}


app.listen(PORT, () => {
  console.log(`Server is listening on: http://localhost${PORT}`);
});



