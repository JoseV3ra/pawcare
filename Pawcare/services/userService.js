const bcrypt = require("bcryptjs");

class User {
  constructor(id, name, email, passwordHash) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = "customer";
  }
}

const users = [];
let nextId = 1;

function registerUser(data) {
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string"
    ? data.email.trim().toLowerCase()
    : "";
  const password = typeof data.password === "string"
    ? data.password
    : "";

  if (!name || name.length > 60) {
    throw new Error("Enter a name between 1 and 60 characters.");
  }

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Enter a valid email address.");
  }

  if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
    throw new Error("Use at least 8 characters and no more than 72 bytes.");
  }

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    throw new Error("That email is already registered.");
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = new User(nextId++, name, email, passwordHash);

  users.push(user);
  return user;
}

function loginUser(email, password) {
  if (typeof email !== "string" || typeof password !== "string") {
    throw new Error("Incorrect email or password.");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((user) => user.email === normalizedEmail);

  if (
    !user ||
    Buffer.byteLength(password, "utf8") > 72 ||
    !bcrypt.compareSync(password, user.passwordHash)
  ) {
    throw new Error("Incorrect email or password.");
  }

  return user;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

module.exports = { registerUser, loginUser, getUserById };