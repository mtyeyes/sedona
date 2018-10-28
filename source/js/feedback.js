var sentBtn = document.querySelector(".feedback__btn");
var failAlert = document.querySelector(".modal-fail");
var failClose = document.querySelector(".modal-fail__btn");
var sentAlert = document.querySelector(".modal-sent");
var sentClose = document.querySelector(".modal-sent__btn");
var requiredInputs = document.getElementsByClassName("js-required");

sentBtn.addEventListener("click", function( event ) {
  for (var i = 0 ; i <= requiredInputs.length - 1; i++) {
    if (requiredInputs[i].checkValidity()) {
      if (i == requiredInputs.length - 1) {
        event.preventDefault();
        sentBtn.disabled = true;
        sentAlert.classList.remove("modal-sent__closed");
      }
    } else {
      sentBtn.disabled = true;
      failAlert.classList.remove("modal-fail__closed");
      break;
    }
  }
});

failClose.addEventListener("click", function() {
  failAlert.classList.add("modal-fail__closed");
  sentBtn.disabled = false;
});

sentClose.addEventListener("click", function() {
  sentAlert.classList.add("modal-sent__closed");
  sentBtn.disabled = false;
});
