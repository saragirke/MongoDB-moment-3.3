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

/********************************************* 
 * Delete unique user id
 *********************************************/
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    
    // Delete user _id from db
    Course.deleteOne({ "_id": id }, function (err) {
        if (err) return handleError(err);
    });
    
    // Get the new user list from db as response data
    Course.find(function(err, courses) {
        if(err) return console.error(err);
    
        var jsonObj = JSON.stringify(courses);
        res.contentType('application/json');
        res.send(jsonObj);
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

}); // DB connection

module.exports = router;





