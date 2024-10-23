const multer = require('multer')
const storage = multer.memoryStorage()
exports.singleUpload = multer({ storage: storage }).single("file");
