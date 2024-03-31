require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const {User} = require("../../models/book");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  // Check if the username already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Username already taken" });
  }

  const user = new User({ email, password });
  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const exist = await User.findOne({ email });
        if (!exist) {
          return res.status(400).send("User not found");
        }
        if (exist.password !== password) {
          return res.status(400).send("Invalid credentials");
        }
    
        const payload = {
          user: {
            id: exist.id,
          },
        };
        //return the tokens if there is any error while returning the token handling will be done
        jwt.sign(payload,process.env.SECRETKEY, (err, token) => {
          if (err) throw err;
          return res.json({ token });
        });
      } catch (err) {
        console.log(err);
        return res.status(400).send("server Error");
      }
});

module.exports = router;