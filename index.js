// Filesystem.
const fs = require('fs');
// Path module (built-in Node.js module).
const path = require('path');
// Inquirer.
const inquirer = require('inquirer');


// Object with different license types.
const licenseTypes = {
    // Permissive licenses.
    permissive: {
        licenseIds: [
            'AFL 3.0',
            'Apache 2.0',
            'Artistic 2.0',
            'BSD 2 Clause',
            'BSD 3 Clause',
            'BSD 3 Clause Clear',
            'BSL 1.0',
            'CC BY 4.0',
            'ECL 2.0',
            'ISC',
            'MIT',
            'MS PL',
            'NCSA',
            'PostgreSQL',
            'Zlib',
        ],
        color: 'green',
    },
    // Copyleft licenses (require 'Disclose source' or 'Same license').
    copyleft: {
        licenseIds: [
            'AGPL 1.0 only',
            'AGPL 1.0 or later',
            'AGPL 3.0 only',
            'AGPL 3.0 or later',
            'CC BY SA 4.0',
            'EPL 1.0',
            'EPL 2.0',
            'EUPL 1.1',
            'GPL 1.0 only',
            'GPL 1.0 or later',
            'GPL 2.0 only',
            'GPL 2.0 or later',
            'GPL 3.0 only',
            'GPL 3.0 or later',
            'LGPL 2.0 only',
            'LGPL 2.0 or later',
            'LGPL 2.1 only',
            'LGPL 2.1 or later',
            'LGPL 3.0 only',
            'LGPL 3.0 or later',
            'LPPL 1.3c',
            'MPL 2.0',
            'MS RL',
            'OFL 1.1',
            'OSL 3.0',
        ],
        color: 'orange',
    },
    // Public domain licenses (do not require 'License and copyright notice').
    publicDomain: {
        licenseIds: [
            'CC0 1.0',
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
        message: `Provide instructions and examples for use.

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
        name: 'projectImage1',
        type: 'input',
        message: `To add a screenshot, enter the name of your first image file, including the extension (e.g., screenshot-1.png).

A directory called assets/images will be created.)

    Answer: `,
        validate: function (input) {
            if (!input) {
                return 'Error: Please enter a valid image file name.';
            } else {
                return true;
            }
        }
    },
    {
        name: 'projectImage2',
        type: 'input',
        message: `Enter the name of your second image file, including the extension (e.g., screenshot-2.png).

    Answer: `,
        validate: function (input) {
            if (!input) {
                return 'Error: Please enter a valid image file name.';
            } else {
                return true;
            }
        }
    },
    {
        name: 'projectImage3',
        type: 'input',
        message: `Enter the name of your third image file, including the extension (e.g., screenshot-3.png).

(Don't forget to store screenshot files.)

    Answer: `,
        validate: function (input) {
            if (!input) {
                return 'Error: Please enter a valid image file name.';
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
        message: `Using the license keyword list below, select at least one license for your project.

(For help choosing a license, refer to https://choosealicense.com by GitHub.)

    Answer: `,
        choices: [
            'AFL 3.0',
            'AGPL 1.0 only',
            'AGPL 1.0 or later',
            'AGPL 3.0 only',
            'AGPL 3.0 or later',
            'Apache 2.0',
            'Artistic 2.0',
            'BSD 2 Clause',
            'BSD 3 Clause',
            'BSD 3 Clause Clear',
            'BSL 1.0',
            'CC BY 4.0',
            'CC BY SA 4.0',
            'CC0 1.0',
            'ECL 2.0',
            'EPL 1.0',
            'EPL 2.0',
            'EUPL 1.1',
            'GPL 1.0 only',
            'GPL 1.0 or later',
            'GPL 2.0 only',
            'GPL 2.0 or later',
            'GPL 3.0 only',
            'GPL 3.0 or later',
            'ISC',
            'LGPL 2.0 only',
            'LGPL 2.0 or later',
            'LGPL 2.1 only',
            'LGPL 2.1 or later',
            'LGPL 3.0 only',
            'LGPL 3.0 or later',
            'LPPL 1.3c',
            'MIT',
            'MPL 2.0',
            'MS PL',
            'MS RL',
            'NCSA',
            'OFL 1.1',
            'OSL 3.0',
            'PostgreSQL',
            'Unlicensed',
            'WTFPL',
            'Zlib',
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

The following images demonstrate the application's appearance and functionality:

![Screenshot](./assets/images/${data.projectImage1})
![Screenshot](./assets/images/${data.projectImage2})
![Screenshot](./assets/images/${data.projectImage3})

## Credits

${data.projectCredits}

## Tests

${data.projectTests}

## Questions

For any questions, feel free to email me ([${data.projectEmail}](mailto:${data.projectEmail})) or visit my GitHub profile ([${data.projectGitHub}](https://github.com/${data.projectGitHub}/)).

## License

This project is available under the following license: ${data.projectLicense}. For more information on rights and limitations, please review the [LICENSE](./LICENSE) file.
    `;

    fs.writeFile('README.md', markdown, (err) =>
        err ? console.log(err) : console.log('README.md created.')
    );

    // Join the 'assets' and 'images' paths into a variable.
    const imagePath = path.join('assets', 'images');

    // Create the directory with the new imagePath variable.
    // { recursive: true } ensures that any missing parents folders are created.
    fs.mkdir(imagePath, { recursive: true }, (err) =>
        err ? console.log(err) : console.log('assets/images path created.')
    );
};


// Function to match user choice with licenses in object.
function getLicenseType(selectedLicense) {
    const allTypes = Object.values(licenseTypes);

    for (let i = 0; i < allTypes.length; i++) {
        let type = allTypes[i];

        if (type.licenseIds.includes(selectedLicense)) {
            return type;
        }
    }
};


// Function to create URL and obtain badge via Shields.io.
function renderLicenseBadge(selectedLicense, color) {

    const licenseURL = `https://img.shields.io/badge/license-${encodeURIComponent(selectedLicense)}-${color}`;

    return `[![License Badge](${licenseURL})](./LICENSE)`;
};


// Creates function to initialize application.
function init() {
    inquirer
        .prompt(questions)
        .then(writeToFile);
};


// Function called to initialize application.
init();
