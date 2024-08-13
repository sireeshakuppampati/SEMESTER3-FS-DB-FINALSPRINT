const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Ensure this is the correct path
const User = require('./User'); // Ensure this is the correct path
const Procedure = require('./Procedure'); // Ensure this is the correct path

const Order = sequelize.define('Order', {
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    procedure_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Procedure,
            key: 'procedure_id'
        }
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Order;
