const express = require('express')
const { getCompany, registerCompany, getCompanyByID, updateCompany } = require('../controllers/companyController')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const { singleUpload } = require('../middleware/multer')

const router = express.Router()

router.route("/register").post(isAuthenticated, registerCompany)
router.route("/get").get(isAuthenticated, getCompany)
router.route("/get/:id").get(isAuthenticated, getCompanyByID)
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany)

module.exports = router