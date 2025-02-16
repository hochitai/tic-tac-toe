import React from 'react';
import Strike from './Strike';

type BoardType = {
  children: React.ReactNode;
  strikeClass: string | null;
};

const Board = ({ children, strikeClass }: BoardType) => {
  return (
    <div className="relative flex flex-wrap w-[300px] h-300px ">
      {children}
      <Strike strikeClass={strikeClass} />
    </div>
  );
};

export default Board;
