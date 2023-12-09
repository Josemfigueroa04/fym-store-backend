const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');


// middleware

app.use(cors());
app.use(express.json());

// Routes

// registro y login

app.use('/api', require('./routes/jwtAuth'));

app.listen(5000, () => {
    console.log('server has started on port 5000');
});
