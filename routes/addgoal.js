var data = require("../goals.json");

exports.addGoal = function(request, response) {
  var goalCat = request.query.goalCat;
  var goalText = request.query.goalText;
  var newGoal = {
    "goalCat" = goalCat,
    "goalText" = goalText
  }
  data.goals.push(newGoal);
  response.render('goal', data);
}
