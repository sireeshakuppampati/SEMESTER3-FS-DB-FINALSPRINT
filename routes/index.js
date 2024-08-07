const express = require('express');
const router = express.Router();
const MedicalProcedure = require('../models/MedicalProcedure');
const User = require('../models/User');

// Home route
router.get('/', (req, res) => {
    res.render('index');
});

// Medical Procedures route
router.get('/medical-procedures', async (req, res) => {
    try {
        const procedures = await MedicalProcedure.find();
        res.render('medicalProcedures', { procedures });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new medical procedure
router.post('/medical-procedures', async (req, res) => {
    const { name, description, cost } = req.body;
    const newProcedure = new MedicalProcedure({ name, description, cost });
    try {
        await newProcedure.save();
        res.redirect('/medical-procedures');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Users route
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { users });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new user
router.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    try {
        await newUser.save();
        res.redirect('/users');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
