const mongoose = require("mongoose")

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    website: {
        type: String,
    },
    logo: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

}, { timestamps: true })

module.exports = mongoose.model("Company", companySchema)