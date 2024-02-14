const redColor = "#8B0000";
const blueColor = "#1434A4";

let port = 8081;

class Game {
    playerIsReady = false;
    constructor(playing) {
        this.playing = playing;
        this.url = new URL(window.location.href);
        this.gameId = this.url.searchParams.get("id");
        this.isBlue =
            this.url.searchParams.get("color") === "blue" ? true : false;
        this.bluePlayerName = "Blue";
        this.redPlayerName = "Red";
    }

    async getInfo() {
        var requestOptions = {
            method: "GET",
        };
        try {
            let response = await fetch(
                `http://localhost:${port}/games/${this.gameId}?color=${
                    this.isBlue ? "blue" : "red"
                }`,
                requestOptions
            );
            const game_info = await response.json();
            this.bluePlayerName = game_info.player_blue_name;
            this.redPlayerName = game_info.player_red_name;
            this.bluePlayerStatus = game_info.status_player_blue;
            this.redPlayerStatus = game_info.status_player_red;
            this.positions = JSON.parse(game_info.positions);
            if (this.isBlue) {
                this.setPlayerNames(
                    this.bluePlayerName,
                    this.redPlayerName,
                    this.bluePlayerStatus,
                    this.redPlayerStatus
                );
            } else {
                this.setPlayerNames(
                    this.redPlayerName,
                    this.bluePlayerName,
                    this.redPlayerStatus,
                    this.bluePlayerStatus
                );
            }
            const board = initializeBoard(game);
            drawBoard(board);
            if (
                (this.playing &&
                    this.isBlue &&
                    this.bluePlayerStatus === "P") ||
                (this.playing && !this.isBlue && this.redPlayerStatus === "P")
            ) {
                drawPlayableCells(board);
            }
        } catch (error) {}
        console.log("check fin getInfo", this.playerIsReady);
    }

    setPlayerNames(player, opponent, playerStatus, opponentStatus) {
        document.getElementById("player-name").innerText =
            player + " " + playerStatusDict[playerStatus];
        document.getElementById("opponent-name").innerText =
            opponent + " " + playerStatusDict[opponentStatus];
        this.playerIsReady = playerStatus !== "C";
        console.log("playerIsReady func", this.playerIsReady);
    }
}

const initializeBoard = function (game) {
    console.log("initializeBoard");
    console.log(game.positions);
    const isBlue = game.isBlue;
    const transparentCells = [42, 43, 52, 53, 46, 47, 56, 57];
    const board = [];
    for (let i = 0; i < 100; i++) {
        console.log(i);
        const cell = document.createElement("div");
        cell.className = "cell";

        if (
            game.positions[i] == null ||
            game.positions[i]?.rank === null ||
            game.positions[i]?.rank === ""
        ) {
            console.log(i, "position is null or rank is null");
            cell.innerHTML = "";
        } else {
            console.log(i, "position occupied", game.positions[i]?.rank);
            cell.innerHTML = decodeCharacters(game.positions[i]?.rank);
        }

        if (transparentCells.includes(i)) {
            console.log(i, "is transparent");
            cell.style.opacity = 0;
        } else if (game.positions[i] == null) {
            console.log(i, "is playable");
            cell.classList.add("playable-cell");
        } else if (isBlue) {
            if (game.positions[i]?.color == "blue") {
                console.log(i, "is blue player");
                cell.classList.add("player-cell");
                cell.style.backgroundColor = blueColor;
            } else {
                console.log(i, "is blue opponent");
                cell.classList.add("opponent-cell");
                cell.style.backgroundColor = redColor;
            }
        } else {
            if (game.positions[i]?.color == "red") {
                console.log(i, "is red player");
                cell.classList.add("player-cell");
                cell.style.backgroundColor = redColor;
            } else {
                console.log(i, "is red opponent");
                cell.classList.add("opponent-cell");
                cell.style.backgroundColor = blueColor;
            }
        }

        if (isBlue) board.unshift(cell);
        else board.push(cell);
    }
    return board;
};

const drawBoard = function (boardArray) {
    const board = document.getElementById("board");
    board.innerHTML = "";
    boardArray.forEach((el) => board.appendChild(el));
};

const characters = {
    0: "F",
    1: "S",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "B",
};

const decodeCharacters = function (character) {
    return characters[character];
};

const encodeCharacters = function (character) {
    return +Object.keys(characters).find(
        (key) => characters[key] === character
    );
};

const playerStatusDict = {
    C: "Choosing",
    R: "Ready !",
    P: "Playing",
    W: "Waiting ...",
    N: "Winner !",
    Q: "Quit",
};
