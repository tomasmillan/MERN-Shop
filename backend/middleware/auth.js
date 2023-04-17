const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).send("Acesso Denegado. No esta autenticado.");

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const user = jwt.verify(token, secretKey);
    req.user = user;

    next();
  } catch (ex) {
    return res.status(401).send("Acesso Denegado. Token Invalido");
  }
};

const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Acceso Denegado. No esta autorizado.");
    }
  });
};

module.exports = { auth, isAdmin };
