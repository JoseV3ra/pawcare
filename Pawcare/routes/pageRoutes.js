const express = require("express");
const pageController = require("../controllers/pageController");
const userController = require("../controllers/userController");

const router = express.Router();

// GET / calls the controller's home function.
router.get("/", pageController.home);
router.get("/services", pageController.services);
router.get("/about", pageController.about);
router.get("/register", userController.showRegister);
router.post("/register", userController.register);
router.get("/login", userController.showLogin);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

module.exports = router;