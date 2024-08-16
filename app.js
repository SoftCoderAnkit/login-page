const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Load users from JSON file
const getUsers = () => {
  if (fs.existsSync('./data/users.json')) {
    return JSON.parse(fs.readFileSync('./data/users.json'));
  }
  return [];
};

// Save users to JSON file
const saveUsers = (users) => {
  fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
};

// Load employees from JSON file
const getEmployees = () => {
  if (fs.existsSync('./data/employees.json')) {
    return JSON.parse(fs.readFileSync('./data/employees.json'));
  }
  return [];
};

// Save employees to JSON file
const saveEmployees = (employees) => {
  fs.writeFileSync('./data/employees.json', JSON.stringify(employees, null, 2));
};

// Routes for signup and login
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.post('/signup', (req, res) => {
  const users = getUsers();
  const { username, password } = req.body;

  if (users.find(user => user.username === username)) {
    return res.send('User already exists. <a href="/signup">Try again</a>');
  }

  users.push({ username, password });
  saveUsers(users);
  res.redirect('/index');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
  const users = getUsers();
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
  } else {
    res.send('Invalid credentials. <a href="/login">Try again</a>');
  }
});

// Routes for Employee Management
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Endpoint to get employee data as JSON
app.get("/employees", (req, res) => {
  res.json(employees);
});

app.post("/add", (req, res) => {  
  const inputEmployeeId = (employees.length + 1).toString();
  const inputEmployeeName = req.body.employeeName;
  const inputEmployeePost = req.body.employeePost;
  const inputEmployeeSalary = req.body.employeeSalary;

  employees.push({
    employeeId: inputEmployeeId,
    employeeName: inputEmployeeName,
    employeePost: inputEmployeePost,
    employeeSalary: inputEmployeeSalary,
  });

  res.sendFile(path.join(__dirname, 'public', 'home.html')); // Reload home.html after adding employee
});
app.post("/delete", (req, res) => {
  const requestedEmployeeId = req.body.employeeId;
  const index = employees.findIndex(
    (employee) => employee.employeeId === requestedEmployeeId
  );

  if (index !== -1) {
    employees.splice(index, 1);
  }

  res.json(employees); // Send updated employees array as JSON
});

app.post("/update", (req, res) => {
  const requestedEmployeeId = req.body.employeeId;
  const inputEmployeeName = req.body.employeeName;
  const inputEmployeePost = req.body.employeePost;
  const inputEmployeeSalary = req.body.employeeSalary;

  const employee = employees.find(
    (employee) => employee.employeeId === requestedEmployeeId
  );

  if (employee) {
    employee.employeeName = inputEmployeeName;
    employee.employeePost = inputEmployeePost;
    employee.employeeSalary = inputEmployeeSalary;
  }

  res.json(employees); // Send updated employees array as JSON
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
