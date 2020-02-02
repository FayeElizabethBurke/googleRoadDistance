var request = require('request');
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

let postcodeArray = [];
app.use(bodyParser.urlencoded({extended: true}));

//searches the postcode spreadsheet for postcodes and stores in postCodeArray
    request('https://spreadsheets.google.com/feeds/cells/1LSbeNZC0GEktUlCAIRSSCW9yRebsgwzB3S1a0p7ozl0/2/public/values?alt=json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            entries = body.feed.entry;
            entries.forEach(function(element){
              postcode = Object.values(element.content);
              postcodeArray.push(postcode[1]);
            })
        }
        console.log(postcodeArray);
      });

      //waits 4 seconds then starts searching the api
      setTimeout(function waitForIt() {
        for (let i = 0; i < postcodeArray.length; i++){
            request('https://maps.googleapis.com/maps/api/distancematrix/json?origins=IP11+uk&destinations=' + postcodeArray[i] + '+UK&mode=driving&language=fr-FR&key=AIzaSyAp3VEcSn6PeXbEezX3jmhU7rh63OALKD4', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  body = JSON.parse(body);
                  start = body.origin_addresses;
                  miles = body.rows[0].elements[0].distance.text;
                  destination = body.destination_addresses;
                    console.log('From: ' + start[0] + ' it is ' + miles + ' (ave by road) to ' + destination + '.');
                } else {console.log('cant find that postcode')}
              });
        }
      }, 4000);



