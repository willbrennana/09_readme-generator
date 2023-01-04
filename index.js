const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");

const questions = [
  {
    type: "input",
    message: "What is your project title?",
    name: "title",
  },
  {
    type: "input",
    message: "What is your project description?",
    name: "description",
  },
  {
    type: "input",
    message: "What was your project installation process?",
    name: "installation",
  },
  {
    type: "input",
    message: "What is your project's usage?",
    name: "usage",
  },
  {
    type: "list",
    message: "What license did you use?",
    choices: ["Apache2.0", "Boost", "BSD"],
    name: "license",
  },
  {
    type: "input",
    message: "What contribution(s) would you add to this project?",
    name: "contribution",
  },
  {
    type: "input",
    message: "What testing have you done?",
    name: "test",
  },
  {
    type: "input",
    message: "What's your email?",
    name: "email",
  },
  {
    type: "input",
    message: "And your GitHub username?",
    name: "github",
  },
];

function writeToFile(fileName, data) {
  const exportData = generateMarkdown(data);
  const template = `# ${data.title}
  ${exportData}
## Description
  ${data.description}
## Table of Contents
<a href="#installation">Installation</a>\n
<a href="#usage">Usage</a>\n
<a href="#license">License</a>\n
<a href="#contribution">Contribution(s)</a>\n
<a href="#test">Testing</a>\n
<a href="#questions">Questions?</a>\n
## <div id="installation">Installation</div>
  ${data.installation}
## <div id="usage">Usage</div>
  ${data.usage}
## <div id="license">License</div>
 This application is covered under ${exportData}
## <div id="contribution">Contribution(s)</div>
  ${data.contribution}
## <div id="test">Testing</div>
  ${data.test}
## <div id="questions">Questions?</div>
Email: ${data.email}\n
  GitHub: <a href="https://github.com/${data.github}">${data.github}</a>`;

  return fs.writeFileSync(fileName, template);
}

function init() {
  inquirer.prompt(questions).then((response) => {
    writeToFile("README.md", response);
  });
}

init();
