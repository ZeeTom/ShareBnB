"use strict";

/** Routes for listings. */

const jsonschema = require("jsonschema");
const express = require("express");

const { UnauthorizedError, BadRequestError } = require("../expressError");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");
const Listing = require("../models/Listing");

const listingNewSchema = require("../schemas/listingNew.json");
const listingUpdateSchema = require("../schemas/listingUpdate.json");
const listingSearchSchema = require("../schemas/listingSearch.json");
const { grant, zach } = require("../projectsecrets");
const AWS = require("aws-sdk");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = new express.Router();

AWS.config.update({
  accessKeyId: grant,
  secretAccessKey: zach,
});

const s3 = new AWS.S3();

router.post("/", upload.single("image"), async function (req, res, next) {
  // console.log(req.file);
  // console.log(req.body);
  const formData = { ...req.body, price: +req.body.price };
  console.log("THIS IS FORM DATA", formData);
  const validator = jsonschema.validate(formData, listingNewSchema);
  if (!validator.valid) {
    const errs = validator.errors.map((e) => e.stack);
    throw new BadRequestError(errs);
  }
  const newListing = await Listing.create(req.body, "u1");
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

router.get("/", async function (req, res, next) {
  const q = req.query;
  // arrive as strings from querystring, but we want as ints
  if (q.minPrice !== undefined) q.minPrice = +q.minPrice;
  if (q.maxPrice !== undefined) q.maxPrice = +q.maxPrice;

  const validator = jsonschema.validate(q, listingSearchSchema);
  if (!validator.valid) {
    const errs = validator.errors.map((e) => e.stack);
    throw new BadRequestError(errs);
  }

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

/** PATCH /[listingId]  { fld1, fld2, ... } => { listing }
 *
 * Data can include: { title, salary, equity }
 *
 * Returns { id, title, salary, equity, companyHandle }
 *
 * Authorization required: admin
 */

router.patch("/:id", ensureLoggedIn, async function (req, res, next) {
  const validator = jsonschema.validate(req.body, listingUpdateSchema);
  if (!validator.valid) {
    const errs = validator.errors.map((e) => e.stack);
    throw new BadRequestError(errs);
  }
  const listing = await Listing.get(req.params.id);
  const username = listing.username;

  if (username !== res.locals.user.username) {
    throw new UnauthorizedError();
  }

  const updatedListing = await Listing.update(req.params.id, req.body);
  return res.json({ updatedListing });
});

/** DELETE /[handle]  =>  { deleted: id }
 *
 * Authorization required: admin
 */

router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
  const listing = await Listing.get(req.params.id);
  const username = listing.username;

  if (username !== res.locals.user.username) {
    throw new UnauthorizedError();
  }

  await Listing.remove(req.params.id);
  return res.json({ deleted: +req.params.id });
});

module.exports = router;
