const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const port = process.env.PORT || 3000;

//define paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Tommy Chen",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Tommy Chen",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help. Me.",
    msg: "Please send help... now",
    name: "Tommy Chen",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: "You must provide an address" });
  }
  geocode(address, (error, data) => {
    if (!data) {
      return res.send({ error });
    }
    forecast(data, (error, data) => {
      if (!data) {
        return res.send({ error });
      }
      const { location, time, latitude, longitude, condition, temp } = data;
      return res.send({
        address,
        location,
        time,
        latitude,
        longitude,
        condition,
        temp,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("notfound", {
    title: "404 not found",
    msg: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("notfound", {
    title: "404 not found",
    msg: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
