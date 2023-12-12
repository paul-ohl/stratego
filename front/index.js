const transparentCells = [42, 43, 52, 53, 46, 47, 56, 57];

function initializeBoard() {
	const board = [];
	for (let i = 0; i < 100; i++) {
		const cell = document.createElement("div");
		cell.className = "cell";
		cell.innerHTML = i;
		if (transparentCells.includes(i))
			cell.style.opacity = 0;
		else if (i < 40) {
			cell.classList.add("enemy")
			cell.style.color = "white";
			cell.style.backgroundColor = "#8B0000";
		}
		else if (i > 59) {
			cell.style.color = "white";
			cell.style.backgroundColor = "#1434A4";
			cell.classList.add("troups");
		}
		board.push(cell);
	}
	return board;
}

// Remember to check if the resulting cell is in a pond!
function getSurroundingCells(cellId) {
	const surroundingCells = [];
	if (cellId % 10 != 0) {
		surroundingCells.push(cellId - 1);
	}
	if ((cellId + 1) % 10 != 0) {
		surroundingCells.push(cellId + 1);
	}
	if (cellId < 90) {
		surroundingCells.push(cellId - 10);
	}
}

function drawBoard(boardArray) {
	const board = document.getElementById("board");
	boardArray.forEach((el) => board.appendChild(el));
}

const board = initializeBoard();
drawBoard(board);

for ([idx, cell] of board.entries()) {
	if (!cell.classList.contains("troups")) {
		continue;
	}

}

// board[64].style.border = "3px dashed #32cd32"

// [board[54], board[64]] = [board[64], board[54]];
// drawBoard(board);
