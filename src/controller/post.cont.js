const express = require("express");

const Post = require("../model/post.model");

const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try{
    const user = req.user;

    const post = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: user.user._id,
    });

    return res.status(201).json({ post });
  } 
  catch (e){
    return res.status(500).json({ status: "failed", message: e.message });
  }
});

router.get("/", async (req, res) => {
  const products = await Product.find().lean().exec();

  return res.send(products);
});

module.exports = router;
