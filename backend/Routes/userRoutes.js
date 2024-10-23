const express = require('express')
const { login, logout, updateUser, register } = require('../controllers/userController')
const { isAuthenticated } = require('../middleware/isAuthenticated')
const { singleUpload } = require('../middleware/multer')

const router = express.Router()

router.route("/register").post(singleUpload, register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").post(isAuthenticated, singleUpload, updateUser)

module.exports = router