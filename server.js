var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var app = express();
// var md5 = require('md5');
var port = process.env.PORT || 3000;

//  var api_keys =  require('./keys.js');
var api_keys = process.env.MAILCHIMP

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/mailchimp', function(req, res) {
  // var config = { headers: {'Authorization': api_keys.mailchimp_key} }
  var config = { headers: {'Authorization': api_keys} }
  var subscribe_body = {
    "email_address": req.body.email,
    "status": "subscribed"
  }
  var mailchimp_url = "https://us16.api.mailchimp.com/3.0/lists/" + "80fb2c6bc5" + "/members"
  axios.post(mailchimp_url, subscribe_body, config)
  .then(function(response, err) {
    console.log(response.data.status)
    res.send("subscribed/updated")
  })
  .catch(function(err) {
    console.log(err.response.data.title)
    res.send("error")
  })
})

app.get('*', function (req, res) {
  res.send('Server NODE NODE NODErunning on port ' + port)
})

app.listen(port, function () {
  console.log("running on " + port)
})