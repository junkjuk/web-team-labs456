const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');
const sequelize = require('./postgresCon')

dotenv.config({ path: './.env' });

mongoose
  .connect(process.env.MONGO_DB_CONNECTION)
  .then(() => {
    console.log('MongoDB connection successful');
  })
  .catch((err) => {
    console.error('EXIT STATUS 1');
    console.error('Could not connect to MongoDB:', err);
    console.log('CONNECTION:', process.env.MONGO_DB_CONNECTION)
    process.exit();
  });

(async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connection has been established successfully.');
  } catch (error) {
    console.error('EXIT STATUS 1');
    console.error('Unable to connect to PostgreSQL:', error);
    process.exit(1);
  }
})();

app.listen(3100, () => {
  console.log("Server up and running at port 3100")
})