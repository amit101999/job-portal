const express = require('express')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const { postJob, getJobs, getJobsById, getAdminJob } = require('../controllers/jobController')


const router = express.Router()

router.route("/postjob").post(isAuthenticated, postJob)
router.route("/get").get(isAuthenticated, getJobs)
router.route("/get/:id").get(isAuthenticated, getJobsById)
router.route("/getAdminJobs").get(isAuthenticated, getAdminJob)


module.exports = router