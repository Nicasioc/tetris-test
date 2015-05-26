function Grid(GRID) {
	this.grid = GRID;
	this.gridToShow="";
	this.landed = [];
	for ( var i = 0 ; i < this.grid.length; i++ ) {
		this.landed[i] = GRID[i].slice(0);
	}
}


Grid.prototype.draw = function() {
	this.gridToShow="";
	for ( var i = 0 ; i < this.grid.length; i++ ) {
		this.gridToShow+="|";
		for (var j = 0; j < this.grid[i].length; j++) {
			if ( this.landed[i] && this.landed[i][j] == 1 ) {
				this.gridToShow+= "[1]";
			}else {
				this.gridToShow+= "["+this.grid[i][j]+"]";

			}
		};
		this.gridToShow += "|\n";
	};
	document.getElementById("game").innerHTML = this.gridToShow;
};

Grid.prototype.cleanGrid = function() {
	for ( var i = 0 ; i < this.grid.length; i++ ) {
		for (var j = 0; j < this.grid[i].length; j++) {
			this.grid[i][j] = 0;
		};
	};
}

Grid.prototype.update = function(tetromino) {
	for (var i = 0 ; i < tetromino.shape.length; i++) {
		for (var j = 0 ; j < tetromino.shape[i].length; j++ ) {
			if ( tetromino.shape[i][j] == 1 ) {
				this.grid[tetromino.rowColPos.row+i][tetromino.rowColPos.col+j] = 1;
			} else {
				this.grid[tetromino.rowColPos.row+i][tetromino.rowColPos.col+j] = 0;
			}
		}
	};
};

Grid.prototype.saveUsedSpace = function() {
	for ( var i = 0 ; i < this.grid.length; i++ ) {
		for (var j = 0; j < this.grid[i].length; j++) {
			if ( this.grid[i][j] == 1 ) {
				this.landed[i][j] = 1
			}
		}
	};
}

Grid.prototype.tetrominoTouchedUsedSpace = function(tetromino) {
	var _tetromino = tetromino;
	for (var i = 0 ; i < _tetromino.shape.length; i++) {
		for (var j = 0 ; j < _tetromino.shape[i].length; j++ ) {
			if ( !this.landed[_tetromino.rowColPos.row+i] || this.landed[_tetromino.rowColPos.row+i][_tetromino.rowColPos.col+j] == 1 && _tetromino.shape[i][j] == 1 ) {
				return true;
			}
		}
	};
	return false;
}