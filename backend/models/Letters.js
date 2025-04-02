const mongoose = require('mongoose');

//Model for the the levels in letter
const letterLevelSchema = new mongoose.Schema({
    levelId: { //unique id that could be assigned per letter
        type: Number,
        required: true, 
        unique: true
    },
    uppercaseLetter: { 
        type: String, //letters array
        required: true,
        enum: ['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u']
    },
    scorePerLevel: {
        type: Number, //storage of scores each level
        required: true,
        default: 0
    }
})

module.exports = mongoose.model("Letter Levels", letterLevelSchema);