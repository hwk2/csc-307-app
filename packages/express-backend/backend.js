import express from "express";
const app = express();
const port = 8000;
const users = {
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
};
app.use(express.json());

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user.name === name
  );
};

const findUserByIdJob = (id, job) => {
  return users["users_list"].filter(
    (user) => user.job === job
  ).filter(
    (user) => user.id === id
  );
};

const findUserById = (id) => 
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserById = (id) => {
  let user = findUserById(id);
  console.log(user);
  if (user !== undefined) {
    delete users.users_list[users.users_list.indexOf(user)];
  }
}

app.delete("/users", (req, res) => {
  const userToDelete = req.body
  deleteUserById(userToDelete.id);
  res.send(users);
});

app.post("/users", (req, res) => {
  const userToAdd = req.body
  addUser(userToAdd);
  res.send(users);
});

app.get("/users/:id/:job", (req, res) => {
  const id = req.params["id"];
  const job = req.params["job"];
  console.log("checking for: " + id + " and " + job);
  let result = findUserByIdJob(id, job);
  if(result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  console.log("checking for: " + id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});



app.get("/users", (req, res) => {
  const name = req.query.name;
  if(name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});

