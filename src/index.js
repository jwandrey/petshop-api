const express = require("express");
const cors = require("cors");
const clientsController = require("./controllers/clientsController");

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());

/**
 * * User routes
 */
app.post("/user", clientsController.create);
app.get("/user", clientsController.read);
app.get("/user/:id", clientsController.readById);
app.put("/user/:id", clientsController.update);
app.delete("/user/:id", clientsController.remove);

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
