"use strict";
const path = require("path");
const hbs = require("hbs");
const express = require("express");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handle bars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "harsha",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "harsha",
    title: "about me",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "help page",
    name: "harsha",
    title: "help page",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({
      error: "address must be provided",
    });

  geocode(req.query.address, (error, { lat, lon, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(lat, lon, (error, { forecast }={}) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(res.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessge: "Help Article Not Found",
    title: 404,
    name: "harsha revanth",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessge: "Page Not Found",
    title: 404,
    name: "harsha revanth",
  });
});

app.listen(3000, () => {
  console.log(`server is up on port 3000`);
});
