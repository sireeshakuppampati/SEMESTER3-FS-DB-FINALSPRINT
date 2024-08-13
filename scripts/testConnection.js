// scripts/testConnection.js

const connectToMongoDB = require('../db/mongodb');

async function testConnection() {
    const db = await connectToMongoDB();
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections);
}

testConnection();
