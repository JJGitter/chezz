import React from 'react';
import "../App.css";
import Piece from './Piece';

function Square(squareParams) {
    return (
        <div className={squareParams.color + "Square"}>
             <Piece pieceType={squareParams.pieceType} pieceColor={squareParams.pieceColor}/>
        </div>
    )
}

export default Square