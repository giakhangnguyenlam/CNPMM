const express = require('express');
const router = express.Router();
const {uploadImage} = require('../services/GoogleDriveService')

router.post("/", uploadImage);

module.exports = router;