function UI() {
	this.score = 0;
	this.elAlert = document.getElementById("alert");
}

UI.prototype.drawScore = function(domElId) {
	document.getElementById(domElId).innerHTML = this.score;

}

UI.prototype.calculateScore = function( rowsIndexes ) {
	this.score+= rowsIndexes.length;
}

UI.prototype.showAlert = function(message, subMessage) {
	this.elAlert.style.display = "block";
    this.elAlert.querySelector("#message").innerHTML = message;
    this.elAlert.querySelector("#subMessage").innerHTML = subMessage;
}
UI.prototype.hideAlert = function() {
	this.elAlert.style.display = "none";
}