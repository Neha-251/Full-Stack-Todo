const express = require("express");
const app = express();
app.use(express.json())
const userHandler = require("./controllers/userhandle");
const taskHandler = require("./controllers/taskhandle");
const { login, register } = require("./Authentication/auth");
// login
app.post("/login", login);
// register
app.post("/register", register);

// userhandle
app.use("/user", userHandler);

// taskhandle 
app.use("/task", taskHandler)


// server
app.listen("3008", () => {
    console.log("listening port 3008")
})