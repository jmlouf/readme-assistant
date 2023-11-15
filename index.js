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
            'AFL-3.0',
            'Apache-2.0',
            'Artistic-2.0',
            'BSD-2-Clause',
            'BSD-3-Clause',
            'BSD-3-Clause-Clear',
            'BSL-1.0',
            'CC-BY-4.0',
            'ECL-2.0',
            'ISC',
            'MIT',
            'MS-PL',
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
            'AGPL-1.0-only',
            'AGPL-1.0-or-later',
            'AGPL-3.0-only',
            'AGPL-3.0-or-later',
            'CC-BY-SA-4.0',
            'EPL-1.0',
            'EPL-2.0',
            'EUPL-1.1',
            'GPL-1.0-only',
            'GPL-1.0-or-later',
            'GPL-2.0-only',
            'GPL-2.0-or-later',
            'GPL-3.0-only',
            'GPL-3.0-or-later',
            'LGPL-2.0-only',
            'LGPL-2.0-or-later',
            'LGPL-2.1-only',
            'LGPL-2.1-or-later',
            'LGPL-3.0-only',
            'LGPL-3.0-or-later',
            'LPPL-1.3c',
            'MPL-2.0',
            'MS-RL',
            'OFL-1.1',
            'OSL-3.0',
        ],
        color: 'orange',
    },
    // Public domain licenses do not require 'License and copyright notice' (https://choosealicense.com/appendix/#include-copyright).
    publicDomain: {
        licenseIds: [
            'CC0-1.0',
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

(Provide a step-by-step description of how to get the development environment running.)
    
    Answer: `,
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
    },
    {
        name: 'projectEmail',
        type: 'input',
        message: `To allow for questions regarding this project, enter your email.
    
    Answer: `,
    },
    {
        name: 'projectLicense',
        type: 'list',
        message: `Using the license keyword list below, select at least one license for your project to let other developers know what they can and cannot do with your project.
This will render a badge for the selected license(s) near the top of the README and add a notice in the "License" section explaining which license the application is covered under.
If you need help choosing a license, refer to GitHub's https://choosealicense.com/.

    Answer: `,
        choices: [
            'AFL-3.0',
            'Apache-2.0',
            'Artistic-2.0',
            'BSD-2-Clause',
            'BSD-3-Clause',
            'BSD-3-Clause-Clear',
            'BSL-1.0',
            'CC-BY-4.0',
            'ECL-2.0',
            'ISC',
            'MIT',
            'MS-PL',
            'NCSA',
            'PostgreSQL',
            'Zlib',
            'AGPL-1.0-only',
            'AGPL-1.0-or-later',
            'AGPL-3.0-only',
            'AGPL-3.0-or-later',
            'CC-BY-SA-4.0',
            'EPL-1.0',
            'EPL-2.0',
            'EUPL-1.1',
            'GPL-1.0-only',
            'GPL-1.0-or-later',
            'GPL-2.0-only',
            'GPL-2.0-or-later',
            'GPL-3.0-only',
            'GPL-3.0-or-later',
            'LGPL-2.0-only',
            'LGPL-2.0-or-later',
            'LGPL-2.1-only',
            'LGPL-2.1-or-later',
            'LGPL-3.0-only',
            'LGPL-3.0-or-later',
            'LPPL-1.3c',
            'MPL-2.0',
            'MS-RL',
            'OFL-1.1',
            'OSL-3.0',
            'CC0-1.0',
            'Unlicensed',
            'WTFPL',
        ],
    },
];


// Create a function to write README file.
function writeToFile(data) {

    const licenseType = getLicenseType(data.projectLicense);
    const color = licenseType.color;

    // Template literal stored in "markdown" variable.
    const markdown = `# ${data.projectTitle}
${renderLicenseBadge(licenseType, color)}

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


function getLicenseType(license) {
    const allTypes = Object.values(licenseTypes);

    for (let i = 0; i < allTypes.length; i++) {
        const type = allTypes[i];

        if (type.licenseIds.includes(license)) {
            return type;
        }
    }
};


function renderLicenseBadge(licenseType, color) {

    const format = {
        label: 'License',
        message: licenseType.licenseIds[0],
        color: color,
    }

    return makeBadge(format);
};


// TODO: Create a function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then(writeToFile);
};


// Function call to initialize app
init();
