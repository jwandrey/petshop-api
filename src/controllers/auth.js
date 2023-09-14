const database = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (request, response) => {
  //fazer login é ter um token
  const { email, password } = request.body;

  try {
    const user = await database.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return response.status(401).send({ message: "Authentication failed" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isPasswordValid) {
      return response.status(401).send({ message: "Authentication failed" });
    }

    const token = jwt.sign(
      { userId: user.rows[0].id },
      "SenhaParaGerarMeuToken",
      { expiresIn: "1h" }
    );

    return response.status(200).send({ token });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  login,
};
