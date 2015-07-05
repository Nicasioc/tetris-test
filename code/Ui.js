function UI() {
	this.score = 0;
	this.$alert = $("#alert");
}

UI.prototype.drawScore = function(domElId) {
	document.getElementById(domElId).innerHTML = this.score;

}

UI.prototype.calculateScore = function( rowsIndexes ) {
	this.score+= rowsIndexes.length;
}

UI.prototype.showAlert = function(message, subMessage) {
	this.$alert.show();
    this.$alert.find("#message").html(message);
    this.$alert.find("#subMessage").html(subMessage);
}
UI.prototype.hideAlert = function() {
	this.$alert.hide();
}