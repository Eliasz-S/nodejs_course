const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const inquirer = require('inquirer');

const options = yargs
    .usage('Usage: -d <Required directory>, -f <Find string in the document>')
    .option('d', {
        alias: 'directory',
        describe: 'Path to the directory',
        type: 'string',
        demandOption: false,
    })
    .option('f', {
        alias: 'findString',
        describe: 'Find string',
        type: 'string',
        demandOption: false,
    })
    .argv;

const requiredDirectory = options.directory;
let executionDir = process.cwd();
if (requiredDirectory) {
    executionDir = path.resolve(process.cwd(), requiredDirectory);
}

const requiredString = options.findString;

selectObject(executionDir);

const isFile = (fileName) => fs.lstatSync(fileName).isFile();

function selectObject(directory) {
    const fileList = fs.readdirSync(directory);
    fileList.unshift('..'); // чтобы была опция вернуться на уровень выше

    return inquirer
        .prompt([
            {
                name: 'objName',
                type: 'list',
                message: `Текущее расположение: ${directory}\nВыберите файл для чтения:`,
                choices: fileList
            }])
        .then((answer) => checkObjType(directory, answer.objName));
}

const checkObjType = (dir, fileName) => {
    const fullPath = path.resolve(dir, fileName);

    if (isFile(fullPath)) {
        fs.readFile(fullPath, 'utf-8', (err, data) => {
            if (data.includes(requiredString)) {
                console.log("Найдены совпадения по запросу в данном файле!");
                console.log("-------------------------------------------------")
            }
            console.log(data);
        })
    } else {
        return selectObject(fullPath);
    }
}

