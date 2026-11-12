import fs from "fs"

const content = `# About Node.js Modules

This project demonstrates the concept of modules in Node.js.

Node.js supports two main module systems:

1. CommonJS (CJS)
   - Uses require() to import modules.
   - Uses module.exports to export modules.

2. ECMAScript Modules (ESM)
   - Uses import to import modules.
   - Uses export and export default to export modules.

Topics Covered:
- Creating custom modules
- Named exports
- Default exports
- Importing and exporting functions
- Understanding package.json
- Working with the Node.js File System module

Purpose:
To understand how Node.js modules work and how to organize JavaScript code into reusable files.
`;

//sync way to create file
// fs.writeFileSync("./details.txt", "My details is I am a developer who is trying to get a job in this economy. Its like job hunting in ghost town")

//async way to create a file
// fs.writeFile("./about.txt", content, (err) => {
//      if (err) {
//           console.log(`❌ Error creating the file: ${err}`);
//      } else {
//           console.log(`✅ File created successfully`);
//      }
// })

//sync read file
// const a = fs.readFileSync("./about.txt", "utf-8")
// console.log(a)

//async way to read file
// fs.readFile('./about.txt', (err, data) => {
//      if (err) {
//           console.log("❌ Error reading the file", err);
//      } else {
//           console.log(`The content is : ${data}`)
//      }
// })

fs.appendFileSync('./about.txt', '\n BY \n UTPAL SONOWAL')