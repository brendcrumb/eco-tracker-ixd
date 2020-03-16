
var currentId;
function onEdit(id) {
  currentId = id;
  var goalText = $('#'+id+'-goalText').text();
  $('#edit-goalText').val(goalText);
}

function initEditGoal() {
  $('#editGoalForm').submit(function(e) {
    e.preventDefault();
    console.log("editing your goals..." + currentId);
    var id = currentId;
    var goalText = $('#edit-goalText').val();
    $.post('editGoal', {id: id,
              goalText: goalText,
              });

    setTimeout(function(){
      window.location.reload();
    });
  }); 
}

function removeGoal() {
  var id = currentId;
  var result = confirm("Confirm to delete");
  if(result) {
    $.delete('removeGoal', {id: id});
    setTimeout(function(){
      window.location.reload();
    });
  }
}