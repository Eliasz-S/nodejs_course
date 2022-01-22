const fs = require('fs');
const readline = require('readline');
const REQUESTS_LOG = './requests1.log';

const firstIp = '89.123.1.41'; // либо значением может быть, например, process.argv.slice(2)
const secondIp = '34.48.240.111'; // либо значением может быть, например, process.argv.slice(3), если нужные ip принимаем в качестве входных аргументов

const readStream = fs.createReadStream(REQUESTS_LOG);

const firstWriteStream = fs.createWriteStream(`./${firstIp}_requests.log`, {
   encoding: 'utf-8',
   flags: 'a',
});

const secondWriteStream = fs.createWriteStream(`./${secondIp}_requests.log`, {
    encoding: 'utf-8',
    flags: 'a',
});

readline.createInterface({
    input: readStream,
})
    .on('line', (line) => {
        if (line.indexOf(firstIp) === 0) {
            firstWriteStream.write(`${line}\n`);
        } else if (line.indexOf(secondIp) === 0) {
            secondWriteStream.write(`${line}\n`);
        }
    })
    .on('error', (err) => {
        console.log(err);
    });

