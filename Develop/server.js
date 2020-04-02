//DECLARE DEPENDENCIES
var http = require("http");
var fs = require('fs');
var path = require('path');
var express = require('express');
var notesDB = require('./db/db.json');
// Instantiate a new express app utilizing the express() method.
var app = express();

//Decleare a port number for the server to find the application.
var PORT = 8080;

// Middleware to handle parsing of the request string and converts to a json object. Later referred to as req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//  Create GET routes
    
    // Returns the index page when requested
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
    
// Return the notes page when requested
// app.get("/notes", (req, res) => {  
//     res.sendFile(path.join(__dirname, "public/notes.html"));
// });
//sets the default page if there is no page found to the index.html page
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Create API get routes
    //set up notes
app.get("/api/notes", (req, res) => {
    //response to access notesDB variable in order to send to response.
    notesDB.push(req.body);
    console.log(notesDB)
});

// Create the API POST routes
app.post("/api/notes", (req, res) => {
    notesDB.push(req.body);
    fs.readFile("./db/db.json", "utf-8", function (err){
        req.body.push(notesDB);
    })
    fs.writeFile("./db/db.json", JSON.stringify(notesDB), function(er){
        req.body
  })
        res.json(notesDB);
});

// Create the API delete routes
app.delete('/api/notes/:id',  (req, res) => {

});




//Turns our server on
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
