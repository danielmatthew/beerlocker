// Get packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var clientController = require('./controllers/client');

// Connect to MongoDB
mongoose.connect("mongodb://bl_user:qwerty123@ds037551.mongolab.com:37551/beerlocker");

// Create new express app
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());

// Create Express router
var router = express.Router();

router.route('/beers')
  .post(authController.isAuthenticated, beerController.postBeers)
  .get(authController.isAuthenticated, beerController.getBeers);

router.route('/beers/:beer_id')
  .get(authController.isAuthenticated, beerController.getBeer)
  .put(authController.isAuthenticated, beerController.putBeer)
  .delete(authController.isAuthenticated, beerController.deleteBeer);

router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

// Register all routes with /api
app.use('/api', router);


// Use environment-defined port or 3000
var port = process.env.PORT || 3000;
// Start server
app.listen(port);