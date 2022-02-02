const worker_threads = require('worker_threads');

const generatePassword = (passwordLength) => {
    return new Promise((res, rej) => {
        const worker = new worker_threads.Worker('./worker.js', {
            workerData: passwordLength,
        });

        worker.on('message', res);
        worker.on('error', rej);
    })
};

(async () => {
    const passwordBytesSize = 5;
    const password = await generatePassword(passwordBytesSize);

    console.log(password);
})();