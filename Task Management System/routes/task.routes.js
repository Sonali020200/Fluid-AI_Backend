const express = require("express");
const { TaskModel } = require("../model/task.model");
const { auth } = require("../middlewares/auth.middlewares")


const taskRouter = express.Router();


// create a new task

taskRouter.post("/", auth, async (req, res) => {
    const payload = req.body;
    const userId = req.id;
    try {
        const task = new TaskModel({
            ...payload,
            userId
        });
        await task.save();
        res.status(200).json({ msg: "Task is created Successfully!" });
    }
    catch (err) {
        res.status(400).json({ msg: err });
    }
});

// get all tasks 

taskRouter.get("/", auth, async (req, res) => {
    const userId = req.id;
    try {
        const tasks = await TaskModel.find({ userId });
        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(400).json({ msg: err });
    }
});


// get particular task with id

taskRouter.get("/:_id", auth, async (req, res) => {
    const id = req.id;
    const { _id } = req.params;
    try {
        const tasks = await TaskModel.findOne({ _id });
        const { userId } = tasks;
        if (userId.toString() == id) {
            res.status(200).json(tasks);
        }
        else {
            res.status(400).json({ msg: "You are not allowed to access" });
        }

    }
    catch (err) {
        res.status(400).json({ msg: err });
    }
});


// update tasks

taskRouter.patch("/:_id", auth, async (req, res) => {
    const { _id } = req.params;
    const payload = req.body;
    const id = req.id;
    try {
        const task = await TaskModel.findOne({ _id });
        const { userId } = task;
        if (userId.toString() == id) {
            await TaskModel.findByIdAndUpdate(_id, payload, { new: true });
            res.status(200).json({ msg: "Tasks has been updated" });
        }
        else {
            res.status(400).json({ msg: "You are not authorized to update other tasks" });
        }
    }

    catch (err) {
        res.status(400).json({ msg: err });
    }
});


// delete task

taskRouter.delete("/:_id", auth, async (req, res) => {
    const { _id } = req.params;
    const id = req.id;
    try {
        const task = await TaskModel.findOne({ _id });
        console.log(task);
        const { userId } = task;
        console.log(userId, id);
        if (userId.toString() == id) {
            const tasks = await TaskModel.findByIdAndDelete(_id, { new: true });
            res.status(200).json({ msg: "Tasks has been deleted" });
        }
        else {
            res.status(400).json({ msg: "You are not authorized to delete other tasks" });
        }
    }

    catch (err) {
        res.status(400).json({ msg: err });
    }
});



module.exports = {
    taskRouter
}