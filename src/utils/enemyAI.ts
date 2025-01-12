import { Unit, Action } from '../types/game';
import { calculateDamage } from './combat';

interface AIState {
  lastAction?: Action;
  buffedAttack: boolean;
  weakenUsed: boolean;
}

let aiState: AIState = {
  lastAction: undefined,
  buffedAttack: false,
  weakenUsed: false,
};

export const resetAIState = () => {
  aiState = {
    lastAction: undefined,
    buffedAttack: false,
    weakenUsed: false,
  };
};

export const chooseEnemyAction = (enemy: Unit, player: Unit): Action => {
  // If powered up last turn, definitely attack to utilize the buff
  if (aiState.lastAction === 'powerUp') {
    aiState.lastAction = 'attack';
    aiState.buffedAttack = false;
    return 'attack';
  }

  // If player has high attack and we haven't used weaken yet
  if (!aiState.weakenUsed && player.stats.attack > 12) {
    aiState.lastAction = 'weaken';
    aiState.weakenUsed = true;
    return 'weaken';
  }

  // If health is low (below 30%), prioritize defense
  if (enemy.stats.health < enemy.stats.maxHealth * 0.3) {
    if (aiState.lastAction !== 'defend') {
      aiState.lastAction = 'defend';
      return 'defend';
    }
  }

  // If player has high attack and our defense is low, consider defending
  const potentialDamage = calculateDamage(player, enemy);
  if (potentialDamage > enemy.stats.health * 0.25 && aiState.lastAction !== 'defend') {
    aiState.lastAction = 'defend';
    return 'defend';
  }

  // If we haven't attacked in 2 turns, consider power up + attack combo
  if (aiState.lastAction !== 'attack' && aiState.lastAction !== 'powerUp' && !aiState.buffedAttack) {
    aiState.lastAction = 'powerUp' as Action;
    aiState.buffedAttack = true;
    return 'powerUp';
  }  

  // Default to attack if no special conditions are met
  aiState.lastAction = 'attack';
  return 'attack';
};