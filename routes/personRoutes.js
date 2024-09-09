const express = require('express')
const router = express.Router()
const Person = require('../models/Person')

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

router.get('/', async (req,res)=>{
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