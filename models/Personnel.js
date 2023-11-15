const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const personnelSchema = new Schema({
    rank: String,
    name: String,
    phoneNumber: Number,
    appointment: String,
    attendance: Boolean,
    detections: [{
        type: ObjectId,
        ref: "detection"
    }]
})

module.exports = mongoose.model("Personnel", personnelSchema)
