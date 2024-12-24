const mqtt = require('mqtt');

const client = mqtt.connect("mqtt://mqtt5", {
    port: 1883,
});

const logMessage = (sorce, message) => {
    client.publish("mainqueue", sorce + ":" + message)
};

module.exports = logMessage;