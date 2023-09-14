const express = require("express");
const cors = require("cors");

const usersController = require("./controllers/users");
const authController = require("./controllers/auth");

const authenticate = require("./middlewares/authenticate");

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());

/**
 * * User routes
 */
app.post("/user", usersController.create);
app.get("/user", authenticate, usersController.read);
app.get("/user/:id", authenticate, usersController.readById);
app.put("/user/:id", authenticate, usersController.update);
app.delete("/user/:id", authenticate, usersController.remove);

/**
 * * Login routes
 */
app.post("/login", authController.login);

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
