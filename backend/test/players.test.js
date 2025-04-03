// test/players.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
require('dotenv').config();
const Player = require('../models/Player');

describe('Players API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI);
    });

    beforeEach(async () => {
        await Player.deleteMany({});
    });

    afterAll(async () => {
        try {
            await mongoose.connection.close();
            console.log('MongoDB connection closed.'); // Optional: Log when closed
        } catch (err) {
            console.error('Error closing MongoDB connection:', err);
        }
    });

    it('should create a new player', async () => {
        const res = await request(app)
            .post('/api/players')
            .send({});
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('playerId');
        expect(res.body).toHaveProperty('lettersLevel', 0);
        expect(res.body).toHaveProperty('numbersLevel', 0);
    });

    it('should get the default player', async () => {
        await request(app)
            .post('/api/players')
            .send({});

        const res = await request(app).get('/api/players');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('playerId', 0);
        expect(res.body).toHaveProperty('lettersLevel', 0);
        expect(res.body).toHaveProperty('numbersLevel', 0);
    });

    it('should update the lettersLevel', async () => {
        await request(app)
            .post('/api/players')
            .send({});

        const res = await request(app)
            .put('/api/players/lettersLevel')
            .send({});

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('lettersLevel', 1);
    });

    it('should update the numbersLevel', async () => {
        await request(app)
            .post('/api/players')
            .send({});

        const res = await request(app)
            .put('/api/players/numbersLevel')
            .send({});

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('numbersLevel', 1);
    });
});