const Detection = require("../models/Detection");
const Personnel = require("../models/Personnel");

const express = require('express');
const router = express.Router();

const { forEach, filter } = require('lodash');

// GET all detections
// GET /detections
router.get('/', async (req, res) => {
  console.log(`GET ${req.originalUrl}`);

  try {
    const detection = await Detection.find();
    return res.status(200).send(detection);
  } catch (err) {
    console.error("error fetching asset", err);
    return res.status(500).send({
      message: err.message,
    });
  }
})

// Update Detection
// POST /detection/personnelId
router.post('/:id', async (req, res) => {
  console.log(`POST ${req.originalUrl}`);
  const id = req.params.id;
  try {
    const newDetection = await Personnel.findById(id, (err, personnel) => {
        const newDetection = new Detection({
            personnel: personnel,
            location:req.query.location,
            timeReported: moment.utc().toDate(),
        })

        newDetection.save();
        return res.status(200).send(newDetection);
    });    
  } catch (err) {
    console.error("error fetching asset", err);
    return res.status(500).send({
      message: err.message,
    });
  }
})

module.exports = router;