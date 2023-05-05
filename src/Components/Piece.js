import React from "react";
import "../App.css";
import { GiChessKnight } from "react-icons/gi";
import { GiChessPawn } from "react-icons/gi";
import { GiChessRook } from "react-icons/gi";
import { GiChessQueen } from "react-icons/gi";
import { GiChessBishop } from "react-icons/gi";
import { GiChessKing } from "react-icons/gi";
import { handlePieceMove } from "../Functions/handlePieceMove";
import { useContext } from "react";
import { boardContext } from "./Game";
import { userContext } from "../App";

function Piece(pieceProps) {
  const {
    board,
    setBoard,
    player,
    setPlayer,
    wKingState,
    bKingState,
    enPassantTarget,
    wChecked,
    bChecked,
    checkmate,
    lastMove,
    nrOfHalfMoves,
    nrOfFullMoves,
    moveHistory,
    boardHistory,
    setGameOver,
  } = useContext(boardContext);

  const { socket, isOnlinePlay_ref } = useContext(userContext);

  let pieceSize = "80%"; //size relative to the square
  let promotionPieceSize = "40%";
  if (pieceProps.pieceType === "") {
    return null;
  } else if (pieceProps.pieceType === "Pawn") {
    return (
      <GiChessPawn
        style={{ height: pieceSize, width: pieceSize }}
        color={pieceProps.pieceColor}
      />
    );
  } else if (pieceProps.pieceType === "Rook") {
    return (
      <GiChessRook
        style={{ height: pieceSize, width: pieceSize }}
        color={pieceProps.pieceColor}
      />
    );
  } else if (pieceProps.pieceType === "Knight") {
    return (
      <GiChessKnight
        style={{ height: pieceSize, width: pieceSize }}
        color={pieceProps.pieceColor}
      />
    );
  } else if (pieceProps.pieceType === "Bishop") {
    return (
      <GiChessBishop
        style={{ height: pieceSize, width: pieceSize }}
        color={pieceProps.pieceColor}
      />
    );
  } else if (pieceProps.pieceType === "King") {
    return (
      <GiChessKing
        style={{ height: pieceSize, width: pieceSize }}
        color={pieceProps.pieceColor}
      />
    );
  } else if (pieceProps.pieceType === "Promotion") {
    return (
      <>
        <button
          onClick={() => {
            if (isOnlinePlay_ref.current) {
              socket.emit(
                "piece_moved",
                pieceProps.item.fromCell,
                pieceProps.squareIndex,
                pieceProps.item.piece,
                pieceProps.item.pieceColor,
                "Bishop"
              );
            }
            handlePieceMove(
              pieceProps.item,
              pieceProps.squareIndex,
              board,
              setBoard,
              wKingState,
              bKingState,
              enPassantTarget,
              player,
              setPlayer,
              wChecked,
              bChecked,
              lastMove,
              nrOfHalfMoves,
              checkmate,
              boardHistory,
              setGameOver,
              nrOfFullMoves,
              moveHistory,
              "Bishop"
            );
          }}
          style={{
            height: promotionPieceSize,
            width: promotionPieceSize,
            background: "inherit",
            borderWidth: "0",
            cursor: "pointer",
          }}
        >
          <GiChessBishop
            style={{ height: "100%", width: "100%" }}
            color={pieceProps.pieceColor}
          />
        </button>
        <button
          onClick={() => {
            if (isOnlinePlay_ref.current) {
              socket.emit(
                "piece_moved",
                pieceProps.item.fromCell,
                pieceProps.squareIndex,
                pieceProps.item.piece,
                pieceProps.item.pieceColor,
                "Knight"
              );
            }
            handlePieceMove(
              pieceProps.item,
              pieceProps.squareIndex,
              board,
              setBoard,
              wKingState,
              bKingState,
              enPassantTarget,
              player,
              setPlayer,
              wChecked,
              bChecked,
              lastMove,
              nrOfHalfMoves,
              checkmate,
              boardHistory,
              setGameOver,
              nrOfFullMoves,
              moveHistory,
              "Knight"
            );
          }}
          style={{
            height: promotionPieceSize,
            width: promotionPieceSize,
            background: "inherit",
            borderWidth: "0",
            cursor: "pointer",
          }}
        >
          <GiChessKnight
            style={{ height: "100%", width: "100%" }}
            color={pieceProps.pieceColor}
          />
        </button>
        <button
          onClick={() => {
            if (isOnlinePlay_ref.current) {
              socket.emit(
                "piece_moved",
                pieceProps.item.fromCell,
                pieceProps.squareIndex,
                pieceProps.item.piece,
                pieceProps.item.pieceColor,
                "Rook"
              );
            }
            handlePieceMove(
              pieceProps.item,
              pieceProps.squareIndex,
              board,
              setBoard,
              wKingState,
              bKingState,
              enPassantTarget,
              player,
              setPlayer,
              wChecked,
              bChecked,
              lastMove,
              nrOfHalfMoves,
              checkmate,
              boardHistory,
              setGameOver,
              nrOfFullMoves,
              moveHistory,
              "Rook"
            );
          }}
          style={{
            height: promotionPieceSize,
            width: promotionPieceSize,
            background: "inherit",
            borderWidth: "0",
            cursor: "pointer",
          }}
        >
          <GiChessRook
            style={{ height: "100%", width: "100%" }}
            color={pieceProps.pieceColor}
          />
        </button>
        <button
          onClick={() => {
            if (isOnlinePlay_ref.current) {
              socket.emit(
                "piece_moved",
                pieceProps.item.fromCell,
                pieceProps.squareIndex,
                pieceProps.item.piece,
                pieceProps.item.pieceColor,
                "Queen"
              );
            }
            handlePieceMove(
              pieceProps.item,
              pieceProps.squareIndex,
              board,
              setBoard,
              wKingState,
              bKingState,
              enPassantTarget,
              player,
              setPlayer,
              wChecked,
              bChecked,
              lastMove,
              nrOfHalfMoves,
              checkmate,
              boardHistory,
              setGameOver,
              nrOfFullMoves,
              moveHistory,
              "Queen"
            );
          }}
          style={{
            height: promotionPieceSize,
            width: promotionPieceSize,
            background: "inherit",
            borderWidth: "0",
            cursor: "pointer",
          }}
        >
          <GiChessQueen
            style={{ height: "100%", width: "100%" }}
            color={pieceProps.pieceColor}
          />
        </button>
      </>
    );
  } else {
    return (
      <GiChessQueen
        style={{ height: pieceSize, width: pieceSize }}
        color={pieceProps.pieceColor}
      />
    );
  }
}

export default Piece;
