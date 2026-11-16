const groomingService = require("../services/groomingService");

exports.home = (req, res) => {
    res.render("home", {
      title: "PawCare | Home",
      businessName: "PawCare",
    });
  };

  exports.services = (req, res) => {
    const services = groomingService.getAllServices();
  
    res.render("services", {
      title: "PawCare | Services",
      services: services,
    });
  };
  
  exports.about = (req, res) => {
    res.render("about", {
      title: "PawCare | About",
    });
  };