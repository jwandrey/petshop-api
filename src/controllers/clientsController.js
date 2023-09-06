const pool = require("../database");

const create = async (request, response) => {
  try {
    const { name, email, password, address } = request.body;

    const query =
      "INSERT INTO users (name, email, password, address) VALUES ($1, $2, $3, $4);";

    const values = [name, email, password, address];

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

module.exports = {
  create,
  read,
  readById,
  update,
  remove,
};
