const petService = require("../services/petService");

exports.list = (req, res) => {
  res.render("pets", {
    title: "PawCare | My Pets",
    pets: petService.getPetsByOwner(req.user.id),
    error: null,
  });
};

exports.create = (req, res) => {
  try {
    petService.createPet(req.body, req.user.id);
    res.redirect("/pets");
  } catch (error) {
    res.status(400).render("pets", {
      title: "PawCare | My Pets",
      pets: petService.getPetsByOwner(req.user.id),
      error: error.message,
    });
  }
};