import Square from "../Components/Square";
import CreateTempBoard from "./CreateTempBoard";

function SetupFromFEN(
  board,
  setBoard,
  setPlayer,
  wKingState,
  bKingState,
  enPassantTarget
) {
  let tempBoard = CreateTempBoard(board);
  // const FEN = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1";
  const FEN = "8/8/8/4p1K1/2k1P3/8/8/8 b - - 0 1";
  //  const FEN = "8/8/8/4p1K1/2k1P3/8/8/8 b - - 0 1"

  let FENarray = FEN.split("");
  let colorDescriptionIndex = null;

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
      console.log("row: " + currentRow);
      console.log("col: " + currentCol);
      tempBoard[currentRow][currentCol] = (
        <Square
          key={board[currentRow][currentCol].props.index}
          index={board[currentRow][currentCol].props.index}
          color={board[currentRow][currentCol].props.color}
          pieceType={piece}
          pieceColor={pieceColor}
        />
      );

      console.log(tempBoard[currentRow][currentCol].props.pieceType);
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
  if (FENarray[castlingDescriptionIndex] !== "-") {
    while (FENarray[i] !== " ") {
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
    //Update castling rights
    //___________________________________________

    //Update enPassantSquare
    //___________________________________________
    let enPassantDescriptionIndex = i + 1;
    if (FENarray[enPassantDescriptionIndex] === "-") {
      enPassantTarget.current = "";
    } else {
      enPassantTarget.current =
        FENarray[enPassantDescriptionIndex] +
        FENarray[enPassantDescriptionIndex + 1];
    }

    //Update enPassantSquare
    //___________________________________________
  }
}

export default SetupFromFEN;
