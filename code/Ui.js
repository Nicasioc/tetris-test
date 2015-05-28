function Ui() {
	this.score = 0;
}

Ui.prototype.drawScore = function(domElId) {
	document.getElementById(domElId).innerHTML = this.score;

};

Ui.prototype.calculateScore = function( rowsIndexes ) {
	this.score+= rowsIndexes.length;
}