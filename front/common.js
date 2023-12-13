const redColor = "#8B0000";
const blueColor = "#1434A4";

const setPlayerNames = function(player, opponent) {
	document.getElementById("player-name").innerText = player;
	document.getElementById("opponent-name").innerText = opponent;
}

const initializeBoard = function(isBlue) {
	const transparentCells = [42, 43, 52, 53, 46, 47, 56, 57];
	const board = [];
	for (let i = 0; i < 100; i++) {
		const cell = document.createElement("div");
		cell.className = "cell";
		cell.innerHTML = i;
		if (transparentCells.includes(i))
			cell.style.opacity = 0;
		else if (i < 40) {
			cell.classList.add(isBlue ? "player-cell" : "opponent-cell")
			cell.style.backgroundColor = blueColor;
		}
		else if (i > 59) {
			cell.classList.add(isBlue ? "opponent-cell" : "player-cell");
			cell.style.backgroundColor = redColor;
		}
		if (isBlue)
			board.unshift(cell)
		else
			board.push(cell);
	}
	return board;
}

const drawBoard = function(boardArray) {
	const board = document.getElementById("board");
	board.innerHTML = "";
	boardArray.forEach((el) => board.appendChild(el));
}
