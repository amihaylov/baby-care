var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mysql = require('mysql');
var fs = require('fs');
var jf = require('jsonfile');

var connection = mysql.createConnection({
	host		 : 'localhost',
	user		 : 'root',
	password : '',
	database : 'szone'
});

// declare our app
var app = express();

// configuration and middleware, body parser is needed to parse POST into JSON
app.use(express.static('public'));


app.use(bodyParser.urlencoded({
	 extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());

//Get all clients
app.get('/clients', function(req, res){
	connection.query("SELECT * FROM clients", function(error, rows, fields){
		if(rows.length > 0)
			res.jsonp(rows);
		else
			res.end("There are no bookstores.");
		});	
});

// post new client to the collection
app.post('/clients', function(req, res){
	// req.body contains the incoming fields and values
	var question1 = req.body.client[0];
	var question2 = req.body.client[1];
	var question3 = req.body.client[2];
	var question4 = req.body.client[3];
	var question5 = req.body.client[4];
	var question6 = req.body.client[5];
	var question7 = req.body.client[6];
	var question8 = req.body.client[7];
	var question9 = req.body.client[8];
	var name = req.body.client[9];
	var email = req.body.client[10];
	var phone = req.body.client[11];

	connection.query("INSERT INTO clients(question1, question2, question3, question4, question5, question6, question7, question8,
	question9, name, email, phone) VALUES('" 
		+ question1 + "', '" + question2 + "', '" + question3+ "', '" + question4+ "', '" + question5 + 
		"', '"+ question6 + "', '"+ question7 + "', '"+ question8 + "', '"+ question9 + "', '"+ name+ "', '" + email+ "', '" + phone 
		+ "');", function(error, rows, fields){
		res.end("SQL INSERT client completed.");
	});
	var client = {question1: question1, question2: question2, question3: question3, question4: question4, question5: question5, 
		question6: question6, question7: question7, question8: question8, question9: question9, name: name,
		 email: email, phone: phone,};

	res.jsonp({
	msg: 'Client added',
	data: client
	});
});

//Get all sitters
app.get('/sitters', function(req, res){
	connection.query("SELECT * FROM sitters", function(error, rows, fields){
		if(rows.length > 0)
			res.jsonp(rows);
		else
			res.end("There are no baby-sitters.");
		});	
});

// post new client to the collection
app.post('/sitters', function(req, res){
	// req.body contains the incoming fields and values
	var name = req.body.name;
	var email = req.body.email;
	var phone = req.body.phone;
	var experience = req.body.experience;

	connection.query("INSERT INTO sitters(name, email, phone, experience) VALUES('" + name+ "', '" + email+ "', '" + phone +
		"', '" + experience	+ "');", function(error, rows, fields){
		res.end("SQL INSERT client completed.");
	});
	var sitter = {name: name, email: email, phone: phone, experience:experience};

	res.jsonp({
	msg: 'Sitter added',
	data: sitter
	});
});

var server = app.listen(7777, function() {
	console.log('Listening on port %d', server.address().port);
});

