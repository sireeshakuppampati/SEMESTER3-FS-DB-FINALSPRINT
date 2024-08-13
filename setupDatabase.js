// setupDatabase.js
const sequelize = require('./config/sequelize'); // Ensure the path is correct

sequelize.sync({ force: true }) // Use { alter: true } to update existing schema without dropping tables
  .then(() => {
    console.log('Database synced!');
    process.exit(0); // Exit after syncing
  })
  .catch(err => {
    console.error('Error syncing database:', err);
    process.exit(1); // Exit with error code
  });
