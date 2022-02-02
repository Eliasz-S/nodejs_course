const http = require('http');
const socket = require('socket.io');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);

io.on('connection', (client) => {
    // console.log('connected: ', client);
    client.on('client-connect', (data) => {
        const userData = {
            login: data.login,
        };

        client.broadcast.emit('server-connect', userData);

        client.on('disconnect', (reason) => {
            // console.log(reason);
            client.broadcast.emit('server-disconnect', userData);
        });

        client.on('reconnect', () => {
            client.broadcast.emit('server-reconnect', userData);
        })
    });

    client.on('client-msg', (data) => {
        // console.log(data);

        const serverData = {
            login: data.login,
            message: data.message.split('').join(''),
        };

        client.broadcast.emit('server-msg', serverData);
        client.emit('server-msg', serverData);
        // io.emit('server-msg', serverData); --- этот вариант заменяет два верхних, но тогда всё будет рассылаться всем
    });

});

server.listen(5555);

