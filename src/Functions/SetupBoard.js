import React from 'react';
import Square from '../Components/Square';

function SetupBoard() {

    const row8 = [
        <Square key="a8" index="a8"  color="Light" pieceType="Rook" pieceColor="black" />,
        <Square key="b8" index="b8" color="Dark" pieceType="Knight" pieceColor="black" />,
        <Square key="c8" index="c8" color="Light" pieceType="Bishop" pieceColor="black" />,
        <Square key="d8" index="d8" color="Dark" pieceType="Queen" pieceColor="black" />,
        <Square key="e8" index="e8" color="Light" pieceType="King" pieceColor="black" />,
        <Square key="f8" index="f8" color="Dark" pieceType="Bishop" pieceColor="black" />,
        <Square key="g8" index="g8" color="Light" pieceType="Knight" pieceColor="black" />,
        <Square key="h8" index="h8" color="Dark" pieceType="Rook" pieceColor="black" />,
      ];
      const row7 = [
        <Square key="a7" index="a7" color="Dark" pieceType="Pawn" pieceColor="black" />,
        <Square key="b7" index="b7" color="Light" pieceType="Pawn" pieceColor="black" />,
        <Square key="c7" index="c7" color="Dark" pieceType="Pawn" pieceColor="black" />,
        <Square key="d7" index="d7" color="Light" pieceType="Pawn" pieceColor="black" />,
        <Square key="e7" index="e7" color="Dark" pieceType="Pawn" pieceColor="black" />,
        <Square key="f7" index="f7" color="Light" pieceType="Pawn" pieceColor="black" />,
        <Square key="g7" index="g7" color="Dark" pieceType="Pawn" pieceColor="black" />,
        <Square key="h7" index="h7" color="Light" pieceType="Pawn" pieceColor="black" />,
      ];
      const row6 = [
        <Square key="a6" index="a6" color="Light" pieceType="" pieceColor="" />,
        <Square key="b6" index="b6" color="Dark" pieceType="" pieceColor="" />,
        <Square key="c6" index="c6" color="Light" pieceType="" pieceColor="" />,
        <Square key="d6" index="d6" color="Dark" pieceType="" pieceColor="" />,
        <Square key="e6" index="e6" color="Light" pieceType="" pieceColor="" />,
        <Square key="f6" index="f6" color="Dark" pieceType="" pieceColor="" />,
        <Square key="g6" index="g6" color="Light" pieceType="" pieceColor="" />,
        <Square key="h6" index="h6" color="Dark" pieceType="" pieceColor="" />,
      ];
      const row5 = [
        <Square key="a5" index="a5" color="Dark" pieceType="" pieceColor="" />,
        <Square key="b5" index="b5" color="Light" pieceType="" pieceColor="" />,
        <Square key="c5" index="c5" color="Dark" pieceType="" pieceColor="" />,
        <Square key="d5" index="d5" color="Light" pieceType="" pieceColor="" />,
        <Square key="e5" index="e5" color="Dark" pieceType="" pieceColor="" />,
        <Square key="f5" index="f5" color="Light" pieceType="" pieceColor="" />,
        <Square key="g5" index="g5" color="Dark" pieceType="" pieceColor="" />,
        <Square key="h5" index="h5" color="Light" pieceType="" pieceColor="" />,
      ];
      const row4 = [
        <Square key="a4" index="a4" color="Light" pieceType="" pieceColor="" />,
        <Square key="b4" index="b4" color="Dark" pieceType="" pieceColor="" />,
        <Square key="c4" index="c4" color="Light" pieceType="" pieceColor="" />,
        <Square key="d4" index="d4" color="Dark" pieceType="" pieceColor="" />,
        <Square key="e4" index="e4" color="Light" pieceType="" pieceColor="" />,
        <Square key="f4" index="f4" color="Dark" pieceType="" pieceColor="" />,
        <Square key="g4" index="g4" color="Light" pieceType="" pieceColor="" />,
        <Square key="h4" index="h4" color="Dark" pieceType="" pieceColor="" />,
      ];
      const row3 = [
        <Square key="a3" index="a3" color="Dark" pieceType="" pieceColor="" />,
        <Square key="b3" index="b3" color="Light" pieceType="" pieceColor="" />,
        <Square key="c3" index="c3" color="Dark" pieceType="" pieceColor="" />,
        <Square key="d3" index="d3" color="Light" pieceType="" pieceColor="" />,
        <Square key="e3" index="e3" color="Dark" pieceType="" pieceColor="" />,
        <Square key="f3" index="f3" color="Light" pieceType="" pieceColor="" />,
        <Square key="g3" index="g3" color="Dark" pieceType="" pieceColor="" />,
        <Square key="h3" index="h3" color="Light" pieceType="" pieceColor="" />,
      ];
      const row2 = [
        <Square key="a2" index="a2" color="Light" pieceType="Pawn" pieceColor="white" />,
        <Square key="b2" index="b2" color="Dark" pieceType="Pawn" pieceColor="white" />,
        <Square key="c2" index="c2" color="Light" pieceType="Pawn" pieceColor="white" />,
        <Square key="d2" index="d2" color="Dark" pieceType="Pawn" pieceColor="white" />,
        <Square key="e2" index="e2" color="Light" pieceType="Pawn" pieceColor="white" />,
        <Square key="f2" index="f2" color="Dark" pieceType="Pawn" pieceColor="white" />,
        <Square key="g2" index="g2" color="Light" pieceType="Pawn" pieceColor="white" />,
        <Square key="h2" index="h2" color="Dark" pieceType="Pawn" pieceColor="white" />,
      ];
      const row1 = [
        <Square key="a1" index="a1" color="Dark" pieceType="Rook" pieceColor="white" />,
        <Square key="b1" index="b1" color="Light" pieceType="Knight" pieceColor="white" />,
        <Square key="c1" index="c1" color="Dark" pieceType="Bishop" pieceColor="white" />,
        <Square key="d1" index="d1" color="Light" pieceType="Queen" pieceColor="white" />,
        <Square key="e1" index="e1" color="Dark" pieceType="King" pieceColor="white" />,
        <Square key="f1" index="f1" color="Light" pieceType="Bishop" pieceColor="white" />,
        <Square key="g1" index="g1" color="Dark" pieceType="Knight" pieceColor="white" />,
        <Square key="h1" index="h1" color="Light" pieceType="Rook" pieceColor="white" />,
      ];
      
      const board= [
        row8,
        row7,
        row6,
        row5,
        row4,
        row3,
        row2,
        row1,
      ]
    return (board)
}

export default SetupBoard