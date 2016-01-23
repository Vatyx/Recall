require('dotenv').load();
var express = require("express");
var hound = require('hound').HoundNode;

app.get("/", function(req, res)
{
	res.end();
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});