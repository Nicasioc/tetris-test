

var grid = new Grid(CONFIG.grid);

grid.draw();

var tetromino = new Tetromino( [[1,1],[1,1]] );

grid.saveUsedSpace();
grid.update(tetromino);

/*
    EVENT LISTENER
*/

document.body.addEventListener("keydown", function (e) {
    if( e.keyCode == 37 ) {
        tetromino.moveLeft();
    }
    if( e.keyCode == 39 ) {
        tetromino.moveRight();
    }
});

var ellapsedTime = 0;

setInterval( function() {

	if (tetromino.landed) {
		tetromino = new Tetromino( [[1,1],[1,1]] );
	}

	tetromino.moveDown();

	if ( grid.tetrominoTouchedUsedSpace(tetromino) ) {
		tetromino.moveUp();
		grid.update(tetromino);
		grid.saveUsedSpace();
		tetromino.landed = true;
		grid.cleanGrid();
	} else {
		grid.cleanGrid();
		grid.update(tetromino);
	}

	grid.draw();



	}, 500);