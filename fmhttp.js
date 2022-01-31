const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.headers.accept.includes('text/html')) {
        const objName = req.url.slice(1);

        let fullPath = __dirname;
        if (objName) {
            fullPath = path.resolve(__dirname, objName);
        }

        if (isFile(fullPath)) {
            getFileContents(res, fullPath);
        } else {
            getObjList(res, fullPath);
        }
    }
});

server.listen(5555);

const isFile = (fileName) => fs.lstatSync(fileName).isFile(); // проверка на тип объекта

function getFileContents(res, filePath) { // функция для чтения содержимого файла и выведения этого содержимого
    const readStream = fs.createReadStream(filePath);

    res.writeHead(200, 'OK', {
        'Content-Type': 'text/plain'
    });

    readStream.pipe(res);
}

function getObjList(res, filePath) { // функция для вывода списка папок и файлов в выбранной директории
    const fileList = fs.readdirSync(filePath);
    fileList.unshift('..'); // чтобы была опция вернуться на уровень выше

    res.writeHead(200, 'OK', {
        'Content-Type': 'text/html'
    })

    let page = ``;

    for (let item of fileList) {
        let fullPath;
        if (item === '..') {
            const absolutePath = path.resolve(filePath, '..');
            fullPath = path.relative(__dirname, absolutePath);
        } else {
            const relativePath = path.relative(__dirname, filePath);
            fullPath = path.join(relativePath, item);
        }

        page += `<a href="/${fullPath}">${item}</a><br>`;
    }

    res.end(page);
}