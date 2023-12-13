// Socket functions
const socket = io('http://localhost:8081');
socket.on('connect', function() {
	console.log('Connected');
});
socket.on("clientJoined", () => {
	console.log("A client joined the game!");
});
socket.on('update', (arg) => {
	console.log("Update: ", arg);
});
var socketConnect = function(gameId) {
	socket.emit('joinGame', { gameId }, (data) => console.log(data));
};
var updateGameList = function() {
	socket.emit('updateGameList');
};
socket.on('updateGameList', () => {
	listAvailableGames();
})

var createGame = async function() {
	const response = await fetch("http://localhost:8081/games", {
		method: "POST",
		// headers: {
		// 	"Content-Type": "application/json"
		// },
		body: {
			player_red_name: "RED_PLAYER_NAME",
		}
	});
	if (!response.ok) {
		alert("Error connecting to backend!");
	} else {
		const gameData = await response.json();
		console.log("Created new game: ", gameData);
		socketConnect(gameData.id);
		updateGameList();
	}
};

var listAvailableGames = async function() {
	const response = await fetch("http://localhost:8081/games/setup");
	if (!response.ok) {
		alert("Error connecting to backend!");
	} else {
		const games = await response.json();
		console.log("Available games: ", games);
		const buttonList = document.getElementById('games-list');
		buttonList.innerHTML = "";
		for (let game of games) {
			const node = document.createElement("button");
			node.innerText = `Game number ${game.id}`; //, created by ${game.player_red_name}`;
			node.onclick = `joinGame(${game.id})`;
			buttonList.appendChild(node);
		}
	}
}

listAvailableGames();
