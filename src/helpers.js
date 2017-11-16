export const Board = () => ({
    winner: null,
    winningLine: null,
    squares: new Array(9).fill(null),
});


export const isValidMove = (board, activeBoard, iBoard, square) => {
    const playableBoard = board.winner === null && (activeBoard === iBoard || activeBoard < 0);
    const playableSquare = square === null;
    if(!playableSquare || !playableBoard) {
        return false;
    }
    return true;
};

export const getWinner = (board, token) => {
    const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let result = { winner: null, winningLine: null, };
    let openSquares = board.squares.filter(s => !s).length-1; // minus the one we're working on now
    let i = -1;

    while(!result.winner && i++ < 7) {
        let seq = winningCombos[i];
        let s0 = board.squares[ seq[0] ];
        let s1 = board.squares[ seq[1] ];
        let s2 = board.squares[ seq[2] ];

        if(s0 === s1 && s1 === s2 && s2 === token) {
            result = {
                winner: token,
                winningLine: seq,
            }
        }
    }

    if(!result.winner && !openSquares) {
        result = {
            winner: 'draw',
            winningLine: [],
        }
    }

    return result;

};