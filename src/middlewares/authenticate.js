const jwt = require("jsonwebtoken");
//autenticar é verificar se o token bate com a senha
//diferente de usar o BEARER, que é colocado na aba auth em vez de headers

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        const decodedToken = jwt.verify(token, "SenhaParaGerarMeuToken");

        req.userData = { userId: decodedToken.userId };

        next();
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = authenticate;