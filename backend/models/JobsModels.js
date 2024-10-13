const mongoose = require("mongoose")

const jobSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    requirments: [{
        type: String,
    }],
    salary: {
        type: String,
    },
    exprience: {
        type: Number,
    },
    location: {
        type: Number,
    },
    jobType: {
        type: String,
    },
    position: {
        type: String,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    posted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
    }]

}, { timestamp: true })

module.exports = mongoose.model("Job", jobSchema)