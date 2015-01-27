var Beer = require('../models/beer');

// POSTS endpoint
exports.postBeers = function(req, res) {
  var beer = new Beer();

  beer.name = req.body.name;
  beer.type = req.body.type;
  beer.quantity = req.body.quantity;

  beer.save(function(err) {
    if (err) {
      res.send(err);
    }

    res.json({message: 'Beer added to the locker', data: beer});
  });
};

// GET endpoint
exports.getBeers = function(req, res) {
  Beer.find(function(err, beers) {
    if (err) {
      res.send(err);
    }

    res.json(beers);
  });
};

// Single beer GET endpoint
exports.getBeer = function(req, res) {
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err) {
      res.send(err);
    }

    res.json(beer);
  });
};

// Single PUT endpoint
exports.putBeer = function(req, res) {
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err) {
      res.send(err);
    }

    res.json(beer);
  });
};

// DELETE endpoint
exports.deleteBeer = function(req, res) {
  Beer.findByIdAndRemove(req.params.beer_id, function(err) {
    if (err) {
      res.send(err);
    }

    res.json({message: 'Beer removed from the locker'});
  });
};