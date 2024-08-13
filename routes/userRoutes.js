const express = require('express');
const router = express.Router();
const User = require('../models/User');
const MedicalProcedure = require('../models/MedicalProcedure');

// User Routes
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.redirect('/users');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Medical Procedure Routes
router.get('/medical-procedures', async (req, res) => {
    try {
        const procedures = await MedicalProcedure.find();
        res.render('medicalProcedures', { procedures });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/medical-procedures', async (req, res) => {
    try {
        const { name, description, cost } = req.body;
        const newProcedure = new MedicalProcedure({ name, description, cost });
        await newProcedure.save();
        res.redirect('/medical-procedures');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/medical-procedures/edit/:id', async (req, res) => {
    try {
        const procedure = await MedicalProcedure.findById(req.params.id);
        res.render('editMedicalProcedure', { procedure });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/medical-procedures/edit/:id', async (req, res) => {
    try {
        const { name, description, cost } = req.body;
        await MedicalProcedure.findByIdAndUpdate(req.params.id, { name, description, cost });
        res.redirect('/medical-procedures');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/medical-procedures/delete/:id', async (req, res) => {
    try {
        await MedicalProcedure.findByIdAndDelete(req.params.id);
        res.redirect('/medical-procedures');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/medical-procedures/search', async (req, res) => {
    try {
        const { procedure_name } = req.query;
        const procedures = await MedicalProcedure.find({
            name: new RegExp(procedure_name, 'i')
        });
        res.render('medicalProcedures', { procedures });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
