const mqtt = require('mqtt');

const client = mqtt.connect("mqtt://mqtt5", {
    port: 1883,
});

client.on('connect', () => {
    console.log('Broker connect');
    client.subscribe("mainqueue", (err) => {
        console.log(err);
    });
    client.on("message", (topic, message) => {
        console.log(topic, message.toString());
    });
})