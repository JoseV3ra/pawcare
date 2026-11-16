//The controller passes form data to the service. If validation fails, it displays the error on the page.


const userService = require("../services/userService");

exports.showRegister = (req, res) => {
  res.render("register", {
    title: "PawCare | Register",
    error: null,
    success: null,
  });
};

exports.register = (req, res) => {
  try {
    userService.registerUser(req.body);

    res.render("register", {
      title: "PawCare | Register",
      error: null,
      success: "Your account has been created.",
    });
  } catch (error) {
    res.status(400).render("register", {
      title: "PawCare | Register",
      error: error.message,
      success: null,
    });
  }
};