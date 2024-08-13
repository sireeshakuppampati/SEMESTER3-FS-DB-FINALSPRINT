// db/mongodb.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://sireeshakuppampati:oasrsGuxJqerO4gn@cluster0.czxhx.mongodb.net/medical_db?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        return client.db("medical_db");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

module.exports = connectToMongoDB;
