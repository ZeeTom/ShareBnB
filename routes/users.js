"use strict";

/** Routes for users. */

// const jsonschema = require("jsonschema");

const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
// const { BadRequestError } = require("../expressError");
const User = require("../models/user");
// const { createToken } = require("../helpers/tokens");
// const userNewSchema = require("../schemas/userNew.json");
// const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

router.get("/", ensureLoggedIn, async function (req, res, next) {
  const searchTerm = req.query.username;
  try {
    const users = await User.findAll(searchTerm);
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
