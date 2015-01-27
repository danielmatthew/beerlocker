// Get packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('./models/beer');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

// Create new express app
var app = express();

app.use(bodyParser.urlencoded({
  extended: true;
}));

// Use environment-defined port or 3000
var port = process.env.PORT || 3000;
// Create Express router
var router = express.Router();
// Dummy route for testing
router.get('/', function(req, res){
  res.json({
    message: "You are running low on beer!"
  });
});

var beersRoute = router.route('/beers');
var beerRoute = router.route('/beers/:beer_id');

beersRoute.post(function(req, res) {
  var beer = new Beer();

  // Set properties from POST data
  beer.name = req.body.name;
  beer.type = req.body.type;
  beer.quantity = req.body.quantity;

  // Save beer and check for errors
  beer.save(function(err) {
    if (err) {
      res.send(err);
    }

    res.json({message: 'Beer added to the locker', data: beer});
  });
});

beersRoute.get(function(req, res) {
  Beer.find(function(err, beers) {
    if (err) {
      res.end(err);
    }

    res.json(beers);
  });
});

beerRoute.get(function(req, res) {
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err) {
      res.send(err);
    }

    res.json(beer);
  });
});

beerRoute.put(function(req, res) {
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err) {
      res.send(err);
    }

    beer.quantity = req.body.quantity;

    beer.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json(beer);
    });
  });
});

// Register all routes with /api
app.use('/api', router);

// Start server
app.listen(port);
console.log('Insert beer on port' + port);