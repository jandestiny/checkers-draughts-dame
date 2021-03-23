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

//Two Last clicked pieces
var lastPieces = []

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
    //Clear Pieces
    board.pieces = []

    let board_size_root = Math.sqrt(board.properties.size)
    let shifted = true;

    //Row loop
    for (let i = 0; i < board_size_root; i++) {

        //Column loop
        for (let j = 0; j < board_size_root; j++) {

            if (shifted) {
                //If current row is in the light team and on valid ground
                if (i <= 2 && j % 2 != 0) {
                    board.pieces.push({ team: 0, row: i, column: j, doubled: false })
                }

                //If current row is in the dark team and on valid ground
                else if (i >= 5 && j % 2 != 0) {
                    board.pieces.push({ team: 1, row: i, column: j, doubled: false })
                }

            } else {
                //If current row is in the light team and on valid ground
                if (i <= 2 && j % 2 == 0) {
                    board.pieces.push({ team: 0, row: i, column: j, doubled: false })
                }

                //If current row is in the dark team and on valid ground
                else if (i >= 5 && j % 2 == 0) {
                    board.pieces.push({ team: 1, row: i, column: j, doubled: false })
                }
            }
        }

        shifted = !shifted
    }

    createGraphics()
    drawBoard()
}

function drawBoard()
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
                    if (current_piece.team == 0) {
                        output += "o"
                        document.querySelector(`td[data-row='${i}'][data-column='${j}']`).insertAdjacentElement("beforeend", getPieceElement("cyan"))
                    } else {
                        output += "x"
                        document.querySelector(`td[data-row='${i}'][data-column='${j}']`).insertAdjacentElement("beforeend", getPieceElement("red"))
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
function createGraphics()
{
    let game = document.querySelector("#game")
    let table = document.createElement("table")

    let board_size_root = Math.sqrt(board.properties.size)

    for (let i = 0; i < board_size_root; i++) {

        let currentTableRow = document.createElement("tr")

        for (let j = 0; j < board_size_root; j++) {

            let currentCell = document.createElement("td")
            currentCell.style.width = "100px"
            currentCell.style.height = "100px"
            currentCell.dataset.row = i
            currentCell.dataset.column = j
            currentCell.classList.add("piece")

            currentCell.addEventListener("click", (event) => clickedPiece(event))

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
function getPieceElement(color)
{
    let piece = document.createElement("div")
    piece.style.height = "60px"
    piece.style.width = "60px"
    piece.style.borderRadius = "45px"
    piece.style.backgroundColor = color
    piece.classList.add("chip")

    return piece;
}


//TODO Needs rework after layout change
function move(from, to)
{
    //Get relevant pieces
    let source = board.pieces.find(piece => piece.row == from.row && piece.column == from.column) || null
    let target = board.pieces.find(piece => piece.row == to.row && piece.column == to.column) || null

    // //Validation (outsource in validation.js later!)

    // //Check if "from" position contains piece
    // if (source != null) {

    //     //Check if "to" position is reachable from "from" position
    //     if (isDirectDiagonalNeighbor(from, to) || isDirectJumpedDiagonalNeigbor(from, to)) {

    //         //Check if "to" position is valid and unoccupied
    //         if (target == null && to > 0 && to <= Math.sqrt(board.properties.size)) {

    //             //Move Piece
    //             source.position = to
    //         }
    //     }

    // }

    //Move

    source.row = to.row
    source.column = to.column
}

//Event handler for clicking on any cell
function clickedPiece(event)
{
    let clickedRow = (event.target.dataset.row || event.target.parentNode.dataset.row)
    let clickedColumn = (event.target.dataset.column || event.target.parentNode.dataset.column)
    let clickedCell = board.pieces.find(piece => piece.row == clickedRow && piece.column == clickedColumn)
    clickedCell = clickedCell == undefined ? { row: clickedRow, column: clickedColumn } : clickedCell

    try {

        if (lastPieces.length == 0) {
            lastPieces.push(clickedCell)
        }
        else {
            lastPieces.push(clickedCell)
            console.table(lastPieces)
            move(lastPieces[0], lastPieces[1])
            lastPieces = []
            drawBoard()
        }

    } catch (e) {
        lastPieces = []
        console.error(e)
    }
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