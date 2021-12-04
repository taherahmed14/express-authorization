const express = require("express"); 
const { body } = require('express-validator');

const { register, login } = require("./controller/auth.cont");
const postController = require("./controller/post.cont");

const app = express();
app.use(express.json());

app.post("/register",
    body("name").notEmpty().withMessage("First name is required"),
    body("email").isEmail().withMessage("Enter valid Email"),
    body("password").custom(async (value) => {
        const isPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
        if (isPassword == false) {
          throw new Error("Please enter a proper password");
        }
        return true;
      }),
    register);
app.post("/login", login);

app.use("/post", postController);

module.exports = app;