/*
 * GET commute page.
 */

//var commuteData = require("../commuteData.json");


exports.view = function(req, res){
  res.render('add/commute');
}

/* if view alt, for A/B testing
exports.view = function(request, response){
    commuteData["viewAlt"] = false;
    response.render('add/commute', commuteData);
};

exports.viewAlt = function(request, response){
    commuteData["viewAlt"] = true;
    response.render('add/commute', commuteData);
};
*/
