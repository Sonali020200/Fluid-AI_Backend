const express = require("express");
const { userRouter } = require("./routes/user.routes");
const { connection } = require("./config/db");
const { taskRouter } = require("./routes/task.routes");

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/task", taskRouter);

module.exports = { app, connection };
