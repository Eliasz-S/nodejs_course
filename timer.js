const EventEmitter = require('events');
const emitter = new EventEmitter();

const [ goalDate ] = process.argv.slice(2);

const run = async () => {
    emitter.emit('timer');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await run();
}

class Handler {
    static timerTick() {
        let now = new Date();
        let goal = new Date(goalDate);
        let diff = goal - now;

        let days = Math.floor(diff / (1000 * 60 * 60 * 24));

        let hours = Math.floor(diff / (1000 * 60 * 60));
        let minutes = Math.floor(diff / (1000 * 60));
        let seconds = Math.floor(diff / 1000);

        let hrs = hours - days * 24;
        let min = minutes - hours * 60;
        let sec = seconds - minutes * 60;

        if (diff <= 0) {
            console.log('Countdown completed!');
            process.exit(1);
        }

        console.log(`${days} days ${hrs} hours ${min} minutes ${sec} seconds remaining`);
    }
}

emitter.on('timer', Handler.timerTick);

run();