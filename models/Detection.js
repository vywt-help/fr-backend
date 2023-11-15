const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;
const moment = require("moment");

const detectionSchema = new Schema({
    personnel: {
        type: ObjectId,
        ref: 'personnel'
    },
    location: String,
    timeReported: {type: Date, default: moment().unix()},
})

module.exports = mongoose.model("Detection", detectionSchema);