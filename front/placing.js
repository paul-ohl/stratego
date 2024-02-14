const setHint = function (board, positions) {
    for (let i = 0; i < positions.length; i++) {
        const cell = board.children[i + 60];
        const characterId = positions[i];
        cell.innerHTML = decodeCharacters(characterId);

        cell.classList.add(characterId);
    }
};

const getHint = async function () {
    try {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        response = await fetch(
            `http://localhost:${port}/hint/random`,
            requestOptions
        );
    } catch (error) {
        console.log("error", error);
    }
    const hint = await response.json();
    if (hint?.positions != null) {
        array_of_positions = JSON.parse(hint.positions);
        setHint(board, array_of_positions);
    }
};

const toggleReady = async function () {
    let url = `http://localhost:${port}/games/${game.gameId}/toggle-ready`;
    if (!playerIsReady) {
        // on appuie sur le bouton ready
        try {
            positions = [];
            for (cell of document.getElementsByClassName("cell")) {
                positions.push(
                    cell.innerHTML == ""
                        ? null
                        : encodeCharacters(cell.innerHTML)
                );
            }
            const somme = positions.reduce(
                (accumulateur, valeurCourante) =>
                    accumulateur + (valeurCourante ? valeurCourante : 0),
                0
            );
            my_positions = JSON.stringify(positions);

            const response = await sendPostRequest(url, my_positions);
            const result = await response.json();

            if (response.ok) {
                if (somme > 200) {
                    playerIsReady = true;
                    refreshReadyButton();
                } else {
                    alert("You must place all your characters");
                }
            } else {
                alert("Error!");
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        // on appuie sur le bouton not ready
        try {
            my_positions = JSON.stringify([]);

            const response = await sendPostRequest(url, my_positions);
            const result = await response.json();

            if (response.ok) {
                playerIsReady = false;
                refreshReadyButton();
            } else {
                alert("Error!");
            }
        } catch (error) {
            console.log(error);
        }
        document.getElementById("ready-button").innerText = "Ready";
    }
    game.getInfo();
    initializeBoard(game);
};

async function sendPostRequest(url, my_positions) {
    console.log("send post request");
    console.log("playerIsReady", playerIsReady);
    console.log(my_positions);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        color: game.isBlue ? "blue" : "red",
        positions: my_positions,
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    response = await fetch(url, requestOptions);
    return response;
}

function refreshReadyButton() {
    console.log("refresh ready button");
    console.log(playerIsReady);
    let old_text = document.getElementById("player-name").innerText;
    console.log(old_text);
    if (playerIsReady) {
        console.log("player is ready");
        document.getElementById("ready-button").innerText = "Not Ready";
        old_text = old_text.replace("is Choosing", "Ready !");
    } else {
        console.log("player is not ready");
        document.getElementById("ready-button").innerText = "Ready";
        old_text = old_text.replace("Ready !", "is Choosing");
    }
}

async function main() {
    game = new Game(false);
    await game.getInfo();
    playerIsReady = game.playerIsReady;
    console.log("playerIsReady update", playerIsReady);
    refreshReadyButton();
    const board = initializeBoard(game);
}

main();
