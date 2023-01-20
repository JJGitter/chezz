import DestinationSquares from "./DestinationSquares";
import { stringMerge } from "./DestinationSquares";

function UnderEnemyControl(board, player) {
  //This function returns an array of the squares that are targets by enemy pieces (enemy is the opposer to player).
  //It is useful to determine if castling is legal and to determine checkmate and stalemate.
  //Squares that are targeted several times will also appear several times in the array.
  let controlledSquares = [];
  let item = { fromCell: "", piece: "", pieceColor: "" };
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      if (
        board[i][j].props.pieceColor !== "" &&
        board[i][j].props.pieceType !== "Pawn" &&
        board[i][j].props.pieceColor !== player
      ) {
        //Add destination squares from all pieces except for pawns
        item.fromCell = board[i][j].props.index;
        item.piece = board[i][j].props.pieceType;
        item.pieceColor = board[i][j].props.pieceColor;
        controlledSquares.push(
          ...DestinationSquares(item, board, null, null, null, true)
        );
      }
      if (
        board[i][j].props.pieceType === "Pawn" &&
        board[i][j].props.pieceColor !== player &&
        board[i][j].props.pieceColor === "white"
      ) {
        //add target squares of opposite color (white) pawns
        if (j - 1 >= 0) {
          controlledSquares.push(stringMerge(j - 1, i - 1));
        }
        if (j + 1 <= 7) {
          controlledSquares.push(stringMerge(j + 1, i - 1));
        }
      } else if (
        board[i][j].props.pieceType === "Pawn" &&
        board[i][j].props.pieceColor !== player &&
        board[i][j].props.pieceColor === "black"
      ) {
        //add target squares of opposite color (black) pawns
        if (j - 1 >= 0) {
          controlledSquares.push(stringMerge(j - 1, i + 1));
        }
        if (j + 1 <= 7) {
          controlledSquares.push(stringMerge(j + 1, i + 1));
        }
      }
    }
  }

  return controlledSquares;
}

export default UnderEnemyControl;
