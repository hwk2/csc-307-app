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

const findUserByNameJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user.name === name && user.job === job
  )
};

const findUserById = (id) => 
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserById = (id) => {
  let user = findUserById(id);
  if (user !== undefined) {
    console.log("removing " + user.id);
    users.users_list.splice(users.users_list.indexOf(user), 1);
  } else {
    console.log("user not found");
  }
}

app.delete("/users/:id", (req, res) => {
  const idtoDelete = req.params["id"]
  deleteUserById(idtoDelete);
  res.send();
});

app.post("/users", (req, res) => {
  const userToAdd = req.body
  addUser(userToAdd);
  res.send(users);
});

/* app.get("/users/:name/:job", (req, res) => {
  const name = req.params["name"];
  const job = req.params["job"];
  console.log("checking for: " + name + " and " + job);
  let result = findUserByNameJob(name, job);
  if(result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
}); */

// in the future will use query instead of params for filtering. However, this was in the assignment instructions.
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
  const job = req.query.job;

  console.log("checking for: " + name + " and " + job);

  let result = undefined;

  if(name != undefined) {
    if(job != undefined) {
      let result = findUserByNameJob(name, job);
      result = { users_list: result };
      res.send(result);
      return;
    }
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

