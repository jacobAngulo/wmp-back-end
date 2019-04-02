const express = require("express");
const Users = require("../models/users.js");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("users");
});

router.post("/register", async (req, res) => {
  const user = req.body;
  if (user.username && user.password) {
    const hash = bcrypt.hashSync(user.password, 5);
    user.password = hash;
    try {
      const newUser = await Users.register(user);
      res.status(203).json(newUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ message: "please fill out required fields" });
  }
});

router.post("/login", async (req, res) => {
  const user = req.body;
  if (user.username && user.password) {
    try {
      const match = await Users.findBy({ username: user.username });
      if (match && bcrypt.compareSync(user.password, match.password)) {
        res.status(200).json({ message: `welcome ${user.username}` });
      } else {
        res.status(403).json({ message: "invalid credentials" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ message: "please fill out required fields" });
  }
});

module.exports = router;
