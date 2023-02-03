function CreateFEN(
  board,
  player,
  wKingState,
  bKingState,
  enPassantTarget,
  nrOfHalfMoves,
  nrOfFullMoves
) {
  "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1";
  let FEN = "";

  //Loop through each row and each column of the board
  let nrOfEmptySquares = 0;
  for (let row = 0; row <= 7; row++) {
    for (let col = 0; col <= 7; col++) {
      if (board[row][col].props.pieceType === "") {
        nrOfEmptySquares++;
        if (col === 7 || board[row][col + 1].props.pieceType !== "") {
          FEN = FEN + nrOfEmptySquares.toString();
          nrOfEmptySquares = 0;
        }
      } else if (board[row][col].props.pieceType === "Pawn") {
        board[row][col].props.pieceColor === "white"
          ? (FEN = FEN + "P")
          : (FEN = FEN + "p");
      } else if (board[row][col].props.pieceType === "Rook") {
        board[row][col].props.pieceColor === "white"
          ? (FEN = FEN + "R")
          : (FEN = FEN + "r");
      } else if (board[row][col].props.pieceType === "Knight") {
        board[row][col].props.pieceColor === "white"
          ? (FEN = FEN + "N")
          : (FEN = FEN + "n");
      } else if (board[row][col].props.pieceType === "Bishop") {
        board[row][col].props.pieceColor === "white"
          ? (FEN = FEN + "B")
          : (FEN = FEN + "b");
      } else if (board[row][col].props.pieceType === "Queen") {
        board[row][col].props.pieceColor === "white"
          ? (FEN = FEN + "Q")
          : (FEN = FEN + "q");
      } else {
        board[row][col].props.pieceColor === "white"
          ? (FEN = FEN + "K")
          : (FEN = FEN + "k");
      }
    }
    if (row !== 7) {
      FEN = FEN + "/";
    }
  }

  if (player === "white") {
    FEN = FEN + " w ";
  } else {
    FEN = FEN + " b ";
  }

  if (
    !wKingState.current.hasKSideCastlingRights &&
    !wKingState.current.hasQSideCastlingRights &&
    !bKingState.current.hasKSideCastlingRights &&
    !bKingState.current.hasQSideCastlingRights
  ) {
    FEN = FEN + "-";
  } else {
    if (wKingState.current.hasKSideCastlingRights) {
      FEN = FEN + "K";
    }
    if (wKingState.current.hasQSideCastlingRights) {
      FEN = FEN + "Q";
    }
    if (bKingState.current.hasKSideCastlingRights) {
      FEN = FEN + "k";
    }
    if (bKingState.current.hasQSideCastlingRights) {
      FEN = FEN + "q";
    }
  }

  if (enPassantTarget.current !== "") {
    FEN = FEN + " " + enPassantTarget.current + " ";
  } else {
    FEN = FEN + " - ";
  }

  FEN = FEN + nrOfHalfMoves.current + " ";

  FEN = FEN + nrOfFullMoves.current;

  return FEN;
}

export default CreateFEN;
