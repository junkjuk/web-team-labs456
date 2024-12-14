const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, 'No full name provided']
  },
  age: {
    type: Number,
    required: [ true, 'No age provided' ]
  },
  sex: {
    type: String,
    enum: ['male', 'female'],
    default: 'male'
  }
});

const Manager = mongoose.model('Manager', managerSchema);
module.exports = Manager;