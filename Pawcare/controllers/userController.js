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

exports.showLogin = (req, res) => {
    res.render("login", {
      title: "PawCare | Login",
      error: null,
    });
  };
  
  exports.login = (req, res, next) => {
    let user;
  
    try {
      user = userService.loginUser(req.body.email, req.body.password);
    } catch (error) {
      return res.status(401).render("login", {
        title: "PawCare | Login",
        error: error.message,
      });
    }
  
    // Start a fresh session after a successful login.
    req.session.regenerate((error) => {
      if (error) return next(error);
  
      req.session.userId = user.id;
  
      req.session.save((error) => {
        if (error) return next(error);
  
        res.redirect("/");
      });
    });
  };
  
  exports.logout = (req, res, next) => {
    req.session.destroy((error) => {
      if (error) return next(error);
  
      res.clearCookie("connect.sid");
      res.redirect("/login");
    });
  };