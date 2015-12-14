/*
The application server, runs on port 8080 by default
 */
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.json());
app.use(express.static('.'));

/* --------- Images --------------------- */
var imageArray = fs.readdirSync("images/posters");

/**
 * Post function to notify the server of poster image requirement,
 * if the image is unavailable, will be downloaded. The images reside in images/posters
 */
app.post('/setimage', function (req, res) {
  var id = req.body['imdbID'] + ".jpg";
  var imageUrl = "images/posters/"+id
  var result = {
    success: true,
    new: true,
    imageUrl: imageUrl
  };
  if (imageArray.indexOf(id) == -1) {
    request(req.body['Poster']).pipe(fs.createWriteStream("images/posters/" + id)).on('close', function () {
      imageArray.push(id);
      res.json(result)
    });
  } else {
    result['new'] = false;
    res.json(result)
  }
});

/* -------------------------------------- */

app.listen('8080', function () {
  console.log("listening on port 8080")
});
