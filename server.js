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

// Create Express router
var router = express.Router();

router.route('/beers')
  .post(beerController.postBeers)
  .get(beerController.getBeers);

router.route('/beers/:beer_id')
  .get(beerController.getBeer)
  .put(beerController.putBeer)
  .delete(beerController.deleteBeer);

// Register all routes with /api
app.use('/api', router);


// Use environment-defined port or 3000
var port = process.env.PORT || 3000;
// Start server
app.listen(port);