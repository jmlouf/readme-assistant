// Packages needed for this application.
// Filesystem.
const fs = require('fs');
// Inquirer.
const inquirer = require('inquirer');
// Badge maker.
const { makeBadge, ValidationError } = require('badge-maker');


// Object with different license types.
const licenseTypes = {
    // Permissive licenses.
    permissive: {
        licenseIds: [
            'AFL_3.0',
            'Apache_2.0',
            'Artistic_2.0',
            'BSD_2_Clause',
            'BSD_3_Clause',
            'BSD_3_Clause_Clear',
            'BSL_1.0',
            'CC_BY_4.0',
            'ECL_2.0',
            'ISC',
            'MIT',
            'MS_PL',
            'NCSA',
            'PostgreSQL',
            'Zlib',
        ],
        color: 'green',
    },
    // Copyleft licenses require 'Disclose source' (https://choosealicense.com/appendix/#disclose-source)
    // or 'Same license' (https://choosealicense.com/appendix/#same-license).
    copyleft: {
        licenseIds: [
            'AGPL_1.0_only',
            'AGPL_1.0_or_later',
            'AGPL_3.0_only',
            'AGPL_3.0_or_later',
            'CC_BY_SA_4.0',
            'EPL_1.0',
            'EPL_2.0',
            'EUPL_1.1',
            'GPL_1.0_only',
            'GPL_1.0_or_later',
            'GPL_2.0_only',
            'GPL_2.0_or_later',
            'GPL_3.0_only',
            'GPL_3.0_or_later',
            'LGPL_2.0_only',
            'LGPL_2.0_or_later',
            'LGPL_2.1_only',
            'LGPL_2.1_or_later',
            'LGPL_3.0_only',
            'LGPL_3.0_or_later',
            'LPPL_1.3c',
            'MPL_2.0',
            'MS_RL',
            'OFL_1.1',
            'OSL_3.0',
        ],
        color: 'orange',
    },
    // Public domain licenses do not require 'License and copyright notice' (https://choosealicense.com/appendix/#include-copyright).
    publicDomain: {
        licenseIds: [
            'CC0_1.0',
            'Unlicensed',
            'WTFPL',
        ],
        color: 'blue',
    },
};


