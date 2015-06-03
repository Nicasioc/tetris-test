var ui = new Ui();
var grid = new Grid(CONFIG.grid,"game");
var gridNext = new Grid(CONFIG.nextGrid,"next1");

var tetromino = new Tetromino( CONFIG.tetrominos );
var nextTetromino = new Tetromino( CONFIG.tetrominos );
var score = 0;
var keys = [];

gridNext.update(nextTetromino);
gridNext.draw();

grid.update(tetromino);
grid.draw();

/*
    EVENT LISTENER
*/

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
	keys[e.keyCode] = false;
});

/**/

var fps = 30;
var interval = 1000 / fps;

function draw() {
    setTimeout(function() {

    requestAnimationFrame(draw);

	//create new tetromino if actual landed
	if (tetromino.landed) {
		tetromino = nextTetromino;
		nextTetromino = new Tetromino( CONFIG.tetrominos );
		gridNext.cleanGrid();
		gridNext.update(nextTetromino);
		gridNext.draw();
	}

	//keyboar inputs
	if( keys[38] ) {
    	tetromino.rotate();
    	if ( grid.tetrominoTouchedUsedSpace(tetromino) ) {
        	tetromino.AllShapes[ tetromino.indexShape - 1 ];
    	}
    }
    if( keys[37] ) {
    	tetromino.moveLeft();
    	if ( grid.tetrominoTouchedUsedSpace(tetromino) ) {
        	tetromino.moveRight();
    	}
    }
    if( keys[39] ) {
        tetromino.moveRight();
        if ( grid.tetrominoTouchedUsedSpace(tetromino) ) {
        	tetromino.moveLeft();
    	}
    }

    //moving tetromino down
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


    }, interval);
}
draw();
/**/