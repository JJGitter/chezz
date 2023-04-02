import MovePiece from "./MovePiece";
import CreateMoveNotation from "./CreateMoveNotation";


export function handlePieceMove(item, toCell, board, setBoard, wKingState, bKingState, enPassantTarget, player, setPlayer, wChecked, bChecked, lastMove, nrOfHalfMoves, checkmate, boardHistory, setGameOver, nrOfFullMoves, moveHistory) {
  let isCapture = MovePiece(
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
    setGameOver
  );

  if (player === "black") {
    nrOfFullMoves.current++;
  }

  CreateMoveNotation(
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
    checkmate
  );

  setPlayer(player === "white" ? "black" : "white");
}
