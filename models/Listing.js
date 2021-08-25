"use strict";

const db = require("../db");
// const { BadRequestError, NotFoundError } = require("../expressError");
// const { sqlForPartialUpdate } = require("../helpers/sql");

class Listing {
  /**
   * TODO: add docstring
   */

  static async create({ title, description, location, price }, username) {
    const result = await db.query(
      `INSERT INTO listings
          (title, description, location, price, username)
          VALUES
          ($1, $2, $3, $4, $5)
          RETURNING id, title, description, location, price, username, image`,
      [title, description, location, price, username]
    );

    const listing = result.rows[0];
    return listing;
  }
}

module.exports = Listing;
