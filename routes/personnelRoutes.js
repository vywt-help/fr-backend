const Personnel = require('../models/Personnel')
const Detection = require('../models/Detection')

const express = require('express')
const router = express.Router()

// GET Call
router.get('/', async (req, res) => {
  console.log(`GET ${req.originalUrl}`)

  try {
    const personnel = await Personnel.find().populate('detections')
    return res.status(200).send(personnel)
  } catch (err) {
    console.error('error fetching asset', err)
    return res.status(500).send({
      message: err.message,
    })
  }
})

// Update Group ID
// PATCH /updategrp/personnelId
router.patch('/updategrp/:id', async (req, res) => {
  console.log(`PATCH ${req.originalUrl}`)

  const id = req.params.id
  try {
    const personnel = await Personnel.findById(id)

    if (personnel) {
      const groupVar = req.query.group

      if (groupVar) {
        personnel.group = String(groupVar)
      }

      console.log(`PERSONNEL ${personnel}`)

      const response = await personnel.save()
      return res.status(200).send(response)
    }
  } catch (err) {
    console.error('error fetching asset', err)
    return res.status(500).send({
      message: err.message,
    })
  }
})

// Reset detections
//
router.patch('/reset', async (req, res) => {
  console.log(`PATCH ${req.originalUrl}`)

  try {
    // const response = await Personnel.updateMany({}, { $set: { detections: [] } })
    // console.log(response)
    const response = await Detection.deleteMany()
    console.log(response)
    return res.status(200).send(response)
  } catch (err) {
    console.error('error fetching asset', err)
    return res.status(500).send({
      message: err.message,
    })
  }
})

// TO-DO:
// 1. Get /X [Return all]
// 2. Get /X/:id [given an id parameter, retrieve the object]
// 3. POST /X [Create object]
// 4. PATCH /X/:id [Update X object, given id]
// 5. DELETE /X/:id [Delete X object, given id]

module.exports = router
