const Company = require('../models/Company')
const getDataUri = require("../utils/dataUri")
const cloudinary = require("../utils/cloudinary");

exports.registerCompany = async (req, res) => {
    try {

        const { companyName, description } = req.body

        // if (!companyName || !description) {
        //     return res.status(400)
        //         .json({
        //             message: 'All fields are required in Company',
        //             success: false,
        //         })
        // }
        let company = await Company.findOne({ name: companyName })

        if (company) {
            return res.status(409)
                .json({
                    message: 'Company already exists',
                    success: false,
                })
        }
        company = await Company.create({
            name: companyName,
            userId: req.user,
            description: description,
        })
        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (err) {
        console.error("Error in registering company", err)
    }
}


exports.getCompany = async (req, res) => {
    try {
        const userId = req.user
        console.log(userId)
        let company = await Company.find({ userId: userId })

        if (!company) {
            return res.status(404)
                .json({
                    message: 'No company found for this user',
                    success: false,
                })
        }
        return res.status(200).json({
            company,
            success: true
        })

    } catch (err) {
        console.error("Error in getting company", err)
    }
}


exports.getCompanyByID = async (req, res) => {
    try {
        const id = req.params.id

        let company = await Company.findById(id)
        if (!company) {
            return res.status(404)
                .json({
                    message: 'No company found for this Company Id',
                    success: false,
                })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (err) {
        console.log("Error in getting company by ID", err)
    }
}

exports.updateCompany = async (req, res) => {
    try {
        const id = req.params.id;
        const file = req.file
        const { name, description, website, location } = req.body

        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const logo = cloudResponse.secure_url

        const updateData = { name, description, website, location, logo }
        let company = await Company.findByIdAndUpdate(id, updateData, { new: true })

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company information updated.",
            success: true
        })
    } catch (err) {
        console.log("Error updating", err)
    }
}