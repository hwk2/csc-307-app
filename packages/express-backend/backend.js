import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users")
  .catch((error) => console.log(error));

const app = express();
const port = 8000;
/*const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};*/

app.use(cors());
app.use(express.json());

/*const generateId = () => {
  let rtn = Math.random().toString().substring(2, 7);
  console.log(rtn);
  return rtn;
};*/

app.delete("/users/:id", (req, res) => {
  const idToDelete = req.params["id"];
  userService.deleteById(idToDelete).then(() => {
    res.status(204).send();
    return;
  }).catch((error) => {
    res.status(500).send(error);
    return;
  });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body
  userService.addUser(userToAdd).then((user) => {
    res.status(201).send(user);
    return;
  }).catch((error) => {
    res.status(500).send(error);
    return;
  });
});

// in the future will use query instead of params for filtering. However, this was in the assignment instructions.
app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService.findUserById(id).then((user) => {
    res.status(200).send(user);
    return;
  }).catch((error) => {
    res.status(404).send("Resource not found." + error);
    return;
  })
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userService.getUsers(name,job).then((users) => {
    res.status(200).send({ users_list: users });
  }).catch((error) => {
    res.status(500).send(error);
  });
  return;
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});

