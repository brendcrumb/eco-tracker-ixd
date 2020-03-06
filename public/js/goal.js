$(document).ready(function() {
  initializePage();
})

function initializePage() {
	console.log("Page is ready");
 	initEditGoal();
}

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

$.delete = function(url, data, callback, type){
 
  if ( $.isFunction(data) ){
    type = type || callback,
        callback = data,
        data = {}
  }
 
  return $.ajax({
    url: url,
    type: 'DELETE',
    success: callback,
    data: data,
    contentType: type
  });
}

function deleteGoal() {
	var id = currentId;
	var result = confirm("Confirm to delete");
	if(result) {
		$.delete('deleteGoal', {id: id});
		setTimeout(function(){
		  window.location.reload();
		});
	}
}
