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
    }
})

module.exports = mongoose.model("Player", playerSchema);