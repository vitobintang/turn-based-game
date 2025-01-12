# Character Animation Project

## Overview

This project is a simple core loop of a turn based game.

## Code Sturcture
1. **Core Structure**
    - src/components for React components
    - src/hooks for custom hooks
    - src/utils for game logic
    - src/types for TypeScript interfaces
    - src/assets for static resources
    - src/styles for CSS modules

2. **Component Hierarchy**
    - App
        |- GameContainer
            |- CharacterDisplay
            |- CombatArea
            |  |- ActionButtons
            |  |- BattleEffects
            |- StatusPanel
            |- BattleLog

3. **State Management**

    ```interface GameState {
    player: {
        hp: number;
        maxHp: number;
        attack: number;
        defense: number;
        buffs: Effect[];
    };
    enemy: {
        hp: number;
        maxHp: number;
        attack: number;
        defense: number;
        debuffs: Effect[];
    };
    turn: 'player' | 'enemy';
    battleLog: BattleEvent[];
    }```

4. **Combat System**

    export class CombatSystem {
    calculateDamage(attacker: Unit, defender: Unit): number {
        const base = attacker.attack - defender.defense;
        return Math.max(1, base * this.getBuffMultiplier(attacker));
    }

    applyEffect(target: Unit, effect: Effect): void {
        target.effects.push({
        ...effect,
        duration: effect.duration,
        timestamp: Date.now()
        });
    }
    }

5. **Game Actions**

    export const gameActions = {
    attack: (state: GameState): GameState => {
        const damage = combat.calculateDamage(state.player, state.enemy);
        return {
        ...state,
        enemy: {
            ...state.enemy,
            hp: Math.max(0, state.enemy.hp - damage)
        },
        battleLog: [...state.battleLog, {
            type: 'attack',
            damage,
            timestamp: Date.now()
        }]
        };
    },
    defend: (state: GameState): GameState => {
        // Add defense buff logic
    }
    };

## Key Decisions

1. **State Management**
   - Used React's built-in useState for game state management
   - Implemented a centralized action handling system
   - Maintained separate buff/debuff tracking for clean effect management

2. **Animation System**
   - CSS-based animations for performance
   - Modular animation classes for reusability
   - Transition states for smooth visual feedback

3. **Combat Design**
   - Turn-based system with player and enemy phases
   - Four distinct actions: Attack, Defend, Power Up, and Weaken
   - Buff/debuff system with duration tracking

4. **UI/UX**
   - Responsive layout with Tailwind CSS
   - Clear visual feedback for all actions
   - Animated battle log for combat history

## Features

1. **Combat System**
   - Turn-based combat mechanics
   - Damage calculation with attack and defense stats
   - HP tracking and victory/defeat conditions

2. **Character Actions**
   - Basic attack with damage calculation
   - Defense buff for damage reduction
   - Power up for increased attack
   - Weaken debuff to reduce enemy stats

3. **Visual Effects**
   - Character animations for each action
   - Buff/debuff visual indicators
   - Combat impact animations
   - Health bar animations

4. **Enemy AI**
   - Strategic decision making
   - Adaptive response to player actions
   - State tracking for action patterns

5. **Battle Log**
   - Real-time combat updates
   - Action result tracking
   - Scrollable history

## Instructions to Run

1. **Clone the Repository**:
    ```sh
    git clone <repository-url>
    cd project
    ```

2. **Install Dependencies**:
    ```sh
    npm install
    ```

3. **Run the Development Server**:
    ```sh
    npm run dev
    ```

4. **Open in Browser**:
    Open your browser and navigate to `http://localhost:5173` to play the game.

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons