const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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
    },
    username : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    }
})

personSchema.pre('save', async function(next){
    const person = this;
    if(!person.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(person.password,salt)
        person.password = hashPassword
        next();
    }
    catch(err){
        next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword,this.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
        return isMatch
    }
    catch(err){
        throw err;
    }
}

module.exports = mongoose.model("Person", personSchema)