// Get packages
var express = require('express');
// Create new express app
var app = express();
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
// Register all routes with /api
app.use('/api', router);
// Start server
app.listen(port);
console.log('Insert beer on port' + port);