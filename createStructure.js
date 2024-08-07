const fs = require('fs');
const path = require('path');

// Define directories to be created
const directories = [
  'config',
  'models',
  'public/css',
  'routes',
  'views/layouts',
  'views/partials',
];

// Define files to be created with their initial content
const files = {
  '.gitignore': 'node_modules\n.env',
  'config/keys.js': `module.exports = {
  mongoURI: 'your_mongodb_uri',
  postgresURI: 'your_postgresql_uri',
  secretOrKey: 'your_secret'
};`,
  'models/User.js': `const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);`,
  'public/css/styles.css': '',
  'routes/index.js': `const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;`,
  'views/layouts/main.handlebars': `<!DOCTYPE html>
<html>
<head>
  <title>Medical Procedures</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  {{{body}}}
</body>
</html>`,
  'views/index.handlebars': `<h1>Welcome to Medical Procedures</h1>`,
  'app.js': `const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(\`Server started on port \${PORT}\`));`
};

// Create directories
directories.forEach(dir => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

// Create files with content
Object.keys(files).forEach(file => {
  fs.writeFileSync(path.join(__dirname, file), files[file], 'utf8');
});

console.log('Project structure created successfully!');
