/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 const WIDTH = 7;
 const HEIGHT = 6;
 
let currPlayer = 1; // active player: 1 or 2
 let board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));// creates a variable called width and pushes it ot the array for the board
 }
}
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
  const board = document.getElementById('board');
   // TODO: add comment for this code
   const top = document.createElement('tr');// creates a table row called top row
   top.setAttribute('id', 'column-top');// it creates an id for the row we just created and sets it to column-top
   top.addEventListener('click', handleClick); // creates an event listener for top when top row clicked
 
   for (let x = 0; x < WIDTH; x++) { // reads cell and adds clicked attribute
     const headCell = document.createElement('td'); //creates a variable called headCell chich creates table data element
     headCell.setAttribute('id', x); // it says headcell has an id of 'x' 
     top.append(headCell); // appends headcell
   }
   board.append(top); // appends throught the top
 
   // TODO: add comment for this code
   for (let y = 0; y < HEIGHT; y++) { //sets a reader for the height
     const row = document.createElement('tr');// creates a variable called row and sets it to the height variable
     for (let x = 0; x < WIDTH; x++) { // creates another reader for the width variable
       const cell = document.createElement('td'); // creates a new variable called cell and creates a new table data element
       cell.setAttribute('id', `${y}-${x}`); // sets the cells attribute to the size of the board via the x and y variable
       row.append(cell); // appends cells to rows
     }
     board.append(row); // appends row to html board
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) { // sets up reader for spot
    if (!board[y][x]) { 
      return y;
    }
  }
  return null;
}
 
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
  const piece = document.createElement('div'); //creates a div for the piece to be generated into
  piece.classList.add('piece'); //updates the dom classlist to include piece
  piece.classList.add(`p${currPlayer}`); //adds current player to piece
  piece.style.top = -50 * (y + 2); //starts piece at the top

  const spot = document.getElementById(`${y}-${x}`); // creates the spot variable and tells it to look for the x y coordinates
  spot.append(piece); // appends the piece div to the proper spot
}
 
 /** endGame: announce game end */
 
 function endGame(msg) {
 alert(msg);
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   const x = +evt.target.id; // targets the square that is clicked
 
   // get next spot in column (if none, ignore click)
   const y = findSpotForCol(x); //creates the y variable
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   board[y][x] = currPlayer; 
   // TODO: add line to update in-memory board
   placeInTable(y, x); // places in table
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
 if (board.every(row => row.every(cell => cell))){ // checks that every row and every column is full
  return endGame('TIE!!'); // if they're ful declare a tie
 }
   // switch players
   currPlayer = currPlayer ===  1 ? 2 : 1 ; //if current player isn't plaer on its player 2
 } 
 
 /** checkForWin: check board cell-by-cell for 'does a win start here?' */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you.
 
   for (let y = 0; y < HEIGHT; y++) { //reads y as height
     for (let x = 0; x < WIDTH; x++) { //reads x as width
       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //if x or y has 4 in a row in the x row, win
       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // if x or y has 4 in a row in the y column , win
       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];// checks for diagnal win going up
       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // checks for diagnol win going down
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // sets up conditional statement for win
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();
 