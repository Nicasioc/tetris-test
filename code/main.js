

var grid = new Grid(CONFIG.grid);

grid.draw();

var tetromino = new Tetromino( [[1,1],[1,1]] );

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

	tetromino.moveDown();
	if ( grid.tetrominoTouchedUsedSpace(tetromino) ) {
		tetromino.moveUp();
		grid.saveUsedSpace();
		grid.update(tetromino);
		tetromino.landed = true;
	} else {
		grid.update(tetromino);
		grid.cleanGrid();
	}

	grid.draw();



	}, 500);