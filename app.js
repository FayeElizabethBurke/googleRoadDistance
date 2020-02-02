var request = require('request');
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

let postcodeArray = [];

app.use(bodyParser.urlencoded({extended: true}));
// request('https://maps.googleapis.com/maps/api/distancematrix/json?origins=M1+uk&destinations=BS1+UK&mode=driving&language=fr-FR&key=AIzaSyAp3VEcSn6PeXbEezX3jmhU7rh63OALKD4', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Print the FULL results
//   }
// })

// request('https://spreadsheets.google.com/feeds/cells/1LSbeNZC0GEktUlCAIRSSCW9yRebsgwzB3S1a0p7ozl0/2/public/values?alt=json', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//       body = JSON.parse(body);
//         content = body.feed.entry[1].content;
//         let postcode = Object.values(content)[1];
//         postcodeArray.push(postcode);
//   }
//   console.log(postcodeArray);
// })

request('https://spreadsheets.google.com/feeds/cells/1LSbeNZC0GEktUlCAIRSSCW9yRebsgwzB3S1a0p7ozl0/1/public/values?alt=json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      entries = body.feed.entry;
      entries.forEach(function(element){
        postcode = Object.values(element.content);
        postcodeArray.push(postcode[1]);
      })
  }
  console.log(postcodeArray);
})


// https://spreadsheets.google.com/feeds/cells/1LSbeNZC0GEktUlCAIRSSCW9yRebsgwzB3S1a0p7ozl0/1/public/values?alt=json
