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


// prompt user for which role they would like
function promptUser() {
    inquirer.prompt([
       {
        type:"list",
        message: "Which role would you like to add?",
        name: "role",
        choices: ["Manager","Engineer", "Intern", "Done"]
      },
    ])
   .then(answer => {
//once user selects role, prompt questions for the role they chose.
if (answer.role === "Manager") {
  promptManager()

} 
else if(answer.role === "Engineer") {
  promptEngineer()
  //console.log(team, "engineering testing again")

}

else if(answer.role === "Intern"){
  promptIntern()
  console.log(team)

}
else if(answer.role === "Done"){
createTeam();
console.log(team);
}
});


// prompt manager
function promptManager() {
  inquirer.prompt([
    {
        type: "input",
        message: "Manager's Name",
        name: "name"
    },
    {
        type: "input",
        message: "Manager ID",
        name: "id"
    },
    {
        type: "input",
        message: "Manager's Email",
        name: "email"
    },
    {
        type: "input",
        message: "Manager's Office Number",
        name: "officeNumber"
    },
  ])
  .then(answer => {
    const managerName = answer.name;
    const managerId = answer.id;
    const managerEmail = answer.email;
    const managerOfficeNumber = answer.officeNumber;
    const managerRole = answer.role;
    const manager = new Manager(managerName, managerId, managerEmail, managerOfficeNumber, managerRole);
    team.push(manager);  

    createTeam();
    promptUser();
  }
);

 };


// prompt engineer
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
  },
  ])
  .then(answer => {
        const engineerName = answer.name;
        const engineerID = answer.id;
        const engineerEmail = answer.email;
        const engineerGithub = answer.github;
        const engineerRole = answer.role;
        const engineer = new Engineer(engineerName, engineerID, engineerEmail, engineerGithub, engineerRole);
        team.push(engineer);  

       createTeam();
       promptUser();
});
};
//prompt intern
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
      message: "What school did the Intern attend?",
      name: "school",
  },  
 ])
 .then(answer => {

  const internName = answer.name;
  const internID = answer.id;
  const internEmail = answer.email;
  const internSchool = answer.school;
  const internRole = answer.role;
  const intern = new Intern(internName, internID, internEmail, internSchool, internRole);       
  team.push(intern);

  createTeam();
  promptUser();
}); 
};
};
  promptUser();

//write html file
function createTeam () {
  fs.writeFileSync(outputPath, render(team), "utf8")
 };

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