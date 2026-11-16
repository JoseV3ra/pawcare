class Pet {
    constructor(id, ownerId, name, species, breed, notes) {
      this.id = id;
      this.ownerId = ownerId;
      this.name = name;
      this.species = species;
      this.breed = breed;
      this.notes = notes;
    }
  }
  
  const pets = [];
  let nextId = 1;
  
  function getPetsByOwner(ownerId) {
    return pets.filter((pet) => pet.ownerId === ownerId);
  }
  
  function createPet(data, ownerId) {
    const name = typeof data.name === "string" ? data.name.trim() : "";
    const species = typeof data.species === "string" ? data.species : "";
    const breed = typeof data.breed === "string" ? data.breed.trim() : "";
    const notes = typeof data.notes === "string" ? data.notes.trim() : "";
  
    if (!name || name.length > 60) {
      throw new Error("Enter a pet name between 1 and 60 characters.");
    }
  
    if (!["Dog", "Cat"].includes(species)) {
      throw new Error("Choose Dog or Cat.");
    }
  
    if (breed.length > 80 || notes.length > 500) {
      throw new Error("Breed or grooming notes exceed the allowed length.");
    }
  
    const pet = new Pet(nextId++, ownerId, name, species, breed, notes);
    pets.push(pet);
  
    return pet;
  }
  
  module.exports = { getPetsByOwner, createPet };