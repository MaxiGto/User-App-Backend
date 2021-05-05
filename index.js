const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Create express server
const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Public directory
app.use( express.static('public') );

// Read body
app.use( express.json() );

// Routes
app.use('/api/v0', require('./routes/auth'));
app.use('/api/v0/users', require('./routes/users'));


// Listen to querys
app.listen( process.env.PORT , () => {
    console.log(`Server running on port ${ process.env.PORT }`);
});