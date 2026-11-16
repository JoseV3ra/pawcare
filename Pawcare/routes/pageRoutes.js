const express = require("express");
const pageController = require("../controllers/pageController");
const userController = require("../controllers/userController");
const petController = require("../controllers/petController");
const appointmentController = require("../controllers/appointmentController");
const { requireLogin } = require("../middleware/auth");


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
router.get("/pets", requireLogin, petController.list);
router.post("/pets", requireLogin, petController.create);
router.get("/appointments", requireLogin, appointmentController.list);
router.post("/appointments", requireLogin, appointmentController.create);
router.post("/appointments/:id/cancel", requireLogin, appointmentController.cancel);

module.exports = router;