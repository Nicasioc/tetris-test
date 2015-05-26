/**
* SHAPE [[1,1],[1,1]]
**/
function Tetromino(SHAPE, rowColPos) {
	this.indexShape = 0;
	this.AllShapes = SHAPE
	this.shape = this.AllShapes[ this.indexShape ];
	this.rowColPos = rowColPos||{"row":0,"col":0};
	this.landed = false;
}

Tetromino.prototype.rotate = function() {
	if ( this.indexShape < this.AllShapes.length -1) {
		this.indexShape++;
	} else if ( this.indexShape == this.AllShapes.length -1 ){
		this.indexShape = 0;
	}
	this.shape = this.AllShapes[ this.indexShape ];
};

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