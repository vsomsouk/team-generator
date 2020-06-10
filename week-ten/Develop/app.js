const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const team = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// parent (manager) class
function promptUser() {
    inquirer.prompt([
    {
        type: "input",
        message: "Manager's Name",
        name: "managerName"
    },
    {
        type: "input",
        message: "Manager ID",
        name: "managerId"
    },
    {
        type: "input",
        message: "Manager's Email",
        name: "managerEmail"
    },
    {
        type: "input",
        message: "Manager's Office Number",
        name: "officeNumber"
    }

    ]).then(answer => {
        const managerName = answer.managerName;
        const managerId = answer.managerId;
        const managerEmail = answer.managerEmail;
        const officeNumber = answer.officeNumber;
        const manager = new Manager (managerName, managerId, managerEmail, officeNumber);
        team.push(manager);
        console.log("Add Additional Employees")
        addEmployee ();
    }
    )};

// employee (engineer, intern) info
function addEmployee () {
    inquirer.prompt([
    {
        type:"list",
        message: "Team Role",
        name: "role",
        choices: ["Engineer", "Intern"]
    },
    {
        type:"input",
        message: "Employee's Name",
        name: "name"
    },
    {
        type:"input",
        message: "Employee's Email",
        name: "email"
    },
    {
        type: "input",
        message: "What is the Engineer's GitHub Username?",
        name: "github",
        when: (userInput) => userInput.role === "Engineer"
    },
    {
        type: "input",
        message: "What School did the Intern Attend?",
        name: "school",
        when: (userInput) => userInput.role === "Intern"
    },
    ]).then(answer => {
        if (answer.role === "Engineer") {
            const engineerName = answer.name;
            const engineerEmail = answer.email;
            const engineerGithub = answer.github;
            const engineer = new engineer(engineerName, engineerEmail, engineerGithub);
            team.push(engineer);       
    } else if (answer.role === "Intern") {
            const internName = answer.name;
            const internEmail = answer.email;
            const internSchool = answer.school;
            const intern = new intern(internName, internEmail, internSchool);
            team.push(intern);
    }
    }
    )}
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
/// for the provided `render` function to work! 