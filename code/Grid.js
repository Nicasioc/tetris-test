function Grid(GRID, domId) {
	this.domEl = document.getElementById(domId);
	this.grid = GRID;
	this.gridToShow="";
	this.landed = new Array(GRID.lenght);
	for ( var i = 0 ; i < this.grid.length; i++ ) {
		this.landed[i] = GRID[i].slice(0);
	}
	this.emptyRow = GRID[0].slice(0);
	this.fullRowsIndexes = new Array;
	this.full = false;
}


Grid.prototype.draw = function() {
	this.gridToShow="";
	for ( var i = 0 ; i < this.grid.length; i++ ) {
		this.gridToShow+="<div class='row'>";
		for (var j = 0; j < this.grid[i].length; j++) {
			if ( this.landed[i] && this.landed[i][j] == 1 || this.grid[i][j] == 1 ) {
				this.gridToShow+= "<div class='cell full'></div>";
			}else {
				this.gridToShow+= "<div class='cell empty'></div>";

			}
		};
		this.gridToShow += "</div>";
	};
	this.domEl.innerHTML = this.gridToShow;
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
			if ( this.landed[_tetromino.rowColPos.row+i][_tetromino.rowColPos.col+j] == 1 && _tetromino.shape[i][j] == 1 ) {
				if ( _tetromino.rowColPos.row == 1 ) {
					this.full=true;
				};
				return true;
			}
		}
	};
	return false;
}

Grid.prototype.tetrominoTouchedBounds = function(tetromino) {
	if (  tetromino.rowColPos.col+tetromino.shape[0].length > this.grid[0].length || tetromino.rowColPos.col < 0 || tetromino.rowColPos.row+tetromino.shape.length > this.grid.length ) {
		return true;
	}
	return false;
}

Grid.prototype.checkAllCollisions = function( tetromino ) {
	if( this.tetrominoTouchedBounds(tetromino) ) {
		return true;
	} else if ( this.tetrominoTouchedUsedSpace(tetromino) ) {
		return true;
	}
		return false;
}

Grid.prototype.checkForFullRows = function() {
	var lineIsFull = false;
	var fullLinesIndexes = [];
	var colCount = 0;
	for ( var i = 0 ; i < this.landed.length; i++ ) {
		for (var j = 0; j < this.landed[i].length; j++) {
			if ( this.landed[i][j] == 1 ) {
				colCount++;
			} else {
				lineIsFull = false;
				break;
			}
		}
		if ( colCount == this.grid[0].length ) {
			fullLinesIndexes.push(i);
			lineIsFull = false;
		}
		colCount = 0;
	};

	if ( fullLinesIndexes.length > 0 ) {
		this.fullRowsIndexes = fullLinesIndexes;
		this.removeRows( fullLinesIndexes );
		fullLinesIndexes = [];
		return true; //return this for future use by UI
	} else {
		return false;
	}

}

//remove rows by index and adds new empty row on top by default
// rowsIndexes ARRAY list of indexes
Grid.prototype.removeRows = function( rowsIndexes ) {
	var rowsToRemove = rowsIndexes;

	for (var i = 0; i < rowsToRemove.length; i++) {
		this.landed.splice( rowsToRemove[i], 1 )
		this.landed.unshift( this.emptyRow.slice(0) );
	};
};