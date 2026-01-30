import express from "express";
import cors from "cors"
import User from "./models/user.js";
import userService from "./services/user-service.js";


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

app.use(cors());
app.use(express.json());

const generateId = () => {
  let rtn = Math.random().toString().substring(2, 7);
  //check for collisions, not necessary for assignment (also not a very good method to be honest)
  /*let nobrk = true;
  while(nobrk) {
    nobrk = false;
    for (let i = 0; i < users["users_list"].length; i++) {
      if (users["users_list"][i]["id"] === rtn) {
        rtn = Math.random().toString().substring(2, 7);
        console.log("collision detected, new id: " + rtn);
        nobrk = true;
        //JUST BEAK OUT OF FOR LOOP?????
        break;
      }
    }
  }*/
  console.log(rtn);
  return rtn;
};
/*
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
  return users["users_list"].push(user);
};
const deleteUserById = (id) => {
  if (user !== undefined) {
    console.log("removing " + user.id);
    users.users_list.splice(users.users_list.indexOf(user), 1);
    return 204;
  } else {
    console.log("user not found");
    return 404;
  }
};
*/

app.delete("/users/:id", (req, res) => {
  const idToDelete = req.params["id"];
  userService.findIdAndDelete(idToDelete).then(() => {
    res.status(204).send();
    return;
  }).catch((error) => {
    res.status(500).send(error);
    return;
  });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body
  userToAdd.id = generateId();
  userService.addUser(userToAdd).then(() => {
    res.status(201).send(userToAdd);
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

