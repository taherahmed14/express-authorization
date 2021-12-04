const User = require("../model/user.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');

const newToken = (user) => {
    return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
}

const register = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        let customMsg = error.array().map(({ msg, param, location }) => {
            return { [param] : msg }
        });
        return res.status(400).json({ errors: customMsg });
    }
    try{
        // check if the email address provided already exist
        let user = await User.findOne({ email: req.body.email }).lean().exec();
        
        // if it already exists then throw an error
        if(user) 
        return res.status(400).json({ 
            status: "failed", message: "Email Id already in use",
        });

        // else we will create the user
        user = await User.create(req.body);

        // we will hash the password as plain text password is harmful


        // we will create the token
        const token = newToken(user);

        //return the user and the token
        res.status(201).json({ user, token });
    }
    catch(e){
        return res.status(500).json({
            message: e.message, 
            status: "Failed"
        });
    }
};

const login = async (req, res) => {
    try{
        //check if the email adress provided already exist
        let user = await User.findOne({ email: req.body.email });

        //if it does not exist throw and error
        if(!user) 
        return res.status(400).json({ 
            status: "failed", message: "Email Id does not exist",
        });

        //else we match the password
        const match = await user.checkPassword(req.body.password);

        //if not match then throw and error
        if(!match) 
        return res.status(400).json({ 
            status: "failed", message: "Enter correct Password",
        });

        //if it matches then create the token
        const token = newToken(user);

        //return the user and token
        res.status(201).json({ user, token });
    }
    catch(e){
        return res.status(500).json({
            message: e.message, 
            status: "Failed"
        });
    }
};

module.exports = { register, login };