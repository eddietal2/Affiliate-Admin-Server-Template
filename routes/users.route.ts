const express  = require("express");
const router  = express.Router();
var usersController = require('../controllers/users-controller.ts')

router.get('/get-all-users', usersController.getAllUsers);
router.post('/delete-user', usersController.deleteUser);


export {};

module.exports = router;