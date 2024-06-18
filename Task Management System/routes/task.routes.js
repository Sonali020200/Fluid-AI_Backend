
const express = require("express");
const { TaskModel } = require("../model/task.model");
const { auth } = require("../middlewares/auth.middlewares");

const taskRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - priority
 *         - status
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         priority:
 *           type: string
 *         status:
 *           type: string
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task is created Successfully!
 */

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
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

/**
 * @swagger
 * /task:
 *   get:
 *     summary: Get all tasks for the authenticated user
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */

taskRouter.get("/", auth, async (req, res) => {
    const userId = req.id;
    try {
        const tasks = await TaskModel.find({ userId });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Get a particular task by ID for the authenticated user
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task data
 *       400:
 *         description: You are not allowed to access
 */

taskRouter.get("/:_id", auth, async (req, res) => {
    const id = req.id;
    const { _id } = req.params;
    try {
        const tasks = await TaskModel.findOne({ _id });
        const { userId } = tasks;
        if (userId.toString() == id) {
            res.status(200).json(tasks);
        } else {
            res.status(400).json({ msg: "You are not allowed to access" });
        }
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

/**
 * @swagger
 * /task/{id}:
 *   patch:
 *     summary: Update a particular task by ID for the authenticated user
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tasks has been updated
 *       400:
 *         description: You are not authorized to update other tasks
 */

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
        } else {
            res.status(400).json({ msg: "You are not authorized to update other tasks" });
        }
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete a particular task by ID for the authenticated user
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Tasks has been deleted
 *       400:
 *         description: You are not authorized to delete other tasks
 */

taskRouter.delete("/:_id", auth, async (req, res) => {
    const { _id } = req.params;
    const id = req.id;
    try {
        const task = await TaskModel.findOne({ _id });
        const { userId } = task;
        if (userId.toString() == id) {
            await TaskModel.findByIdAndDelete(_id);
            res.status(200).json({ msg: "Tasks has been deleted" });
        } else {
            res.status(400).json({ msg: "You are not authorized to delete other tasks" });
        }
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

module.exports = {
    taskRouter
};
