const Application = require("../models/Application")
const Job = require("../models/JobsModels")
exports.applyJob = async (req, res) => {
    try {
        const userId = req.user;
        const jobId = req.params.id

        if (!jobId) {
            return res.status(400).json({
                message: "job id is required",
                success: false
            })
        }
        const exisitingApplication = await Application.findOne({ job: jobId, applicant: userId })
        if (exisitingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            })
        }

        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: "No job found",
                success: false
            })
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })

        job.applications.push(newApplication._id)
        await job.save()
        return res.status(201).json({
            message: "Application submitted successfully",
            success: true
        })

    } catch (err) {
        console.log("error in applying job", err)
    }
}


exports.getApplications = async (req, res) => {
    try {
        const userId = req.user
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 })
            .populate({
                path: "job",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "company",
                    options: { sort: { createdAt: - 1 } }
                }
            })
        if (!applications) {
            return res.status(404).json({
                message: "No Applications found",
                success: false
            })
        }

        res.status(200).json({
            applications,
            success: true
        })

    } catch (err) {
        console.log("error in getting applications", err)
    }
}

exports.getApplicant = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
                options: { sort: { createdAt: - 1 } }
            }
        })
        if (!job) {
            return res.status(404).json({
                message: "No job found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (err) {
        console.log("error in getting applicant", err)
    }
}

exports.updateStatus = async (req, res) => {
    try {
        let status = req.body;
        const applicationId = req.params.id
        if (!status) {
            return res.status(404).json({
                message: "Status is Required",
                success: false
            })
        }

        let application = await Application.findOne({ _id: applicationId })
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            })
        }
        application.status = status.toLowerCase()
        await application.save()

        return res.status(200).json({
            message: "Application status updated",
            success: true
        })

    } catch (err) {
        console.log("error in updating status", err)
    }
}
// exports.deleteApplication = async (req, res) => {

// }