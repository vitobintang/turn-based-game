import { useState, useEffect } from 'react';
import { Unit, Action } from './types/game';
import { chooseEnemyAction, resetAIState } from './utils/enemyAI';
import { handleAction } from './utils/gameActions';
import { updateBuffs } from './utils/combat';
import { UnitDisplay } from './components/UnitDisplay';
import { ActionButtons } from './components/ActionButtons';
import { GameNotification } from './components/GameNotification';
import { createInitialPlayer, createInitialEnemy } from './config/initialState';

export default function App() {
  const [player, setPlayer] = useState<Unit>(createInitialPlayer());
  const [enemy, setEnemy] = useState<Unit>(createInitialEnemy());
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [battleLog, setBattleLog] = useState<string[]>(['Battle starts!']);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState<'victory' | 'defeat' | null>(null);
  const [animatingUnit, setAnimatingUnit] = useState<'player' | 'enemy' | null>(null);
  const [lastAction, setLastAction] = useState<Action | null>(null);

  const addLogMessage = (message: string) => {
    setBattleLog(prev => [...prev, message]);
  };

  const handlePlayerAction = (action: Action) => {
    if (!isPlayerTurn || gameOver) return;

    setAnimatingUnit('player');
    const { updatedAttacker: updatedPlayer, updatedDefender: updatedEnemy } = 
      handleAction(player, enemy, action, addLogMessage);

    setPlayer(updateBuffs(updatedPlayer));
    setEnemy(updateBuffs(updatedEnemy));
    setIsPlayerTurn(false);
    setLastAction(action);
    
    setTimeout(() => setAnimatingUnit(null), 500);
  };

  const handleEnemyTurn = () => {
    if (isPlayerTurn || gameOver) return;

    setAnimatingUnit('enemy');
    const enemyAction = chooseEnemyAction(enemy, player);
    const { updatedAttacker: updatedEnemy, updatedDefender: updatedPlayer } = 
      handleAction(enemy, player, enemyAction, addLogMessage);

    setPlayer(updateBuffs(updatedPlayer));
    setEnemy(updateBuffs(updatedEnemy));
    setIsPlayerTurn(true);
    
    setTimeout(() => setAnimatingUnit(null), 500);
  };

  const resetGame = () => {
    setPlayer(createInitialPlayer());
    setEnemy(createInitialEnemy());
    setIsPlayerTurn(true);
    setBattleLog(['Battle starts!']);
    setGameOver(false);
    setGameResult(null);
    setAnimatingUnit(null);
    resetAIState();
  };

  useEffect(() => {
    if (player.stats.health <= 0) {
      setGameOver(true);
      setGameResult('defeat');
      addLogMessage('Game Over - Enemy Wins!');
    } else if (enemy.stats.health <= 0) {
      setGameOver(true);
      setGameResult('victory');
      addLogMessage('Congratulations - You Win!');
    } else if (!isPlayerTurn) {
      const timer = setTimeout(handleEnemyTurn, 1000);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, player.stats.health, enemy.stats.health]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col">
      {/* Status Bars at Top */}
      <div className="fixed top-0 left-0 right-0 flex justify-between p-4 z-10">
        {/* Player Stats */}
        <div className="w-72">
          <div className="bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg border border-blue-500/30">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-blue-400 font-bold">{player.name}</h3>
              <span className="text-xs text-blue-300">HP: {player.stats.health}/{player.stats.maxHealth}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300"
                style={{ width: `${(player.stats.health / player.stats.maxHealth) * 100}%` }}
              />
            </div>
            {/* Stats */}
            <div className="flex justify-between text-xs text-blue-300 mb-2">
              <span>ATK: {player.stats.attack}</span>
              <span>DEF: {player.stats.defense}</span>
            </div>
            {/* Buffs and Debuffs */}
            <div className="flex flex-wrap gap-1">
              {player.buffs.map((buff, i) => (
                <span key={i} className="px-2 py-0.5 text-xs rounded bg-blue-500/20 text-blue-300">
                  +{buff.value} {buff.type} ({buff.duration})
                </span>
              ))}
              {player.debuffs?.map((debuff, i) => (
                <span key={i} className="px-2 py-0.5 text-xs rounded bg-red-500/20 text-red-300">
                  -{debuff.value} {debuff.type} ({debuff.duration})
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Enemy Stats */}
        <div className="w-72">
          <div className="bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg border border-red-500/30">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-red-400 font-bold">{enemy.name}</h3>
              <span className="text-xs text-red-300">HP: {enemy.stats.health}/{enemy.stats.maxHealth}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300"
                style={{ width: `${(enemy.stats.health / enemy.stats.maxHealth) * 100}%` }}
              />
            </div>
            {/* Stats */}
            <div className="flex justify-between text-xs text-red-300 mb-2">
              <span>ATK: {enemy.stats.attack}</span>
              <span>DEF: {enemy.stats.defense}</span>
            </div>
            {/* Buffs and Debuffs */}
            <div className="flex flex-wrap gap-1">
              {enemy.buffs.map((buff, i) => (
                <span key={i} className="px-2 py-0.5 text-xs rounded bg-blue-500/20 text-blue-300">
                  +{buff.value} {buff.type} ({buff.duration})
                </span>
              ))}
              {enemy.debuffs?.map((debuff, i) => (
                <span key={i} className="px-2 py-0.5 text-xs rounded bg-red-500/20 text-red-300">
                  -{debuff.value} {debuff.type} ({debuff.duration})
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Battle Scene */}
      <div className="flex-1 relative mt-32">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fff_1px,_transparent_1px)] [background-size:20px_20px] opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
        
        {/* Battle Area */}
        <div className="relative h-full flex justify-around items-center">
          {/* Player Side */}
          <div className="transform scale-150">
            <UnitDisplay
              unit={player}
              isPlayer={true}
              isAnimating={animatingUnit === 'player'}
              lastAction={lastAction}
            />
          </div>

          {/* Enemy Side */}
          <div className="transform scale-150">
            <UnitDisplay
              unit={enemy}
              isPlayer={false}
              isAnimating={animatingUnit === 'enemy'}
              lastAction={lastAction}
            />
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="fixed bottom-0 left-0 right-0 grid grid-cols-5 gap-4 p-4 bg-gray-900/50 backdrop-blur-sm">
        {/* Battle Log */}
        <div className="col-span-2">
          <div className="h-32 bg-gray-900/90 border border-gray-700 rounded-lg overflow-hidden">
            <div className="h-full p-2 overflow-y-auto">
              {battleLog.slice(-4).map((message, index) => (
                <p key={index} className="text-gray-300 text-sm mb-1">{message}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="col-span-3">
          {!gameOver && (
            <div className="bg-gray-900/90 border border-gray-700 rounded-lg p-4">
              <ActionButtons
                onAction={handlePlayerAction}
                disabled={!isPlayerTurn}
              />
            </div>
          )}
        </div>
      </div>

      {/* Game Over Notification */}
      {gameOver && gameResult && (
        <GameNotification
          type={gameResult}
          onRestart={resetGame}
        />
      )}
    </div>
  );
}