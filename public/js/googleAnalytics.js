$(document).ready(function() {
	initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	// your code here
	$(".btn btn-success").click(clickSaveBtn);
}

function clickSaveBtn() {
	//e.preventDefault();
	ga('create','UA-158806700-1', 'auto');
	ga('send', 'event', 'btn btn-success', 'click');
}
