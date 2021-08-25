"use strict";

/** Routes for listings. */

// const jsonschema = require("jsonschema");
const express = require("express");

// const { BadRequestError } = require("../expressError");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");
const Listing = require("../models/Listing");

// const listingNewSchema = require("../schemas/listingNew.json");
// const listingUpdateSchema = require("../schemas/listingUpdate.json");
// const listingSearchSchema = require("../schemas/listingSearch.json");

const router = new express.Router();

router.post("/", ensureLoggedIn, async function (req, res, next) {
  // TODO Schema Validator
  const newListing = await Listing.create(req.body, res.locals.user.username);
  return res.status(201).json({ newListing });
});

module.exports = router;
