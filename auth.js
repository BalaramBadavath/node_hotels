const passport = require('passport')
const Person = require('./models/Person')
const LocalStrategy = require('passport-local').Strategy 

passport.use(new LocalStrategy(async (USERNAME,password,done)=>{
    try{
        const user = await Person.findOne({username : USERNAME})
        if(!user){
            return done(null,false, {message:"Incorrect Username"})
        }
        const isPasswordMatch = await user.comparePassword(password, user.password)
        if(isPasswordMatch){
            return done(null,user)
        }else{
            return done(null,false,{message:"Incorrect Password"})
        }
    }
    catch(err){
        return done(err)
    }
}))

module.exports = passport