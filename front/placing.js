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
	// const response = await fetch("/api/hint/random", {
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
setPlayerNames("Blue", "Red");
