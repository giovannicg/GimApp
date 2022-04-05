const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    level : {
        type: int,
        required: true,
        unique: true
    },
    age : {
        type: int,
        required:true,
        unique:true
    },
    status : String
})

const studentdb = mongoose.model('estudiantes', schema);

module.exports = studentdb;