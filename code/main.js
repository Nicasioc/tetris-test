var ui = new Ui();
var grid = new Grid(CONFIG.grid);

var tetromino = new Tetromino( CONFIG.tetrominos );

var score = 0;

//grid.saveUsedSpace();
grid.update(tetromino);
grid.draw();

/*
    EVENT LISTENER
*/

document.body.addEventListener("keydown", function (e) {
    if( e.keyCode == 38 ) {
    	tetromino.rotate();
    }
    if( e.keyCode == 37 ) {
    	tetromino.moveLeft();
    	if ( grid.tetrominoTouchedUsedSpace(tetromino) ) {
        	tetromino.moveRight();
    	}
    }
    if( e.keyCode == 39 ) {
        tetromino.moveRight();
        if ( grid.tetrominoTouchedUsedSpace(tetromino) ) {
        	tetromino.moveLeft();
    	}
    }
});

setInterval( function() {

	if (tetromino.landed) {
		tetromino = new Tetromino( CONFIG.tetrominos );
	}

	tetromino.moveDown();

	if ( grid.tetrominoTouchedUsedSpace(tetromino) ) {
		tetromino.moveUp();
		grid.update(tetromino);
		grid.saveUsedSpace();
		tetromino.landed = true;

		if ( grid.checkForFullRows() ) {
			grid.removeRows();
			ui.calculateScore( grid.fullRowsIndexes );
			ui.drawScore("score1");
		}

		grid.cleanGrid();

	} else {
		grid.cleanGrid();
		grid.update(tetromino);
	}

	grid.draw();



	}, 500);