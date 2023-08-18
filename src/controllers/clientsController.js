const database = require("../database");
let id = 1;

const create = (request, response) => {
  const { name, email, password, endereco } = request.body;
  const newClient = { id, name, email, password, endereco };
  database.clients.push(newClient);
  id++;
  return response.status(201).send({ message: "Client created successfully" });
};

const read = (request, response) => {
  const findedClient = database.clients;
  return response.status(200).send(findedClient);
};

const readById = (request, response) => {
  const { id } = request.params;
  const findedClientById = database.clients.find(
    (client) => client.id === Number(id)
  );

  if (!findedClientById) {
    return response.status(404).send({ message: "Client not found" });
  }

  return response.status(200).send(findedClientById);
};

const update = (request, response) => {
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
};

const remove = (request, response) => {
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

  return response.status(200).send({ message: "Client deleted successfully" });
};

module.exports = {
  create,
  read,
  readById,
  update,
  remove,
};
