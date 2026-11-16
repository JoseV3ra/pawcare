exports.home = (req, res) => {
    res.render("home", {
      title: "PawCare | Home",
      businessName: "PawCare",
    });
  };