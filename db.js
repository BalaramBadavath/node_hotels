const mongoose = require("mongoose")
// const mongoURL = "mongodb://localhost:27017/hotels"
require('dotenv').config()
const mongoURL = process.env.MONGODB_URL

mongoose.connect(mongoURL)
const db = mongoose.connection;

db.on('connected', ()=>{console.log("Connected to MongoDB Server");})
db.on('error', (err)=>{console.error("Error in Code",err);})
db.on('disconnected', ()=>{console.log("Disconnected to MongoDB Server");})

module.exports = db;