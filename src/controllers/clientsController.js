const pool = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const create = async (request, response) => {
  try {
    const { name, email, password, address } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO users (name, email, password, address) VALUES ($1, $2, $3, $4);";

    const values = [name, email, hashedPassword, address];

    const queryResult = await pool.query(query, values);

    return response
      .status(201)
      .send({ message: "Client created successfully" });
  } catch (error) {
    console.error(error.message);
  }
};

const read = (request, response) => {
  try {
    const findedClient = database.clients;
    return response.status(200).send(findedClient);
  } catch (error) {
    console.error(error.message);
  }
};

const readById = (request, response) => {
  try {
    const { id } = request.params;
    const findedClientById = database.clients.find(
      (client) => client.id === Number(id)
    );

    if (!findedClientById) {
      return response.status(404).send({ message: "Client not found" });
    }

    return response.status(200).send(findedClientById);
  } catch (error) {
    console.error(error.message);
  }
};

const update = (request, response) => {
  try {
    const { id } = request.params;
    const { name, email, password, endereco } = request.body;
    const findedClientById = database.clients.find(
      (client) => client.id === Number(id)
    );

    if (!findedClientById) {
      return response.status(404).send({ message: "Client not found" });
    }

    const findedClientIndex = database.clients.findIndex((object) => {
      return object.id === Number(id);
    });

    if (findedClientIndex !== -1) {
      database.clients[findedClientIndex] = {
        id: Number(id),
        name,
        email,
        password,
        endereco,
      };
    }

    return response.status(200).send(database.clients[findedClientIndex]);
  } catch (error) {
    console.error(error.message);
  }
};

const remove = (request, response) => {
  try {
    const { id } = request.params;

    const findedClientById = database.clients.find(
      (client) => client.id === Number(id)
    );

    if (!findedClientById) {
      return response.status(404).send({ message: "Client not found" });
    }

    const findedClientIndex = database.clients.findIndex((object) => {
      return object.id === Number(id);
    });

    if (findedClientIndex !== -1) {
      database.clients.splice(findedClientIndex, 1);
    }

    return response
      .status(200)
      .send({ message: "Client deleted successfully" });
  } catch (error) {
    console.error(error.message);
  }
};

const login = async (request, response) => {
  const { email, password } = request.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
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
      "984y503984yerfiohberlfikerbfkljhb",
      { expiresIn: "1h" }
    );

    return response.status(200).send({ token });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  create,
  read,
  readById,
  update,
  remove,
  login,
};
