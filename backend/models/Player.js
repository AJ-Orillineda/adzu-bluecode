const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    playerId:{ //set to zero since there is only one user
        type: Number,
        required: true,
        default: 0
    },
    lettersLevel: { //game state o  the user. saved canvas letter game level
        type: Number,
        required: true,
        default: 0
    },
    numbersLevel: { //game state of the user for  numebr
        type: Number,
        required: true,
        default: 0
    },
    numbersScores: { // Object to store scores for each numbers level
        type: Map,
        of: Number, // Key will be the level ID (String or Number), value will be the score
        default: {},
    }
});

module.exports = mongoose.model("Player", playerSchema);