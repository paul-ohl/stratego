const getSurroundingCells = function (cellId) {
    const pondCells = [42, 43, 52, 53, 46, 47, 56, 57];
    const surroundingCells = [];
    if (cellId % 10 != 0 && !pondCells.includes(cellId - 1)) {
        surroundingCells.push(cellId - 1);
    }
    if ((cellId + 1) % 10 != 0 && !pondCells.includes(cellId + 1)) {
        surroundingCells.push(cellId + 1);
    }
    if (cellId >= 10 && !pondCells.includes(cellId - 10)) {
        surroundingCells.push(cellId - 10);
    }
    if (cellId < 90 && !pondCells.includes(cellId + 10)) {
        surroundingCells.push(cellId + 10);
    }
    return surroundingCells;
};

async function move(board, originId, destinationId) {
    // const response = await fetch("/api/game/move", {
    // 	method: "PUT",
    // 	headers: {
    // 		gameId: 1,
    // 		player: "blue",
    // 		origin: originId,
    // 		destination: destinationId,
    // 	}
    // });
    // if (!await response.ok) {
    // 	alert("Error!");
    // }
    [board[originId], board[destinationId]] = [
        board[destinationId],
        board[originId],
    ];
    drawBoard(board);
    const allCells = document.getElementsByClassName("cell");
    for (cell of allCells) {
        cell.style.border = "1px solid black";
        cell.style.cursor = "default";
        if (cell.classList.contains("possible-move-cell")) {
            cell.replaceWith(cell.cloneNode(true));
        }
        cell.classList.remove("playable-cell", "possible-move-cell");
        cell.replaceWith(cell.cloneNode(true));
        // let cellCopy = cell.cloneNode(true);
        // cell.parentNode.replaceChild(cellCopy, cell);
    }
    // drawPlayableCells(board);
}

function drawPossibleMoves(board, idx) {
    for (cell of document.getElementsByClassName("possible-move-cell")) {
        cell.style.border = "1px solid black";
        board[cellId].style.cursor = "default";
    }
    let surroundingCells = getSurroundingCells(idx);
    for (cellId of surroundingCells) {
        if (board[cellId].classList.contains("player-cell")) {
            continue;
        }
        board[cellId].style.cursor = "pointer";
        board[cellId].classList.add("possible-move-cell");
        const origin = idx;
        const destination = cellId;
        board[cellId].addEventListener("click", () => {
            move(board, origin, destination);
        });
        if (board[cellId].classList.contains("opponent-cell")) {
            board[cellId].style.border = "3px dashed red";
        } else {
            board[cellId].style.border = "3px dashed magenta";
        }
    }
}

function drawPlayableCells(board) {
    for ([idx, cell] of board.entries()) {
        if (!cell.classList.contains("player-cell")) {
            continue;
        }
        const surroundingCells = getSurroundingCells(idx);
        if (
            surroundingCells.some(
                (nodeId) => !board[nodeId].classList.contains("player-cell")
            )
        ) {
            board[idx].style.border = "3px dashed #32cd32";
            board[idx].style.cursor = "pointer";
            board[idx].classList.add("playable-cell");
            const id_copy = idx;
            board[idx].addEventListener("click", () => {
                drawPossibleMoves(board, id_copy);
            });
        }
    }
}

const board = initializeBoard(true);
drawBoard(board);
setPlayerNames("Blue", "Red");
drawPlayableCells(board);
