const express = require("express");
const path = require("path");
const pageRoutes = require("./routes/pageRoutes");
const session = require("express-session");
const crypto = require("crypto");
const userService = require("./services/userService");

const app = express();
const PORT = 3000;

// tell express where our ejs templates are 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve CSS, images, and browser JavaScript.
app.use(express.static(path.join(__dirname, "public")));

// Read submitted HTML form data.
app.use(express.urlencoded({ extended: false }));


app.use(session({
    secret: crypto.randomBytes(32).toString("hex"),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    },
  }));
  
  // Make the signed-in user available to controllers and EJS pages.
  app.use((req, res, next) => {
    const user = userService.getUserById(req.session.userId);
  
    req.user = user || null;
  
    res.locals.currentUser = user
      ? { id: user.id, name: user.name, role: user.role }
      : null;
  
    next();
  });

// Send page requests to our router.
app.use("/", pageRoutes);

// Handle URLs that do not match a route.
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Handle errors passed through Express.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong");
});

app.listen(PORT, () => {
  console.log(`PawCare is running at http://localhost:${PORT}`);
});
