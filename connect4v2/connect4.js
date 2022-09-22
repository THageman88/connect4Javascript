class Game { //creates a class named game
  constructor(p1, p2 , height = 6, width = 7 ){ // these are the elements to be constructed in the game
    this.players = [p1 , p2]; //the game has two players
    this.height = height; // sets height variable to height
      this.width = width ;// sets width variable to width
      this.currPlayer = p1; // sets  current player to one so it starts with player1
      this.makeHtmlBoard();//creates the makeHTMLBoardVariable
      this.makeBoard();// creates the makeBOard variable
      this.gameOver= false; // sets game over var to false since the game is just starting
}

  makeBoard() { // creates make board function
    this.board = []; //sets board to empty variable
  for (let y = 0; y < this.height; y++) { // creates a reader to loop to read board and add y boxes high
    this.board.push(Array.from({ length: this.width })); // pushes length and width to the board array
  }
}


 makeHtmlBoard() {
  const board = document.getElementById('board'); //variable board
  board.innerHTML =''; 
  // make column tops (clickable area for adding a piece to that column)
  const top = document.createElement('tr'); // creates a row for the top
  top.setAttribute('id', 'column-top'); // sets id to column top
  
  this.handleGameClick = this.handleClick.bind(this); // binds click events so we can use them in multipkle places instead of one
  top.addEventListener('click', this.handleGameClick); 

  for (let x = 0; x < this.width; x++) { // tells it to create x amount of td for x
    const headCell = document.createElement('td'); // creates the td
    headCell.setAttribute('id', x); // sets its attributes to x
    top.append(headCell); // appends the headcell
  }

  board.append(top); // to the top

  // make main part of board
  for (let y = 0; y < this.height; y++) { //tells it to  creates the y amount of tr
    const row = document.createElement('tr');// creaates the actual tr

    for (let x = 0; x < this.width; x++) { 
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }

    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

 findSpotForCol(x) { //finds the spot that pieces fall
  for (let y = this.height - 1; y >= 0; y--) { // tells it not to let pieces go abouve y high
    if (!this.board[y][x]) {
      return y;
    }
  } 
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

 placeInTable(y, x) {
  const piece = document.createElement('div'); //creates a div to create the piece
  piece.classList.add('piece'); // creates a class called piece
  piece.style.top = -50 * (y + 2); // rounds the piece
  piece.style.backgroundColor = this.currPlayer.color; //sets it to players selected color

  const spot = document.getElementById(`${y}-${x}`); // sets the pieces spot
  spot.append(piece); // appends the piece to the spot
}

/** endGame: announce game end */

 endGame(msg) { // end game message
  alert(msg); // uses alert function to push message
  const top = document.getElementById(column-top); // selects the column top
  top.removeEventListener("click", this.handleGameClick);// removes the ability to click and add more pieces
}

/** handleClick: handle click of column top to play piece */

 handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id; // column for piece to go into

  // get next spot in column (if none, ignore click)
  const y = this.findSpotForCol(x); // look to see if theres a spot free
  if (y === null) { // if none free then ignore
    return;
  }

  // place piece in board and add to HTML table
  this.board[y][x] = this.currPlayer; // current player is the current piece ammending to board
  this.placeInTable(y, x); // place in coordinates
  
  // check for win
  if (this.checkForWin()) { //if check for win is run
    return this.endGame(`Player ${this.currPlayer.color} won!`); // declare player victorious
  }
  
  // check for tie
  if (this.board.every(row => row.every(cell => cell))) { // Checks to see if all rows are taken, if so then tie
    return this.endGame('Tie!');
  }
    
  // switch players
  this.currPlayer = this.currPlayer === this.players[0] ? this.players[1]: this.players[0];
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

checkForWin() {
  const _win = cells => // sets up win check function
  cells.every( // looks at every cell
    ([y, x]) => // look at all cells x(width) and y(height)
      y >= 0 && 
      y < this.height &&
      x >= 0 &&
      x < this.width &&
      this.board[y][x] === this.currPlayer // matches the board to the currentplay played pieces
  );
  

  for (let y = 0; y < this.height; y++) { 
    for (let x = 0; x < this.width; x++) {
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // checks horizontally
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // checks vertically
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //checks diagnally right
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // check diagnally left
    
      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}
}

class Player { // creates the players
  constructor(color) { // says theres a color constructor
    this.color = color; // creates the color variable
  }
}

document.getElementById('start-game').addEventListener('click', () => { //sets up the start game function
  let p1 = new Player(document.getElementById('p1-color').value); // retrieves the players color option
  let p2 = new Player(document.getElementById('p2-color').value); // retrieves the players color option
  new Game(p1, p2); // starts the game
});

