const mongoose = require("mongoose")

const applicationSchema = mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },

    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "active", "reject"]
    }

}, { timestamp: true })

module.exports = mongoose.model("Application", applicationSchema)