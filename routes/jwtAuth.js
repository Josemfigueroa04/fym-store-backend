const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

router.post("/register", validInfo, async (req, res) => {
    try {

        const { name, email, password, role, avatar } = req.body;
        const user = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
        if (user.rows.length !== 0) {
            return res.status(401).send("El usuario ya existe");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO usuarios (name, email, password, role, avatar) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, email, bcryptPassword, role, avatar]);


        const token = jwtGenerator(newUser.rows[0].id);

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}
);

// login route

router.post("/login",  async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json("Contraseña o email incorrecto");
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json("Contraseña o email incorrecto");
        }

        const token = jwtGenerator(user.rows[0].id);

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});


module.exports = router;