
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");

const userRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The new user has been registered
 */

userRouter.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let isRegister = await UserModel.findOne({ email });
        if (isRegister) {
            res.status(200).json({ msg: "You are already registered please log in" });
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(200).json({ err });
                } else {
                    const user = new UserModel({
                        username,
                        email,
                        password: hash
                    });
                    await user.save();
                    res.status(200).json({ msg: "The new user has been registered!" });
                }
            });
        }
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login with user credentials
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login Successful
 *       400:
 *         description: Password does not match
 */

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.Key, { expiresIn: '7d' });
                    res.status(200).json({ msg: "Login Successful!", token });
                } else {
                    res.status(400).json({ msg: "Password does not match" });
                }
            });
        } else {
            res.status(400).json({ msg: "Wrong Credentials" });
        }
    } catch (err) {
        res.status(400).json({ msg: err });
    }
});

module.exports = {
    userRouter
};
