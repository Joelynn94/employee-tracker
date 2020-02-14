
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

