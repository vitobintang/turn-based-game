import React, { useEffect, useRef } from 'react';

interface BattleLogProps {
  messages: string[];
}

export const BattleLog: React.FC<BattleLogProps> = ({ messages }) => {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-gray-900 border-2 border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <h3 className="text-gray-400 font-medium">Battle Log</h3>
      </div>
      <div 
        ref={logRef}
        className="h-32 overflow-y-auto p-4 space-y-2"
      >
        {messages.map((message, index) => (
          <p 
            key={index} 
            className="text-gray-300 text-sm"
          >
            {message}
          </p>
        ))}
      </div>
    </div>
  );
};