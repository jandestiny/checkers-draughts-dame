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

function drawBoard(){
    let output = ""
    let inverse_row = false
    let counter_overall = 1
    let row_size = Math.sqrt(board.properties.size)

    // Go through all rows
    for(let i=1; i <= row_size; i++){
        
        //Go through each field in row
        for(let j=1; j <= row_size; j++){

            let field2check

            //If the row is inverse (snake-pattern), count backwards
            if(inverse_row){
                field2check = i*row_size-(j-1)
            }else{
                field2check = i*row_size-(row_size-j)
            }

            let piece = board.pieces.find(x => x.position == field2check) || null

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

        //inverse direction after each row
        inverse_row = !inverse_row

        //Newline after end of row
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

            //Check if "to" position is reachable from "from" position
            if(isDirectDiagonalNeighbor(from, to) || isJumpedDiagonalNeigbor(from, to)){

                //Check if "to" position is valid and unoccupied
                if (target == null && to > 0 && to <= Math.sqrt(board.properties.size)) {

                //Move Piece
                source.position = to
            }
            }
            
        }
}

function isDirectDiagonalNeighbor(from, to){
    //Get all diagonal neighbors from "from" position
    let neighbors = []

    //Top right neighbor
    let topright = (from)

}