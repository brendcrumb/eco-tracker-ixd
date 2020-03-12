// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
//// COMMUTE
  var savings = 0;
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
     if(tmode === "Walk"){ cbarscore = commutebar*0.0200;
                            savings = commutebar*0.5;}
     else if(tmode === "Bike/Scooter"){ cbarscore = commutebar*0.0300;
                                        savings = commutebar*0.45;}
     else if(tmode === "Plane"){ cbarscore = commutebar*1.1186;}
     else if(tmode === "Bus"){ cbarscore = commutebar*0.4270;}
     else if(tmode === "Motorcycle"){ cbarscore = commutebar*0.3737;}
     else{cbarscore = commutebar*0.8900;}
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
     $('#cpb').html(cbarscore + " lbs");
     $('#cpb').css("width", (cbarscore*33));

    //// WASTE
      var wastebar = sessionStorage.getItem('waste');
      if(wastebar == null || isNaN(wastebar)){wastebar = 0;}
      else{
        wastebar = parseFloat(wastebar);
      }
      console.log("inWaste1: " + wastebar);
      var wbarscore = wastebar*1.9448;
      if(wbarscore == 0){savings = savings + 2;}
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
      $('#wpb').html(wbarscore + " lbs");
      $('#wpb').css("width", (wbarscore*33));

	/// FOOD BAR
			var foodbar = sessionStorage.getItem('food');
			if(foodbar == null || isNaN(foodbar)){foodbar = 0;}
			else{
				foodbar = parseFloat(foodbar);
			}
      console.log("foodIn: " + foodbar);
			var fbarscore = foodbar*3.1944;
      if(fbarscore == 0){savings = savings + 5;}
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
			$('#fpb').html(fbarscore + " lbs");
			$('#fpb').css("width", (fbarscore*33));


      //update emmission score
     var eScore = parseFloat(cbarscore)+parseFloat(wbarscore)+parseFloat(fbarscore);
     eScore = Math.round((eScore)*10)/10;
     $("#score").html(eScore+"<h5>lbs CO<sub>2</sub></h5>");
     // Change color of circle
      var yellowBound = Number(25);
      var redBound = Number(45);
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

	var averageLBScarbon = 110;
	var amtFromAvg = averageLBScarbon - eScore;
  // Calculations for Trees saved
	var amtTrees = parseInt(amtFromAvg / 3);
  amtTrees = parseInt(amtTrees + savings);
  var tree = sessionStorage.getItem('tree');
  if(tree > amtTrees){amtTrees = tree;}
  else{amtTrees = amtTrees + tree;}
	if (amtTrees < 0){
		amtTrees = 0;
	}
  sessionStorage.setItem('tree', amtTrees);
	$("#amt_Trees").html(amtTrees);

	// Calculation for gallons Oil Saved
	var amtOil = parseInt(amtFromAvg / 14);
  amtOil = parseInt(amtOil + savings);
  var oil = sessionStorage.getItem('oil');
  if(oil > amtOil){amtOil = oil;}
  else{amtOil = amtOil + oil;}
	if (amtOil < 0){
		amtOil = 0;
	}
  sessionStorage.setItem('oil', amtOil);
	$("#amt_Oil").html(amtOil);

	// Calculation for lbs Coal Saved
	var amtCoal = parseInt(amtFromAvg / 4);
  amtCoal = parseInt(amtCoal + savings);
  var coal = sessionStorage.getItem('coal');
  if(coal > amtCoal){amtCoal = coal;}
  else{amtOil = amtOil + oil;}
	if (amtCoal < 0){
		amtCoal = 0;
	}
  sessionStorage.setItem('coal', amtCoal);
	$("#amt_Coal").html(amtCoal);

	// Calculation for gallons Gas Saved
	var amtGas = parseInt(amtFromAvg / 20);
  amtGas = parseInt(amtGas + savings);
  var gas = sessionStorage.getItem('gas');
  if(gas > amtGas){amtGas = gas;}
  else{amtGas = amtGas + gas;}
	if (amtGas < 0){
		amtGas = 0;
	}
  sessionStorage.setItem('gas', amtGas);
	$("#amt_Gas").html(amtGas);
}
