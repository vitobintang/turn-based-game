import React from 'react';

interface DamageNumberProps {
  damage: number;
  position: { x: number; y: number };
}

export const DamageNumber: React.FC<DamageNumberProps> = ({ damage, position }) => (
  <div 
    className="absolute text-red-500 font-bold text-xl float-up"
    style={{ left: position.x, top: position.y }}
  >
    -{damage}
  </div>
);

interface BuffEffectProps {
  type: 'attack' | 'defense';
  active: boolean;
}

export const BuffEffect: React.FC<BuffEffectProps> = ({ type, active }) => {
  if (!active) return null;
  
  return (
    <div className={`buff-aura ${type} pulse`} />
  );
};