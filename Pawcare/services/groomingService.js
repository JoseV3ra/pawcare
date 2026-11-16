class GroomingService {
    constructor(id, name, description, price, durationMinutes) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.durationMinutes = durationMinutes;
    }
  }
  
  const services = [
    new GroomingService(
      1,
      "Bath and Brush",
      "A bath and brushing to keep your pet's coat clean.",
      30,
      30
    ),
    new GroomingService(
      2,
      "Full Groom",
      "A bath, brushing, haircut, and nail trim.",
      60,
      60
    ),
    new GroomingService(
      3,
      "Nail Trim",
      "Nail trimming to help keep your pet comfortable.",
      15,
      15
    ),
  ];
  
  function getAllServices() {
    return services;
  }
  
  module.exports = { getAllServices };