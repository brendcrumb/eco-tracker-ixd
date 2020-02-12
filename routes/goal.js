/*
 * GET goal page.
 */

exports.view = function(req, res){
  res.render('goal');
};

//Get goal data
var goalData = require('../goals.json');

exports.view = function(request, response){
  console.log(goalData);
  response.render('goal', goalData);
};
