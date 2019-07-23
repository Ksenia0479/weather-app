const express = require("express");
const path = require("path");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || "3000";

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "You must provide an address"
    });
  }
  const { location } = req.query;

  geocode(location, (error, geoData) => {
    if (error) {
      return res.send({
        error
      });
    }

    forecast(geoData, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }

      res.send({
        title: "Weather",
        author: "Robot",
        location: geoData.location,
        forecast: forecastData
      });
    });
  });
});

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    author: "Robot"
  });
});

app.get("/help", (req, res) => {
  res.render("index-help", {
    title: "Help page",
    helpText: "Here is placed some helpful text",
    author: "Robot"
  });
});

app.get("/about", (req, res) => {
  res.render("index-about", {
    title: "About page",
    author: "Robot"
  });
});

app.get("*", (req, res) => {
  res.render("index-error", {
    errorNumber: "404",
    errorMessage: "Page not found",
    author: "Robot"
  });
});

app.listen(port, () => {
  console.log(`The server is running on ${port} port`);
});
