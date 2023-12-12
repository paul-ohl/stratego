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
			cell.classList.add("enemy")
			cell.style.color = "white";
			cell.style.backgroundColor = isBlue ? redColor : blueColor;
		}
		else if (i > 59) {
			cell.style.color = "white";
			cell.style.backgroundColor = isBlue ? blueColor : redColor;
			cell.classList.add("troups");
		}
		board.push(cell);
	}
	return board;
}

const board = initializeBoard(true);
drawBoard(board);
