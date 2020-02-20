/*
 * GET goal page.
 */

var goalData = require('../goals.json');

exports.view = function(req, res){
  console.log("hi");
  res.render('goal', goalData);
};
