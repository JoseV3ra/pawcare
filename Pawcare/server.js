const express = require("express");
const path = require("path");
const pageRoutes = require("./routes/pageRoutes");

const app = express();
const PORT = 3000;

// tell express where our ejs templates are 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve CSS, images, and browser JavaScript.
app.use(express.static(path.join(__dirname, "public")));

// Read submitted HTML form data.
app.use(express.urlencoded({ extended: false }));

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
