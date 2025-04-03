const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); //MongoDB URI

const playersRoute = require('./routes/player');
const levelsRoute = require('./routes/levels');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//connects to the MongoDB server with the URI in the .env file
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(`MongoDB connection error: `, err));

app.use('/api/players', playersRoute);
app.use('/api/levels', levelsRoute);

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})

module.exports = app;