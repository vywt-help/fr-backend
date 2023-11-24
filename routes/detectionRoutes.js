const Detection = require("../models/Detection");
const Personnel = require("../models/Personnel");

const express = require('express');
const moment = require('moment');
const router = express.Router();

const { forEach, filter, constant } = require('lodash');

// Get all detections
// GET /detection
router.get('/', async (req, res) => {
  console.log(`GET ${req.originalUrl}`);

  try {
    const detection = await Detection.find().populate("personnel");

    // Sort by ascending time
    const sortedArray = detection.sort(function(a,b) {
      return moment(a.timeReported).diff(moment(b.timeReported))
    });

    // // Filter out by personnel ID -> reverse (keeps earliest detection)
    // const unique = sortedArray.filter((obj, index) => {
    //   return index === sortedArray.findIndex(o => obj.personnel._id == o.personnel._id)
    // }).reverse();

    // // Extract latest x entries
    // let x = 11;
    // const extract = unique.slice(0, x);

    return res.status(200).send(sortedArray);
  } catch (err) {
    console.error("error fetching asset", err);
    return res.status(500).send({
      message: err.message,
    });
  }
})

const fs = require('fs');

// Update Detection
// POST /detection/personnelId
router.post('/:id', async (req, res) => {
  console.log(`POST ${req.originalUrl}`);
  const id = req.params.id;
  try {
    const personnel = await Personnel.findById(id);

    if (personnel) {
      
      console.log(`DETECTION ${personnel}`);

      const location = req.query.location;

      const imagePy64 = req.query.image;
      var imageData, bufferData;

      if (imagePy64) {
        //imageData = imagePy64.replace("%2B", "+");
        imageData = imagePy64;
        //console.log(`IMAGE DATA: ${imageData}`);
        bufferData = Buffer.from(imageData, "base64");
        //console.log(`BUFFER DATA:`);
        //console.log(bufferData);
        //console.log(`CONVERTED BASE 64: ${bufferData.toString('base64')}`)
        //fs.writeFileSync("output.png", bufferData);

        /* STEPS TO SHOW IMAGE IN REACT
        1. Get variable
        > var buffer;
        2. Convert to base64 string from buffer
        > const base64String = buffer.toString('base64');
        3. Append prefix
        > const withPrefix = 'data:image/png;base64,' + base64String;
        4. Use img tag, set src to image
        > <img src = {base64String} alt = "Detected Face" />
        */
      }

      const newDetection = new Detection({
        personnel: personnel,
        location: location,
        image: bufferData,
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
});

module.exports = router;