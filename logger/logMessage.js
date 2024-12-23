const logMessage = (msg) => {
  const jsonMsg = JSON.parse(msg.content.toString())
  const source = jsonMsg.source;
  const message = jsonMsg.message;
  const now = new Date();
  const currentTime = now.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  console.log(`${currentTime} | Received a message from ${source} | ${message}`);
}

module.exports = logMessage
