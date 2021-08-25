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

/** GET /  =>
 *   { listings: [{ id, title, description, location, price, username, image }, ...] }
 *
 * Can filter on provided search filters:
 * - minPrice
 * - maxPrice
 * - location (will find case-insensitive, partial matches)
 *
 * Authorization required: logged in
 */

router.get("/", ensureLoggedIn, async function (req, res, next) {
  const q = req.query;
  // arrive as strings from querystring, but we want as ints
  if (q.minPrice !== undefined) q.minPrice = +q.minPrice;
  if (q.maxPrice !== undefined) q.maxPrice = +q.maxPrice;

  // const validator = jsonschema.validate(q, companySearchSchema);
  // if (!validator.valid) {
  //   const errs = validator.errors.map(e => e.stack);
  //   throw new BadRequestError(errs);
  // }

  const listings = await Listing.findAll(q);
  return res.json({ listings });
});

/** GET /[listingId] => { listing }
 *
 * Returns { id, title, description, location, price, username, image }
 *
 * Authorization required: logged in
 */

router.get("/:id", ensureLoggedIn, async function (req, res, next) {
  const listing = await Listing.get(req.params.id);
  return res.json({ listing });
});

module.exports = router;
