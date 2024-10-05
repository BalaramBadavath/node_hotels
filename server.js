const express = require('express')
const app = express()
const db = require('./db')
const passport = require('./auth')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

require('dotenv').config()
const PORT = process.env.PORT || 3000

//Middleware function
const logRequest =  (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`)
    next()
}
app.use(logRequest)

//Authentication
app.use(passport.initialize())
const logAuthMiddleWare = passport.authenticate('local',{session:false})

const personRouters = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuRoutes')

app.use('/person',personRouters)
app.use('/menu',menuItemRoutes)

app.get('/',(req,res)=>{
    res.send("welcome to my page....!")})

app.get('/home', (req,res)=>{
    res.send("This is home page of application")})

app.listen(PORT,()=>{
    console.log(`Port Listeing on ${PORT}`);})