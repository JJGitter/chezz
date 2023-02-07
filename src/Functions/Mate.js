import DestinationSquares from "./DestinationSquares";

function anyLegalMoves(player, board, wKingState, bKingState, enPassantTarget) {
  let anyLegalMoves = false;

  let item = { fromCell: "", piece: "", pieceColor: "" };

  //loop through all squares and find if there are destinations for the pieces on them. Skip the King because this piece was already checked
  chunkLoop: for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      if (
        board[i][j].props.pieceColor !== "" &&
        board[i][j].props.pieceType !== "King" &&
        board[i][j].props.pieceColor !== player
      ) {
        item.fromCell = board[i][j].props.index;
        item.piece = board[i][j].props.pieceType;
        item.pieceColor = board[i][j].props.pieceColor;

        if (
          DestinationSquares(
            item,
            board,
            wKingState,
            bKingState,
            enPassantTarget,
            false
          ).length !== 0
        ) {
          anyLegalMoves = true;
          break chunkLoop;
        }
      }
    }
  }

  return anyLegalMoves;
}

function Mate(player, board, wKingState, bKingState, enPassantTarget) {
  //call this function after each move, if king is checked
  let isMate = false;
  if (player === "white") {
    let kingDestinations = DestinationSquares(
      {
        fromCell: bKingState.current.position,
        piece: "King",
        pieceColor: "black",
      },
      board,
      wKingState,
      bKingState
    );
    console.log("king has legal moves? " + kingDestinations);
    if (kingDestinations.length === 0) {
      //if black king has no moves, check if the other pieces have any moves
      isMate = !anyLegalMoves(
        player,
        board,
        wKingState,
        bKingState,
        enPassantTarget
      );
    }
  } else {
    let kingDestinations = DestinationSquares(
      {
        fromCell: wKingState.current.position,
        piece: "King",
        pieceColor: "white",
      },
      board,
      wKingState,
      bKingState
    );
    if (kingDestinations.length === 0) {
      //if white king has no moves, check if the other pieces have any moves
      isMate = !anyLegalMoves(
        player,
        board,
        wKingState,
        bKingState,
        enPassantTarget
      );
    }
  }

  // if (isMate) {
  //   if (player === "black") {
  //     let [kingCol, kingRow] = stringSplit(wKingState.current.position);
  //     board[kingRow][kingCol] = (
  //       <Square
  //         key={wKingState.current.position}
  //         index={wKingState.current.position}
  //         color={board[kingRow][kingCol].props.color}
  //         pieceType="King"
  //         pieceColor="white"
  //         rotate="125deg" //tilt to show that king is mated
  //       />
  //     );
  //   } else {
  //     let [kingCol, kingRow] = stringSplit(bKingState.current.position);
  //     board[kingRow][kingCol] = (
  //       <Square
  //         key={bKingState.current.position}
  //         index={bKingState.current.position}
  //         color={board[kingRow][kingCol].props.color}
  //         pieceType="King"
  //         pieceColor="black"
  //         rotate="125deg" //tilt to show that king is mated
  //       />
  //     );
  //   }
  // }
  return isMate;
}

export default Mate;
