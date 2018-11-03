var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require("body-parser");
var ExpressPeerServer = require('peer').ExpressPeerServer;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res, next) {
    console.log("get /")
    res.send('Hello world!');
});

var options = {
    debug: true,
    allow_discovery: true
}

var server = app.listen(9000);

peerServer = ExpressPeerServer(server, options)
app.use('/api', peerServer);

peerServer.on('connection', function(id) {
    console.log("Opened socket ID : " + id);

	var data = "Opened socket ID : " + id;
	var timestamp = Math.round((new Date()).getTime() / 1000);
	var localTime = new Date().toString();
	data = timestamp + " - " + localTime + " - " + data + "\n";

	fs.appendFile('socketsSession.txt', data, 'utf8', function(err, data){
	    if (err) console.log(err);
	    else console.log("Opened socket IDSuccessfully Written to File.");
	});

	fs.readFile('activeNodes.txt', function(err, data){
	    var line = data.toString().match(id);
	    if(line == null) {
			fs.appendFile('activeNodes.txt',id + "\n", 'utf8', function(err, data){
			    if (err) console.log(err);
			    else console.log("Active socket ID's uccessfully Written to File.");
			});	
		}
	});	
});

peerServer.on('disconnect', function(id) {
    console.log("Closed socket ID : "  + id);

    var data = "Closed socket ID : " + id;
    var timestamp = Math.round((new Date()).getTime() / 1000);
	var localTime = new Date().toString();
	data = timestamp + " - " + localTime + " - " + data + "\n";

    fs.appendFile('socketsSession.txt', data, 'utf8', function(err, data){
	    if (err) console.log(err);
	    else console.log("Closed socket ID successfully Written to File.");
	});

	var data = fs.readFileSync('activeNodes.txt', 'utf8');
    var lines = data.split("\n");
    //console.log(lines);
    //var lineToDelete = data.toString().split("\n").trim(lines[1]).join('\n');
    //console.log(lineToDelete);
	
	// Find and remove item from an array
	var i = lines.indexOf(id);
	if(i != -1) {
		lines.splice(i, 1);
	}

	//console.log(lines);

	var lineToAdd = lines.join('\n');

	//console.log(lineToAdd);

	fs.writeFile('activeNodes.txt', lineToAdd, function(err, data){
		console.log("Closed socket ID removed successfully from the list.");
	});
    

	/*fs.readFileSync('activeNodes.txt', function(err, data){
	    var line = data.split("\n");
	    //var lineToDelete = data.toString().split('\n').slice(line.index).join('\n');
	    var i = line.indexOf(id);
		if(i != -1) {
			line.splice(i, 1);
		}
	    console.log(line);
	    /*fs.writeFile('activeNodes.txt', lineToDelete, function(err, data){

	    });
	});*/
});

app.get('/activeNodes', function(req, res, next) {
	var data = fs.readFileSync('activeNodes.txt', 'utf8');
	var lines = data.split("\n");
	var lineToAdd = lines.join('\n');
	//console.log(lineToAdd);
	res.send(lineToAdd);
});

app.post('/sessionNodes', function (req, res) {
	var startTime = req.body.startTime;
	var endTime = req.body.endTime;

	var data = fs.readFileSync('socketsSession.txt', 'utf8');
	var lines = data.split("\n");
	var arrObj = [];

	//var lineToAdd = lines.join('\n');
	//console.log(lines);
	for(i=0; i<lines.length; i++) {
		for(j=startTime; j>=endTime; j--) {
			//console.log(lines[i]);
			//console.log(j);
			if(lines[i].match(j)) {
				var splitChar = lines[i].split(": ");
				//console.log(splitChar[1]);
				arrObj.push(splitChar[1]);
			}
		}
	}
	//console.log(arrObj);
	res.send(arrObj);
});






