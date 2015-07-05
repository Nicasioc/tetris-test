var ui = new UI();
var grid = new Grid(CONFIG.grid,"game");
var gridNext = new Grid(CONFIG.nextGrid,"next1");

var tetromino = new Tetromino( CONFIG.tetrominos );
var nextTetromino = new Tetromino( CONFIG.tetrominos );
var score = 0;
var keys = [];
var pause = false;
gridNext.update(nextTetromino);
gridNext.draw();

grid.update(tetromino);
grid.draw();

/*
    EVENT LISTENER
*/

document.body.addEventListener("keydown", function (e) {

    keys[e.keyCode] = true;

    if ( e.keyCode == 80 ) {
        if (!pause) {
            pause = true;
            ui.showAlert("PAUSE", ui.score);
        } else {
            ui.hideAlert();
            pause = false;
        }
    }

});

document.body.addEventListener("keyup", function (e) {
    //keys[e.keyCode] = false;
});

/**/

var fps = 30,
    interval = 500 / fps,
    t=0,
    tInterval = fps*0.5;

function draw() {
        setTimeout(function() {
    if ( !pause && !grid.full ) {

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
                keys[38] = false;
            }
            if( keys[37] ) {
                tetromino.moveLeft();
                if ( grid.tetrominoTouchedUsedSpace(tetromino) ) {
                    tetromino.moveRight();
                }
                keys[37] = false;
            }
            if( keys[39] ) {
                tetromino.moveRight();
                if ( grid.tetrominoTouchedUsedSpace(tetromino) ) {
                    tetromino.moveLeft();
                }
                keys[39] = false;
            }
            grid.draw();

            if ( t == tInterval ) {

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

                t=0;

            }
            t++;

        } else {
            if(grid.full) {
                ui.showAlert("GAME OVER", ui.score);
                ui.$alert.find("#action").show();
                ui.$alert.find("#action").on("click", function() {
                    grid = new Grid(CONFIG.grid,"game");
                    ui.hideAlert();
                });
            }
        }

        requestAnimationFrame(draw);

        }, interval);
}
draw();
/**/