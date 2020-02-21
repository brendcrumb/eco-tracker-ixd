/*
 * GET tips page.
 */

var tipData = require('../tips.json');

exports.view = function(req, res){
  res.render('tips', tipData);
};

/*
// Get modal element
var modal = document.getElementById('simpleModal');

//Get open modal button
var modalBtn = document.getElementById('modalBtn');

//Get close button
var closeBtn = document.getElementByClassName('closeBtn')[0];

//Listen for open Click
modalBtn.addEventListener('click', openModal);

//Listen for close Click
modalBtn.addEventListener('click', closeModal);

//listen for outside click
window.addEventListener('click', outsideClick);

//functino to open modalBtn
function openModal() {
  modal.style.display = 'block';
}

//functino to close modalBtn
function closeModal() {
  modal.style.display = 'none';
}

//function to close modal if outside click
function outsideClick(e){
  if(e.target == modal){
    modal.style.display = 'none'
  }
}
*/
