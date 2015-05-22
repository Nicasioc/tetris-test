/**
* SHAPE [[1,1],[1,1]]
**/
function Tetromino(SHAPE, rowColPos) {
	this.shape = SHAPE;
	this.rowColPos = rowColPos||{"row":0,"col":0};
	this.landed = false;
}

Tetromino.prototype.rotate = function() {};

Tetromino.prototype.moveDown = function() {
	this.rowColPos.row+=1;
};

Tetromino.prototype.moveUp = function() {
	this.rowColPos.row-=1;
};

Tetromino.prototype.moveLeft = function() {
	this.rowColPos.col-=1;
}

Tetromino.prototype.moveRight = function() {
	this.rowColPos.col+=1;
}