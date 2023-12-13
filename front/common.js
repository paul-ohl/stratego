const redColor = "#8B0000";
const blueColor = "#1434A4";

class Game {
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
            console.log(this.gameId);

            let response = await fetch(
                `http://localhost:8080/games/${this.gameId}`,
                requestOptions
            );
            const game_info = await response.json();
            console.log(game_info);
            this.bluePlayerName = game_info.player_blue_name;
            this.redPlayerName = game_info.player_red_name;
            this.bluePlayerStatus = game_info.status_player_blue;
            this.redPlayerStatus = game_info.status_player_red;
            this.positions = JSON.parse(game_info.positions);
            console.log(this.isBlue);
            console.log(this.bluePlayerName);
            console.log(this.redPlayerName);
            if (game.isBlue) {
                setPlayerNames(
                    this.bluePlayerName,
                    this.redPlayerName,
                    this.bluePlayerStatus,
                    this.redPlayerStatus
                );
            } else {
                setPlayerNames(
                    this.redPlayerName,
                    this.bluePlayerName,
                    this.redPlayerStatus,
                    this.bluePlayerStatus
                );
            }
            const board = initializeBoard(game);
            console.log(board);
            drawBoard(board);
            if (
                (this.playing &&
                    this.isBlue &&
                    this.bluePlayerStatus === "P") ||
                (this.playing && !this.isBlue && this.redPlayerStatus === "P")
            ) {
                drawPlayableCells(board);
            }
        } catch (error) {
            console.log("error", error);
        }
    }
}

const setPlayerNames = function (
    player,
    opponent,
    playerStatus,
    opponentStatus
) {
    document.getElementById("player-name").innerText =
        player + " " + playerStatusDict[playerStatus];
    document.getElementById("opponent-name").innerText =
        opponent + " " + playerStatusDict[opponentStatus];
};

const initializeBoard = function (game) {
    const isBlue = game.isBlue;
    const transparentCells = [42, 43, 52, 53, 46, 47, 56, 57];
    const board = [];
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.innerHTML =
            game.positions[i] == null
                ? ""
                : decodeCharacters(game.positions[i].rank);
        if (transparentCells.includes(i)) cell.style.opacity = 0;
        else if (i < 40) {
            cell.classList.add(isBlue ? "player-cell" : "opponent-cell");
            cell.style.backgroundColor = blueColor;
        } else if (i > 59) {
            cell.classList.add(isBlue ? "opponent-cell" : "player-cell");
            cell.style.backgroundColor = redColor;
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
