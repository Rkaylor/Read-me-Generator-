
// Libraries
const inquirer= require("inquirer")
const fs =require("fs")
const util = require("util")

const writeFileAsync = util.promisify(fs.writeFile )



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
    }
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