import React from 'react';
import { Trophy, Skull } from 'lucide-react';

interface GameNotificationProps {
  type: 'victory' | 'defeat';
  onRestart: () => void;
}

export const GameNotification: React.FC<GameNotificationProps> = ({ type, onRestart }) => {
  const isVictory = type === 'victory';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center transform animate-bounce-once">
        <div className="mb-6">
          {isVictory ? (
            <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
          ) : (
            <Skull className="w-16 h-16 mx-auto text-red-500" />
          )}
        </div>
        <h2 className={`text-2xl font-bold mb-4 ${isVictory ? 'text-yellow-500' : 'text-red-500'}`}>
          {isVictory ? 'Victory!' : 'Defeat!'}
        </h2>
        <p className="text-gray-600 mb-6">
          {isVictory 
            ? 'Congratulations! You have defeated your enemy.' 
            : 'You have been defeated. Better luck next time!'}
        </p>
        <button
          onClick={onRestart}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors
            ${isVictory 
              ? 'bg-yellow-500 hover:bg-yellow-600' 
              : 'bg-red-500 hover:bg-red-600'}`}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};