#!/home/elias/.nvm/versions/node/v16.13.2/bin/node
const fs = require('fs');
// const yargs = require('yargs');
const path = require('path');
// const readline = require('readline');
const inquirer = require('inquirer');
// const [ filePath ] = process.argv.slice(2);

// const options = yargs
//     .usage('Usage: -p <Path to the file>')
//     .option('p', {
//         alias: 'path',
//         describe: 'Path to the file',
//         type: 'string',
//         demandOption: true,
//     }).argv
//
// console.log(options);

// fs.readFile(options.p, 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     else console.log(data);
// });

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// rl.question('Введите путь к файлу: ', (filePath) => {
//     console.log(filePath);
//     fs.readFile(filePath, 'utf-8', (err, data) => {
//         if (err) console.log(err);
//         else console.log(data);
//     });
//
//     rl.close();
// })

// const question = async (query) => new Promise((resolve) => rl.question(query, resolve));
// (async () => {
//     const filePath = await question('Введите путь к файлу: ');
//     const encode = await question('Введите кодировку файла: ');
//     const fullPath = path.resolve(__dirname, filePath);
//     const data = await fs.readFile(fullPath, encode);
//
//     console.log(fullPath);
//     console.log(data);
//
//     rl.close();
// })();
const executionDir = process.cwd();
const isFile = (fileName) => fs.lstatSync(fileName).isFile();

const fileList = fs.readdirSync('./').filter(isFile);

inquirer.prompt([
    {
        name: 'fileName',
        type: 'list', // также бывают input, confirm, checkbox, number, password,
        message: `Текущее расположение: ${executionDir}\nВыберите файл для чтения:`,
        choices: fileList
    }
]).then( ({ fileName }) => {
        // console.log(fileName);
        const fullPath = path.join(executionDir, fileName);
        const data = fs.readFileSync(fullPath, 'utf-8');

        console.log(data);
    }
);

