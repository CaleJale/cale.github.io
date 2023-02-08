function gridToInt(grid) {
    const rows = {'A': 0, 'B': 6, 'C': 12, 'D': 18, 'E': 24, 'F': 30};
    let num = rows[grid.charAt(0)];
    num += grid.charAt(1) - 1;
    return num;
}

function intToGrid(num) {
    const rowLetters = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F'};
    let row = Math.floor(num/6);
    row = rowLetters[row];
    let column = (num % 6) + 1;
    return row + column;
}

function diceToBoard(dice) {
    let board = [];
    while (board.length < 36) {
        board.push(0);
    }
    
    for (let i = 0; i < 7; i++) {
        let peg = dice.slice(3*i, 3*i+2);
        board[gridToInt(peg)] = 'X';
    }
    return board;
}

function boardToDice(board) {
    let dice = '';
    for (let i = 0; i < 36; i++) {
        if (board[i] === 'X') {
            dice += intToGrid(i) + ' ';
        } 
    }
    return dice.slice(0, 20);
}

function closestSolCount(num) {
    if (num >= 100593) {
        return 100593;
    }
    let i = 0;
    while (true) {
        if (lookup[num+i]) {
            return num+i;
        }
        if (lookup[num-i]) {
            return num-i;
        }
        i++;
    }
}

function validNumToLayout(num) {
    let layoutOptions = lookup[num];
    let numberOfOptions = layoutOptions.length;
    let rand1 = Math.floor(Math.random()*numberOfOptions);
    let layoutChosen = layoutOptions[rand1];
    let rand2 = Math.floor(Math.random()*8);
    let symmetryChosen = symmetries[rand2];
    let board = diceToBoard(layoutChosen);
    let varBoard = symmetryChosen(board);
    return boardToDice(varBoard);
}

function generateLayout() {
    document.getElementById("gennedLayout").innerHTML = 'generating layout...';
    
    let num = Number(document.getElementById("num").value);
    let message;
    
    if (typeof num !== 'number') {
        message = 'enter a number';
    } else if (num <= 0 || !Number.isInteger(num)) {
        message = 'enter a positive integer';
    } else {
        if (lookup[num]) {
            let dice = validNumToLayout(num);
            message = `Board with ${num} solution${num === 1 ? '' : 's'}: ${validNumToLayout(num)}`;
        } else {
            let closestNum = closestSolCount(num);
            let dice = validNumToLayout(closestNum);
            message = `There are no boards with exactly ${num} solutions.`;
            message += `\n The closest is one with ${closestNum}: `;
            message += validNumToLayout(closestNum);
        }
    }
    document.getElementById("gennedLayout").innerHTML = message;
}

