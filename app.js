const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeArr=[]

function start(){
    inquirer.prompt(
        {
        type: "list",
        name: "what",
        message: "What would you like to do?",
        choices:["Add Employees", "Done"]
        })  
    
    .then(function(answer){
        if(answer.what === "Add Employees"){
            promptUser()
        }else{
            generateHTML()
        }
    })
}


function promptUser() {
     inquirer.prompt ([ 
    
    {
        type: "input",
        name: "name",
        message: "Enter your name"
    },
   
    {
        type: "input",
        name: "email",
        message: "Enter your email"
    },
  
    {
        type: "input",
        name: "id",
        message: "Enter your id"
    },
   
    {
        type: "list",
        name: "job",
        message: "Enter your job role",
        choices: ['Engineer','Intern','Manager']

    }
    ])
    .then(function(answers){
        if(answers.job === "Engineer"){
            inquirer.prompt(
                {
                type: "input",
                name: "github",
                message: "Enter your GitHub username"
                })  
            
            .then(function(engineerAnswer){
                const myEngineer = new Engineer(answers.name,answers.id,answers.email,engineerAnswer.github)
                employeeArr.push(myEngineer)
                start()
            })
        }
        else if(answers.job === "Intern"){
            inquirer.prompt(
                {
                type: "input",
                name: "school",
                message: "Enter your School name"
                })  
            
            .then(function(internAnswer){
                const myIntern = new Intern(answers.name,answers.id,answers.email,internAnswer.school)
                employeeArr.push(myIntern)
                start()
            })
        }
        else if(answers.job === "Manager"){
            inquirer.prompt(
                {
                type: "input",
                name: "officenumber",
                message: "Enter your Office Number"
                })  
            
            .then(function(managerAnswer){
                const myManager = new Manager(answers.name,answers.id,answers.email,managerAnswer.officenumber)
                employeeArr.push(myManager)
                start()
            })
        }
    });
}

function generateHTML () {
fs.writeFile(outputPath,render(employeeArr),function(err){
    if(err)throw err
    console.log("Done");
})
}


start()
    // .then(function(answers) {
    //     const README = generateREADME (answers); 
        
    //     return writeFileAsync(outputPath, HTML);
    // })
    // .then(function() {
    //     console.log("html file");
    // })
    // .catch(function(err) {
    //     console.log(err);
    // })