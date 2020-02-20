var data = require("../goals.json");

exports.addGoal = function(request, response) {
  console.log(request.query);
  var goalCat = request.query.goalCat;
  var goalText = request.query.goalText;
  var newGoal = {
    "goalCat" : goalCat,
    "goalText" : goalText
  }
  console.log(newGoal);
  data.goals.push(newGoal);
  response.render('goal', data);
}
