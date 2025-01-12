import { Unit, Action, Debuff } from '../types/game';
import { calculateDamage } from './combat';

const WEAKEN_AMOUNT = 2;

export const handleAction = (
  attacker: Unit,
  defender: Unit,
  action: Action,
  addLogMessage: (message: string) => void
): { updatedAttacker: Unit; updatedDefender: Unit } => {
  let updatedAttacker = { ...attacker };
  let updatedDefender = { ...defender };

  switch (action) {
    case 'attack': {
      const damage = calculateDamage(attacker, defender);
      updatedDefender.stats.health = Math.max(0, defender.stats.health - damage);
      addLogMessage(`${attacker.name} attacks for ${damage} damage!`);
      break;
    }
    case 'defend': {
      updatedAttacker.buffs.push({
        type: 'defense',
        value: 5,
        duration: 3
      });
      addLogMessage(`${attacker.name} takes defensive stance (+5 defense for 2 turns)`);
      break;
    }
    case 'powerUp': {
      updatedAttacker.buffs.push({
        type: 'attack',
        value: 7,
        duration: 3
      });
      addLogMessage(`${attacker.name} powers up (+7 attack for 2 turns)`);
      break;
    }
    case 'weaken': {
      const debuff: Debuff = {
        type: 'weakness',
        value: WEAKEN_AMOUNT,
        duration: 3
      };
      
      // Store original stats if not already stored
      if (!updatedDefender.originalStats) {
        updatedDefender.originalStats = { ...updatedDefender.stats };
      }
      
      updatedDefender.debuffs = [...(updatedDefender.debuffs || []), debuff];
      updatedDefender.stats.attack = Math.max(1, updatedDefender.stats.attack - WEAKEN_AMOUNT);
      updatedDefender.stats.defense = Math.max(0, updatedDefender.stats.defense - WEAKEN_AMOUNT);
      
      addLogMessage(`${attacker.name} weakens ${defender.name} (-${WEAKEN_AMOUNT} attack and defense for 2 turns)`);
      break;
    }
  }

  return { updatedAttacker, updatedDefender };
};