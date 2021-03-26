//Default variables
var board = {
    properties: {
        teams: 2,
        size: 64,
        numOfLight: 12,
        numOfDark: 12,
        turn: 0 //0 as in Team 0 -> Light
    },
    pieces: [],
    teams: [
        {
            id: 0,
            name: "Team 1",
            color: "cyan"
        },
        {
            id: 1,
            name: "Team 2",
            color: "red"
        }
    ],
    validator: new Validator()
}

//Two Last clicked pieces
var clickedPieces = []

//Check if needed and/or beneficial later
class Piece
{
    constructor(team, row, column, doubled)
    {
        this.team = team
        this.row = row
        this.column = column
        this.doubled = doubled
    }
}

initGame()

function initGame()
{
    createDefaultPieces()
    createBoard()
    updateBoard()
}

/*
Initialize default pieces (default checkers pieces)
!TODO Should be customizable later
!TODO Can be simplified, 'shifted' no longer needed -> use even and uneven sum of row+column
*/
function createDefaultPieces()
{
    //Clear Pieces
    board.pieces = []

    let board_size_root = Math.sqrt(board.properties.size)
    let shifted = true

    //Row loop
    for (let i = 0; i < board_size_root; i++) {

        //Column loop
        for (let j = 0; j < board_size_root; j++) {

            if (shifted) {
                //If current row is in the light team and on valid ground
                if (i <= 2 && j % 2 != 0) {
                    board.pieces.push({ team_id: 0, row: i, column: j, doubled: false })
                }


                //If current row is in the dark team and on valid ground
                else if (i >= 5 && j % 2 != 0) {
                    board.pieces.push({ team_id: 1, row: i, column: j, doubled: false })
                }

            } else {
                //If current row is in the light team and on valid ground
                if (i <= 2 && j % 2 == 0) {
                    board.pieces.push({ team_id: 0, row: i, column: j, doubled: false })
                }


                //If current row is in the dark team and on valid ground
                else if (i >= 5 && j % 2 == 0) {
                    board.pieces.push({ team_id: 1, row: i, column: j, doubled: false })
                }
            }
        }

        shifted = !shifted
    }
}

