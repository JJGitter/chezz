import { stringSplit } from "./MovePiece";
import UnderEnemyControl from "./UnderEnemyControl";

export function stringMerge(columnidx, rowidx) {
  //This function will merge two strings to make a square id string. (1 and 1 will become "b7")

  const columnLetter = String.fromCharCode(columnidx + 97); //Translate columnidx from digit to letter
  const row = 8 - rowidx; //Translate row because the array counts the top row of the board as row 0

  const squareID = columnLetter + row;

  return squareID;
}

function DestinationSquares(
  movedItem,
  board,
  wKingState,
  bKingState,
  enPassantTarget,
  checkingEnemyControl
) {
  //This function return an array of possible drop squares. ["c4","d6","f7"]
  //It will exclude squares that are already occupied by pieces of your color

  let destinations = [];
  const [startColumn, startRow] = stringSplit(movedItem.fromCell);

  //KNIGHT
  //_________________________________________________________________________
  //_________________________________________________________________________
  if (movedItem.piece === "Knight") {
    if (startColumn + 2 <= 7 && startRow + 1 <= 7) {
      destinations.push(stringMerge(startColumn + 2, startRow + 1));
    }
    if (startColumn + 2 <= 7 && startRow - 1 >= 0) {
      destinations.push(stringMerge(startColumn + 2, startRow - 1));
    }
    if (startColumn + 1 <= 7 && startRow + 2 <= 7) {
      destinations.push(stringMerge(startColumn + 1, startRow + 2));
    }
    if (startColumn - 1 >= 0 && startRow + 2 <= 7) {
      destinations.push(stringMerge(startColumn - 1, startRow + 2));
    }
    if (startColumn - 2 >= 0 && startRow + 1 <= 7) {
      destinations.push(stringMerge(startColumn - 2, startRow + 1));
    }
    if (startColumn - 2 >= 0 && startRow - 1 >= 0) {
      destinations.push(stringMerge(startColumn - 2, startRow - 1));
    }
    if (startColumn + 1 <= 7 && startRow - 2 >= 0) {
      destinations.push(stringMerge(startColumn + 1, startRow - 2));
    }
    if (startColumn - 1 >= 0 && startRow - 2 >= 0) {
      destinations.push(stringMerge(startColumn - 1, startRow - 2));
    }
  }
  //KNIGHT
  //_________________________________________________________________________
  //_________________________________________________________________________

  //PAWN (WHITE)
  //_________________________________________________________________________
  //_________________________________________________________________________
  else if (movedItem.piece === "Pawn" && movedItem.pieceColor === "white") {
    //TODO:  The pawn also needs to consider enPassant. (Needs access to board history)
    //TODO:  The pawn also needs to consider promotion.
    if (board[startRow - 1][startColumn].props.pieceType === "") {
      destinations.push(stringMerge(startColumn, startRow - 1));
      if (
        startRow === 6 &&
        board[startRow - 2][startColumn].props.pieceType === ""
      ) {
        destinations.push(stringMerge(startColumn, startRow - 2));
      }
    }

    //Pawn Captures
    //__________________________________________________________________________
    if (
      startColumn - 1 >= 0 &&
      board[startRow - 1][startColumn - 1].props.pieceType !== "" &&
      board[startRow - 1][startColumn - 1].props.pieceColor === "black"
    ) {
      destinations.push(stringMerge(startColumn - 1, startRow - 1));
    }
    if (
      startColumn + 1 <= 7 &&
      board[startRow - 1][startColumn + 1].props.pieceType !== "" &&
      board[startRow - 1][startColumn + 1].props.pieceColor === "black"
    ) {
      destinations.push(stringMerge(startColumn + 1, startRow - 1));
    }
    //Pawn Captures
    //___________________________________________________________________________

    //enPassant
    //__________________________________________________________________________
    if (stringMerge(startColumn - 1, startRow - 1) === enPassantTarget) {
      destinations.push(enPassantTarget);
    } else if (stringMerge(startColumn + 1, startRow - 1) === enPassantTarget) {
      destinations.push(enPassantTarget);
    }

    //enPassant
    //__________________________________________________________________________
  }
  //PAWN (WHITE)
  //_________________________________________________________________________
  //_________________________________________________________________________

  //PAWN (BLACK)
  //_________________________________________________________________________
  //_________________________________________________________________________
  else if (movedItem.piece === "Pawn" && movedItem.pieceColor === "black") {
    //TODO:  The pawn also needs to consider enPassant. (Needs access to board history)
    //TODO:  The pawn also needs to consider promotion.
    if (board[startRow + 1][startColumn].props.pieceType === "") {
      destinations.push(stringMerge(startColumn, startRow + 1));
      if (
        startRow === 1 &&
        board[startRow + 2][startColumn].props.pieceType === ""
      ) {
        destinations.push(stringMerge(startColumn, startRow + 2));
      }
    }

    //Pawn Captures
    //__________________________________________________________________________
    if (
      startColumn - 1 >= 0 &&
      board[startRow + 1][startColumn - 1].props.pieceType !== "" &&
      board[startRow + 1][startColumn - 1].props.pieceColor === "white"
    ) {
      destinations.push(stringMerge(startColumn - 1, startRow + 1));
    }
    if (
      startColumn + 1 <= 7 &&
      board[startRow + 1][startColumn + 1].props.pieceType !== "" &&
      board[startRow + 1][startColumn + 1].props.pieceColor === "white"
    ) {
      destinations.push(stringMerge(startColumn + 1, startRow + 1));
    }
    //Pawn Captures
    //___________________________________________________________________________
  }
  //PAWN (BLACK)
  //_________________________________________________________________________
  //_________________________________________________________________________

  //ROOK
  //_________________________________________________________________________
  //_________________________________________________________________________
  else if (movedItem.piece === "Rook") {
    let col = startColumn;
    let row = startRow;
    while (row > 0) {
      row--;
      //If there is a piece in the way, stop adding destinations.
      if (board[row][col].props.pieceType !== "") {
        destinations.push(stringMerge(col, row));
        break;
      }
      destinations.push(stringMerge(col, row));
    }
    row = startRow;
    while (row < 7) {
      row++;
      if (board[row][col].props.pieceType !== "") {
        destinations.push(stringMerge(col, row));
        break;
      }
      destinations.push(stringMerge(col, row));
    }
    row = startRow;
    while (col < 7) {
      col++;
      if (board[row][col].props.pieceType !== "") {
        destinations.push(stringMerge(col, row));
        break;
      }
      destinations.push(stringMerge(col, row));
    }
    col = startColumn;
    while (col > 0) {
      col--;
      if (board[row][col].props.pieceType !== "") {
        destinations.push(stringMerge(col, row));
        break;
      }
      destinations.push(stringMerge(col, row));
    }
  }
  //ROOK
  //_________________________________________________________________________
  //_________________________________________________________________________

  //BISHOP
  //_________________________________________________________________________
  //_________________________________________________________________________
  else if (movedItem.piece === "Bishop") {
    let col = startColumn;
    let row = startRow;
    while (row > 0 && col > 0) {
      row--;
      col--;
      if (board[row][col].props.pieceType !== "") {
        destinations.push(stringMerge(col, row));
        break;
      }
      destinations.push(stringMerge(col, row));
    }
    col = startColumn;
    row = startRow;
    while (row > 0 && col < 7) {
      row--;
      col++;
      if (board[row][col].props.pieceType !== "") {
        destinations.push(stringMerge(col, row));
        break;
      }
      destinations.push(stringMerge(col, row));
    }
    col = startColumn;
    row = startRow;
    while (row < 7 && col < 7) {
      row++;
      col++;
      if (board[row][col].props.pieceType !== "") {
        destinations.push(stringMerge(col, row));
        break;
      }
      destinations.push(stringMerge(col, row));
    }
    col = startColumn;
    row = startRow;
    while (row < 7 && col > 0) {
      row++;
      col--;
      if (board[row][col].props.pieceType !== "") {
        destinations.push(stringMerge(col, row));
        break;
      }
      destinations.push(stringMerge(col, row));
    }
  }
  //BISHOP
  //_________________________________________________________________________
  //_________________________________________________________________________

  //QUEEN
  //_________________________________________________________________________
  //_________________________________________________________________________
  else if (movedItem.piece === "Queen") {
    let col = startColumn;
    let row = startRow;
    while (row > 0 && col > 0) {
      row--;
      col--;
      if (board[row][col].props.pieceType !== "") {
        destinations.push(stringMerge(col, row));
        break;
      }
      destinations.push(stringMerge(col, row));
    }
    col = startColumn;
    row = startRow;
    while (row > 0 && col < 7) {
      row--;
      col++;
      if (board[row][col].props.pieceType !== "") {
        destinations.push(stringMerge(col, row));
        break;
      }
      destinations.push(stringMerge(col, row));
    }
    col = startColumn;
    row = startRow;
    while (row < 7 && col < 7) {
      row++;
      col++;
      if (board[row][col].props.pieceType !== "") {
        destinations.push(stringMerge(col, row));
        break;
      }
      destinations.push(stringMerge(col, row));
    }
    col = startColumn;
    row = startRow;
    while (row < 7 && col > 0) {
      row++;
      col--;
      if (board[row][col].props.pieceType !== "") {
        destinations.push(stringMerge(col, row));
        break;
      }
      destinations.push(stringMerge(col, row));
    }
    col = startColumn;
    row = startRow;
    while (row > 0) {
      row--;
      //If there is a piece in the way, stop adding destinations.
      if (board[row][col].props.pieceType !== "") {
        destinations.push(stringMerge(col, row));
        break;
      }
      destinations.push(stringMerge(col, row));
    }
    row = startRow;
    while (row < 7) {
      row++;
      if (board[row][col].props.pieceType !== "") {
        destinations.push(stringMerge(col, row));
        break;
      }
      destinations.push(stringMerge(col, row));
    }
    row = startRow;
    while (col < 7) {
      col++;
      if (board[row][col].props.pieceType !== "") {
        destinations.push(stringMerge(col, row));
        break;
      }
      destinations.push(stringMerge(col, row));
    }
    col = startColumn;
    while (col > 0) {
      col--;
      if (board[row][col].props.pieceType !== "") {
        destinations.push(stringMerge(col, row));
        break;
      }
      destinations.push(stringMerge(col, row));
    }
  }
  //QUEEN
  //_________________________________________________________________________
  //_________________________________________________________________________

  //KING
  //_________________________________________________________________________
  //_________________________________________________________________________
  else if (movedItem.piece === "King") {
    //TODO: The king also needs to consider if the square is under control by enemy piece
    if (startColumn + 1 <= 7) {
      destinations.push(stringMerge(startColumn + 1, startRow));
    }
    if (startColumn - 1 >= 0) {
      destinations.push(stringMerge(startColumn - 1, startRow));
    }
    if (startRow + 1 <= 7) {
      destinations.push(stringMerge(startColumn, startRow + 1));
    }
    if (startRow - 1 >= 0) {
      destinations.push(stringMerge(startColumn, startRow - 1));
    }

    if (startRow - 1 >= 0 && startColumn - 1 >= 0) {
      destinations.push(stringMerge(startColumn - 1, startRow - 1));
    }
    if (startRow + 1 <= 7 && startColumn + 1 <= 7) {
      destinations.push(stringMerge(startColumn + 1, startRow + 1));
    }
    if (startRow + 1 <= 7 && startColumn - 1 >= 0) {
      destinations.push(stringMerge(startColumn - 1, startRow + 1));
    }
    if (startRow - 1 >= 0 && startColumn + 1 <= 7) {
      destinations.push(stringMerge(startColumn + 1, startRow - 1));
    }

    if (!checkingEnemyControl) {
      //Add castling destinations and remove destinations that are target by the enemy
      if (movedItem.pieceColor === "white") {
        let enemyControlled = UnderEnemyControl(board, "white");
        if (
          wKingState.hasKSideCastlingRights &&
          !enemyControlled.includes("f1") &&
          !enemyControlled.includes("g1") &&
          !wKingState.isChecked &&
          board[7][5].props.pieceType === "" &&
          board[7][6].props.pieceType === ""
        ) {
          //white kingside
          destinations.push("g1");
        }
        if (
          wKingState.hasQSideCastlingRights &&
          !enemyControlled.includes("c1") &&
          !enemyControlled.includes("d1") &&
          !wKingState.isChecked &&
          board[7][1].props.pieceType === "" &&
          board[7][2].props.pieceType === "" &&
          board[7][3].props.pieceType === ""
        ) {
          //white queenside
          destinations.push("c1");
        }
        //remove the white king destinations that are controlled by enemy pieces
        //___________________________
        //___________________________
        destinations = destinations.filter(
          (dest) => !enemyControlled.includes(dest)
        );
        //remove the white king destinations that are controlled by enemy pieces
        //___________________________
        //___________________________
      }

      if (movedItem.pieceColor === "black") {
        let enemyControlled = UnderEnemyControl(board, "black");
        if (
          bKingState.hasKSideCastlingRights &&
          !enemyControlled.includes("f8") &&
          !enemyControlled.includes("g8") &&
          !bKingState.isChecked &&
          board[0][5].props.pieceType === "" &&
          board[0][6].props.pieceType === ""
        ) {
          //black kingside
          destinations.push("g8");
        }
        if (
          bKingState.hasQSideCastlingRights &&
          !enemyControlled.includes("c8") &&
          !enemyControlled.includes("d8") &&
          !bKingState.isChecked &&
          board[0][1].props.pieceType === "" &&
          board[0][2].props.pieceType === "" &&
          board[0][3].props.pieceType === ""
        ) {
          //black queenside
          destinations.push("c8");
        }
        //remove the black king destinations that are controlled by enemy pieces
        //___________________________
        //___________________________
        destinations = destinations.filter(
          (dest) => !enemyControlled.includes(dest)
        );
        //remove the black king destinations that are controlled by enemy pieces
        //___________________________
        //___________________________
      }
    }
  }
  //KING
  //_________________________________________________________________________
  //_________________________________________________________________________

  //if not fetching the enemy control squares (i.e, fetching the destinations of movement)
  //remove the destination IDs that are occupied by your own pieces
  if (!checkingEnemyControl) {
    let occupiedSquares = [];
    for (let i = 0; i < destinations.length; i++) {
      let [col, row] = stringSplit(destinations[i]);
      if (board[row][col].props.pieceColor === movedItem.pieceColor) {
        occupiedSquares.push(destinations[i]);
      }
    }
    destinations = destinations.filter(
      (dest) => !occupiedSquares.includes(dest)
    );
  }
  return destinations;
}

export default DestinationSquares;
