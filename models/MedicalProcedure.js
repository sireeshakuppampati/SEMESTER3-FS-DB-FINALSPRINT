const express = require('express');
const router = express.Router();
const User = require('../models/User');
const MedicalProcedure = require('../models/MedicalProcedure');

// User Routes
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();  // Fetch users from the database
        res.render('users', { users });   // Pass users to the view
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });  // Create a new user instance
        await newUser.save();  // Save the new user to the database
        res.redirect('/users');  // Redirect back to the users list
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Medical Procedure Routes
router.get('/medical-procedures', async (req, res) => {
    try {
        const procedures = await MedicalProcedure.find(); // Fetch procedures from the database
        res.render('medicalProcedures', { procedures });  // Pass procedures to the view
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/medical-procedures', async (req, res) => {
    try {
        const { name, description, cost } = req.body;
        const newProcedure = new MedicalProcedure({ name, description, cost });  // Create a new procedure instance
        await newProcedure.save();  // Save the new procedure to the database
        res.redirect('/medical-procedures');  // Redirect back to the procedures list
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/medical-procedures/edit/:id', async (req, res) => {
    try {
        const procedure = await MedicalProcedure.findById(req.params.id);
        res.render('editMedicalProcedure', { procedure }); // Render edit form with procedure data
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/medical-procedures/edit/:id', async (req, res) => {
    try {
        const { name, description, cost } = req.body;
        await MedicalProcedure.findByIdAndUpdate(req.params.id, { name, description, cost });
        res.redirect('/medical-procedures'); // Redirect to procedures list after update
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/medical-procedures/delete/:id', async (req, res) => {
    try {
        await MedicalProcedure.findByIdAndDelete(req.params.id);
        res.redirect('/medical-procedures'); // Redirect to procedures list after deletion
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/medical-procedures/search', async (req, res) => {
    try {
        const { procedure_name } = req.query;
        const procedures = await MedicalProcedure.find({
            name: new RegExp(procedure_name, 'i') // Case-insensitive search
        });
        res.render('medicalProcedures', { procedures }); // Pass search results to the view
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
