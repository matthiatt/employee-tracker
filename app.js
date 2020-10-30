const mysql = require('mysql');
const inquirer = require("inquirer");

var connection = mysql.createConnection(
{
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_db"
});

connection.connect(function (err) 
{
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    askQuestions();
    viewAllRolls();
    // viewAllDepartments();
    // viewAllEmployees();
});

// First I have to call the questions within the circumstances I wish to create.
// To do this, I first call in the inquirer JSON module and link it to a prompt method.
function askQuestions() 
{
    inquirer.prompt(
    {
        message: "Please make a selection from the following:",
        type: "list",
        name: "listOptions",
        choices: [
        'View all employees',
        'View all departments',
        'View all roles',
        'Add employee(s)',
        'Add department(s)',
        'Add role(s)',
        // Didn't get enough time to add these into the homeowrk, but it's there for later to try it. and/or finish it for practice.
        // 'Remove employee',
        // 'Remove department',
        // 'Remove role',
        "Update employee role(s)",
        'Exit'
        ]

    // Then after the last step, I declared a promise method.
    })
    .then(activate => 
        {
        switch (activate.listOptions) 
        {
            case "View all employees":
                viewAllEmployees();
                break;

            case "View all departments":
                viewAllDepartments();
                break;

            case "View All roles":
                viewAllRolls();
                break;

            case "Add employee(s)":
                addEmployee();
                break;

            case "Add Department(s)":
                addDepartment();
                break;

            case "Add Role(s)":
                addRolls();
                break;

            // Same as before, I made this thinking I was going to be able to finish it before the deadline, but I wasnt able to get to the bonus options.
            // case "Remove Employee":
            //     removeEmployee();
            //     break;

            // case "Remove Department":
            //     removeDepartment();
            //     break;

            // case "Remove role":
            //     removeRole();
            //     break;

            case "Update employee role(s)":
                updateEmployeeRole();
                break;
        }
    });
}

function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
        askQuestions();
    });
}

//do I need to keep this in here with the line above?
// function viewAllEmployees() {
//     connection.query("SELECT * FROM employee", function(err, res){
//         if(err) throw err;
//         for(var i = 0; i < res.length; i++) {
//             console.log(res[i].first_name + " " + res[i].last_name + " " + role_id + " " + manager_id);
//         }
//     });
// }

function viewAllDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
        askQuestions();
    });
}

// function viewAllDepartments() {
//     connection.query("SELECT * FROM department", function(err, res){
//         if(err) throw err;
//         for(var i = 0; i < res.length; i++) {
//             console.log(res[i].name);
//         }
//     });
// }

function viewAllRolls() {
    connection.query("SELECT * FROM role", function (eer, data) {
        console.table(data);
        askQuestions();
    });
}

// function viewAllRolls() {
//     connection.query("SELECT * FROM role", function(err, res){
//         if(err) throw err;
//         for(var i = 0; i < res.length; i++) {
//             console.log(res[i].title + " " + department_id + " " + salary);
//         }
//     });
// }

function addEmployee() {
    var arrayRoleList = rolesArray();
    console.log(arrayRoleList);
    console.log("You need to update or insert information.");
    inquirer.prompt([
        
        {
            type: "input",
            message: "Please state the employees first name.",
            name: "firstName"
        },
        {
            type: "input",
            message: "Please state the employees last name.",
            name: "lastName"
        },
        {
            type: "list",
            message: "Please select the employees role here.",
            name: "roleChoices",
            choices: ["HR Cordinator", "Payroll Coordinator", "I.T Manager", "e-commerce manager", "Data Entry", "SQL Database Admin", "Prodcut Specialist", "Jr. Dev", "Magento Specialist", "Full Stack Developer", "Scrum Master", "Warhouse Operations Managment", "President of Sales", "Branch Manager of Sales", "Project Manager", "Fulfillment Director", "Director of Sales Reps", "Accounts Receivable Analyst", "Accounts Payable Analyst", "Project Accountant", "Senior Accountant", "Work Force Coordinator", "Administrative Assistant", "Recruitment Specialist", "Payroll Administrator"] 
        
        },
        {
            type: "number",
            message: "Please state the employees ID/ID role.",
            name: "roleIdNum"
        }
    ])
    .then(function(res) 
    {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) 
        {
            if (err) throw err;
            console.log(res.affectedRows + " Employee added!\n");
            console.table(data);
            askQuestions();
        });
    });

}

    function rolesArray() {
    return connection.query('SELECT title from roles', function(err,res){
        if(err) recieveError(err);
        return (res);
    });
    }
    
function addDepartment() {
    inquirer.prompt([
        {
        type: "input",
        name: "additionalDepartment",
        },
        // Was going to add a unique I.D number system in SQL if I had time.
        // {
        // type: "number",
        // name: "DepartmentNumberId",
        // message: "Please enter a number I.D that's unique to this NEW department."    
        // }
    ])
    .then(function(res) 
    {
        connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function(err, data) 
        {
            if (err) throw err;
            console.log(res.affectedRows + " Department added!\n");
            console.table(data);
            askQuestions();
        });
    });
    
}

function addRolls() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please state a specific name for your NEW role.",
            name: "addNewRole"
        }, 
        {
            type: "number",
            message: "Please state the salary :",
            name: "salary"
        }, 
        {
            type: "number",
            message: "Please enter a valid I.D to refer to NEW department.",
            name: "departmentId"
        }
    ])
    .then(function (res) 
    {
        connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [res.title, res.salary, res.department_id], function (err, data) 
        {
            console.log(res.affectedRows + " Role Added!\n");
            console.table(data);
        });
        askQuestions();
    });

}

function updateEmployeeRole() {
    var arrayRoleList = rolesArray();
    console.log(arrayRoleList);
    console.log("You need to update or insert information.");
    inquirer.prompt([
        {
            type: "list",
            name: "updateEmployee",
            message: "Please state which employee you would like to update.",
            list: ["Matt Hiatt", "Devon Gram", "Kristy Bonachini", "Greg Oostman", "Jordan Luxinlurburg", "Jerrod Davenport", "Makayla McHolms", "Sarah Koliniski", "Amy Rudenburg", "Tim Borre", "Chris Vishimi", "Maddy Bubbz", "Sage Kaveliac", "Kevin Mosser", "Sarah Test", "Amy Test", "Tim Test", "Chris Test", "Maddi Test", "Sage Test", "Kevin Test"]
        }, 
        {
            message: "enter the new role ID:",
            type: "number",
            name: "updateRoleId"
        }
    ])
    .then(function (res) 
    {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name, last_name = (?,?)", [res.role_id, res.name], function (err, data) 
        {
            console.log(res.affectedRows + " Employee Updated!\n");
            console.table(data);
        });
        askQuestions();
    });
    connection.end();
}