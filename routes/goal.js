/*
 * GET goal page.
 */

var goalData = require('../goals.json');

exports.view = function(req, res){
  res.render('goal', goalData);
};
