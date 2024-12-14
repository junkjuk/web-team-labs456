const express = require('express');
const managerRouter = require('./routes/managerRouter');
const carRouter = require('./routes/carRouter');
const clientRouter = require('./routes/clientRouter');
const carOrderRouter = require('./routes/carOrderRouter');
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/v1/managers', managerRouter)
app.use('/api/v1/cars', carRouter)
app.use('/api/v1/clients', clientRouter)
app.use('/api/v1/orders', carOrderRouter)

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: err.message,
    error: err
  })
})

module.exports = app;
