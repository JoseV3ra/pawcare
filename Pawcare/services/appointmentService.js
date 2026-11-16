const petService = require("./petService");
const groomingService = require("./groomingService");

class Groomer {
  constructor(id, name, startHour, endHour) {
    this.id = id;
    this.name = name;
    this.startHour = startHour;
    this.endHour = endHour;
  }
}

class Appointment {
  constructor(id, ownerId, petId, serviceId, groomerId, date, hour) {
    this.id = id;
    this.ownerId = ownerId;
    this.petId = petId;
    this.serviceId = serviceId;
    this.groomerId = groomerId;
    this.date = date;
    this.hour = hour;
    this.status = "Scheduled";
  }
}

// Each appointment reserves one hour, from 9 AM to 5 PM.
const groomers = [
  new Groomer(1, "Alex", 9, 17),
  new Groomer(2, "Sam", 9, 17),
];

const appointments = [];
let nextId = 1;

function getGroomers() {
  return groomers;
}

function getAppointmentsByOwner(ownerId) {
  return appointments
    .filter((appointment) => appointment.ownerId === ownerId)
    .map((appointment) => {
      const pet = petService.getPetsByOwner(ownerId)
        .find((pet) => pet.id === appointment.petId);

      const service = groomingService.getAllServices()
        .find((service) => service.id === appointment.serviceId);

      const groomer = groomers
        .find((groomer) => groomer.id === appointment.groomerId);

      return {
        ...appointment,
        petName: pet.name,
        serviceName: service.name,
        groomerName: groomer.name,
      };
    });
}

function createAppointment(data, ownerId) {
  const petId = Number(data.petId);
  const serviceId = Number(data.serviceId);
  const groomerId = Number(data.groomerId);
  const hour = Number(data.hour);

  const pet = petService.getPetsByOwner(ownerId)
    .find((pet) => pet.id === petId);

  const service = groomingService.getAllServices()
    .find((service) => service.id === serviceId);

  const groomer = groomers.find((groomer) => groomer.id === groomerId);

  if (!pet || !service || !groomer) {
    throw new Error("Choose your pet, a service, and a groomer.");
  }

  if (
    !Number.isInteger(hour) ||
    hour < groomer.startHour ||
    hour >= groomer.endHour
  ) {
    throw new Error("Choose a time between 9 AM and 4 PM.");
  }

  if (
    typeof data.date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(data.date)
  ) {
    throw new Error("Choose a valid date.");
  }

  const [year, month, day] = data.date.split("-").map(Number);
  const start = new Date(year, month - 1, day, hour);

  if (
    start.getFullYear() !== year ||
    start.getMonth() !== month - 1 ||
    start.getDate() !== day ||
    start <= new Date()
  ) {
    throw new Error("Choose a valid future date and time.");
  }

  const taken = appointments.some((appointment) =>
    appointment.groomerId === groomerId &&
    appointment.date === data.date &&
    appointment.hour === hour &&
    appointment.status !== "Canceled"
  );

  if (taken) {
    throw new Error("That groomer is already booked at that time.");
  }

  const appointment = new Appointment(
    nextId++, ownerId, petId, serviceId, groomerId, data.date, hour
  );

  appointments.push(appointment);
  return appointment;
}

function cancelAppointment(id, ownerId) {
  const appointment = appointments.find((appointment) =>
    appointment.id === Number(id) &&
    appointment.ownerId === ownerId
  );

  if (!appointment || appointment.status !== "Scheduled") {
    throw new Error("Scheduled appointment not found.");
  }

  appointment.status = "Canceled";
}

module.exports = {
  getGroomers,
  getAppointmentsByOwner,
  createAppointment,
  cancelAppointment,
};