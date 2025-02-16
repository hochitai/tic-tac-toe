import TicTacToe from '@/components/TicTacToe';
import React from 'react';

const Home = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col bg-blue-300 ">
      <TicTacToe />
    </div>
  );
};

export default Home;
