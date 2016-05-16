var express = require("express");
var app = express();
var PORT = 7000;

app.use(express.static(__dirname ));

app.set('views', __dirname );
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/restaurant/:id', function(req, res){

	res.render("restaurant.ejs");
	var id = req.params.id;
	console.log(id)
});

app.get('/addRestaurant', function(req, res){

	res.render("addRestaurant.ejs");
});

app.get('/cuisines/:id', function(req, res){

	res.render("cuisines.ejs");
	var id = req.params.id;
	console.log(id)
});

app.listen(PORT, function(){
	console.log("Express server running on Port " + PORT );
});