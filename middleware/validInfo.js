module.exports = (req, res, next) => {
    const { name, email, password, role, avatar } = req.body;

    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
      }

    if (req.path === "/register") {
        if (![name, email, password, role, avatar].every(Boolean)) {
            return res.status(401).json("Faltan campos");
        } else if (!validEmail(email)) {
            return res.status(401).json("Email no válido");
        }
        
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Faltan campos");
        } else if (!validEmail(email)) {
            return res.status(401).json("Email no válido");
        }
    }
    next();
}