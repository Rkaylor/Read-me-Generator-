
// Libraries
const inquirer= require("inquirer")
const fs =require("fs")
const util = require("util")

const writeFileAsync = util.promisify(fs.writeFile)



// function to write README file
function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the name of your project?",
            name: "title"
    }, {
        type: "input",
        message: "Please enter a description of your project.",
        name: "description"
    }, {
       type: "checkbox",
       message: "Please select a license.",
       choices: [
           "Apache",
           "MIT",
           "ISC",
           "None"
       ],
       name:"license" 
    },
    {
        type: "input",
        message: "What do you need to install for this project?",
        name: "Installation"
    },
    {
        type: "input",
        message: "What do you use this project for?",
        name: "Usage"
    },
    {
        type: "input",
        message: "Did you have anyone collaborate on this project with you?",
        name: "Contributing"
    },
    {
        type: "input",
        message: "Do you have any questions about this project?",
        name: "Questions"
    },
    {
        type: "input",
        message: "What type of testing have you done?",
        name: "Tests"
    },
])
};

// function to initialize program
function generateMarkdownLang(response){
    return `
# ${response.title}
# Table of Contents

-[Description](#description)
-[License](#license)

## Description:
${response.description}

## License:
${response.license}

## Response
${response.Installation}

## Usage
${response.Usage}

## Contributing
${response.Contributing}

## Questions
${response.Questions}

## Tests
${response.Tests}
`
};


// function call to initialize program
async function init() {
    try{
        const response = await promptUser();
        const readMe = generateMarkdownLang(response);

        await writeFileAsync("README.md", readMe);
        console.log("Readme file created!")
    } catch (err) {
        console.log(err)
    }
    }

init();