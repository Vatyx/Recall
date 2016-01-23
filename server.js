require('dotenv').load();
var express = require("express");
var bodyParser = require('body-parser')
var request = require('request');
var fs = require('fs');
var uuid = require('node-uuid');

var hound = require('hound').HoundNode;

var app = express();

var userId = uuid.v1();
var requestId = uuid.v4();
var timestamp = parseInt(new Date().getTime() / 1000)

//userid - specific to user
var headers = hound.generateAuthHeaders(process.env.CLIENT_ID,process.env.CLIENT_SECRET, userId, requestId, timestamp)
headers["Hound-Request-Info"] = '{"Latitude":38,"Longitude":-97,"DeviceID":"{my-device-id}","ClientID":"'+ process.env.CLIENT_ID +'", "RequestID":"' + requestId + '","TimeZone":"America/New_York","DeviceName":"WebClient","TimeStamp":' + timestamp + ',"Language":"en_US"}'

console.log(headers)

// request( {
// 	url: "https://api.houndify.com/v1/text?query=What is the weather in College Station, Texas?",
// 	headers: headers,
// 	json: true,
// 	method: 'POST'
// 	}, function(err, res, body) {
// 		console.log(body);
// 	})

//var stream = fs.createReadStream()
var buffer = fs.readFileSync("recording.wav")
console.log(buffer)
headers['Content-Type'] = "audio"
request( {
	url: "https://api.houndify.com/v1/voice",
	headers: headers,
	json: true,
	method: 'POST',
	body: buffer,
	}, function(err, res, body) {
		//console.log(err);
	})
//console.log(buffer)

var stream = fs.createReadStream('recording.wav');


//Create a readstream to the created file, and send it to Terrier
// fs.createReadStream('recording.wav').pipe(request.post({
//     url: 'https://api.houndify.com/v1/voice',
//     headers: headers,
//     json: true
// }, function (e, r, b) {
//     //for (key in r)  { console.log(key) }
//     console.log(b)
// }));
// request( {
// 	url: "https://api.houndify.com/v1/voice",
	
// 	headers: headers,
// 	json: true,
// 	method: 'POST',
// 	body: buffer
// 	}, function(err, res, body) {
// 		console.log(err);
// 	})

app.use(function(req, res, next) {
  req.rawBody = '';
  req.setEncoding('utf8');

  req.on('data', function(chunk) { 
    req.rawBody += chunk;
  });

  req.on('end', function() {
    next();
  });
});
app.use(bodyParser.json());

app.post("/", function(req, res)
{	fs.writeFile('message.txt', req.rawBody)
	res.end()
});

// app.get('/voiceSearchAuth', hound.createVoiceAuthHandler({ 
//   clientId:  process.env.CLIENT_ID, 
//   clientKey: process.env.CLIENT_SECRET
// }));

// app.get('/textSearchProxy', hound.createTextProxyHandler({ 
//   clientId:  process.env.CLIENT_ID, 
//   clientKey: process.env.CLIENT_SECRET
// }));

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});