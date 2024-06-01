const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Define paths
const projectRoot = path.join(__dirname, '../../');
const packageJsonPath = path.join(projectRoot, 'package.json');
const fileListPath = path.join(__dirname, 'filelist.txt');
const outputPath = path.join(projectRoot, 'project_code.txt');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const {
  name: projectName,
  description: projectDescription,
  author: projectAuthor,
  version: projectVersion,
} = packageJson;

// Execute the find command to create the file list
const findCommand = "find . -type d \\( -path './node_modules' -o -path './.git'" +
  " -o -path './dist' -o -path './build' -o -path './.next' -o -path './.idea' \\) -prune -o -type f ! -name '.DS_Store' -print";
execSync(`${findCommand} > ${fileListPath}`, { cwd: projectRoot });

// Read the file list
const files = fs.readFileSync(fileListPath, 'utf-8').split('\n').filter(Boolean);

// Define files to exclude
const excludedFiles = ['package-lock.json'];

let combinedCode = `
# Project Code
# Project: ${projectName}
# Description: ${projectDescription}
# Author: ${projectAuthor}
# Version: ${projectVersion}
# This file contains the concatenated code of the project with paths to each file indicated.
# Directories and files excluded: node_modules, .git, dist, build, .next, .idea, .DS_Store, package-lock.json

`;

// Read and combine the contents of each file
files.forEach((file) => {
  if (!excludedFiles.includes(path.basename(file))) {
    const fileContent = fs.readFileSync(path.join(projectRoot, file), 'utf8');
    combinedCode += `\n=== ${file} ===\n${fileContent}\n\n`;
  }
});

// Write the combined code to the output file
fs.writeFileSync(outputPath, combinedCode);
console.log('Project code has been written to project_code.txt');
