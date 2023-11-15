const Personnel = require("../models/Personnel");

const express = require('express');
const router = express.Router();

// GET Call
router.get('/', async (req, res) => {
  console.log(`GET ${req.originalUrl}`);

  try {
    const personnel = await Personnel.find();
    return res.status(200).send(personnel);
  } catch (err) {
    console.error("error fetching asset", err);
    return res.status(500).send({
      message: err.message,
    });
  }
})

// TO-DO:
// 1. Get /X [Return all]
// 2. Get /X/:id [given an id parameter, retrieve the object]
// 3. POST /X [Create object]
// 4. PATCH /X/:id [Update X object, given id]
// 5. DELETE /X/:id [Delete X object, given id]

module.exports = router;