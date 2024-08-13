const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Ensure this is the correct path

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING
    }
});

module.exports = Product;
