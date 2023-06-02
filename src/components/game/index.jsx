import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Console, Screen, StyledHome } from "../../styles/styles";
import overlay from "../../assets/gameboy-2.png";

const getRandomEnemy = () => {
  const enemyTypes = [
    { name: "Slime1", maxHealth: 40, atk: 12 },
    { name: "Slime2", maxHealth: 40, atk: 12 },
    { name: "Slime3", maxHealth: 40, atk: 12 },
    { name: "Slime4", maxHealth: 40, atk: 12 },
    { name: "Slime5", maxHealth: 40, atk: 12 },
    { name: "Slime6", maxHealth: 40, atk: 12 },
    // Add more enemy types as needed
  ];

  const randomIndex = Math.floor(Math.random() * enemyTypes.length);
  const randomEnemy = enemyTypes[randomIndex];

  return {
    ...randomEnemy,
    health: randomEnemy.maxHealth,
  };
};

const Game = () => {
  const initialPlayerState = {
    name: "Player",
    maxHealth: 100,
    health: 100,
    attack: 20,
  };

  const [player, setPlayer] = useState(initialPlayerState);
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const [enemies, setEnemies] = useState([getRandomEnemy()]);

  useEffect(() => {
    if (gameOver) {
      setPlayer(initialPlayerState);
      setEnemies([getRandomEnemy()]);
      setCurrentEnemyIndex(0);
      setIsPlayerTurn(true);
      setMessage('');
      setGameOver(false);
    }
  }, [gameOver, initialPlayerState]);

  const handleNextTurn = useCallback(() => {
    if (isPlayerTurn && !gameOver) {
      playerAttack();
      setIsPlayerTurn(false);
    }
  }, [isPlayerTurn, gameOver]);

  const playerAttack = useCallback(() => {
    const updatedEnemies = [...enemies];
    const currentEnemy = updatedEnemies[currentEnemyIndex];

    const playerDamage = player.attack;
    currentEnemy.health -= playerDamage;

    if (currentEnemy.health <= 0) {
      // Enemy defeated
      currentEnemy.health = 0; // Ensure health doesn't go below 0

      // Continue to the next enemy
      const nextEnemyIndex = currentEnemyIndex + 1;
      setCurrentEnemyIndex(nextEnemyIndex);
      setMessage(`You defeated the ${currentEnemy.name}!`);

      // Reset the health of the next enemy
      const nextEnemy = getRandomEnemy();
      updatedEnemies[nextEnemyIndex] = nextEnemy;
    } else {
      // Enemy still alive
      setMessage(`You attacked the ${currentEnemy.name} and dealt ${playerDamage} damage.`);
    }

    setEnemies(updatedEnemies); // Update the enemies array
  }, [player.attack, enemies, currentEnemyIndex]);

  const enemyAttack = useCallback(() => {
    const updatedPlayer = { ...player };
    const currentEnemy = enemies[currentEnemyIndex];

    const damage = currentEnemy.atk; // Access 'atk' property directly
    updatedPlayer.health -= damage;

    if (updatedPlayer.health <= 0) {
      // Player defeated
      setMessage(`You were defeated by the ${currentEnemy.name}. Game Over!`);
      setGameOver(true);
    } else {
      // Player still alive
      setMessage(`The ${currentEnemy.name} attacked you for ${damage} damage.`);
    }

    setPlayer(updatedPlayer);
  }, [player, enemies, currentEnemyIndex]);

  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const delay = setTimeout(() => {
        const currentEnemy = enemies[currentEnemyIndex];
        if (currentEnemy && currentEnemy.health > 0) {
          enemyAttack();
        }
        setIsPlayerTurn(true);
      }, 1000); // 1 second delay

      return () => clearTimeout(delay);
    }
  }, [isPlayerTurn, gameOver, enemyAttack, enemies, currentEnemyIndex]);

  const handleRestart = useCallback(() => {
    setGameOver(true);
  }, []);

  return (
    <>
      <StyledHome>
        <Console>
          <div className="frame">
            <Screen>

              <p>Health: {player.health}</p>
              <p>Attack: {player.attack}</p>
              <p>Current Enemy: {enemies[currentEnemyIndex].name}</p>
              <p>Enemy Health: {enemies[currentEnemyIndex].health}</p>
              <p>{message}</p>
              <button
                onClick={handleNextTurn}
                disabled={!isPlayerTurn || gameOver}
              >
                Next Turn
              </button>
              <button onClick={handleRestart} disabled={!gameOver}>
                Restart
              </button>
            </Screen>
          </div>
          <div className="organizador">
            <p className="arrow-keys">+</p>
            <div className="botoes">
              <Button onClick={handleNextTurn} disabled={!isPlayerTurn}>
                X
              </Button>
              <Button onClick={handleNextTurn} disabled={!isPlayerTurn} />
            </div>
          </div>
        </Console>
      </StyledHome>
      <h2>Game Over!</h2>
    </>
  );
};

export default Game;
