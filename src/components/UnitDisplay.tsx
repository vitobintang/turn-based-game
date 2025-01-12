import React from 'react';
import { Unit, Action } from '../types/game';
import { Character } from './Character';

interface UnitDisplayProps {
  unit: Unit;
  isPlayer: boolean;
  isAnimating?: boolean;
  lastAction?: Action | null;
}

export const UnitDisplay: React.FC<UnitDisplayProps> = ({ 
  unit, 
  isPlayer,
  isAnimating = false,
  lastAction
}) => {
  const hasAttackBuff = unit.buffs.some(buff => buff.type === 'attack' && buff.duration > 0);
  const hasDefenseBuff = unit.buffs.some(buff => buff.type === 'defense' && buff.duration > 0);
  const hasWeakenDebuff = unit.debuffs?.some(debuff => debuff.type === 'weakness' && debuff.duration > 0);
  
  return (
    <div className="relative">
      <Character 
        isPlayer={isPlayer} 
        action={isAnimating ? lastAction || 'idle' : 'idle'} 
        hasAttackBuff={hasAttackBuff}
        hasDefenseBuff={hasDefenseBuff}
        hasWeakenDebuff={hasWeakenDebuff}
      />
    </div>
  );
};