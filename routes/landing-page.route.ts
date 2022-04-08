const express  = require("express");
const router  = express.Router();
var landingPageController = require('../controllers/landing-page-controller.ts')

router.get('/get-landing-page-info', landingPageController.getLandingPageInfo);
router.get('/create-landing-page', landingPageController.createLandingPage);
router.post('/edit-welcome-message', landingPageController.editWelcomeMessage);
router.post('/edit-sample', landingPageController.editSample);
router.post('/edit-description', landingPageController.editDescription);
router.post('/edit-membership-message', landingPageController.editMembershipMessage);


export {};

module.exports = router;