const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create a student schema
const StudentSchema = new Schema({
  student: {
    email: String,
    name: String,
    address: {
      street: String,
      zipCode: String,
      city: String
    }
  }
});




module.exports = Student = mongoose.model('student', StudentSchema);