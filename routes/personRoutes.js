const express = require('express')
const router = express.Router()
const Person = require('../models/Person')
const {jwtAuthMiddleware,generateToken} = require('./../jwt')

router.post('/signin', async (req,res)=>{
    try{
        const data = req.body
        const newPerson = new Person(data)

        const response = await newPerson.save();
        console.log("Data Saved");

        const payload = {
            id: response.id,
            username : response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload)
        console.log("Token is :",token);

        res.status(200).json({response: response, token: token})
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:"Internal Server Error"})
    }
})

router.post('/login', async (req,res)=>{
    try{
        const {username,password} = req.body
        const user = await Person.findOne({username:username})
        if(!user || !(await user.comparePassword(password))){
            res.status(401).json({error: "Invalid Username or Password"})
        }
        const payload = {
            id : user.id,
            username: user.username
        }
        const token = generateToken(payload)
        res.json({token:token})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal server error"})
    }
})

router.get('/profile', jwtAuthMiddleware,async (req,res)=>{
    try{
        const userData = req.body
        console.log("UserData :", userData);

        const userID = userData.id
        const user = await Person.findById(userID)
        res.status(200).json({user})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})

router.post('/', async (req,res)=>{
    try{
        const data = req.body
        const newPerson = new Person(data)

        const response = await newPerson.save();
        console.log("Data Saved");
        res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:"Internal Server Error"})
    }
})

router.get('/',jwtAuthMiddleware, async (req,res)=>{
    try{
        const data = await Person.find()
        console.log("data fetched");
        res.status(200).json(data)
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
})

router.get('/:work',async (req,res)=>{
    try{
        const workType = req.params.work;
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager')
        {
            const persons = await Person.find({work:workType})
            res.status(200).json(persons)
        }
        else{
            res.status(404).json({error: "Invalid Work Type"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})

router.put('/:id', async (req,res)=>{
    try{
        const personId = req.params.id
        const updatedPersonData = req.body

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {new:true,runValidators:true})
        res.status(200).json(response)
        if(!response){
            res.status(404).json({error:"Person Data Not Found"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id
        const deletePerson = await Person.findByIdAndDelete(personId)

        if(!deletePerson){
            res.status(404).json({error:"Person Data Not Found"})
        }
        res.status(200).json("Data Deleted")
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})  


module.exports = router