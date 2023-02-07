import Square from "../Components/Square";
import CreateTempBoard from "./CreateTempBoard";

function SetupFromFEN(
  board,
  setBoard,
  setPlayer,
  wKingState,
  bKingState,
  enPassantTarget,
  nrOfHalfMoves,
  nrOfFullMoves,
  checkmate,
  stalemate,
  wChecked,
  bChecked
) {
  let tempBoard = CreateTempBoard(board);
  //const FEN = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1";
  //const FEN = "8/8/8/4p1K1/2k1P3/8/8/8 b - - 25 9";
  //  const FEN = "8/8/8/4p1K1/2k1P3/8/8/8 b - - 0 1"
  //const FEN = "8/5k2/3p4/1p1Pp2p/pP2Pp1P/P4P1K/8/8 b - - 99 50";
  //const FEN = "rn2n1k1/ppp2ppp/8/2N5/2Pp4/8/PPP2PPP/R1B1R1K1 w - - 1 17";
  //const FEN = "rn5k/ppp2p1p/3n4/2N5/2P5/3p2R1/PPPB1PPP/R5K1 w - - 3 22";
  //const FEN = "rnbbk1nr/pp1p1ppp/2p1p3/8/5PP1/q7/PPPPPKBP/RNB2QNR b kq - 7 6"; //Mate in one with Bishop
  //const FEN = "5bnr/4p1pq/2Q1ppkr/7p/2P4P/8/PP1PPPP1/RNB1KBNR w KQ - 0 10"; //stalemate in one move(Qxe6)
  const FEN = "r1bqkbnr/1ppp1ppp/p1n5/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 0 3" //scholars mate

  let FENarray = FEN.split("");
  let colorDescriptionIndex = null;

  checkmate.current = false;
  stalemate.current = false;
  wChecked.current = false;
  bChecked.current = false;

  //Loop through all the squares of the FEN and update each according square of the tempBoard.
  let currentRow = 0;
  let currentCol = 0;
  for (let i = 0; i <= FENarray.length; i++) {
    if (FENarray[i] === " ") {
      //(Leave out the part that doesn't describe piece placement)
      colorDescriptionIndex = i + 1;
      break;
    }
    let piece = "";
    let nrOfSquaresToFill = 1;
    let pieceColor =
      FENarray[i] === FENarray[i].toUpperCase() ? "white" : "black";

    if (FENarray[i] === "/") {
      currentRow++;
      currentCol = 0;
      continue;
    }

    if (FENarray[i] === "r" || FENarray[i] === "R") {
      piece = "Rook";
    } else if (FENarray[i] === "n" || FENarray[i] === "N") {
      piece = "Knight";
    } else if (FENarray[i] === "b" || FENarray[i] === "B") {
      piece = "Bishop";
    } else if (FENarray[i] === "q" || FENarray[i] === "Q") {
      piece = "Queen";
    } else if (FENarray[i] === "k") {
      piece = "King";
      bKingState.current = {
        ...bKingState.current,
        position: board[currentRow][currentCol].props.index,
        hasKSideCastlingRights: false,
        hasQSideCastlingRights: false,
      };
    } else if (FENarray[i] === "K") {
      piece = "King";
      wKingState.current = {
        ...wKingState.current,
        position: board[currentRow][currentCol].props.index,
        hasKSideCastlingRights: false,
        hasQSideCastlingRights: false,
      };
    } else if (FENarray[i] === "p" || FENarray[i] === "P") {
      piece = "Pawn";
    } else {
      piece = "";
      pieceColor = "";
      nrOfSquaresToFill = parseInt(FENarray[i]);
    }

    //insert the piece or the number of empty squares
    for (let j = 0; j < nrOfSquaresToFill; j++) {
      if (j > 0) {
        currentCol = currentCol + 1;
      }
      // console.log("row: " + currentRow);
      // console.log("col: " + currentCol);
      tempBoard[currentRow][currentCol] = (
        <Square
          key={board[currentRow][currentCol].props.index}
          index={board[currentRow][currentCol].props.index}
          color={board[currentRow][currentCol].props.color}
          pieceType={piece}
          pieceColor={pieceColor}
        />
      );

      // console.log(tempBoard[currentRow][currentCol].props.pieceType);
    }

    currentCol++;
  }
  setBoard(tempBoard);

  if (FENarray[colorDescriptionIndex] === "b") {
    setPlayer("black");
  } else {
    setPlayer("white");
  }

  let castlingDescriptionIndex = colorDescriptionIndex + 2;

  //Update castling rights
  //___________________________________________
  let i = castlingDescriptionIndex;
  let halfMovesIndex;
  let enPassantDescriptionIndex = castlingDescriptionIndex + 2;

  if (FENarray[castlingDescriptionIndex] !== "-") {
    enPassantDescriptionIndex--;
    while (FENarray[i] !== " ") {
      enPassantDescriptionIndex++;
      if (FENarray[i] === "K") {
        wKingState.current = {
          ...wKingState.current,
          hasKSideCastlingRights: true,
        };
      } else if (FENarray[i] === "Q") {
        wKingState.current = {
          ...wKingState.current,
          hasQSideCastlingRights: true,
        };
      } else if (FENarray[i] === "q") {
        bKingState.current = {
          ...bKingState.current,
          hasQSideCastlingRights: true,
        };
      } else if (FENarray[i] === "k") {
        bKingState.current = {
          ...bKingState.current,
          hasKSideCastlingRights: true,
        };
      }
      i++;
    }
  }
  //Update castling rights
  //___________________________________________

  //Update enPassantSquare
  //___________________________________________
  if (FENarray[enPassantDescriptionIndex] === "-") {
    enPassantTarget.current = "";
    halfMovesIndex = enPassantDescriptionIndex + 2;
  } else {
    enPassantTarget.current =
      FENarray[enPassantDescriptionIndex] +
      FENarray[enPassantDescriptionIndex + 1];
    halfMovesIndex = enPassantDescriptionIndex + 3;
  }

  //Update enPassantSquare
  //___________________________________________

  //Update halfMoves
  //___________________________________________
  let fullMovesIndex;
  let ii = 1;
  let tmp = FENarray[halfMovesIndex];
  while (FENarray[halfMovesIndex + ii] !== " ") {
    tmp = tmp + FENarray[halfMovesIndex + ii];
    ii++;
  }
  nrOfHalfMoves.current = tmp;
  fullMovesIndex = halfMovesIndex + ii + 1;

  //Update halfMoves
  //___________________________________________

  //Update FullMoves
  //___________________________________________

  ii = 1;
  let tmp2 = FENarray[fullMovesIndex];
  while (fullMovesIndex + ii !== FENarray.length) {
    tmp2 = tmp2 + FENarray[fullMovesIndex + ii];
    ii++;
  }
  nrOfFullMoves.current = tmp2;

  //Update FullMoves
  //___________________________________________
}

export default SetupFromFEN;
