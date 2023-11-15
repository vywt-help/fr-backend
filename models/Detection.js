const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const detectionSchema = new Schema({
    personnel: {
        type: ObjectId,
        ref: 'personnel'
    },
    location: String,
    timeReported: {type: Date, default: Date.now()},
})

module.exports = mongoose.model("detection", detectionSchema);