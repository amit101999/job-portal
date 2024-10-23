const mongoose = require("mongoose")

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
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
        type: String,
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

}, { timestamps: true })

module.exports = mongoose.model("Job", jobSchema)