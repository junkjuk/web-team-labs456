import mqtt from 'mqtt';

const client = mqtt.connect("mqtt://127.0.0.1", {
    port: 1880,
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