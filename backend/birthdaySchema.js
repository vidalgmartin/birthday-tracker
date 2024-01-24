const mongoose = require('mongoose')

// defines the birthday model
const birthdaySchema = new  mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthday: {
        type: Number,
        required: true
    }
})

// define and export the birthday model for the database
module.exports = mongoose.model('Birthday', birthdaySchema)