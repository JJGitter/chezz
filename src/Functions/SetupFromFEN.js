import Square from "../Components/Square";

function SetupFromFEN(board, setBoard, setPlayer) {
  let tempBoard = board;
  const FEN = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1";

  //   const FEN = "8/8/8/4p1K1/2k1P3/8/8/8 b - - 0 1"

  let FENarray = FEN.split("");
  let colorDescriptionIndex = null;

  // console.log(FENarray);

  //Loop through all the squares of the FEN. 
  let currentRow = 0;
  let currentCol = 0;
  for (let i = 0; i <= FENarray.length; i++) {
    if(FENarray[i] === " "){
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
    } else if (FENarray[i] === "k" || FENarray[i] === "K") {
      piece = "King";
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

  if(FENarray[colorDescriptionIndex] === "b")
{
    setPlayer("black")
}  else{
    setPlayer("white")
}

//"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1";


}

export default SetupFromFEN;
