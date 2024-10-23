const Company = require('../models/Company')

exports.registerCompany = async (req, res) => {
    try {

        const { companyName, description } = req.body

        if (!companyName || !description) {
            return res.status(400)
                .json({
                    message: 'All fields are required in Company',
                    success: false,
                })
        }
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
        const userId = req.id
        let company = await Company.find(userId)

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
        const { name, description, webiste, location } = req.body
        //

        const updateData = { name, description, webiste, location }

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