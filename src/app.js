const express = require('express');
const cors = require('cors');
const app = express();

//settings
app.set('port', process.env.PORT || '0.0.0.0');
app.set('host',process.env.HOST || '0.0.0.0');
app.use(cors());

app.use(express.json());

//Rutes
app.use('/api/user', require('./routes/User'));
app.use('/api/tasks', require('./routes/Tasks'));

module.exports = app;

