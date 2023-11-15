// Packages needed for this application.
// Filesystem.
const fs = require('fs');
// Inquirer.
const inquirer = require('inquirer');
// Badge maker.
const { makeBadge, ValidationError } = require('badge-maker');

// Create an array of questions for user input.
const questions = [
    {
        name: 'projectTitle',
        type: 'input',
        message: `Provide a title for your project.
    Answer: `,
    },
    {
        name: 'projectDescription',
        type: 'input',
        message: `Use the following questions to provide a short description explaining the what, why, and how of your project:
  - What was your motivation?
  - Why did you build this project?
  - What problem did this help solve?
  - What did you learn?
    Answer: `,
    },
    {
        name: 'projectInstallation',
        type: 'input',
        message: `What are the steps required to install your project?
Provide a step-by-step description of how to get the development environment running.
    Answer: `,
    },
    {
        name: 'projectUsage',
        type: 'input',
        message: `Provide instructions and examples for use. Include screenshots as needed.
To add a screenshot, create an "assets/images" folder in your repository and upload your screenshot to it.
Then, using the relative filepath, add it to your README using the following syntax:
  // (md)
  ![alt text](assets/images/screenshot.png)
    Answer: `,
    },
    {
        name: 'projectCredits',
        type: 'input',
        message: `List your collaborators, if any, with links to their GitHub profiles.
If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.
If you followed tutorials, include those links here, as well.
    Answer: `,
    },
    {
        name: 'projectLicense',
        type: 'list',
        message: `Using the license keyword list below, select at least one license for your project to let other developers know what they can and cannot do with your project.
This will render a badge for the selected license(s) near the top of the README and add a notice in the "License" section explaining which license the application is covered under.
If you need help choosing a license, refer to GitHub's [https://choosealicense.com/](https://choosealicense.com/): `,
        choices: [
            'AFL-3.0',
            'Apache-2.0',
            'Artistic-2.0',
            'BSL-1.0',
        ]
    },
    {
        name: 'projectGitHub',
        type: 'input',
        message: `To add a link to your GitHub profile, enter your GitHub username.
    Answer: `,
    },
    {
        name: 'projectEmail',
        type: 'input',
        message: `To allow for questions regarding this project, enter your email.
    Answer: `,
    },
    {
        name: 'projectTests',
        type: 'input',
        message: `Provide instructions on how to run any tests for this application.
    Answer: `,
    },
];

// Create a function to write README file.
function writeToFile() {

};

// TODO: Create a function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then(answers => {
            writeToFile(markdown, answers);
        });
};

// Function call to initialize app
init();