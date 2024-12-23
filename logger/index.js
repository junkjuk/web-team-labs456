const amqp = require('amqplib/callback_api');
const logMessage = require('./logMessage');

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err, channel) => {
        if (err) {
            throw err;
        }

        const queue = 'mainQueue';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(`Waiting for messages in ${queue}`);

        channel.consume(queue, (msg) => {
          logMessage(msg);
        }, { noAck: true });
    });
});