import React from 'react';
import { Action } from '../types/game';
import { Sword, Shield, Zap, Skull } from 'lucide-react';

interface ActionButtonsProps {
  onAction: (action: Action) => void;
  disabled: boolean;
}

const ActionButton: React.FC<{
  action: Action;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled: boolean;
  variant: 'attack' | 'defend' | 'power' | 'debuff';
}> = ({ icon, label, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full px-4 py-3 mb-2
        bg-gray-800 hover:bg-gray-700
        disabled:opacity-50 disabled:cursor-not-allowed
        text-left text-white
        border-l-4 border-gray-600
        transition-colors duration-200
        flex items-center gap-3
      `}
    >
      <span className="p-1 rounded bg-gray-700">{icon}</span>
      {label}
    </button>
  );
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onAction, disabled }) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      <ActionButton
        action="attack"
        icon={<Sword className="w-5 h-5 text-red-400" />}
        label="Attack"
        onClick={() => onAction('attack')}
        disabled={disabled}
        variant="attack"
      />
      <ActionButton
        action="defend"
        icon={<Shield className="w-5 h-5 text-blue-400" />}
        label="Defend"
        onClick={() => onAction('defend')}
        disabled={disabled}
        variant="defend"
      />
      <ActionButton
        action="powerUp"
        icon={<Zap className="w-5 h-5 text-yellow-400" />}
        label="Power Up"
        onClick={() => onAction('powerUp')}
        disabled={disabled}
        variant="power"
      />
      <ActionButton
        action="weaken"
        icon={<Skull className="w-5 h-5 text-purple-400" />}
        label="Weaken"
        onClick={() => onAction('weaken')}
        disabled={disabled}
        variant="debuff"
      />
    </div>
  );
};