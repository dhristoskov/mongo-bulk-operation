const mongoose = require('mongoose');

//Student model
const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true }, 
    grade: { type: Number }
})

module.exports = mongoose.model('Student', studentSchema);