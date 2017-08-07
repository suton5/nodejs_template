var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var csvWriter = require('csv-write-stream');
var bodyParser = require('body-parser'); 

app.use(bodyParser.json()); //Must parse into JSON first

server.listen(55555, function() {
    console.log('Server listening at port %d', 55555);
});

app.post('/particulars', function(req, res) {
    var particulars = {
        name: null,
		number: null,
		email: null
    };

	particulars.name = req.body.name;
	particulars.number = req.body.number;
	particulars.email = req.body.email;

	if (!fs.existsSync('MainData.csv'))
    	writer = csvWriter({headers: ["name", "number", "email"]});
  	else
    	writer = csvWriter({sendHeaders: false});
	writer.pipe(fs.createWriteStream('MainData.csv', {flags: 'a'}));
	writer.write({name: particulars.name, number: particulars.number, email: particulars.email});
	writer.end();
    res.end("Success");
});