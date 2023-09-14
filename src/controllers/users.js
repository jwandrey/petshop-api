const database = require("../database");
const bcrypt = require("bcrypt");
const { getAddress, formatAddress } = require("../utils/adress");

const create = async (request, response) => {
  try {
    const { name, email, password, cep } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const addressData = await getAddress(cep);

    const addressFormated = formatAddress(addressData);

    const query =
      "INSERT INTO users (name, email, password, address) VALUES ($1, $2, $3, $4);";

    const values = [name, email, hashedPassword, addressFormated];

    const queryResult = await database.query(query, values);

    return response.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error(error.message);
  }
};

const read = async (request, response) => {
  try {
    const query = "SELECT * FROM users;";

    const findedClient = await database.query(query);

    return response.status(200).send(findedClient["rows"]);
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
