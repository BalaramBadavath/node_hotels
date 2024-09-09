const mongoose = require('mongoose')
const personSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    age : {
        type : Number,
        require : true
    },
    work : {
        type : String,
        require : true,
        enum : ["chef","waiter","manager"]
    },
    mobile : {
        type : Number,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    address : {
        type : String
    },
    salary : {
        type : Number,
        require : true
    }
})

module.exports = mongoose.model("Person", personSchema)