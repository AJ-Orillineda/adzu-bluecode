const express = require('express');
const router = express.Router();
const lettersLevel = require('../models/Letters');
const numbersLevel = require('../models/Numbers');


// checking if there is an existing levelID for the letters
router.get('/letter/:id', async(req,res)=>{ 
    try{
        const level = await lettersLevel.findOne({levelId: req.params.id});
        if(!level){
            return res.status(404).json("Letter level not found");
        }
        res.status(200).json(level); // status(200) to indicate success
    }
    catch(error){
        console.error(error);
        res.status(500).json(error); // server side error
    }
});


// checking if there is an existing levelID for the numbers
router.get('/number/:id', async(req,res)=>{ // 
    try{
        const level = await numbersLevel.findOne({levelId: req.params.id});
        if(!level){
            return res.status(404).json("Number level not found");
        }
        res.status(200).json(level); //status(200) tp indicate success
    }
    catch(error){
        console.error(error);
        res.status(500).json(error); //server side error
    }
});

module.exports = router; // Make sure you are exporting the router instance