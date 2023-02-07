import DestinationSquares from "./DestinationSquares";
import { stringSplit } from "./MovePiece";

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
  let destinations = DestinationSquares(
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
      board[row][col].props.index === movedItem.fromCell    //don't count the square that our piece just moved from
    );
  });

  return multiplePiecesCanReach;
}

function CreateMoveNotation(
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
  checkmate
) {
  //Create an array of arrays containing all the moves of a game. [[d4, d5],[Nf3, Nf6]]
  //Use useEffect so that this function fires after board is updated after a move.

  let move = "";

  if (movedItem.piece === "Knight") {
    move = "N";
  }else if(movedItem.piece === "Rook"){
    move = "R";
  } else if(movedItem.piece === "Bishop"){
    move = "B";
  }else if(movedItem.piece === "Queen"){
    move = "Q";
  }else if(movedItem.piece === "King"){
    move = "K";
  }

  const [fromCol] = movedItem.fromCell.split("");

  if (
    movedItem.piece !== "Pawn" &&
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
  } else if (movedItem.piece === "Pawn" && isCapture) {
    //Add the starting column if a the move is a pawn capture
    move = move + fromCol;
  }

  if (isCapture) {
    move = move + "x";
  }

  move = move + toSquare;

  const [, toRow] = toSquare.split("");
  if (movedItem.piece === "Pawn" && (toRow === "1" || toRow === "8")) {
    //if pawn promotion
    move = move + "=Q";
  }
  if (checkmate.current) {
    move = move + "#";
  } else if (wChecked.current || bChecked.current) {
    move = move + "+";
  }

  console.log(move);
  //   moveHistory.current = moveHistory.current.push(move);

  return moveHistory.current;
}

export default CreateMoveNotation;
