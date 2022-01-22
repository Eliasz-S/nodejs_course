const fs = require('fs');
// const fsPromises = require('fs/promises');
const { Transform } = require('stream');
const ACCESS_LOG = './access.log';

// const data = fs.readFileSync(ACCESS_LOG);
//
// console.log(data.toString());

// const data = fs.readFile(ACCESS_LOG, 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     else console.log(data);
// })

// fsPromises.readFile(ACCESS_LOG, 'utf-8').then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);
// })

// const requests = [
//     `127.0.0.1 - - [25/May/2021:00:07:17 +0000] "GET /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
//     `127.0.0.1 - - [25/May/2021:00:07:24 +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
// ];

// fs.writeFile(ACCESS_LOG,
//     requests[1] + '\n',
//     {
//         encoding: 'utf-8',
//         flag: 'a',
//     },
//     console.log
// );

// fs.appendFile(ACCESS_LOG,
//     requests[1] + '\n',
//     {
//         encoding: 'utf-8',
//     },
//     console.log
// );

// const readStream = fs.createReadStream(ACCESS_LOG, {
//    highWaterMark: 64
// });
//
// readStream.on('data', (chunk) => {
//    console.log('chunk: ', chunk);
// });

// const writeStream = fs.createWriteStream(ACCESS_LOG, {
//     encoding: 'utf-8',
//     flags: 'a',
// });
//
// requests.forEach((logString) => {
//    writeStream.write(`${logString}\n`)
// });

const payedAccount = false;
const readStream = fs.createReadStream(ACCESS_LOG);
const tStream = new Transform({
    transform(chunk, encoding, callback) {
        if (!payedAccount) {
            const transformedData = chunk
                .toString()
                .replace(/\d+\.\d+\.\d+\.\d+/g, '[IP-адрес был скрыт]');
            this.push(transformedData);
        } else {
            this.push(chunk);
        }
        callback();
    }
});

readStream.pipe(tStream).pipe(process.stdout);