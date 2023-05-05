import destinationSquares from "./destinationSquares";
import { stringSplit } from "./movePiece";

function canMultiplePiecesReachThisSquare(
  board,
  movedItem,
  toSquare,
  wKingState,
  bKingState,
  enPassantTarget
) {
  let multiplePiecesCanReach;

  //Find the destination squares of the piece that was just moved. Check with "checkingEnemyControl" so that it includes squares occupied by your own pieces.
  let destinations = destinationSquares(
    {
      fromCell: toSquare, //i.e. "c5"
      piece: movedItem.piece, //i.e. "Knight"
      pieceColor: movedItem.pieceColor,
    },
    board,
    wKingState,
    bKingState,
    enPassantTarget,
    true
  );

  //if none of the destinations from the "toSquare" include a piece of the same type and color as movePiece, set multiplePiecesCanReach to false
  multiplePiecesCanReach = !destinations.every((dest) => {
    let [col, row] = stringSplit(dest);
    return (
      board[row][col].props.pieceType !== movedItem.piece ||
      board[row][col].props.pieceColor !== movedItem.pieceColor ||
      board[row][col].props.index === movedItem.fromCell //don't count the square that our piece just moved from
    );
  });

  return multiplePiecesCanReach;
}

function createMoveNotation(
  board,
  movedItem,
  isCapture,
  wChecked,
  bChecked,
  toSquare,
  wKingState,
  bKingState,
  enPassantTarget,
  moveHistory,
  checkmate,
  promotionPiece
) {
  //Create an array containing all the moves of the game.

  let move = "";
  let [fromColIndex] = stringSplit(movedItem.fromCell);
  let [toColIndex] = stringSplit(toSquare);

  if (movedItem.piece === "Knight") {
    move = "N";
  } else if (movedItem.piece === "Rook") {
    move = "R";
  } else if (movedItem.piece === "Bishop") {
    move = "B";
  } else if (movedItem.piece === "Queen") {
    move = "Q";
  } else if (movedItem.piece === "King") {
    move = "K";
  }

  const [fromCol] = movedItem.fromCell.split("");

  if (
    movedItem.piece !== "Pawn" &&
    movedItem.piece !== "King" &&
    canMultiplePiecesReachThisSquare(
      board,
      movedItem,
      toSquare,
      wKingState,
      bKingState,
      enPassantTarget
    )
  ) {
    //Add the starting column if there are multiple pieces of the same type that can reach the destination (not applied for pawns)
    move = move + fromCol;
  } else if (movedItem.piece === "Pawn" && toColIndex - fromColIndex !== 0) {
    //Add the starting column if a the move is a pawn capture (or enPassant).
    move = move + fromCol + "x";
  }

  if (isCapture && movedItem.piece !== "Pawn") {
    move = move + "x";
  }

  move = move + toSquare;

  //Handle castles
  //_______________

  if (movedItem.piece === "King") {
    if (toColIndex - fromColIndex === 2) {
      move = "O-O";
    } else if (toColIndex - fromColIndex === -2) {
      move = "O-O-O";
    }
  }
  //Handle castles
  //_______________

  const [, toRow] = toSquare.split("");
  if (movedItem.piece === "Pawn" && (toRow === "1" || toRow === "8")) {
    //if pawn promotion
    let promotionChar = "";
    switch (promotionPiece) {
      case "Bishop":
        promotionChar = "B";
        break;
      case "Knight":
        promotionChar = "N";
        break;
      case "Rook":
        promotionChar = "R";
        break;
      default:
        promotionChar = "Q";
    }
    move = move + "=" + promotionChar;
  }
  if (checkmate.current) {
    move = move + "#";
  } else if (wChecked.current || bChecked.current) {
    move = move + "+";
  }
  moveHistory.current.push(move);

  return moveHistory.current;
}

export default createMoveNotation;
