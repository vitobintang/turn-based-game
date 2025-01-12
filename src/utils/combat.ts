import { Unit, Buff } from '../types/game';

export const calculateDamage = (attacker: Unit, defender: Unit): number => {
  const attackPower = attacker.stats.attack + getBuffValue(attacker.buffs, 'attack');
  const defenseValue = defender.stats.defense + getBuffValue(defender.buffs, 'defense');
  return Math.max(1, attackPower - defenseValue);
};

export const getBuffValue = (buffs: Buff[], type: 'attack' | 'defense'): number => {
  return buffs
    .filter(buff => buff.type === type && buff.duration > 0)
    .reduce((total, buff) => total + buff.value, 0);
};

export const updateBuffs = (unit: Unit): Unit => {
  const updatedBuffs = unit.buffs
    .map(buff => ({ ...buff, duration: buff.duration - 1 }))
    .filter(buff => buff.duration > 0);
  
  const updatedDebuffs = (unit.debuffs || [])
    .map(debuff => ({ ...debuff, duration: debuff.duration - 1 }))
    .filter(debuff => debuff.duration > 0);

  // Reset stats if debuff expires
  if (unit.originalStats && (!updatedDebuffs.length || updatedDebuffs.every(d => d.type !== 'weakness'))) {
    unit.stats = { ...unit.originalStats };
    delete unit.originalStats;
  }

  return {
    ...unit,
    buffs: updatedBuffs,
    debuffs: updatedDebuffs
  };
};