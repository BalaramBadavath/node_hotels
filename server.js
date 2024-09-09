require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./db')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const personRouters = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuRoutes')

app.use('/person',personRouters)
app.use('/menu',menuItemRoutes)



app.get('/', function (req,res){
    res.send("welcome to my page....!")
})

app.get('/home', (req,res)=>{
    res.send("This is home page of application")
})

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Port Listeing on ${PORT}`);
})