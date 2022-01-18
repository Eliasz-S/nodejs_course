const EventEmitter = require('events');
const emitter = new EventEmitter();

const RequestTypes = [
    {
        type: 'send',
        payload: 'to send a document'
    },
    {
        type: 'receive',
        payload: 'to receive a document'
    },
    {
        type: 'sign',
        payload: 'to sign a document'
    },
];

class Customer {
    constructor({ type, payload }) {
        this.type = type;
        this.payload = payload;
    }
}

const generateIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateNewCustomer = () => {
    const randomTypeIndex = generateIntInRange(0, RequestTypes.length - 1);
    const typeParams = RequestTypes[randomTypeIndex];

    return new Customer(typeParams);
};

const run = async () => {
    const { type, payload } = generateNewCustomer();
    emitter.emit(type, payload);
    await new Promise((resolve) => setTimeout(resolve, generateIntInRange(1000, 5000)));
    await run();
}

class Handler {
    static send(payload) {
        console.log('Send request', payload);
    }

    static receive(payload) {
        console.log('Receive request', payload);
    }

    static sign(payload) {
        console.log('Sign request', payload);
    }
}

emitter.on('send', Handler.send);
emitter.on('receive', Handler.receive);
emitter.on('sign', Handler.sign);
emitter.on('sign', () => {
    emitter.emit('error', 'Broken pen =(')
});
emitter.on('error', console.log)


run();