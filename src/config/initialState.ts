import { Unit } from '../types/game';

const createInitialPlayer = (): Unit => ({
  name: 'Player',
  stats: {
    health: 50,
    maxHealth: 50,
    attack: 15,
    defense: 10
  },
  buffs: [],
  debuffs: []
});

const createInitialEnemy = (): Unit => ({
  name: 'Enemy',
  stats: {
    health: 50,
    maxHealth: 50,
    attack: 12,
    defense: 8
  },
  buffs: [],
  debuffs: []
});

export { createInitialPlayer, createInitialEnemy };