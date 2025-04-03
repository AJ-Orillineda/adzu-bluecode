const mongoose = require('mongoose');

const numberLevelSchema = new mongoose.Schema({
    levelId: {
        type: Number, //unique ID of level
        required: true, 
        unique: true
    },
    difficulty: {
        type: Number, 
        required: true,
        enum: [0,1,2] // 0 as the easiest and 2 as the most difficult
    },
    scorePerLevel: { // socre per level
        type: Number, 
        required: true,
        default: 0
    }
})

module.exports = mongoose.model("Number Levels", numberLevelSchema);