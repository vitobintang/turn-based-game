import React from 'react';
import { Skull, Zap, CloudLightning } from 'lucide-react';
import { Debuff } from '../types/game';

interface DebuffEffectProps {
  type: Debuff['type'];
  active: boolean;
}

const DebuffIcon = ({ type }: { type: Debuff['type'] }) => {
  switch (type) {
    case 'weakness':
      return <Skull className="w-3 h-3 mr-1 text-purple-400" />;
    case 'poison':
      return <CloudLightning className="w-3 h-3 mr-1 text-emerald-400" />;
    case 'stun':
      return <Zap className="w-3 h-3 mr-1 text-amber-400" />;
  }
};

export const DebuffEffect: React.FC<DebuffEffectProps> = ({ type, active }) => {
  if (!active) return null;
  
  return (
    <div className={`debuff-aura ${type}`} />
  );
};

export const DebuffIndicator: React.FC<{ debuff: Debuff }> = ({ debuff }) => (
  <span className={`inline-flex items-center px-2 py-1 rounded text-xs 
    ${debuff.type === 'weakness' ? 'bg-purple-500' : 
      debuff.type === 'poison' ? 'bg-emerald-500' : 
      'bg-amber-500'} 
    text-white debuff-icon`}
  >
    <DebuffIcon type={debuff.type} />
    -{debuff.value} ({debuff.duration} turns)
  </span>
);