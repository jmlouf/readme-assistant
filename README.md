# README Assistant
[![License Badge](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

## Description
    
This is a command-line application that dynamically generates a README file for a project by prompting the user for inputs using Inquirer.js. It simplifies the process of creating a high quality README by automating the formatting and providing examples for all the key sections.

The application prompts the user for basic information about their project such as the title, description, installation and usage instructions, screenshots, credits, tests, license, GitHub profile, and email address. The responses are used to generate the README file with properly formatted headings, table of contents, badges, images, and links.

By leveraging Node.js to access the file system and Inquirer to handle user prompts, this application streamlines the process of initializing a project with a comprehensive, professional README document. Developers can quickly scaffold a project repository and devote more time to building the application vs writing documentation.
    
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Tests](#tests)
- [Questions](#questions)
- [License](#license)

## Installation

To use this application, clone the repo and install required npm packages by running `npm install` in the command line. Then run `node index.js` to launch the application.

## Usage

Follow the prompts to input information about your project. If information for a section is not applicable, simply type "N/A" and continue to the next question. Leaving it blank will throw an error and prohibit you from moving onto the  next prompt.

When finished, a README.md file will be created in the output folder along with an assets/images directory for any screenshots. The README will contain properly formatted headings for each section based on the information provided in the prompts. Notably, the license badge, table of contents, and image file paths will automatically be rendered from the user's answers.

Review the generated README file in output folder, make any desired changes directly in the file, add additional assets like images/video demos in assets folder.

The following video link demonstrates the application's appearance and functionality:

[Google Drive Video Link](https://drive.google.com/file/d/1qpTUiYksRpXVYo-bCM2HZbjJ04jndQUr/view)

Please note that VSCode would take minutes to create the corresponding files, and so minimizing and reopening the application speeds that up for some reason.

## Credits

This project was created for educational purposes as part of the KU Coding Bootcamp curriculum.

The following resources were utilized:

- KU Coding Bootcamp Spot - Provided project requirements and guidelines.
- W3Schools - General reference for JavaScript.
- MDN Web Docs - Referenced for JavaScript documentation.
- Stack Overflow - Referenced for general JavaScript documentation.
- GitHub - The GitHub profiles of [shields](https://github.com/badges/shields/blob/master/services/licenses.js) and [lukas-h](https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba) referenced for badge creation documentation.
- Shields.io - Referenced for badge creation documentation.
- npmjs.com - Referenced for node package documentation.

## Questions

For any questions, feel free to email me ([joem3847@gmail.com](mailto:joem3847@gmail.com)) or visit my GitHub profile ([jmlouf](https://github.com/jmlouf/)).

## License

This project is available under the following license: MIT. For more information on rights and limitations, please review the [LICENSE](./LICENSE) file.
    
