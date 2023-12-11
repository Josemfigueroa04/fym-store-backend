const express = require('express');
const app = express();
const cors = require('cors');


// middleware

app.use(cors());
app.use(express.json());

// Routes

// registro y login

app.use('/auth', require('./routes/jwtAuth.js'));

// dashboard

app.use('/dashboard', require('./routes/dashboard.js'));

// productos

app.use('/productos', require('./routes/productos.js'));

// ordenes de compra

app.use('/ordenescompra', require('./routes/ordenesCompra.js'));



app.listen(5000, () => {
    console.log('server has started on port 5000');
});

