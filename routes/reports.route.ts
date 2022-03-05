const express  = require("express");
const router  = express.Router();
var reportsController = require('../controllers/reports-controller.ts')

router.get('/get-all-reports', reportsController.getReports);


export {};

module.exports = router;