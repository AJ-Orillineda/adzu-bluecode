const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

// player creation
router.post('/', async(req, res) =>{
    try{
        const existingPlayer = await Player.findOne({playerId: 0});
        if(!existingPlayer){
            const newPlayer = new Player(); //creates newPlayer if there is not matching playerID
            const player = await newPlayer.save();
            return res.status(201).json(player);
        }
        return res.status(400).json({ message: `Player with playerId 0 already exists` });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: `Error creating player`, error: error });
    }
});

// get the data of the player and if it matches the playerID, then is eligible to proceed
router.get('/', async(req, res)=>{
    try{
        const player = await Player.findOne({playerId: 0});

        if(!player){
        return res.status(404).json({message: 'Player not found'});
        }
        res.status(200).json(player);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Server error', error: error});
    }

});

// U in CRUD. updates the database if the player reaches a new milestone
router.put('/lettersLevel', async(req, res)=>{
    try{
        const player = await Player.findOne({playerId: 0});
        if(!player){
            return res.status(404).json({message: 'Player not found'});
        }
        const nextLevel = player.lettersLevel + 1;
        const updatedPlayer = await Player.findOneAndUpdate(
            { playerId: player.playerId },
            { $set: { lettersLevel: nextLevel } },
            { new: true }
        );
        res.status(200).json(updatedPlayer);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error updating letters level', error: error });
    }
});

// similar to the one above but on numbers
router.put('/numbersLevel', async(req, res)=>{
    try{
        const player = await Player.findOne({playerId: 0});
        if(!player){
            return res.status(404).json({message: 'Player not found'});
        }
        const nextLevel = player.numbersLevel + 1;
        const updatedPlayer = await Player.findOneAndUpdate(
            { playerId: player.playerId },
            { $set: { numbersLevel: nextLevel } },
            { new: true }
        );
        res.status(200).json(updatedPlayer);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error updating numbers level', error: error });
    }
});

// Submit score for a specific numbers level and increment overall numbersLevel
router.put('/:playerId/numbersLevel/:levelId/score', async (req, res) => {
    const { playerId, levelId } = req.params;
    const score = parseInt(req.body.score);

    if (isNaN(score)) {
        return res.status(400).json({ message: 'Invalid score provided' });
    }

    try {
        const player = await Player.findOneAndUpdate(
            { playerId: 0 }, // Assuming playerId is always 0
            {
                $set: { [`numbersScores.${levelId}`]: score }, // Set the score for the specific level
                $inc: { numbersLevel: 1 }, // Increment the overall numbersLevel
            },
            { new: true } // Return the updated document
        );

        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }

        res.status(200).json(player);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating player data', error: error.message });
    }
});

module.exports = router;