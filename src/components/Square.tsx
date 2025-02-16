import Image from 'next/image';
import React from 'react';
import XIcon from './assets/x-icon.png';
import OIcon from './assets/o-icon.png';

type SquareType = {
  value: string;
  id: number;
  playerTurn: string;
  onClick: (i: number) => void;
  className: string;
};

const Square = ({ value, id, playerTurn, onClick, className }: SquareType) => {
  return (
    <button
      className={`square group/square relative flex items-center justify-center w-[100px] h-[100px] ${className}`}
      onClick={() => onClick(id)}>
      {value != null ? (
        value == 'X' ? (
          <Image src={XIcon} alt="" />
        ) : (
          <Image src={OIcon} alt="" />
        )
      ) : playerTurn != null && playerTurn == 'X' ? (
        <Image src={XIcon} alt="" className="absolute opacity-40 invisible group-hover/square:visible" />
      ) : (
        <Image src={OIcon} alt="" className="absolute opacity-40 invisible group-hover/square:visible" />
      )}
    </button>
  );
};

export default Square;
