const express = require('express')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const { applyJob, getApplications, getApplicant, updateStatus } = require('../controllers/applicants')

const router = express.Router()

router.route("/apply/:id").get(isAuthenticated, applyJob)
router.route("/get").get(isAuthenticated, getApplications)
router.route("/:id/applicants").get(isAuthenticated, getApplicant)
router.route("/status/:id/update").post(isAuthenticated, updateStatus)

module.exports = router