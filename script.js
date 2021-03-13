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

    //Fill Pieces in snake motion, beginning from the top left
    for (let i = 1; i <= board.properties.size; i++) {

        //If current place is in the light team and on valid ground
        if (i % 2 != 0 && i < 24) {
            board.pieces.push({ team: 0, position: i, doubled: false })
        }

        //If current place is in the dark team and on valid ground
        else if (i % 2 != 0 && i > 40) {
            board.pieces.push({ team: 1, position: i, doubled: false })
        }
    }

    drawBoard()
}

function drawBoard()
{
    //Development version

    var output = ""

    for (let i = 1; i <= Math.sqrt(board.properties.size); i++) {

        if (i % 2 != 0) {

            for (let j = 1; j <= Math.sqrt(board.properties.size); j++) {
                let pos = i * Math.sqrt(board.properties.size) + j
                console.log(pos)
                let piece = board.pieces.find(x => x.position == pos) || null

                if (piece != null) {
                    if (piece.team == 0) {
                        output += "o"
                    } else {
                        output += "x"
                    }
                } else {
                    output += " "
                }
            }

        } else {

            for (let k = Math.sqrt(board.properties.size); k >= 1; k--) {
                let pos = i * Math.sqrt(board.properties.size) + k
                console.log(pos)
                let piece = board.pieces.find(x => x.position == pos) || null

                if (piece != null) {
                    if (piece.team == 0) {
                        output += "o"
                    } else {
                        output += "x"
                    }
                } else {
                    output += " "
                }
            }

        }

        output += "\n"
    }

    console.log(output)
}

function move(from, to)
{
    //Get relevant pieces
    let source = boards.pieces.find(piece => piece.position == from) || null
    let target = boards.pieces.find(piece => piece.position == to) || null

    //Validation

    //Check if "from" position contains piece
    if (source != null) {

        //Check if "to" position is valid and unoccupied
        if (from % target == null) {

            //Move Piece

        }
    }
}