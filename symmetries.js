// apply permutation matrix to board
function applyMatrix(board, matrix) {
    let newBoard = [];
    for (let i = 0; i < 36; i++) {
        newBoard.push(board[matrix[i]]);
    }
    return newBoard;
}

// rotate and mirror
const rotate_matrix = [
        30, 24, 18, 12, 6, 0, 
        31, 25, 19, 13, 7, 1, 
        32, 26, 20, 14, 8, 2, 
        33, 27, 21, 15, 9, 3, 
        34, 28, 22, 16, 10, 4, 
        35, 29, 23, 17, 11, 5
        ];
        
const mirror_matrix = [
        5, 4, 3, 2, 1, 0,
        11, 10, 9, 8, 7, 6,
        17, 16, 15, 14, 13, 12,
        23, 22, 21, 20, 19, 18,
        29, 28, 27, 26, 25, 24,
        35, 34, 33, 32, 31, 30
        ];
        
const rotate = board => applyMatrix(board, rotate_matrix);
const mirror = board => applyMatrix(board, mirror_matrix);

// other symmetries
const identity = [];
for (let i = 0; i < 36; i++) {
    identity.push(i);
}
const rot2_matrix = rotate(rotate(identity));
const rot3_matrix = rotate(rotate(rotate(identity)));
const mirrorX_matrix = rotate(mirror(rotate(rotate(rotate(identity)))));
const mirrorSlash_matrix = mirror(rotate(rotate(rotate(identity))));
const mirrorBackslash_matrix = rotate(rotate(rotate(mirror(identity))));

const symmetries = [
    board => applyMatrix(board, identity),
    board => applyMatrix(board, rotate_matrix),
    board => applyMatrix(board, rot2_matrix),
    board => applyMatrix(board, rot3_matrix),
    board => applyMatrix(board, mirror_matrix),
    board => applyMatrix(board, mirrorX_matrix),
    board => applyMatrix(board, mirrorSlash_matrix),
    board => applyMatrix(board, mirrorBackslash_matrix)
];
