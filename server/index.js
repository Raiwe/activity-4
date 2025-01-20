const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}.`));

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password sa imong database",
  database: "Pangalan sa imong database",
  port: 3306,
});

database.connect(error => {
  if (error) return console.error("Error connecting to MySQL:", error.message);

  console.log("Successfully connected to MySQL.");
});

const useQuery = (method, query, values, res, sucessMessage) => database.query(query, values, (error, result) => {
  if (error) res.json({message: error.message});

  method == "get" ? res.json(result) : res.json({message: sucessMessage});
});

app.post("/register", (req,res) => {
  const { username } = req.body;

  const createUser = "INSERT INTO users VALUES (?)";
  const sucessMessage = "User registered successfully.";

  useQuery(undefined, createUser, [username], res, sucessMessage);
});

app.get("/api/users", (req, res) => {
  const method = "get";
  const getUsers = "SELECT * FROM users";

  useQuery(method, getUsers, undefined, res, undefined);
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  const updateUser = "UPDATE users SET username = ? WHERE userId = ?";
  const sucessMessage = "User updated sucessfully.";

  useQuery(undefined, updateUser, [username, id], res, sucessMessage);
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const deleteUser = "DELETE FROM users WHERE userId = ?";
  const successMessage = "User deleted sucessfully.";

useQuery(undefined, deleteUser, [id], res, successMessage);
})