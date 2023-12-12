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
			cell.classList.add("opponent-cell")
			cell.style.backgroundColor = isBlue ? redColor : blueColor;
		}
		else if (i > 59) {
			cell.classList.add("player-cell");
			cell.style.backgroundColor = isBlue ? blueColor : redColor;
		}
		board.push(cell);
	}
	return board;
}

const setHint = function(board, hint) {
	const positions = hint.positions;
	for (let i = 0; i < positions.length; i++) {
		const cell = board[i + 60];
		const characterId = positions[i];
		if (characterId == 0) {
			cell.innerHTML = "F";
		} else if (characterId == 11) {
			cell.innerHTML = "B";
		} else {
			cell.innerHTML = characterId;
		}
		cell.classList.add(characterId);
	}
}

const getHint = async function() {
	// const response = await fetch("/api/hint/", {
	// 	method: "GET",
	// 	headers: {
	// 		"gameId": 1,
	// 		"player": "blue",
	// 	}
	// });
	// const hint = await response.json();
	const hint = {
		id: 8,
		positions: [0, 10, 9, 8, 8, 7, 7, 7, 6, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 11, 11, 11, 11, 11, 11]
	};
	setHint(board, hint);
}

const toggleReady = async function() {
	const response = await fetch("/api/game", {
		method: "PATCH",
		headers: {
			"gameId": 1,
			"player": "blue"
		},
		body: {
			"ready": !playerIsReady
		}
	});
	if (response.ok) {
		playerIsReady = !playerIsReady;
		document.getElementById("ready-button").innerText =
			playerIsReady ? "Ready" : "Not Ready";
	}
}

let playerIsReady = false;
const board = initializeBoard(true);
drawBoard(board);
setPlayerNames("Paul", "Léa");
