import React from 'react';

type StrikeType = {
  strikeClass: string | null;
};

const Strike = ({ strikeClass }: StrikeType) => {
  return <div className={`absolute bg-black rounded-lg ${strikeClass}`}></div>;
};

export default Strike;