// Create an array of questions for user input.
const questions = [
    {
        name: 'projectTitle',
        type: 'input',
        message: `Provide a title for your project.
    
    Answer: `,
        validate: function (input) {
            if (!input) {
                return 'Error: Please enter a valid project title.';
            } else {
                return true;
            }
        }
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
        validate: function (input) {
            if (!input) {
                return 'Error: Please enter a valid project description.';
            } else {
                return true;
            }
        }
    },
    {
        name: 'projectInstallation',
        type: 'input',
        message: `What are the steps required to install your project?

(Provide a step-by-step description of how to get the development environment running.)
    
    Answer: `,
        validate: function (input) {
            if (!input) {
                return 'Error: Please enter a valid installation guide.';
            } else {
                return true;
            }
        }
    },
    {
        name: 'projectUsage',
        type: 'input',
        message: `Provide instructions and examples for use. Include screenshots as needed.
To add a screenshot, create an "assets/images" folder in your repository and upload your screenshot to it.
Then, using the relative filepath, add it to your README using the following syntax:

  // markdown syntax for including a screenshot:
  ![alt text](assets/images/screenshot.png)

    Answer: `,
        validate: function (input) {
            if (!input) {
                return 'Error: Please enter a valid set of usage instructions.';
            } else {
                return true;
            }
        }
    },
    {
        name: 'projectCredits',
        type: 'input',
        message: `List your collaborators, if any, with links to their GitHub profiles.

(If you used any third-party assets or tutorials that require attribution, list the creators with links to their primary web presence in this section.)

    Answer: `,
    },
    {
        name: 'projectTests',
        type: 'input',
        message: `Provide instructions on how to run any tests for this application.
    
    Answer: `,
    },
    {
        name: 'projectGitHub',
        type: 'input',
        message: `To add a link to your GitHub profile, enter your GitHub username.
    
    Answer: `,
        validate: function (input) {
            if (!input) {
                return 'Error: Please enter a valid GitHub username.';
            } else {
                return true;
            }
        }
    },
    {
        name: 'projectEmail',
        type: 'input',
        message: `To allow for questions regarding this project, enter your email.
    
    Answer: `,
        validate: function (input) {
            if (!input) {
                return 'Error: Please enter a valid email.';
            } else {
                return true;
            }
        }
    },
    {
        name: 'projectLicense',
        type: 'list',
        message: `Using the license keyword list below, select at least one license for your project to let other developers know what they can and cannot do with your project.
This will render a badge for the selected license(s) near the top of the README and add a notice in the "License" section explaining which license the application is covered under.
If you need help choosing a license, refer to GitHub's https://choosealicense.com/.

    Answer: `,
        choices: [
            'AFL_3.0',
            'Apache_2.0',
            'Artistic_2.0',
            'BSD_2_Clause',
            'BSD_3_Clause',
            'BSD_3_Clause_Clear',
            'BSL_1.0',
            'CC_BY_4.0',
            'ECL_2.0',
            'ISC',
            'MIT',
            'MS_PL',
            'NCSA',
            'PostgreSQL',
            'Zlib',
            'AGPL_1.0_only',
            'AGPL_1.0_or_later',
            'AGPL_3.0_only',
            'AGPL_3.0_or_later',
            'CC_BY_SA_4.0',
            'EPL_1.0',
            'EPL_2.0',
            'EUPL_1.1',
            'GPL_1.0_only',
            'GPL_1.0_or_later',
            'GPL_2.0_only',
            'GPL_2.0_or_later',
            'GPL_3.0_only',
            'GPL_3.0_or_later',
            'LGPL_2.0_only',
            'LGPL_2.0_or_later',
            'LGPL_2.1_only',
            'LGPL_2.1_or_later',
            'LGPL_3.0_only',
            'LGPL_3.0_or_later',
            'LPPL_1.3c',
            'MPL_2.0',
            'MS_RL',
            'OFL_1.1',
            'OSL_3.0',
            'CC0_1.0',
            'Unlicensed',
            'WTFPL',
        ],
        default: 'MIT',
    },
];


// Create a function to write README file.
function writeToFile(data) {

    const selectedLicense = data.projectLicense; 

    const licenseType = getLicenseType(selectedLicense);
    const color = licenseType.color;

    // Template literal stored in "markdown" variable.
    const markdown = `# ${data.projectTitle}
${renderLicenseBadge(selectedLicense, color)}

## Description
    
${data.projectDescription}
    
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Tests](#tests)
- [Questions](#questions)
- [License](#license)

## Installation

${data.projectInstallation}

## Usage

${data.projectUsage}

## Credits

${data.projectCredits}

## Tests

${data.projectTests}

## Questions

For any questions, feel free to [email me](mailto:${data.projectEmail}) or visit [my GitHub profile](https://github.com/${data.projectGitHub}/).

## License

This project is available under the ${data.projectLicense} license. Please review the LICENSE file for more information on rights and limitations.
    `;

    fs.writeFile('README.md', markdown, (err) =>
        err ? console.log(err) : console.log('Success.')
    );
};


function getLicenseType(selectedLicense) {
    const allTypes = Object.values(licenseTypes);

    for (let i = 0; i < allTypes.length; i++) {
        let type = allTypes[i];

        if (type.licenseIds.includes(selectedLicense)) {
            return type;
        }
    }
};


function renderLicenseBadge(selectedLicense, color) {
    const licenseURL = `https://img.shields.io/badge/License-${encodeURIComponent(selectedLicense)}-${color}.svg`;

    return `![License Badge](${licenseURL})`;
};


// TODO: Create a function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then(writeToFile);
};


// Function call to initialize app
init();
