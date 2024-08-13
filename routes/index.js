const express = require('express');
const router = express.Router();
const db = require('../db/postgres'); // PostgreSQL database connection
const User = require('../models/User'); // MongoDB User model
const logger = require('../logger'); // Import the logger

// Route to search for users
router.get('/search', async (req, res) => {
    const { query, userId } = req.query;

    try {
        // Log the search query
        logger.info({
            message: 'User search',
            userId: userId,
            searchQuery: query,
            timestamp: new Date().toISOString()
        });

        // Perform the search
        const users = await User.find({ name: new RegExp(query, 'i') }).exec();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search users' });
    }
});

// Home route
router.get('/', (req, res) => {
    res.render('index'); // Render the index.handlebars file
});

// Users route
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users', { users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Medical Procedures route using PostgreSQL
router.get('/medical-procedures', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM medical_procedures');
        res.render('medicalProcedures', { procedures: result.rows });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Create a new medical procedure
router.post('/medical-procedures', async (req, res) => {
    const { procedure_name, description, cost } = req.body;
    try {
        await db.query(
            'INSERT INTO medical_procedures (procedure_name, description, cost) VALUES ($1, $2, $3)',
            [procedure_name, description, cost]
        );
        res.redirect('/medical-procedures');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update medical procedure by ID
router.put('/medical-procedures/:id', async (req, res) => {
    const { procedure_name, description, cost } = req.body;
    try {
        const updatedProcedure = await db.query(
            'UPDATE medical_procedures SET procedure_name = $1, description = $2, cost = $3 WHERE id = $4 RETURNING *',
            [procedure_name, description, cost, req.params.id]
        );
        if (!updatedProcedure.rows.length) return res.status(404).json({ message: 'Procedure not found' });
        res.redirect('/medical-procedures');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete medical procedure by ID
router.post('/medical-procedures/delete/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM medical_procedures WHERE id = $1', [req.params.id]);
        res.redirect('/medical-procedures');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Search medical procedures by name
router.get('/medical-procedures/search', async (req, res) => {
    const { procedure_name } = req.query;
    try {
        const result = await db.query(
            'SELECT * FROM medical_procedures WHERE procedure_name ILIKE $1',
            [`%${procedure_name}%`]
        );
        res.render('medicalProcedures', { procedures: result.rows });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
