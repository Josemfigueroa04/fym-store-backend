const express = require('express');
const router = express.Router();
const pool = require('../db');

// get all productos
router.get('/', async (req, res) => {
    try {
        const allOrdenes = await pool.query("SELECT * FROM ordenescompra");
        res.json(allOrdenes.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

// post a orden
router.post('/', async (req, res) => {
    try {
        const { usuario_id, producto_id,fechaorden } = req.body;
        const newOrden = await pool.query("INSERT INTO ordenescompra (usuario_id, producto_id,fechaorden ) VALUES ($1, $2,$3) RETURNING *", [usuario_id, producto_id,fechaorden]);
        res.json(newOrden.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}
);

module.exports = router;
