//Default variables
var board = {
    properties: {
        teams: 2,
        size: 64,
        numOfLight: 12,
        numOfDark: 12,
        turn: 0 //0 as in Team 0 -> Light
    },
    pieces: []
}

initGame()

function initGame()
{
    //Clear Pieces
    board.pieces = []

    let board_size_root = Math.sqrt(board.properties.size)
    let shifted = true;

    //Row loop
    for (let i = 0; i <= board_size_root; i++) {

        //Column loop
        for (let j = 0; j <= board_size_root; j++) {

            if (shifted) {
                //If current row is in the light team and on valid ground
                if (i <= 2 && j % 2 == 0) {
                    board.pieces.push({ team: 0, row: i, column: j, doubled: false })
                }

                //If current row is in the dark team and on valid ground
                else if (i >= 6 && j % 2 == 0) {
                    board.pieces.push({ team: 1, row: i, column: j, doubled: false })
                }

            } else {
                //If current row is in the light team and on valid ground
                if (i <= 2 && j % 2 != 0) {
                    board.pieces.push({ team: 0, row: i, column: j, doubled: false })
                }

                //If current row is in the dark team and on valid ground
                else if (i >= 6 && j % 2 != 0) {
                    board.pieces.push({ team: 1, row: i, column: j, doubled: false })
                }
            }
        }

        shifted = !shifted
    }

    drawBoard()
}

function drawBoard()
{
    let output = "\n"
    let board_size_root = Math.sqrt(board.properties.size)
    let pieces = board.pieces

    //Row loop
    for (let i = 0; i <= board_size_root; i++) {

        let current_row_pieces = pieces.filter(piece => piece.row == i)

        //Column loop
        for (let j = 0; j <= board_size_root; j++) {

            let current_piece = current_row_pieces.find(piece => piece.column == j) || null

            if (current_piece) {

                if (current_piece.team == 0) {
                    output += "o"
                } else {
                    output += "x"
                }
            }
            else {
                output += " "
            }
        }

        output += "\n"
    }

    return output
}


//TODO Needs rework after layout change
function move(from, to)
{
    //Get relevant pieces
    let source = boards.pieces.find(piece => piece.position == from) || null
    let target = boards.pieces.find(piece => piece.position == to) || null

    //Validation

    //Check if "from" position contains piece
    if (source != null) {

        //Check if "to" position is reachable from "from" position
        if (isDirectDiagonalNeighbor(from, to) || isDirectJumpedDiagonalNeigbor(from, to)) {

            //Check if "to" position is valid and unoccupied
            if (target == null && to > 0 && to <= Math.sqrt(board.properties.size)) {

                //Move Piece
                source.position = to
            }
        }

    }
}

function isDirectDiagonalNeighbor(from, to)
{
    return isXthDiagonalNeighbor(from, to, 1)
}

function isDirectJumpedDiagonalNeigbor(from, to)
{
    return isXthDiagonalNeighbor(from, to, 2)
}

function isXthDiagonalNeighbor(from, to, distance)
{
    let board_size_root = Math.sqrt(board.properties.size)


}