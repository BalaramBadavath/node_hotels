const express = require('express')
const router = express.Router()
const MenuItem = require('../models/MenuItem')

router.post('/', async (req,res)=>{
    try{
        const data = req.body
        const menuItems = new MenuItem(data)

        const response = await menuItems.save()
        res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})

router.get('/',async (req,res)=>{
    try{
        const response = await MenuItem.find()
        res.status(200).json(response)
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})

router.get('/:taste',async (req,res)=>{
    try{
        const tastes = req.params.taste
        if (tastes == "spicy" || tastes == "sweet" || tastes == "sour")
        {
            const response = await MenuItem.find({taste : tastes})
            res.status(200).json(response)
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})

router.put('/:id', async (req,res)=>{
    try{
        const menuItemsId = req.params.id
        const updateMenuItems = req.body

        const response = await MenuItem.findByIdAndUpdate(menuItemsId, updateMenuItems, {new:true,runValidators:true})
        res.status(200).json(response)
        if(!response){
            res.status(404).json({error:"MenuItem data not found"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const menuItemsId = req.params.id
        const deleteMenuItem = await MenuItem.findByIdAndDelete(menuItemsId)
        if(!deleteMenuItem)
        {
            res.status(404).json({error:"Item Not Found"})
        }
        res.status(200).json({message:"Item Deleted"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"})
    }
})

module.exports = router