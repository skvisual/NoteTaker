//DECLARE DEPENDENCIES
var http = require("http");
var fs = require('fs');
var path = require('path');
var express = require('express');
// var data = fs.readFileSync('./db/db.json');
// var notesDB = require('./db/db.json');
// Instantiate a new express app utilizing the express() method.
var app = express();
const notesDB = [];

//Decleare a port number for the server to find the application.
var PORT = 8080;

// Middleware to handle parsing of the request string and converts to a json object. Later referred to as req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//  Create .get routes
    
    // Return the index page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
    
// Return the notes page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Create API get routes
    //set up the notes
app.get("/api/notes", function(req, res) {
    //response to access notesDB variable in order to send to response.
    res.json(notesDB);
});

// Create the API POST routes
app.post('/api/notes', function(req, res) {
    
  var newNote = req.body;

//   console.log(req.body)


  // notesDB.push(newNote);
  fs.appendFileSync('./db/db.json', JSON.stringify([newNote]));

  console.log(newNote)


  // res.json(newNote);
});

// Create the API delete routes




//Turns our server on
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});