//Puts all existing chips in the right place on the board
//TODO Simplify according to new "teams"-definition in boards obj & move the debug section with "output" to debug functions
function updateBoard()
{
    let output = "\n"
    let board_size_root = Math.sqrt(board.properties.size)
    let pieces = board.pieces

    //clear existing pieces
    document.querySelectorAll(".chip").forEach(chip =>
    {
        chip.parentNode.innerHTML = ""
    })

    //Row loop
    for (let i = 0; i < board_size_root; i++) {

        let current_row_pieces = pieces.filter(piece => piece.row == i)

        //Column loop
        for (let j = 0; j < board_size_root; j++) {

            let current_piece = current_row_pieces.find(piece => piece.column == j) || null

            if (current_piece) {

                try {
                    if (current_piece.team_id == 0) {
                        output += "o"
                        document.querySelector(`td[data-row='${i}'][data-column='${j}']`).insertAdjacentElement("beforeend", getNewPieceElement("cyan"))
                    } else {
                        output += "x"
                        document.querySelector(`td[data-row='${i}'][data-column='${j}']`).insertAdjacentElement("beforeend", getNewPieceElement("red"))
                    }
                } catch (e) {
                    console.error(e)
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

//Create HTML board as table and mark every cell with the according attributes
function createBoard()
{
    let game = document.querySelector("#game")
    let table = document.createElement("table")

    let board_size_root = Math.sqrt(board.properties.size)

    //Row loop
    for (let i = 0; i < board_size_root; i++) {

        let currentTableRow = document.createElement("tr")

        //Column Loop
        for (let j = 0; j < board_size_root; j++) {

            let currentCell = document.createElement("td")
            currentCell.dataset.row = i
            currentCell.dataset.column = j
            currentCell.classList.add("piece")
            currentCell.addEventListener("click", (event) => clickedPieceHandler(event))

            //Color background of cell in checked pattern thorugh even or uneven number of summed row and column values
            if ((i + j) % 2 == 0) {
                currentCell.style.backgroundColor = "white"
            } else {
                currentCell.style.backgroundColor = "black"
            }

            currentTableRow.insertAdjacentElement("beforeend", currentCell)
        }

        table.insertAdjacentElement("beforeend", currentTableRow)
    }

    game.innerHTML = ""
    game.insertAdjacentElement("beforeend", table)

}

//Create a playable figurine aka chip
function getNewPieceElement(color)
{
    let piece = document.createElement("div")
    piece.style.backgroundColor = color
    piece.classList.add("chip")

    return piece;
}


//TODO Needs rework after layout change
function movePiece(from, to)
{
    //Get relevant pieces (if existant)
    let source = board.pieces.find(piece => piece.row == from.row && piece.column == from.column) || null
    let target = board.pieces.find(piece => piece.row == to.row && piece.column == to.column) || null

    //Abort if source does not contain a moveable piece OR move is invalid
    //TODO Send message to Notification engine
    if (source == null || !board.validator.validateMove(source, target || to)) {
        removeAllHighlights()
        console.log("Invalid move.")
        return
    }

    //Log move (TODO link to notification engine)
    console.log(`${board.teams[source.team_id].name} moves from %c[Row: ${from.row}, Column: ${from.column}] %cto %c[Row: ${to.row}, Column: ${to.column}]`, "color:red", "color:white", "color:green")

    //lol
    // console.log('%c\uD83D\uDE09 Giant Rainbow Text!',
    //     'font-weight:bold; font-size:50px;color:red; ' +
    //     'text-shadow:3px 3px 0 red,6px 6px 0 orange,9px 9px 0 yellow, ' +
    //     '12px 12px 0 green,15px 15px 0 blue,18px 18px 0 indigo,21px 21px 0 violet');

    //Move
    source.row = to.row
    source.column = to.column

}

//Event handler for clicking on any cell.
function clickedPieceHandler(event)
{
    // Get relevant information about clicked Piece
    let clickedRow = (event.target.dataset.row || event.target.parentNode.dataset.row)
    let clickedColumn = (event.target.dataset.column || event.target.parentNode.dataset.column)
    let clickedCell = board.pieces.find(piece => piece.row == clickedRow && piece.column == clickedColumn)
    clickedCell = clickedCell == undefined ? { row: clickedRow, column: clickedColumn } : clickedCell

    try {

        //If the clicked Piece is the first clicked piece, push it in the clickedPieces Array
        if (clickedPieces.length == 0) {
            removeAllHighlights()
            clickedPieces.push(clickedCell)
            updateHighlightedPieces()
        }

        else { //Else, push it, print two clicked pieces to console, move the piece, reset the array and update screen
            clickedPieces.push(clickedCell)
            updateHighlightedPieces()
            movePiece(clickedPieces[0], clickedPieces[1])
            console.table(clickedPieces)
            clickedPieces = []
            updateBoard()
        }

    } catch (e) {
        removeAllHighlights()
        clickedPieces = []
        console.error(e)
    }
}

//Highlights any cell in the clickedPieces Array
function updateHighlightedPieces()
{
    //Get html elements for currently clicked Pieces
    let clickedPiecesHTML = []

    for (let i = 0; i < clickedPieces.length; i++) {
        clickedPiecesHTML.push(document.querySelector(`td[data-row='${clickedPieces[i].row}'][data-column='${clickedPieces[i].column}']`))
    }

    clickedPiecesHTML.forEach((piece =>
    {
        piece.classList.add("highlightedCell")
    }))
}

//Remove highlights from all cells
function removeAllHighlights()
{
    document.querySelectorAll(".highlightedCell").forEach(element =>
    {
        element.classList.remove("highlightedCell")
    })
}

//Debug functions

function printBoardToConsole()
{
    console.log(updateBoard())
}

//deprecated -> will be moved to validator
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