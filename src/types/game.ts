export interface Stats {
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
}

export interface Unit {
  name: string;
  stats: Stats;
  buffs: Buff[];
  debuffs: Debuff[];
  originalStats?: Stats;
}

export interface Buff {
  type: 'attack' | 'defense';
  value: number;
  duration: number;
}

export interface Debuff {
  type: 'weakness';
  value: number;
  duration: number;
}

export type Action = 'defend' | 'attack' | 'weaken' | 'powerUp';