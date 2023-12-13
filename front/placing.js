const setHint = function (board, positions) {
    for (let i = 0; i < positions.length; i++) {
        const cell = board[i + 60];
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
    console.log(hint);
    if (hint?.positions != null) {
        array_of_positions = JSON.parse(hint.positions);
        console.log(array_of_positions);
        setHint(board, array_of_positions);
    }
};

const toggleReady = async function () {
    console.log(playerIsReady);
    let url = `http://localhost:${port}/games/${game.gameId}/toggle-ready`;
    if (!playerIsReady) {
        // on appuie sur le bouton ready
        try {
            positions = [];
            for (cell of document.getElementsByClassName("cell")) {
                if (cell.classList.contains("player-cell")) {
                    console.log(cell.innerHTML == "" ? "0" : cell.innerHTML);

                    positions.push(
                        cell.innerHTML == ""
                            ? 0
                            : encodeCharacters(cell.innerHTML)
                    );
                }
            }
            const somme = positions.reduce(
                (accumulateur, valeurCourante) =>
                    accumulateur + (valeurCourante ? valeurCourante : 0),
                0
            );
            console.log(somme);

            my_positions = JSON.stringify(positions);

            console.log(my_positions);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                color: game.isBlue ? "blue" : "red",
                positions: my_positions,
            });

            console.log(raw);
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            response = await fetch(url, requestOptions);
            let result = await response.json();
            console.log(result);

            if (response.ok) {
                console.log("ok");
                if (somme > 200) {
                    playerIsReady = true;
                    document.getElementById("ready-button").innerText =
                        "Not Ready";
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
            var requestOptions = {
                method: "POST",
                redirect: "follow",
            };

            var raw = JSON.stringify({
                color: game.isBlue ? "blue" : "red",
                positions: "[]",
            });

            response = await fetch(url, requestOptions);
            let result = await response.json();
            console.log(result);

            if (response.ok) {
                console.log("ok");
                playerIsReady = false;
                document.getElementById("ready-button").innerText =
                    playerIsReady ? "Ready" : "Not Ready";
            } else {
                alert("Error!");
            }
        } catch (error) {
            console.log(error);
        }
        document.getElementById("ready-button").innerText = "Ready";
    }
};

let playerIsReady = false;
game = new Game(false);
game.getInfo();
console.log(game);
