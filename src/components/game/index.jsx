import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Button,
  Console,
  Screen,
  StartButton,
  StyledHome,
} from "../../styles/styles";
import overlay from "../../assets/gameboy-2.png";

const getRandomEnemy = () => {
  const enemyTypes = [
    { name: "Slime", maxHealth: 10, atk: 3, xp: 4 },
    { name: "Goblin", maxHealth: 22, atk: 5, xp: 10 },
    { name: "Orc", maxHealth: 24, atk: 7, xp: 15 },
    { name: "Spider", maxHealth: 7, atk: 12, xp: 6 },
    { name: "Thief", maxHealth: 30, atk: 10, xp: 25 },
    { name: "Wolf", maxHealth: 18, atk: 8, xp: 11 },
    { name: "Dragon", maxHealth: 100, atk: 20, xp: 300 },
  ];

  const randomIndex = Math.floor(Math.random() * enemyTypes.length);
  const randomEnemy = enemyTypes[randomIndex];

  return {
    ...randomEnemy,
    health: randomEnemy.maxHealth,
  };
};

const Game = () => {
  const initialPlayerState = useMemo(
    () => ({
      name: "Player",
      maxHealth: 60,
      health: 60,
      maxMana: 30,
      mana: 30,
      attack: 5,
      xp: 0,
      level: 1,
      xpToLevelUp: 100,
    }),
    []
  );

  const [player, setPlayer] = useState(initialPlayerState);
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [isMagicAttack, setIsMagicAttack] = useState(false);
  const randomNumber = Math.floor(Math.random() * 5) + 1;
  const [enemies, setEnemies] = useState([getRandomEnemy()]);

  const playerAttack = useCallback(() => {
    if (!isPlayerTurn || gameOver) {
      return; // Prevent attack if it's not the player's turn or the game is over
    }

    const updatedEnemies = [...enemies];
    const currentEnemy = updatedEnemies[currentEnemyIndex];

    const playerDamage = isMagicAttack
      ? Math.floor(currentEnemy.maxHealth * 0.3)
      : player.attack;
    currentEnemy.health -= playerDamage;

    // Update mana consumption
    const manaCost = isMagicAttack ? 20 : 0;
    const updatedPlayer = { ...player };
    updatedPlayer.mana -= manaCost;

    if (currentEnemy.health <= 0) {
      // Enemy defeated
      currentEnemy.health = 0; // Ensure health doesn't go below 0

      // Increase player XP
      const xpGained = currentEnemy.xp;
      const updatedPlayer = { ...player };
      updatedPlayer.xp += xpGained;

      // Check if player levels up
      if (updatedPlayer.xp >= updatedPlayer.xpToLevelUp) {
        updatedPlayer.xp = 0;
        updatedPlayer.level++;
        updatedPlayer.xpToLevelUp = updatedPlayer.xpToLevelUp + randomNumber;
        updatedPlayer.maxHealth += randomNumber;
        updatedPlayer.health = updatedPlayer.maxHealth;
        updatedPlayer.maxMana += randomNumber;
        updatedPlayer.mana = updatedPlayer.maxMana;
        updatedPlayer.attack += randomNumber;
        setMessage(
          `Congratulations! You leveled up to Level ${updatedPlayer.level}!`
        );
      } else {
        setMessage(
          `You defeated the ${currentEnemy.name} and gained ${xpGained} XP.`
        );

        setIsPlayerTurn(false);
      }

      setPlayer(updatedPlayer);

      // Continue to the next enemy
      const nextEnemyIndex = currentEnemyIndex + 1;
      setCurrentEnemyIndex(nextEnemyIndex);

      // Reset the health of the next enemy
      const nextEnemy = getRandomEnemy();
      updatedEnemies[nextEnemyIndex] = nextEnemy;
      setTimeout(() => {
        setMessage(`The ${currentEnemy.name} arrived! Defend yourself!`);
      }, 1000); // Delay of 2 seconds before showing the next enemy arrival message
    } else {
      // Enemy still alive
      setMessage(
        `You attacked the ${currentEnemy.name} and dealt ${playerDamage} damage.`
      );
    }

    setPlayer(updatedPlayer);
    setEnemies(updatedEnemies);
  }, [
    player,
    enemies,
    currentEnemyIndex,
    isMagicAttack,
    randomNumber,
    isPlayerTurn,
    gameOver,
  ]);

  const enemyAttack = useCallback(() => {
    if (!isPlayerTurn || gameOver) {
      return;
    }

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
      setPlayer(updatedPlayer);
    }
  }, [isPlayerTurn, gameOver, player, enemies, currentEnemyIndex]);

  const handleNextTurn = useCallback(() => {
    if (!gameOver && isPlayerTurn && !isMagicAttack) {
      playerAttack();
      setIsPlayerTurn(false);

      const currentEnemy = enemies[currentEnemyIndex];
      if (currentEnemy && currentEnemy.health > 0) {
        // Delay before enemy attack
        setTimeout(() => {
          enemyAttack();
          setIsPlayerTurn(true);
        }, 2000); // 2 second delay
      } else {
        const nextEnemyIndex = currentEnemyIndex + 1;
        if (nextEnemyIndex < enemies.length) {
          setCurrentEnemyIndex(nextEnemyIndex);
          // setMessage(`A new enemy has appeared: ${enemies[nextEnemyIndex].name}`);
        }
        setIsPlayerTurn(true);
      }

      setIsMagicAttack(false); // Reset magic attack flag
    } else {
      setIsPlayerTurn(true); // Enable the button when it's the player's turn
    }
  }, [
    isPlayerTurn,
    gameOver,
    playerAttack,
    enemyAttack,
    currentEnemyIndex,
    enemies,
    isMagicAttack,
  ]);

  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const delay = setTimeout(() => {
        const currentEnemy = enemies[currentEnemyIndex];
        if (currentEnemy && currentEnemy.health > 0) {
          enemyAttack();
        }
        setIsPlayerTurn(true);
      }, 2000); // 2 second delay

      return () => clearTimeout(delay);
    }
  }, [isPlayerTurn, gameOver, enemyAttack, enemies, currentEnemyIndex]);

  useEffect(() => {
    if (gameOver) {
      player.health = 0;
    }
  }, [gameOver, player]);

  const handleRestart = useCallback(() => {
    if (gameOver) {
      setPlayer(initialPlayerState);
      setEnemies([getRandomEnemy()]);
      setCurrentEnemyIndex(0);
      setIsPlayerTurn(true);
      setGameOver(false);
      setMessage("Welcome Back to Life noble warrior!");
    }
  }, [gameOver, initialPlayerState]);

  return (
    <>
      <StyledHome>
        <Console>
          <div className="frame">
            <Screen>
              <p>Health: {player.health}</p>
              <p>
                Mana: {player.mana} / {player.maxMana}
              </p>
              <p>Attack: {player.attack}</p>
              <p>
                lvl: {player.level} / xp: {player.xp} / {player.xpToLevelUp}
              </p>
              <p>Current Enemy: {enemies[currentEnemyIndex].name}</p>
              <p>Enemy Health: {enemies[currentEnemyIndex].health}</p>
              <p>{message}</p>
            </Screen>
          </div>
          <div className="organizador">
            <p className="arrow-keys">+</p>
            <div className="botoes">
              <Button
                onClick={handleNextTurn}
                disabled={!isPlayerTurn || gameOver}
              >
                A
              </Button>
              <Button
                onClick={() => {
                  setIsMagicAttack(true);
                  handleNextTurn();
                }}
                disabled={!isPlayerTurn || gameOver || player.mana < 20} // Disable magic attack button if player has insufficient mana
              >
                B
              </Button>
            </div>
          </div>
          <div className="organizador start">
            <StartButton onClick={handleRestart} disabled={!gameOver} />
            <StartButton onClick={handleRestart} disabled={!gameOver} />
          </div>
        </Console>
      </StyledHome>
    </>
  );
};

export default Game;
