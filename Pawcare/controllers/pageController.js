exports.home = (req, res) => {
    res.render("home", {
      title: "PawCare | Home",
      businessName: "PawCare",
    });
  };

  exports.services = (req, res) => {
    res.render("services", {
      title: "PawCare | Services",
    });
  };
  
  exports.about = (req, res) => {
    res.render("about", {
      title: "PawCare | About",
    });
  };