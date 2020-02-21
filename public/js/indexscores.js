// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
//// COMMUTE
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
    fscore = fscore.replace(/[^\d.-]/g, '');
    var fscores = parseFloat(fscore);
    // get input from add page
    var commutebar = sessionStorage.getItem('commute');
    if(commutebar == null || isNaN(commutebar)){commutebar = 0;}
    else{commutebar = parseFloat(commutebar);}
     // calculate and update new score
     var cbarscore = Math.round(commutebar*1.0194);
     cbarscore = Math.round((cbarscore)*10)/100;
     var tmode = sessionStorage.getItem('mode');
     if(tmode === "Walk"){ cbarscore = commutebar*0.3398;}
     else if(tmode === "Bike/Scooter"){ cbarscore = commutebar*0.6796;}
     else if(tmode === "Plane"){ cbarscore = commutebar*2.3862;}
     else if(tmode === "Bus"){ cbarscore = commutebar*0.8342;}
     else if(tmode === "Motorcycle"){ cbarscore = commutebar*0.7372;}
     else{cbarscore = commutebar*1.0194;}
     cbarscore = Math.round((cbarscore)*10)/100;
     cbarscore = cbarscore + coscores;
     // tracks score to avoid repeat addition
    var oldScore = sessionStorage.getItem('prevScore');
    oldScore = parseFloat(oldScore);
    if(isNaN(oldScore) || (oldScore-cbarscore == 0)){
      var updates = sessionStorage.getItem('update');
      updates = parseFloat(updates);
      if(updates == 1){
        oldScore = oldScore;
      }
      else{
      oldScore = 0;
      }
    }
    sessionStorage.removeItem('update');
    cbarscore = cbarscore + oldScore;
    cbarscore = Math.round((cbarscore)*10)/10;
    console.log("oldScore: " + oldScore);
     sessionStorage.setItem('prevScore', cbarscore);
     sessionStorage.removeItem('commute');
     // update UI
     $('#cpb').html(cbarscore + " liters");
     $('#cpb').css("width", (cbarscore*33));

    //// WASTE
      var wastebar = sessionStorage.getItem('waste');
      if(wastebar == null || isNaN(wastebar)){wastebar = 0;}
      else{
        wastebar = parseFloat(wastebar);
      }
      console.log("inWaste1: " + wastebar);
      var wbarscore = wastebar*0.3672;
      console.log("inWaste2: " + wastebar);
      wbarscore = (Math.round((wbarscore)*10)/10);
      console.log("waste: " + wbarscore);
      wbarscore = wbarscore + wscores;
      var oldWaste = sessionStorage.getItem('prevScoreW');
      oldWaste = parseFloat(oldWaste);
      if(isNaN(oldWaste) || (oldWaste-wbarscore == 0)){
          var updater = sessionStorage.getItem('updater');
          updater = parseFloat(updater);
          if(updater == 1){
            oldWaste = oldWaste;
          }
          else{
            oldWaste = 0;
          }
      }
      sessionStorage.removeItem('updater');
      wbarscore = wbarscore + oldWaste;
      wbarscore = Math.round((wbarscore)*10)/10;
      sessionStorage.setItem('prevScoreW', wbarscore);
      sessionStorage.removeItem('waste');
      $('#wpb').html(wbarscore + " liters");
      $('#wpb').css("width", (wbarscore*33));

	/// FOOD BAR
			var foodbar = sessionStorage.getItem('food');
			if(foodbar == null || isNaN(foodbar)){foodbar = 0;}
			else{
				foodbar = parseFloat(foodbar);
			}
      console.log("foodIn: " + foodbar);
			var fbarscore = foodbar*1.4375;
			fbarscore = (Math.round((fbarscore)*10)/10);
			fbarscore = fbarscore + fscores;
      console.log("foodBar: " + fbarscore);
			var oldfood = sessionStorage.getItem('prevScoreF');
			oldfood = parseFloat(oldfood);
			if(isNaN(oldfood) || (oldfood-fbarscore == 0)) {
					var updating = sessionStorage.getItem('updating');
					updating = parseFloat(updating);
					if (updating == 1) {
						oldfood = oldfood;
					}
					else {
						oldfood = 0;
					}
			}
			sessionStorage.removeItem('updating');
			fbarscore = fbarscore + oldfood;
			fbarscore = Math.round((fbarscore)*10)/10;
      console.log("foodBar: " + fbarscore);
			sessionStorage.setItem('prevScoreF', fbarscore);
			sessionStorage.removeItem('food');
			$('#fpb').html(fbarscore + " liters");
			$('#fpb').css("width", (fbarscore*33));


      //update emmission score
     var eScore = parseFloat(cbarscore)+parseFloat(wbarscore)+parseFloat(fbarscore);
     eScore = Math.round((eScore)*10)/10;
     $("#score").html(eScore+"L");
     // Change color of circle
      var yellowBound = Number(10);
      var redBound = Number(18);
      if(eScore >= redBound)
        {
          console.log("overRed");
          $('.circle').css("border-color", "#881313");
        }
      else if(eScore >= yellowBound)
        {
          console.log("overYellow");
          $('.circle').css("border-color", "#E3DD55");
        }
      else{
        console.log("Green");
        $('.circle').css("border-color", "green");
      }
      console.log("getCommute: " + commutebar);
      console.log("currCommute: " + coscores);
      console.log("total: " + cbarscore);
      console.log("waste: " + wbarscore);
      console.log("eScore: " + eScore);

	// Add any additional listeners here
	// example: $("#div-id").click(functionToCall);
}