const redColor = "#8B0000";
const blueColor = "#1434A4";

const getSurroundingCells = function(cellId) {
	const pondCells = [42, 43, 52, 53, 46, 47, 56, 57];
	const surroundingCells = [];
	if (cellId % 10 != 0 && !pondCells.includes(cellId - 1)) {
		surroundingCells.push(cellId - 1);
	}
	if ((cellId + 1) % 10 != 0 && !pondCells.includes(cellId + 1)) {
		surroundingCells.push(cellId + 1);
	}
	if (cellId >= 10 && !pondCells.includes(cellId - 10)) {
		surroundingCells.push(cellId - 10);
	}
	if (cellId < 90 && !pondCells.includes(cellId + 10)) {
		surroundingCells.push(cellId + 10);
	}
}

const drawBoard = function(boardArray) {
	const board = document.getElementById("board");
	boardArray.forEach((el) => board.appendChild(el));
}

// for ([idx, cell] of board.entries()) {
// 	if (!cell.classList.contains("troups")) {
// 		continue;
// 	}
// }

// board[64].style.border = "3px dashed #32cd32"

// [board[54], board[64]] = [board[64], board[54]];
// drawBoard(board);
