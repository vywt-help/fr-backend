const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;
const moment = require("moment");

const detectionSchema = new Schema({
    personnel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Personnel'
    },
    location: String,
    timeReported: {type: Date, default: moment().unix()},
})

module.exports = mongoose.model("Detection", detectionSchema);