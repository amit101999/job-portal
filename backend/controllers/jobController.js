const Job = require("../models/JobsModels")

exports.postJob = async (req, res) => {
    const { title, description, requirements, salary,
        location, jobType, exprience, position, companyId } = req.body

    // if (!title || !description || !requirements || !salary ||
    //     !location || !jobType || !exprience || !position || !companyId) {
    //     return res.status(400).json({
    //         message: "All fields must be provided",
    //         success: false
    //     })
    // }

    const userId = req.user
    try {
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary,
            location,
            jobType,
            exprience,
            position,
            company: companyId,
            posted_by: userId
        })

        return res.status(200).json({
            message: "Job posted successfully",
            job: job,
            success: true
        })
    } catch (err) {
        console.error("error in creating job", err)
    }
}


exports.getJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company",
        }).sort({ createdAt: -1 })

        if (!jobs) {
            return res.status(404).json({
                message: "No job found",
                success: false
            })
        }
        return res.status(200).json({
            message: "job found",
            job: jobs,
            success: true
        })

    } catch (err) {
        console.error("Error in getting jobs", err)
    }
}


exports.getJobsById = async (req, res) => {
    try {
        const id = req.params.id
        const job = await Job.findById(id).populate({
            path: "applications",
        }).sort({ createdAt: -1 })

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            job: job,
            success: true
        })
    } catch (err) {
        console.log("error ih getting job by id ", err)
    }
}

// jobs created by admin 
exports.getAdminJob = async (req, res) => {
    try {
        const id = req.user
        const jobs = await Job.find({ posted_by: id }).populate({
            path: "company",
            createdAt: -1
        })
        if (!jobs) {
            return res.status(404).json({
                message: "No job found by current user",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (err) {
        console.error("Error in getting admin job", err)
    }
}