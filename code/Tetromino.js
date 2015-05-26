/**
 * Returns random or specific tetromino with al rotation shapes
 * tetrominosObj OBJ with all tetrominoes
 * rowColPos {} if empty {"row":0,"col":0}
 * shape STRING letter with the shape of the tetromino, if empty selects random shape
**/
function Tetromino(tetrominosObj, rowColPos, shape) {
	this.indexShape = 0;



	var _shape = shape;
	if ( !_shape ) {
		var shapeList = Object.keys(tetrominosObj);
		var shapeIndex = Math.floor((Math.random() * shapeList.length-1) + 1);
		_shape = shapeList[shapeIndex];
	}

	this.AllShapes = tetrominosObj[_shape]


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