// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	// current commute score
    var coscore = $('#cpb').text();
    coscore = coscore.replace(/[^\d.-]/g, '');
    var coscores = parseFloat(coscore);
    // current waste score
    var wscore = $('#wpb').text();
    wscore = wscore.replace(/[^\d.-]/g, '');
    var wscores = parseFloat(wscore);
    // current food score
    var fscore = $('#fpb').text();
    fscore = coscore.replace(/[^\d.-]/g, '');
    var fscores = parseFloat(fscore);
    // get input from add page
    var commutebar = sessionStorage.getItem('commute');
    if(commutebar == null || isNaN(commutebar)){commutebar = 0;}
    else{commutebar = parseFloat(commutebar);}
    // add new score to current score
   // var cbarscore = parseFloat(commutebar);

     // calculate and update new score
     var cbarscore = Math.round(commutebar*1.0194);
     cbarscore = Math.round((cbarscore)*10)/100;    
     cbarscore = cbarscore + coscores;

    var oldScore = sessionStorage.getItem('prevScore');
    oldScore = parseFloat(oldScore);
    if(isNaN(oldScore) || (oldScore-cbarscore == 0)){oldScore = 0;}
    cbarscore = cbarscore + oldScore;
    console.log("oldScore: " + oldScore);
     sessionStorage.setItem('prevScore', cbarscore);
     sessionStorage.removeItem('commute');

     $('#cpb').html(cbarscore + " liters");
     $('#cpb').css("width", (cbarscore*33));
     //update emmission score
     var eScore = cbarscore+wscores+fscores;
     $("#score").html(eScore+"L");
     // Change color of circle
      var yellowBound = Number(5);
      var redBound = Number(3);
      
      if(eScore < redBound)
        {$('#ccolor').css("borderColor", "red");}
      else if(eScore < yellowBound)
        {document.getElementById("ccolor").style.borderColor = "yellow";}
      else{$('#ccolor').css("border-outline", "green");}
    console.log("getCommute: " + commutebar);
    console.log("currCommute: " + coscores);
    console.log("total: " + cbarscore);
    console.log("eScore: " + eScore);
      
	$("#testjs").click(function(e) {
		$('.jumbotron h1').text("Javascript is connected");
		$("#testjs").text("Please wait...");
		$(".jumbotron p").toggleClass("active");
	});
	$("a.thumbnail").click(projectClick);

	// Add any additional listeners here
	// example: $("#div-id").click(functionToCall);
}

function projectClick(e) { 
    // prevent the page from reloading      
    e.preventDefault();
    var containingProject = $(this).closest(".project");
    var description = $(containingProject).find(".project-description");
    if (description.length == 0) {
       $(containingProject).append("<div class='project-description'><p>Description of the project.</p></div>");
    } 
    else {
       $(".project-description").fadeToggle();
    }
}
/*
     // current commute score
      var coscore = document.getElementById("cpb").innerHTML;
      coscore = coscore.replace(/[^\d.-]/g, '');
      var coscores = parseFloat(coscore);
      // current waste score
      var wscore = document.getElementById("wpb").innerHTML;
      wscore = wscore.replace(/[^\d.-]/g, '');
      var wscores = parseFloat(wscore);
      // current food score
      var fscore = document.getElementById("fpb").innerHTML;
      fscore = fscore.replace(/[^\d.-]/g, '');
      var fscores = parseFloat(fscore);
    // get input from add page
    var commutebar = sessionStorage.getItem('commute');
    if(commutebar == null){commutebar = 0;}
    //var cprogress = document.getElementById("cpb").style.width;
    //var cprogress = parseFloat(cprogress);
    var oldScore = sessionStorage.getItem('prevScore');
    if(isNaN(oldScore)){oldScore = 0;}
            console.log("oldScore: " + oldScore);
    var percent = parseFloat(commutebar) + coscores + parseFloat(oldScore - coscores);
          sessionStorage.setItem('prevScore', percent);
    console.log("getCommute: " + commutebar);
    console.log("currCommute: " + coscores);
    console.log("total: " + percent);
    var finalpercent = Math.round(percent*1.0194);
    // calculate new score
      var cscore = Math.round((finalpercent)*10)/100;
    // calculate new scores
      document.getElementById("cpb").innerHTML = cscore +" liters";
      document.getElementById("cpb").style.width = (finalpercent*1.1)+"%";
      var eScore = cscore+wscores+fscores;
      console.log(eScore);
      document.getElementById("score").innerHTML = eScore + "L";
    // Change color of circle
      var redBound = Number(5);
      var yellowBound = Number(3);
      eScore = Number(eScore);
      if(eScore < yellowBound)
        {document.getElementById("ccolor").style.borderColor = "yellow";}
      else if(eScore < redBound)
        {document.getElementById("ccolor").style.borderColor = "red";}
      else{document.getElementById("ccolor").style.borderColor = "green";}
    //}
    /*
    else{
      document.getElementById("cpb").style.width = (commutepr)+"%";
      document.getElementById("score").innerHTML = coscores+wscores+fscores+"L";
    }*/