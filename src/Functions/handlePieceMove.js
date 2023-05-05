import movePiece from "./movePiece";
import createMoveNotation from "./createMoveNotation";


export function handlePieceMove(item, toCell, board, setBoard, wKingState, bKingState, enPassantTarget, player, setPlayer, wChecked, bChecked, lastMove, nrOfHalfMoves, checkmate, boardHistory, setGameOver, nrOfFullMoves, moveHistory, promotionPiece) {
  
  let isCapture = movePiece(
    board,
    setBoard,
    item.piece,
    item.pieceColor,
    item.fromCell,
    toCell,
    wKingState,
    bKingState,
    enPassantTarget,
    player,
    wChecked,
    bChecked,
    lastMove,
    nrOfHalfMoves,
    checkmate,
    boardHistory,
    setGameOver,
    promotionPiece
  );

  if (player === "black") {
    nrOfFullMoves.current++;
  }

  createMoveNotation(
    board,
    item,
    isCapture,
    wChecked,
    bChecked,
    toCell,
    wKingState,
    bKingState,
    enPassantTarget,
    moveHistory,
    checkmate,
    promotionPiece
  );

  setPlayer(player === "white" ? "black" : "white");
}
