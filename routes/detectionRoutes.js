const Detection = require("../models/Detection");
const Personnel = require("../models/Personnel");

const express = require('express');
const moment = require('moment')
const router = express.Router();

const { forEach, filter } = require('lodash');

// Get all detections
// GET /detection
router.get('/', async (req, res) => {
  console.log(`GET ${req.originalUrl}`);

  try {
    const detection = await Detection.find().populate("personnel");

    // Sort by reverse order of time: sort by moment object -> reverse
    const sortedArray = detection.sort(function(a,b) {
      return moment.utc(a.timeReported).diff(moment.utc(b.timeReported))
    }).reverse();

    // Filter out by personnel ID
    const unique = sortedArray.filter((obj, index) => {
      return index === sortedArray.findIndex(o => obj.personnel._id == o.personnel._id)
    });

    // Extract latest x entries
    let x = 11;
    const extract = unique.slice(0, x);

    return res.status(200).send(extract);
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
    const personnel = await Personnel.findById(id);

    if (personnel) {
      
      console.log(`DETECTION ${personnel}`);

      const newDetection = new Detection({
        personnel: personnel,
        location:req.query.location,
        timeReported: moment.utc().toDate()
      });

      newDetection.save();
      res.status(200).send(newDetection);
      
      personnel.detections.push(newDetection._id);
      return await personnel.save();
    };

  } catch (err) {
    console.error("error fetching asset", err);
    return res.status(500).send({
      message: err.message,
    });
  }
})

module.exports = router;