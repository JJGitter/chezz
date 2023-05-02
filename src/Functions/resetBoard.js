import setupFromFEN from "./setupFromFEN";

function resetBoard(selectedFEN, board, setBoard, setPlayer, wKingState, bKingState, enPassantTarget, nrOfHalfMoves, nrOfFullMoves, checkmate, wChecked, bChecked, moveHistory, boardHistory, setGameOver, userColor_ref, beforeFirstMove_ref, setflippedBoard, isOnlinePlay_ref) {
    setupFromFEN(
      selectedFEN,
      board,
      setBoard,
      setPlayer,
      wKingState,
      bKingState,
      enPassantTarget,
      nrOfHalfMoves,
      nrOfFullMoves,
      checkmate,
      wChecked,
      bChecked,
      moveHistory,
      boardHistory
    );
    setGameOver({ scenario: "", isOver: false });
    if (userColor_ref.current === "white") {
      userColor_ref.current = "black";
    } else {
      userColor_ref.current = "white";
    }
    beforeFirstMove_ref.current = true;
    setflippedBoard(userColor_ref.current === "black" && isOnlinePlay_ref.current ? true : false);
  }

export default resetBoard;
