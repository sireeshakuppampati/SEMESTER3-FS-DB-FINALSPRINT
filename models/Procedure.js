const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Ensure this is the correct path

const Procedure = sequelize.define('Procedure', {
    procedure_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    procedure_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    cost: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING
    }
});

module.exports = Procedure;
