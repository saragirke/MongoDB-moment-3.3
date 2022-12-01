var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
router.use(
    bodyParser.urlencoded({
      extended: true
    })
)
router.use(bodyParser.json());

/********************************************* 
 * Initialize database and connection
 *********************************************/
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/myCV2', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise; // Global use of mongoose

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) { // Add the listener for db events 
    console.log("Connected to db");

    // Create DB scheme 
    var courseSchema = mongoose.Schema({
        name: String,
        code: String,
		syllabus: String,
		progression: String,
		term: String
    });

    // Create scheme model
    var Course = mongoose.model('Course', courseSchema )


/********************************************* 
 * Get complete course listing
 *********************************************/
router.get('/', function(req, res, next) {

  // Läs ut från databasen
  Course.find(function(err, courses) {
    if(err) return console.error(err);  
    var jsonObj = JSON.stringify(courses);
	res.contentType('application/json');
    res.send(jsonObj);
  });
});

/*****************************/
 // GET course by ID
 /****************************/
router.get('/:id', function(req, res, next) {

    var id = req.params.id;
    var ind = -1;

    Course.find(function(err, courses) {
        if(err) return console.error(err);
    for(var i=0; i < courses.length; i++){
        if(courses[i]._id == id) ind = i; // Hitta arrayen med index som har _id = id
    } 
    console.log(courses[ind]);
    res.contentType('application/json');
    res.send(ind>=0?courses[ind]:'{}'); // Om vi hittar kursen skicka det som svar annars tom array
});
});



/********************************************* 
 * Add new course
 *********************************************/
 router.post('/', function(req, res, next) {
    // Create a new user
    var course1 = new Course({ 
        name: req.body.name, 
        code: req.body.code,
        syllabus: req.body.syllabus,
        progression: req.body.progression,
        term: req.body.term

    });	
console.log("test" + req.body.name);

    // Save new user to db
    course1.save(function(err) {
        if(err) return console.error(err);
    });

	var jsonObj = JSON.stringify(course1);
	res.contentType('application/json');
	res.send(jsonObj);

});

/********************************************* 
 * Update course
 *********************************************/
 router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    // Create a new user
    var course2 = new Course({ 
        id: req.body.id,
        name: req.body.name, 
        code: req.body.code,
        syllabus: req.body.syllabus,
        progression: req.body.progression,
        term: req.body.term

    });	
console.log("test" + req.body.name);

    // Save new user to db
    course2.save(function(err) {
        if(err) return console.error(err);
    });

	var jsonObj = JSON.stringify(course2);
	res.contentType('application/json');
	res.send(jsonObj);

});

}); // DB connection

module.exports = router;





