const express = require("express");
const pageController = require("../controllers/pageController");

const router = express.Router();

// GET / calls the controller's home function.
router.get("/", pageController.home);

module.exports = router;