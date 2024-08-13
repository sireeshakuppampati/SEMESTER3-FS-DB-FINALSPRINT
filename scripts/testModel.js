// scripts/testModel.js
const sequelize = require('../config/sequelize');
const Procedure = require('../models/Procedure');

async function test() {
    try {
        // Sync database and create a test entry
        await sequelize.sync({ force: true }); // Recreate the database schema

        // Create a test entry
        const procedure = await Procedure.create({
            procedure_id: 1,
            procedure_name: "Test Procedure",
            description: "This is a test procedure.",
            cost: 100.00,
            category: "Test"
        });

        console.log('Procedure created:', procedure.toJSON());

        // Retrieve and display all procedures
        const procedures = await Procedure.findAll();
        console.log('All procedures:', procedures);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the connection
        await sequelize.close();
    }
}

test();
