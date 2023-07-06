import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Button, Console, ConsoleLog, ContainerDefault, EnemyImage, PlayerImage, Screen, StartButton, StyledHome } from "../../styles/styles";
import BotoesWrapper from "../buttons-and-sounds";
import { playDefeated, playMagicAttack, playMissed, playReward, playTookDamage, playEnemyDamageSFX, playCriticalHit } from "../buttons-and-sounds/sounds"
import { getDefeatedEnemyCounter, getRandomEnemy, handleEnemyDefeated, setDefeatedEnemyCounter } from "../data/enemies";
import { useItemHandling, items } from "../data/items";
import { useMessage, getMessageColor } from './message';
import Window from "../windows";

const Game = () => {

  const initialPlayerState = useMemo(
    () => ({
      name: "Player",
      maxHealth: 50,
      health: 5,
      maxMana: 20,
      mana: 20,
      attack: 50,
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
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const playerAttack = useCallback(() => {
    if (!isPlayerTurn || gameOver) {
      return; // Prevent attack if it's not the player's turn or the game is over
    }
    setIsPlayerTurn(false)
    function checkRandomEvent() {
      // Generate a random number between 0 and 1
      const randomNumber = Math.random();

      // Calculate the chance of finding an item (e.g., 20%)
      const itemChance = .9;

      // Check if the random number is less than the item chance
      if (randomNumber < itemChance) {
        // Random event occurred - player found an item
        // Choose a random item from the items array
        const foundItemIndex = Math.floor(Math.random() * items.length);
        const foundItem = items[foundItemIndex];

        // Remove 1 from the quantity of the found item
        foundItem.quantity--;

        // If the quantity of the found item is 0, remove it from the items array
        if (foundItem.quantity === 0) {
          items.splice(foundItemIndex, 1);
        }
        const newMessage = `You found a ${foundItem.name}!`;
        updateMessage(newMessage);
        // Apply the item's attributes to the player based on its type

        if (foundItem) {
          const { updatedPlayer } = handleItem(foundItem, player);
          setPlayer(updatedPlayer); // Atualize o estado do jogador com o jogador atualizado
        }
        // Return the found item
        return foundItem;
      }

      // No random event occurred, return null to indicate no item was found
      return null;
    }


    const playerImageElement = document.querySelector(".player-img");
    const enemyImageElement = document.querySelector(".enemy-img");

    const updatedEnemies = [...enemies];
    const currentEnemy = updatedEnemies[currentEnemyIndex];

    let playerDamage;
    let updatedPlayer = { ...player };

    const criticalHitChance = Math.random(); // Generate a random number between 0 and 1 for critical hit chance
    const isCriticalHit = criticalHitChance < 0.1; // 10% critical hit chance

    const missChance = Math.random(); // Generate a random number between 0 and 1 for critical hit chance
    const isMissed = missChance < 0.1; // Assuming a 10% miss hit chance
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
        // Critical hit: deal 200% of the base attack
        playerDamage = Math.floor(updatedPlayer.attack * 2);
        console.log("Critical Hit!");
        const newMessage = `You dealt a critical hit! The enemy took ${playerDamage} damage.`;
        setPlayerDamage(playerDamage);

        playCriticalHit();
        updateMessage(newMessage);
      } else {
        // Normal hit: deal the base attack
        playerDamage = updatedPlayer.attack;
        setPlayerDamage(playerDamage);
      }

      // Player gets hit by the enemy's attack

      // updatedPlayer.health -= currentEnemy.atk;
      // currentEnemy.health -= playerDamage;
      // Attack animation
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

        playerDamage = currentEnemy.health; // Limit player damage to the enemy's remaining health
        currentEnemy.health = 0; // Set enemy health to 0

        // Increase player XP
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
        // Check if player levels up
        while (updatedPlayer.xp >= updatedPlayer.xpToLevelUp) {
          // Deduct XP and level up multiple times if necessary
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

        // Generate a random event to check if an item is found
        const foundItem = checkRandomEvent();

        if (foundItem) {
          playReward();
          // Apply the item's attributes to the player based on its type
          if (foundItem.type === "Consumable") {
            // It's a consumable item (e.g., potion)
            // Apply the attributes to the player's health or mana
            if (foundItem.attributes.healthRestore) {
              updatedPlayer.health += foundItem.attributes.healthRestore;
              // Ensure the health doesn't exceed the maxHealth
              updatedPlayer.health = Math.min(updatedPlayer.health, updatedPlayer.maxHealth);
            }
            if (foundItem.attributes.manaRestore) {
              updatedPlayer.mana += foundItem.attributes.manaRestore;
              // Ensure the mana doesn't exceed the maxMana
              updatedPlayer.mana = Math.min(updatedPlayer.mana, updatedPlayer.maxMana);
            }
          } else if (foundItem.type === "sword") {
            // It's a sword
            // Check if the found sword is better than the current one
            if (foundItem.attributes.damageBonus > updatedPlayer.swordDamage) {
              updatedPlayer.swordDamage = foundItem.attributes.damageBonus;
              updatedPlayer.attack = updatedPlayer.attack - player.swordDamage + updatedPlayer.swordDamage;
            }
          } else if (foundItem.type === "shield") {
            // It's a shield
            // Check if the found shield is better than the current one
            if (
              foundItem.attributes.healthBonus &&
              !isNaN(foundItem.attributes.healthBonus) &&
              foundItem.attributes.healthBonus > updatedPlayer.shieldHealth
            ) {
              updatedPlayer.shieldHealth = foundItem.attributes.healthBonus;
              // Update the player's health with the new shield health
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
        }, 1000); // Delay of 1.65 seconds before showing the next enemy arrival message
        console.log(`new enemy: ${currentEnemy.name}`);
        console.log(`player health: ${player.health}`);

      } else {
        // Enemy still alive
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

    const dodgeChance = Math.random(); // Generate a random number between 0 and 1 for dodge chance
    const isDodge = dodgeChance < 0.1; // 10% dodge chance

    const playerImageElement = document.querySelector(".player-img");
    const enemyImageElement = document.querySelector(".enemy-img");

    if (isDodge) {
      // Player dodges the attack
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
      const damage = currentEnemy.atk; // Access 'atk' property directly
      // updatedPlayer.health -= damage;

      if (updatedPlayer.health <= 0) {
        // Player defeated
        const newMessage = `You were defeated by the ${currentEnemy.name}. Game Over!`;
        updateMessage(newMessage);
        console.log('game over')
        updatedPlayer.health = 0;
        setGameOver(true);
      } else {
        // Player still alive
        const newMessage =
          `The ${currentEnemy.name} attacked! You took ${damage} damage.`
          ;
        playTookDamage();
        setEnemyDamage(currentEnemy.atk);
        updateMessage(newMessage);
        updatedPlayer.health -= currentEnemy.atk;

        console.log(`${currentEnemy.name} attacked, player took damage: ${damage} `)
        // Took Damage animation

        playerImageElement.classList.add("player-damage-animation");
        enemyImageElement.classList.add("enemy-attack-animation");

        setTimeout(() => {
          playerImageElement.classList.remove("player-damage-animation");
          enemyImageElement.classList.remove("enemy-attack-animation");

        }, 500);
        if (updatedPlayer.health <= 0) {
          // Player defeated
          const newMessage = `You were defeated by the ${currentEnemy.name}. Game Over!`;
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
      // Attack animation
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

      const magicDamage = player.attack * 3; // Calculate the magic damage
      setTimeout(() => {
        currentEnemy.health -= magicDamage; // Subtract the magic damage from the enemy's health
        if (currentEnemy.health <= 0) {
          setIsPlayerTurn(false);

          // Enemy defeated
          currentEnemy.health = 0; // Ensure health doesn't go below 0

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

          // Check if player levels up
          while (updatedPlayer.xp >= updatedPlayer.xpToLevelUp) {
            // Deduct XP and level up multiple times if necessary
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
            // Generate a random number between 0 and 1
            const randomNumber = Math.random();

            // Calculate the chance of finding an item (e.g., 20%)
            const itemChance = .9;

            // Check if the random number is less than the item chance
            if (randomNumber < itemChance) {
              // Random event occurred - player found an item
              // Choose a random item from the items array
              const foundItemIndex = Math.floor(Math.random() * items.length);
              const foundItem = items[foundItemIndex];

              // Remove 1 from the quantity of the found item
              foundItem.quantity--;

              // If the quantity of the found item is 0, remove it from the items array
              if (foundItem.quantity === 0) {
                items.splice(foundItemIndex, 1);
              }
              const newMessage = `You found a ${foundItem.name}!`;
              updateMessage(newMessage);
              // Apply the item's attributes to the player based on its type

              if (foundItem) {
                const { updatedPlayer } = handleItem(foundItem, player);
                setPlayer(updatedPlayer); // Atualize o estado do jogador com o jogador atualizado
              }
              // Return the found item
              return foundItem;
            }

            // No random event occurred, return null to indicate no item was found
            return null;
          }

          // Generate a random event to check if an item is found
          const foundItem = checkRandomEvent();

          if (foundItem) {
            playReward();
            // Apply the item's attributes to the player based on its type
            if (foundItem.type === "Consumable") {
              // It's a consumable item (e.g., potion)
              // Apply the attributes to the player's health or mana
              if (foundItem.attributes.healthRestore) {
                updatedPlayer.health += foundItem.attributes.healthRestore;
                // Ensure the health doesn't exceed the maxHealth
                updatedPlayer.health = Math.min(updatedPlayer.health, updatedPlayer.maxHealth);
              }
              if (foundItem.attributes.manaRestore) {
                updatedPlayer.mana += foundItem.attributes.manaRestore;
                // Ensure the mana doesn't exceed the maxMana
                updatedPlayer.mana = Math.min(updatedPlayer.mana, updatedPlayer.maxMana);
              }
            } else if (foundItem.type === "sword") {
              // It's a sword
              // Check if the found sword is better than the current one
              if (foundItem.attributes.damageBonus > updatedPlayer.swordDamage) {
                updatedPlayer.swordDamage = foundItem.attributes.damageBonus;
                updatedPlayer.attack = updatedPlayer.attack - player.swordDamage + updatedPlayer.swordDamage;
              }
            } else if (foundItem.type === "shield") {
              // It's a shield
              // Check if the found shield is better than the current one
              if (
                foundItem.attributes.healthBonus &&
                !isNaN(foundItem.attributes.healthBonus) &&
                foundItem.attributes.healthBonus > updatedPlayer.shieldHealth
              ) {
                updatedPlayer.shieldHealth = foundItem.attributes.healthBonus;
                // Update the player's health with the new shield health
                updatedPlayer.maxHealth += foundItem.attributes.healthBonus;
              }
            }
          }
          setTimeout(() => {
            enemyImageElement.classList.add("enemy-defeated-animation");
          }, 100);

          setPlayer(updatedPlayer);
          setTimeout(() => {
            // Continue to the next enemy
            const nextEnemyIndex = currentEnemyIndex + 1;
            setCurrentEnemyIndex(nextEnemyIndex);

            // Reset the health of the next enemy
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
          }, 600); // Delay of 2 seconds before showing the next enemy arrival message

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
    updateMessage
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
      }, 1500); // 2 second delay

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
