const express  = require("express");
const router  = express.Router();
var authController = require('../controllers/auth-controller.ts')

router.post('/login', authController.login);
router.post('/register', authController.register);

// Add,Delete,Edit Product
// Delete User
// 


export {};

module.exports = router;