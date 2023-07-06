import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Button, Console, ConsoleLog, ContainerDefault, EnemyImage, PlayerImage, Screen, StartButton, StyledHome } from "../../styles/styles";
import BotoesWrapper from "../buttons-and-sounds";
import { playDefeated, playMagicAttack, playMissed, playReward, playTookDamage, playEnemyDamageSFX, playCriticalHit } from "../buttons-and-sounds/sounds"
import { getDefeatedEnemyCounter, getRandomEnemy, handleEnemyDefeated, resetEnemyDefeated, setDefeatedEnemyCounter } from "../data/enemies";
import { useItemHandling, items } from "../data/items";
import { useMessage, getMessageColor } from './message';
import Window from "../windows";

const Game = () => {

  const initialPlayerState = useMemo(
    () => ({
      name: "Player",
      maxHealth: 50,
      health: 50,
      maxMana: 20,
      mana: 20,
      attack: 5,
      swordDamage: 0,
      shieldHealth: 0,
      xp: 0,
      level: 1,
      xpToLevelUp: 10,
      img: "./assets/red-mage.webp",
    }),
    []
  );

  const [player, setPlayer] = useState(initialPlayerState);
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const { message, messageHistory, updateMessage, ulRef } = useMessage();
  const [playerDamage, setPlayerDamage] = useState("");
  const [enemyDamage, setEnemyDamage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [isMagicAttack, setIsMagicAttack] = useState(false);
  const [enemies, setEnemies] = useState([getRandomEnemy()]);
  const targetRef = useRef(null);
  const defeatedEnemiesCounter = getDefeatedEnemyCounter();
  const { handleItem } = useItemHandling();

  useEffect(() => {
    const newMessage = "Welcome to Project Dungeon! This project was built in React.js by Michel Raupp. All rights reserved to their respective owners for names, images and icons used on this website.";
    updateMessage(newMessage);
  }, []);


  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const playerAttack = useCallback(() => {
    if (!isPlayerTurn || gameOver) {
      return;
    }
    setIsPlayerTurn(false)
    function checkRandomEvent() {

      const randomNumber = Math.random();
      const itemChance = .2;


      if (randomNumber < itemChance) {

        const foundItemIndex = Math.floor(Math.random() * items.length);
        const foundItem = items[foundItemIndex];

        foundItem.quantity--;
        if (foundItem.quantity === 0) {
          items.splice(foundItemIndex, 1);
        }
        const newMessage = `You found a ${foundItem.name}!`;
        updateMessage(newMessage);

        if (foundItem) {
          const { updatedPlayer } = handleItem(foundItem, player);
          setPlayer(updatedPlayer);
        }
        return foundItem;
      }

      return null;
    }


    const playerImageElement = document.querySelector(".player-img");
    const enemyImageElement = document.querySelector(".enemy-img");

    const updatedEnemies = [...enemies];
    const currentEnemy = updatedEnemies[currentEnemyIndex];

    let playerDamage;
    let updatedPlayer = { ...player };

    const criticalHitChance = Math.random();
    const isCriticalHit = criticalHitChance < 0.1;

    const missChance = Math.random();
    const isMissed = missChance < 0.1;
    setIsPlayerTurn(false)
    if (isMissed) {

      console.log("Attack missed!");
      const newMessage =
        `Oh no, the enemy dodged your attack!!`
        ;

      updateMessage(newMessage);
      enemyImageElement.classList.remove("enemy-appeared-animation");
      playerImageElement.classList.add("player-attack-animation");
      enemyImageElement.classList.add("enemy-dodged-animation");

      playMissed();
      setTimeout(() => {
        enemyImageElement.classList.remove("enemy-dodged-animation");
        playerImageElement.classList.remove("player-attack-animation");

      }, 500);
      setIsPlayerTurn(false)
    }
    else {
      if (isCriticalHit) {
        playerDamage = Math.floor(updatedPlayer.attack * 2);
        console.log("Critical Hit!");
        const newMessage = `You dealt a critical hit! The enemy took ${playerDamage} damage.`;
        setPlayerDamage(playerDamage);

        playCriticalHit();
        updateMessage(newMessage);
      } else {
        playerDamage = updatedPlayer.attack;
        setPlayerDamage(playerDamage);
      }

      enemyImageElement.classList.remove("enemy-appeared-animation");
      playerImageElement.classList.add("player-attack-animation");
      enemyImageElement.classList.add("enemy-damage-animation");

      setTimeout(() => {
        playerImageElement.classList.remove("player-attack-animation");
        enemyImageElement.classList.remove("enemy-damage-animation");
      }, 500);

      if (currentEnemy.health - playerDamage <= 0) {
        // Enemy 
        setIsPlayerTurn(false)
        setTimeout(() => {
          setIsPlayerTurn(false)
          enemyImageElement.classList.add("enemy-defeated-animation");
        }, 500);

        playerDamage = currentEnemy.health;
        currentEnemy.health = 0;

        const xpGained = currentEnemy.xp;
        updatedPlayer.xp += xpGained;

        const randomStatsNumber = {
          xpToLevelUp: Math.floor(Math.random() * 2) + 8,
          maxHealth: Math.floor(Math.random() * 10) + 3,
          maxMana: Math.floor(Math.random() * 3) + 2,
          attack: Math.floor(Math.random() * 2) + 1
        };

        const newMessage = `You defeated the ${currentEnemy.name} and gained ${xpGained} XP.`;
        playDefeated();

        handleEnemyDefeated();
        updateMessage(newMessage);

        while (updatedPlayer.xp >= updatedPlayer.xpToLevelUp) {
          updatedPlayer.xp -= updatedPlayer.xpToLevelUp;
          updatedPlayer.level++;
          updatedPlayer.xpToLevelUp += 25 + randomStatsNumber.xpToLevelUp;
          updatedPlayer.maxHealth += 5 + randomStatsNumber.maxHealth;
          updatedPlayer.health = updatedPlayer.maxHealth;
          updatedPlayer.maxMana += 3 + randomStatsNumber.maxMana;
          updatedPlayer.mana = updatedPlayer.maxMana;
          updatedPlayer.attack += randomStatsNumber.attack;

          const newMessage = `Congratulations! You leveled up to Level ${updatedPlayer.level}!`;
          updateMessage(newMessage);
          console.log("");
          console.log(`Level UP! You're now Level ${updatedPlayer.level}`)
          console.log("=========Player Stats=========")
          console.log(`HP: ${updatedPlayer.maxHealth} / SHIELD: ${updatedPlayer.shieldHealth}`);
          console.log(`MP: ${updatedPlayer.maxMana}`);
          console.log(`ATK: ${updatedPlayer.attack} / SWORD: (${updatedPlayer.swordDamage})`);
          console.log(`XP: ${updatedPlayer.xp} / ${updatedPlayer.xpToLevelUp}`);
          console.log("------------------------------")
          console.log("");
        }

        const foundItem = checkRandomEvent();

        if (foundItem) {
          playReward();
          if (foundItem.type === "Consumable") {
            if (foundItem.attributes.healthRestore) {
              updatedPlayer.health += foundItem.attributes.healthRestore;
              updatedPlayer.health = Math.min(updatedPlayer.health, updatedPlayer.maxHealth);
            }
            if (foundItem.attributes.manaRestore) {
              updatedPlayer.mana += foundItem.attributes.manaRestore;
              updatedPlayer.mana = Math.min(updatedPlayer.mana, updatedPlayer.maxMana);
            }
          } else if (foundItem.type === "sword") {
            if (foundItem.attributes.damageBonus > updatedPlayer.swordDamage) {
              updatedPlayer.swordDamage = foundItem.attributes.damageBonus;
              updatedPlayer.attack = updatedPlayer.attack - player.swordDamage + updatedPlayer.swordDamage;
            }
          } else if (foundItem.type === "shield") {
            if (
              foundItem.attributes.healthBonus &&
              !isNaN(foundItem.attributes.healthBonus) &&
              foundItem.attributes.healthBonus > updatedPlayer.shieldHealth
            ) {
              updatedPlayer.shieldHealth = foundItem.attributes.healthBonus;
              updatedPlayer.maxHealth += foundItem.attributes.healthBonus;
            }
          }
        }

        setIsPlayerTurn(false)
        setPlayer(updatedPlayer);
        setTimeout(() => {
          // Continue to the next enemy
          const nextEnemyIndex = currentEnemyIndex + 1;
          setCurrentEnemyIndex(nextEnemyIndex);
          enemyImageElement.classList.remove("enemy-defeated-animation");
          // Reset the health of the next enemy
          const nextEnemy = getRandomEnemy();
          updatedEnemies[nextEnemyIndex] = nextEnemy;
          enemyImageElement.classList.add("enemy-appeared-animation");

        }, 500);

        setTimeout(() => {
          enemyImageElement.classList.remove("enemy-appeared-animation");
          const newMessage = `A new enemy came up! Prepare to fight!`;
          updateMessage(newMessage);
        }, 1000);
        console.log(`new enemy: ${currentEnemy.name}`);
        console.log(`player health: ${player.health}`);

      } else {
        const newMessage = `You attacked the ${currentEnemy.name} and dealt ${playerDamage} damage.`;
        playEnemyDamageSFX();
        updateMessage(newMessage);
        currentEnemy.health -= playerDamage;
        setPlayerDamage(playerDamage);
        console.log(`player attacked ${currentEnemy.name} with: ${playerDamage}`);
      }
    }

    setEnemies(updatedEnemies);
    setIsPlayerTurn(false);
  }, [
    player,
    enemies,
    currentEnemyIndex,
    isPlayerTurn,
    gameOver,
    updateMessage, handleItem
  ]);

  const enemyAttack = useCallback(() => {
    if (!isPlayerTurn || gameOver) {
      return;
    }

    const updatedPlayer = { ...player };
    const currentEnemy = enemies[currentEnemyIndex];

    const dodgeChance = Math.random();
    const isDodge = dodgeChance < 0.1;

    const playerImageElement = document.querySelector(".player-img");
    const enemyImageElement = document.querySelector(".enemy-img");

    if (isDodge) {
      setIsPlayerTurn(true);
      const newMessage = `You dodged the ${currentEnemy.name}'s attack!`;
      updateMessage(newMessage);
      playerImageElement.classList.add("player-dodged-animation");
      enemyImageElement.classList.add("enemy-attack-animation");
      setEnemyDamage("dodged");
      console.log('player dodged')
      playMissed();
      setTimeout(() => {
        playerImageElement.classList.remove("player-dodged-animation");
        enemyImageElement.classList.remove("enemy-attack-animation");
      }, 500);

    } else {
      const damage = currentEnemy.atk;
      if (updatedPlayer.health <= 0) {
        // Player defeated
        const newMessage = `You were defeated by the ${currentEnemy.name}. Game Over! Press Start/Select to Restart`;
        updateMessage(newMessage);
        console.log('game over')
        updatedPlayer.health = 0;
        setGameOver(true);
      } else {
        const newMessage =
          `The ${currentEnemy.name} attacked! You took ${damage} damage.`
          ;
        playTookDamage();
        setEnemyDamage(currentEnemy.atk);
        updateMessage(newMessage);
        updatedPlayer.health -= currentEnemy.atk;

        console.log(`${currentEnemy.name} attacked, player took damage: ${damage} `)

        playerImageElement.classList.add("player-damage-animation");
        enemyImageElement.classList.add("enemy-attack-animation");

        setTimeout(() => {
          playerImageElement.classList.remove("player-damage-animation");
          enemyImageElement.classList.remove("enemy-attack-animation");

        }, 500);
        if (updatedPlayer.health <= 0) {
          const newMessage = `You were defeated by the ${currentEnemy.name}. Game Over! Press Start/Select to Restart`;
          updateMessage(newMessage);
          console.log('game over')
          updatedPlayer.health = 0;
          setGameOver(true);
        }
        
        setPlayer(updatedPlayer);

      }
    }

  }, [isPlayerTurn, gameOver, player, enemies, currentEnemyIndex, updateMessage]);

  const handleMagicAttack = useCallback(() => {
    setIsMagicAttack(true);

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      mana: prevPlayer.mana - 20,
    }));

  }, [setPlayer]);

  useEffect(() => {
    if (isMagicAttack) {
      const playerImageElement = document.querySelector(".player-img");
      const enemyImageElement = document.querySelector(".enemy-img");
      enemyImageElement.classList.remove("enemy-appeared-animation");
      playerImageElement.classList.add("magic-attack-animation");
      playMagicAttack();
      setTimeout(() => {
        setIsPlayerTurn(false);
        enemyImageElement.classList.add("enemy-damage-animation");
        playerImageElement.classList.remove("magic-attack-animation");
      }, 500);

      const updatedEnemies = [...enemies];
      const currentEnemy = updatedEnemies[currentEnemyIndex];

      const magicDamage = player.attack * 3;
      setTimeout(() => {
        currentEnemy.health -= magicDamage;
        if (currentEnemy.health <= 0) {
          setIsPlayerTurn(false);

          currentEnemy.health = 0;

          const xpGained = currentEnemy.xp;
          const updatedPlayer = { ...player };
          updatedPlayer.xp += xpGained;

          setTimeout(() => {
            enemyImageElement.classList.remove("enemy-damage-animation");
            enemyImageElement.classList.add("enemy-defeated-animation");
          }, 500);

          const randomStatsNumber = {
            xpToLevelUp: Math.floor(Math.random() * 2) + 8,
            maxHealth: Math.floor(Math.random() * 10) + 3,
            maxMana: Math.floor(Math.random() * 3) + 2,
            attack: Math.floor(Math.random() * 2) + 1
          };

          const newMessage = `You defeated the ${currentEnemy.name} and gained ${xpGained} XP.`;
          playDefeated();

          handleEnemyDefeated();
          updateMessage(newMessage);

          while (updatedPlayer.xp >= updatedPlayer.xpToLevelUp) {
            updatedPlayer.xp -= updatedPlayer.xpToLevelUp;
            updatedPlayer.level++;
            updatedPlayer.xpToLevelUp += 25 + randomStatsNumber.xpToLevelUp;
            updatedPlayer.maxHealth += 5 + randomStatsNumber.maxHealth;
            updatedPlayer.health = updatedPlayer.maxHealth;
            updatedPlayer.maxMana += 3 + randomStatsNumber.maxMana;
            updatedPlayer.mana = updatedPlayer.maxMana;
            updatedPlayer.attack += randomStatsNumber.attack;

            const newLevelUpMessage = `Congratulations! You leveled up to Level ${updatedPlayer.level}!`;
            updateMessage(newLevelUpMessage);

            console.log("");
            console.log(`Level UP! You're now Level ${updatedPlayer.level}`);
            console.log("=========Player Stats=========");
            console.log(`HP: ${updatedPlayer.maxHealth} / SHIELD: ${updatedPlayer.shieldHealth}`);
            console.log(`MP: ${updatedPlayer.maxMana}`);
            console.log(`ATK: ${updatedPlayer.attack} / SWORD: (${updatedPlayer.swordDamage})`);
            console.log(`XP: ${updatedPlayer.xp} / ${updatedPlayer.xpToLevelUp}`);
            console.log("------------------------------");
            console.log("");
          }
          function checkRandomEvent() {
            const randomNumber = Math.random();
            const itemChance = .9;
            if (randomNumber < itemChance) {
              const foundItemIndex = Math.floor(Math.random() * items.length);
              const foundItem = items[foundItemIndex];
              foundItem.quantity--;

              if (foundItem.quantity === 0) {
                items.splice(foundItemIndex, 1);
              }
              const newMessage = `You found a ${foundItem.name}!`;
              updateMessage(newMessage);

              if (foundItem) {
                const { updatedPlayer } = handleItem(foundItem, player);
                setPlayer(updatedPlayer);
              }
              return foundItem;
            }
            return null;
          }

          const foundItem = checkRandomEvent();

          if (foundItem) {
            playReward();
            if (foundItem.type === "Consumable") {
              if (foundItem.attributes.healthRestore) {
                updatedPlayer.health += foundItem.attributes.healthRestore;
                updatedPlayer.health = Math.min(updatedPlayer.health, updatedPlayer.maxHealth);
              }
              if (foundItem.attributes.manaRestore) {
                updatedPlayer.mana += foundItem.attributes.manaRestore;
                updatedPlayer.mana = Math.min(updatedPlayer.mana, updatedPlayer.maxMana);
              }
            } else if (foundItem.type === "sword") {
              if (foundItem.attributes.damageBonus > updatedPlayer.swordDamage) {
                updatedPlayer.swordDamage = foundItem.attributes.damageBonus;
                updatedPlayer.attack = updatedPlayer.attack - player.swordDamage + updatedPlayer.swordDamage;
              }
            } else if (foundItem.type === "shield") {
              if (
                foundItem.attributes.healthBonus &&
                !isNaN(foundItem.attributes.healthBonus) &&
                foundItem.attributes.healthBonus > updatedPlayer.shieldHealth
              ) {
                updatedPlayer.shieldHealth = foundItem.attributes.healthBonus;
                updatedPlayer.maxHealth += foundItem.attributes.healthBonus;
              }
            }
          }
          setTimeout(() => {
            enemyImageElement.classList.add("enemy-defeated-animation");
          }, 100);

          setPlayer(updatedPlayer);
          setTimeout(() => {
            const nextEnemyIndex = currentEnemyIndex + 1;
            setCurrentEnemyIndex(nextEnemyIndex);
            enemyImageElement.classList.remove("enemy-defeated-animation");

            const nextEnemy = getRandomEnemy();
            updatedEnemies[nextEnemyIndex] = nextEnemy;
            enemyImageElement.classList.add("enemy-appeared-animation");
          }, 500);

          setTimeout(() => {
            setPlayerDamage(magicDamage);
            playDefeated();
          }, 500);

          setTimeout(() => {
            enemyImageElement.classList.remove("enemy-appeared-animation");
            const newMessage = `A new enemy appeared! Prepare to fight!`;
            updateMessage(newMessage);
          }, 600);

          console.log(`New enemy: ${currentEnemy.name}`);
        } else {

          // Enemy still alive
          const newMessage = `You used a magic attack and dealt ${magicDamage} damage to the ${currentEnemy.name}.`;
          updateMessage(newMessage);
          setPlayerDamage(magicDamage);
          console.log(`Player attacked ${currentEnemy.name} with magic: ${magicDamage}`);
        }
        enemyImageElement.classList.remove("enemy-appeared-animation");
      }, 600);

      setIsMagicAttack(false);
      setEnemies(updatedEnemies);
      setIsPlayerTurn(false);
    }
  }, [
    player,
    currentEnemyIndex,
    enemies,
    isMagicAttack,
    setPlayer,
    setEnemies,
    setCurrentEnemyIndex,
    setIsPlayerTurn,
    updateMessage,
    handleItem
  ]);


  const handleNextTurn = useCallback(() => {

    if (!gameOver && isPlayerTurn) {
      const magicAttack = isMagicAttack ? playerAttack : null;
      playerAttack(magicAttack);
      setIsPlayerTurn(false);

      const currentEnemy = enemies[currentEnemyIndex];
      if (currentEnemy && currentEnemy.health > 0) {
        setTimeout(() => {
          enemyAttack();
          setIsPlayerTurn(false);
        }, 800);
      } else {

        const nextEnemyIndex = currentEnemyIndex + 1;
        if (nextEnemyIndex < enemies.length) {
          setCurrentEnemyIndex(nextEnemyIndex);
        }

      }
    } else {
      setIsPlayerTurn(false);
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
      }, 1500);

      return () => clearTimeout(delay);
    }
  }, [isPlayerTurn, gameOver, enemyAttack, enemies, currentEnemyIndex]);

  useEffect(() => {
    if (gameOver) {
      player.health = 0;
      setDefeatedEnemyCounter(1);
    }
  }, [gameOver, player]);

  const handleRestart = useCallback(() => {
    if (gameOver) {
      resetEnemyDefeated();
      setPlayer(initialPlayerState);
      setEnemies([getRandomEnemy()]);
      setCurrentEnemyIndex(0);
      setIsPlayerTurn(true);
      setGameOver(false);
      const newMessage = "Welcome Back to Life noble warrior!";
      updateMessage(newMessage);
    }
  }, [gameOver, initialPlayerState, updateMessage]);

  return (
    
      <StyledHome>
        <ContainerDefault ref={targetRef}>
          <BotoesWrapper />
        </ContainerDefault>
        <Console>
          <div className="frame">
            <Screen>
              <div className="organizador huds">
                <div className="enemy-hud">
                  <p>{defeatedEnemiesCounter}</p>
                  <p>{enemies[currentEnemyIndex].name}</p>
                  <p>HP: {enemies[currentEnemyIndex].health}</p>
                </div>
                <div className="player-hud">
                  <p>
                    HP: {player.health}/{player.maxHealth}
                  </p>
                  <p>
                    MP: {player.mana}/{player.maxMana}
                  </p>
                  <p>Atk: {player.attack}</p>
                  <p>lvl: {player.level}</p>
                  <p>
                    xp: {player.xp}/{player.xpToLevelUp}
                  </p>
                </div>
              </div>
              <div className="sprites">
                <EnemyImage
                  className="enemy-img"
                  src={enemies[currentEnemyIndex].img}
                  alt={enemies[currentEnemyIndex].name}
                />
                <PlayerImage
                  className="player-img"
                  src={player.img}
                  alt="player"
                />
              </div>
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
                onClick={handleMagicAttack}
                disabled={!isPlayerTurn || gameOver || player.mana < 20}
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
        <ConsoleLog>
          <p>⚔️ Battle Log ⚔️</p>
          <ul ref={ulRef}>
            {messageHistory.map((msg, index) => (
              <li key={index} style={{ color: getMessageColor(msg) }}>{msg}</li>
            ))}
          </ul>
        </ConsoleLog>
      </StyledHome>
    
  );
};

export default Game;
