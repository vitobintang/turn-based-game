import React from 'react';

interface CharacterProps {
  isPlayer: boolean;
  action: string;
  hasAttackBuff: boolean;
  hasDefenseBuff: boolean;
  hasWeakenDebuff: boolean;
}

export const Character: React.FC<CharacterProps> = ({
  isPlayer,
  action,
  hasAttackBuff,
  hasDefenseBuff,
  hasWeakenDebuff
}) => {
  const baseClass = `character ${isPlayer ? 'player' : 'enemy'} ${action}`;
  const buffClass = `${hasAttackBuff ? 'attack-buff' : ''} ${hasDefenseBuff ? 'defense-buff' : ''}`;
  const debuffClass = hasWeakenDebuff ? 'weakened' : '';

  return (
    <div className={`${baseClass} ${buffClass} ${debuffClass}`}>
      <div className="character-body">
        <div className="head" />
        <div className="torso" />
        <div className="arm left" />
        <div className="arm right" />
        <div className="leg left" />
        <div className="leg right" />
        <div className="weapon sword" />
      </div>
    </div>
  );
};