const express = require('express');
const router = express.Router();
const pool = require('../db');

// get all productos
router.get('/', async (req, res) => {
    try {
        const allProductos = await pool.query("SELECT * FROM productos");
        res.json(allProductos.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

// get a producto
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);
        if (producto.rows.length === 0) {
            res.status(404).send('El producto no existe');
        } else {
            res.json(producto.rows[0]);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

// create a producto

router.post('/', async (req, res) => {
    try {
        const { title, price, description, category,images,quantity } = req.body;
        const newProducto = await pool.query("INSERT INTO productos (title, price, description, category,images,quantity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [title, price, description, category,images,quantity]);
        res.json(newProducto.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

// update a producto
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, description, category,images,quantity  } = req.body;
        const updateProducto = await pool.query("UPDATE productos SET title = $1, price = $2, description = $3, category = $4,images = $5,quantity = $6 WHERE id = $7", [title, price, description, category,images,quantity ,id]);  
        res.json("Producto actualizado");
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

// delete a producto
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProducto = await pool.query("DELETE FROM productos WHERE id = $1", [id]);
        res.json("Producto eliminado");
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

module.exports = router;
