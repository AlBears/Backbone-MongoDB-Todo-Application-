var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todotodo');

var Schema = mongoose.Schema;

var TodoItemSchema = new Schema({
	completed: Boolean,
	title: String
});

mongoose.model('TodoItem', TodoItemSchema);

var TodoItem = mongoose.model('TodoItem');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/todoitems', function(req, res) {
	TodoItem.find(function(err, docs) {
		docs.forEach(function(item) {
			console.log("Received a GET request for _id: " + item._id);
		});
		res.send(docs);
	});
});

app.post('/api/todoitems', function(req, res) {
	console.log('Received a POST request:')
	for (var key in req.body) {
		console.log(key + ': ' + req.body[key]);
	}
	var todoItem = new TodoItem(req.body);
	todoItem.save(function(err, doc) {
		res.send(doc);
	});
});

app.delete('/api/todoitems/:id', function(req, res) {
	console.log('Received a DELETE request for _id: ' + req.params.id);
	TodoItem.remove({_id: req.params.id}, function(err, doc) {
		res.send({_id: req.params.id});
	});
});

app.put('/api/todoitems/:id', function(req, res) {
	console.log('Received an UPDATE request for _id: ' + req.params.id);
	TodoItem.update({_id: req.params.id}, req.body, function(err) {
		res.send({_id: req.params.id});
		console.log(req.body);
	});
});

var port = 3000;

app.listen(port);
console.log('server on '+port);