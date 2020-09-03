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
    },
    {
        type:"list",
        message: "Team Role to Add",
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
        message: "Employee ID Number",
        name: "id"
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
    {
        type:"list",
        message: "Would you like to add another role?",
        name: "addAnother",
        choices: ["Engineer", "Intern", "Done"]
    }
    
    ]).then(answer => {
      if (answer.role === "Engineer") {
        const managerName = answer.name;
        const managerID = answer.id;
        const managerEmail = answer.email;
        const managerOfficeNumber = answer.github;
        const managerRole = answer.role;
        const manager = new Manager (managerName, managerID, managerEmail, managerOfficeNumber, managerRole);
        team.push(Manager);  
        if(answer.addAnother === "Engineer") {
          promptUser();

        }  else if (answer.role === "Engineer") {
            const engineerName = answer.name;
            const engineerID = answer.id;
            const engineerEmail = answer.email;
            const engineerGithub = answer.github;
            const engineerRole = answer.role;
            const engineer = new Engineer(engineerName, engineerID, engineerEmail, engineerGithub, engineerRole);
            team.push(engineer);  
            if(answer.addAnother === "Engineer") {
              promptEngineer();
            }  
    } else if (answer.role === "Intern") {
            const internName = answer.name;
            const internID = answer.id;
            const internEmail = answer.email;
            const internSchool = answer.school;
            const internRole = answer.role;
            const intern = new Intern(internName, internID, internEmail, internSchool, internRole);       
            team.push(intern);
            if(answer.addAnother === "Intern") {
              promptIntern();
            }
    }
    });



    function promptEngineer() {
      inquirer.prompt([
      {
          type:"input",
          message: "Employee's Name",
          name: "name"
      },
      {
          type:"input",
          message: "Employee ID Number",
          name: "id"
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
          type:"list",
          message: "Would you like to add another role?",
          name: "addAnother",
          choices: ["Engineer", "Intern", "Done"]
      }
      ]).then(answer => {
          if (answer.role === "Engineer") {
              const engineerName = answer.name;
              const engineerID = answer.id;
              const engineerEmail = answer.email;
              const engineerGithub = answer.github;
              const engineerRole = answer.role;
              const engineer = new Engineer(engineerName, engineerID, engineerEmail, engineerGithub, engineerRole);
              team.push(engineer);  
              if(answer.addAnother === "Engineer") {
                promptEngineer();
              }  
      }  
    }
  )};   

    
function promptIntern() {
      inquirer.prompt([
      {
          type:"input",
          message: "Employee's Name",
          name: "name"
      },
      {
          type:"input",
          message: "Employee ID Number",
          name: "id"
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
          when: (userInput) => userInput.role === "Intern"
      },
      {
          type:"list",
          message: "Would you like to add another role?",
          name: "addAnother",
          choices: ["Engineer", "Intern", "Done"]
      }
      ]).then(answer => {
        if (answer.role === "Intern") {
        const internName = answer.name;
        const internID = answer.id;
        const internEmail = answer.email;
        const internSchool = answer.school;
        const internRole = answer.role;
        const intern = new Intern(internName, internID, internEmail, internSchool, internRole);       
        team.push(intern);
        if(answer.addAnother === "Intern") {
          promptIntern();
              }  
      }      
    });
  };


//call createteam function
    function createTeam () {
     fs.writeFileSync(outputPath, render(team), "utf8")
    };

    createTeam();
  };

  promptUser();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

//HTML RENDER EXAMPLE FROM ACTIVITY

/* function generateHTML(answers) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <title>Document</title>
  </head>
  <body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Hi! My name is ${answers.name}</h1>
      <p class="lead">I am from ${answers.location}.</p>
      <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
      <ul class="list-group">
        <li class="list-group-item">My GitHub username is ${answers.github}</li>
        <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
      </ul>
    </div>
  </div>
  </body>
  </html>`;
  }
  
  promptUser()
    .then(function(answers) {
      const html = generateHTML(answers);
  
      return writeFileAsync("./output/index.html", html);
    })
    .then(function() {
      console.log("Successfully wrote to index.html");
    })
    .catch(function(err) {
      console.log(err);
    }); */
  

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
/// for the provided `render` function to work! 