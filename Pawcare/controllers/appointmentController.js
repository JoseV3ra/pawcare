const appointmentService = require("../services/appointmentService");
const petService = require("../services/petService");
const groomingService = require("../services/groomingService");

function showPage(req, res, error = null, status = 200) {
  res.status(status).render("appointments", {
    title: "PawCare | Appointments",
    pets: petService.getPetsByOwner(req.user.id),
    services: groomingService.getAllServices(),
    groomers: appointmentService.getGroomers(),
    appointments: appointmentService.getAppointmentsByOwner(req.user.id),
    error,
  });
}

exports.list = (req, res) => {
  showPage(req, res);
};

exports.create = (req, res) => {
  try {
    appointmentService.createAppointment(req.body, req.user.id);
    res.redirect("/appointments");
  } catch (error) {
    showPage(req, res, error.message, 400);
  }
};

exports.cancel = (req, res) => {
  try {
    appointmentService.cancelAppointment(req.params.id, req.user.id);
    res.redirect("/appointments");
  } catch (error) {
    showPage(req, res, error.message, 400);
  }
};