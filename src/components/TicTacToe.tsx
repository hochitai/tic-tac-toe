'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Board from './Board';
import Square from './Square';
import GameState from '@/components/enums/GameState';
import XIcon from './assets/x-icon.png';
import OIcon from './assets/o-icon.png';

const PLAYER_X: string = 'X';
const PLAYER_O: string = 'O';

const TicTacToe = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState<string>(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.inProcess);
  const [result, setResult] = useState<string>('...');
  const [scoreX, setScoreX] = useState<number>(0);
  const [scoreO, setScoreO] = useState<number>(0);

  useEffect(() => {
    checkWinner(squares);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squares]);

  const newGame = (): void => {
    setSquares(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass(null);
    setGameState(GameState.inProcess);
    setResult('...');
  };

  const handleClick = (i: number): void => {
    if (gameState != GameState.inProcess || squares[i]) {
      return;
    }
    const newSquares = [...squares];
    newSquares[i] = playerTurn;
    setSquares(newSquares);
    if (playerTurn == PLAYER_X) {
      setPlayerTurn(PLAYER_O);
    } else {
      setPlayerTurn(PLAYER_X);
    }
  };

  const checkWinner = (squares: string[]): void => {
    const lines = [
      { combo: [0, 1, 2], strikeClass: 'strike-row-1' },
      { combo: [3, 4, 5], strikeClass: 'strike-row-2' },
      { combo: [6, 7, 8], strikeClass: 'strike-row-3' },
      { combo: [0, 3, 6], strikeClass: 'strike-column-1' },
      { combo: [1, 4, 7], strikeClass: 'strike-column-2' },
      { combo: [2, 5, 8], strikeClass: 'strike-column-3' },
      { combo: [0, 4, 8], strikeClass: 'strike-diagonal-1' },
      { combo: [2, 4, 6], strikeClass: 'strike-diagonal-2' },
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i].combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        if (squares[a] == PLAYER_X) {
          setGameState(GameState.playerXWin);
          setScoreX(scoreX + 1);
          setResult('Winner is X');
        } else {
          setGameState(GameState.playerOWin);
          setScoreO(scoreO + 1);
          setResult('Winner is O');
        }
        setStrikeClass(lines[i].strikeClass);
        return;
      }
    }

    const allSquaresFilledIn = squares.every((square) => square != null);
    if (allSquaresFilledIn) {
      setGameState(GameState.draw);
      setResult('Draw');
    }
  };

  return (
    <div className="border border-blue-400 bg-blue-100 p-6 rounded-md">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-center text-4xl">Tic tac toe</h1>
        <button className="py-2 px-4 bg-blue-500 text-white rounded-md" onClick={() => newGame()}>
          New
        </button>
      </div>
      <Board strikeClass={strikeClass}>
        <Square
          value={squares[0]}
          id={0}
          playerTurn={playerTurn}
          onClick={handleClick}
          className="border-r-4 border-b-4 border-blue-300"
        />
        <Square
          value={squares[1]}
          id={1}
          playerTurn={playerTurn}
          onClick={handleClick}
          className="border-b-4 border-blue-300"
        />
        <Square
          value={squares[2]}
          id={2}
          playerTurn={playerTurn}
          onClick={handleClick}
          className="border-l-4 border-b-4 border-blue-300"
        />
        <Square
          value={squares[3]}
          id={3}
          playerTurn={playerTurn}
          onClick={handleClick}
          className="border-r-4 border-b-4 border-blue-300"
        />
        <Square
          value={squares[4]}
          id={4}
          playerTurn={playerTurn}
          onClick={handleClick}
          className="border-b-4 border-blue-300"
        />
        <Square
          value={squares[5]}
          id={5}
          playerTurn={playerTurn}
          onClick={handleClick}
          className="border-l-4 border-b-4 border-blue-300"
        />
        <Square
          value={squares[6]}
          id={6}
          playerTurn={playerTurn}
          onClick={handleClick}
          className="border-r-4 border-blue-300"
        />
        <Square value={squares[7]} id={7} playerTurn={playerTurn} onClick={handleClick} className="" />
        <Square
          value={squares[8]}
          id={8}
          playerTurn={playerTurn}
          onClick={handleClick}
          className="border-l-4 border-blue-300"
        />
      </Board>
      <div className="w-[200px] mt-10 mx-auto py-4 border-4 border-dashed rounded-lg border-blue-500 bg-blue-300 bg-clip-padding text-center text-white">
        {result}
      </div>
      <div className="flex justify-center items-center mt-10">
        <div>
          <Image
            src={XIcon}
            alt=""
            className={`w-[50px] border border-blue-300 rounded-lg shadow-sm ${
              playerTurn == PLAYER_X ? 'bg-blue-300' : ''
            }`}
          />
          <div className="mt-2 text-center font-bold">{scoreX}</div>
        </div>
        <div className="h-[50px] w-[2px] mx-5 bg-gray-300"></div>
        <div>
          <Image
            src={OIcon}
            alt=""
            className={`w-[50px] border border-blue-300 rounded-lg shadow-sm ${
              playerTurn == PLAYER_O ? 'bg-blue-300' : ''
            }`}
          />
          <div className="mt-2 text-center font-bold">{scoreO}</div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
