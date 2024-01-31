const mongoose = require('mongoose')

// defines the task model
const taskSchema = new  mongoose.Schema({
    task: {
        type: String,
        required: true
    }
})

// define and export the task model for the database
module.exports = mongoose.model('Task', taskSchema)