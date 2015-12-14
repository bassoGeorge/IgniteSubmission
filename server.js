var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.json());
app.use(express.static('.'));

/* --------- Images --------------------- */
var imageArray = fs.readdirSync("images/posters");

app.post('/setimage', function (req, res) {
  var id = req.body['imdbID'] + ".jpg";
  if (imageArray.indexOf(id) == -1) {
    request(req.body['Poster']).pipe(fs.createWriteStream("images/posters/" + id)).on('close', function () {
      imageArray.push(id);
      res.json({success: true, new: true})
    });
  } else {
    res.json({success: true, new: false})
  }
});

/* -------------------------------------- */

app.listen('8080', function () {
  console.log("listening on port 8080")
});
