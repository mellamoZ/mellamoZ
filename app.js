"use strict";
const express = require("express");
const app = express();
const https = require("https");
const BodyParser = require("body-parser");
const { json } = require("express/lib/response");
app.listen(process.env.PORT || 3000);

app.use(BodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", function (req, res) {
  const email = req.body.email;
  const Firstname = req.body.Firstname;
  const Lastname = req.body.Lastname;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: Firstname,
          LNAME: Lastname,
        },
      },
    ],
  };
  const Jsondata = JSON.stringify(data);
  const url = "https://us17.api.mailchimp.com/3.0/lists/9da59bc711";
  const options = {
    method: "POST",
    auth: "Z:ad23fd1d13ee9dd4090e2c21c2e160a7-us17",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode == 200) {
      res.send(`${data.members[0].merge_fields.FNAME} Hello`);
    } else {
      res.sendFile(`${__dirname}/failure.html`);
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(Jsondata);
  request.end();
});

//apikey
//ad23fd1d13ee9dd4090e2c21c2e160a7-us17
//audienceid
//9da59bc711  9da59bc711

//https://v2.jokeapi.dev/joke/Any
