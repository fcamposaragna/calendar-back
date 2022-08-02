const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config')

const app = express();
const PORT = process.env.PORT || 8080;
dbConnection();

app.listen( PORT, ()=> console.log(`Listening on port ${PORT}`));

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
