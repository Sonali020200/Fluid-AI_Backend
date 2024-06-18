const express = require("express");
const { userRouter } = require("./routes/user.routes");
const { connection } = require("./config/db");
const { taskRouter } = require("./routes/task.routes");
const { setupSwagger } = require("./swagger");

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/task", taskRouter);

app.get('/', (req, res) => {
    res.status(200).json({msg: 'Welcome to the Task Management System!'})
});

// Setup Swagger
setupSwagger(app);

module.exports = { app, connection };
