import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Botoes,
  Button,
  Console,
  ConsoleLog,
  ContainerDefault,
  EnemyImage,
  PlayerImage,
  Screen,
  StartButton,
  StyledHome,
} from "../../styles/styles";
import BotoesWrapper, { playDefeated, playMissed, playReward, playTookDamage } from "../buttons";
import { playEnemyDamageSFX, playCriticalHit } from '../buttons/index';

const items = [
  {
    id: 1,
    name: "Small Health Potion",
    type: "Consumable",
    attributes: {
      healthRestore: 20
    },
    quantity: 5
  },
  {
    id: 2,
    name: "Small Mana Potion",
    type: "Consumable",
    attributes: {
      manaRestore: 15
    },
    quantity: 5
  },
  {
    id: 3,
    name: "Health Potion",
    type: "Consumable",
    attributes: {
      healthRestore: 35
    },
    quantity: 5
  },
  {
    id: 4,
    name: "Mana Potion",
    type: "Consumable",
    attributes: {
      manaRestore: 30
    },
    quantity: 5
  },
  {
    id: 5,
    name: "Royal Sword",
    type: "sword",
    attributes: {
      damageBonus: 3,
    },
    quantity: 1
  },
  {
    id: 6,
    name: "Royal Shield",
    type: "shield",
    attributes: {
      healthBonus: 5,
    },
    quantity: 1
  },
  {
    id: 7,
    name: "Mithril Sword",
    type: "sword",
    attributes: {
      damageBonus: 5,
    },
    quantity: 1
  },
  {
    id: 8,
    name: "Mithril Shield",
    type: "shield",
    attributes: {
      healthBonus: 8,
    },
    quantity: 1
  },
  {
    id: 9,
    name: "Dragon Sword",
    type: "sword",
    attributes: {
      damageBonus: 9,
    },
    quantity: 3
  },
  {
    id: 10,
    name: "Dragon Shield",
    type: "shield",
    attributes: {
      healthBonus: 15,
    },
    quantity: 3
  }
];




const getRandomEnemy = () => {
  const enemyTypes = [
    {
      name: "Goblin",
      maxHealth: 12,
      atk: 3,
      xp: 6,
      img: "./assets/goblin.png",
    },
    {
      name: "Goblin",
      maxHealth: 18,
      atk: 4,
      xp: 10,
      img: "./assets/goblin.png",
    },
    {
      name: "Goblin",
      maxHealth: 20,
      atk: 5,
      xp: 12,
      img: "./assets/goblin.png",
    },
    {
      name: "Spider",
      maxHealth: 14,
      atk: 6,
      xp: 8,
      img: "./assets/spider.png",
    },
    {
      name: "Spider",
      maxHealth: 20,
      atk: 7,
      xp: 10,
      img: "./assets/spider.png",
    },
    {
      name: "Spider",
      maxHealth: 22,
      atk: 8,
      xp: 12,
      img: "./assets/spider.png",
    },
    { name: "Thief", maxHealth: 28, atk: 9, xp: 20, img: "./assets/ppl.png" },
    { name: "Thief", maxHealth: 28, atk: 9, xp: 20, img: "./assets/ppl.png" },
    { name: "Thief", maxHealth: 28, atk: 9, xp: 20, img: "./assets/ppl.png" },
    { name: "Wolf", maxHealth: 16, atk: 7, xp: 10, img: "./assets/wolf.png" },
    { name: "Wolf", maxHealth: 16, atk: 7, xp: 10, img: "./assets/wolf.png" },
    { name: "Wolf", maxHealth: 16, atk: 7, xp: 10, img: "./assets/wolf.png" },
    {
      name: "Dragon",
      maxHealth: 100,
      atk: 20,
      xp: 300,
      img: "./assets/dragon.png",
    }
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
      maxHealth: 40,
      health: 40,
      maxMana: 30,
      mana: 30,
      attack: 4,
      swordDamage: 0,
      shieldHealth: 0,
      xp: 0,
      level: 1,
      xpToLevelUp: 20,
      img: "./assets/red-mage.webp",
    }),
    []
  );

  const [player, setPlayer] = useState(initialPlayerState);
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [playerDamage, setPlayerDamage] = useState("");
  const [enemyDamage, setEnemyDamage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [isMagicAttack, setIsMagicAttack] = useState(false);
  const [enemies, setEnemies] = useState([getRandomEnemy()]);


  const updateMessage = (newMessage) => {
    setMessage(newMessage);
    setMessageHistory((prevHistory) => [...prevHistory, newMessage]);
  };

  const ulRef = useRef(null); // Declare and initialize the ulRef

  useEffect(() => {
    if (ulRef.current) {
      const newestLi = ulRef.current.lastChild;
      if (newestLi) {
        newestLi.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messageHistory]);

  const targetRef = useRef(null);

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const getMessageColor = (message) => {
    if (message.includes('Congratulations')) {
      return 'lime'; // Set the color to green for specific message
    }
    if (message.includes('You defeated')) {
      return 'orangeRed'; // Set the color to red for specific message
    }
    if (message.includes('magic')) {
      return 'cyan'; // Set the color to red for specific message
    }
    if (message.includes('found')) {
      return 'gold'; // Set the color to red for specific message
    }
    if (message.includes('You dodged')) {
      return 'lightSkyBlue'; // Set the color to red for specific message
    }
    if (message.includes('critical')) {
      return 'Magenta'; // Set the color to red for specific message
    }
    if (message.includes('the enemy dodged')) {
      return 'indianRed'; // Set the color to red for specific message
    }
    if (message.includes('equipped')) {
      return 'lawnGreen'; // Set the color to red for specific message
    }
    if (message.includes('restore')) {
      return 'lawnGreen'; // Set the color to red for specific message
    }
    // Set default color for other messages
    return 'white';
  };


  const playerAttack = useCallback(() => {
    if (!isPlayerTurn || gameOver) {
      return; // Prevent attack if it's not the player's turn or the game is over
    }

    function checkRandomEvent() {
      // Generate a random number between 0 and 1
      const randomNumber = Math.random();

      // Calculate the chance of finding an item (e.g., 20%)
      const itemChance = .25;

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
        if (foundItem.type === "Consumable") {
          // It's a consumable item (e.g., potion)
          // Apply the attributes to the player's health or mana
          if (foundItem.attributes.healthRestore) {
            const updatedPlayer = { ...player }; // Create a copy of the player object
            updatedPlayer.health += parseInt(foundItem.attributes.healthRestore);
            // Ensure the player's health doesn't exceed the maximum health
            updatedPlayer.health = Math.min(updatedPlayer.health, updatedPlayer.maxHealth);
            setPlayer(updatedPlayer); // Update the player state
            console.log(`You used a ${foundItem.name} and restored ${foundItem.attributes.healthRestore} health.`);

            const newMessage = `You used a ${foundItem.name} and restored ${foundItem.attributes.healthRestore} health.`;
            updateMessage(newMessage);
          }
          if (foundItem.attributes.manaRestore) {
            const updatedPlayer = { ...player }; // Create a copy of the player object
            updatedPlayer.mana += parseInt(foundItem.attributes.manaRestore);
            // Ensure the player's mana doesn't exceed the maximum mana
            updatedPlayer.mana = Math.min(updatedPlayer.mana, updatedPlayer.maxMana);
            setPlayer(updatedPlayer); // Update the player state
            console.log(`You used a ${foundItem.name} and restored ${foundItem.attributes.manaRestore} mana.`);

            const newMessage = `You used a ${foundItem.name} and restored ${foundItem.attributes.manaRestore} mana.`;
            updateMessage(newMessage);
          }
        } else if (foundItem.type === "sword") {
          // It's a sword
          // Check if the found sword is better than the current one
          if (foundItem.attributes.damageBonus > player.swordDamage) {
            const updatedPlayer = { ...player }; // Create a copy of the player object
            updatedPlayer.attack -= updatedPlayer.swordDamage; // Subtract the current sword damage
            updatedPlayer.swordDamage = foundItem.attributes.damageBonus;
            updatedPlayer.attack += updatedPlayer.swordDamage; // Add the new sword damage
            setPlayer(updatedPlayer); // Update the player state

            const newMessage = `You equipped the (${foundItem.name}) (${foundItem.attributes.damageBonus} ATK)! Your attack has increased to ${updatedPlayer.attack}.`;
            updateMessage(newMessage);

            console.log(`You found a better sword (${foundItem.name}) (${foundItem.attributes.damageBonus} ATK)! Your attack has increased to ${updatedPlayer.attack}.`);
          }
          else {
            console.log(`You found a worse sword (${foundItem.name}) (${foundItem.attributes.damageBonus} ATK)! Your attack remains the same.`);
            const newMessage = `This sword is worse than yours! Your stats remains the same`;
            updateMessage(newMessage);
          }
        } else if (foundItem.type === "shield") {
          // It's a shield
          // Check if the found shield is better than the current one
          if (foundItem.attributes.healthBonus > player.shieldHealth) {
            const updatedPlayer = { ...player }; // Create a copy of the player object
            updatedPlayer.health -= updatedPlayer.shieldHealth; // Subtract the current shield health
            updatedPlayer.shieldHealth = foundItem.attributes.healthBonus;
            updatedPlayer.maxHealth += updatedPlayer.shieldHealth; // Add the new shield health
            setPlayer(updatedPlayer); // Update the player state

            const newMessage = `You equipped the (${foundItem.name}) (${foundItem.attributes.healthBonus} HP)! Your health has increased to ${updatedPlayer.maxHealth}.`;
            updateMessage(newMessage);

            setTimeout(() => {
              console.log(`You found a better shield (${foundItem.name}) (${foundItem.attributes.healthBonus} HP)! Your health has increased to ${updatedPlayer.maxHealth}.`);
            }, 500);

          }
          else {
            console.log(`You found a worse shield (${foundItem.name}) (${foundItem.attributes.healthBonus} HP)! Your health remains the same.`);
            const newMessage = `This shield is worse than yours! Your stats remains the same`;
            updateMessage(newMessage);
          }
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
        // Enemy defeated

        setTimeout(() => {
          enemyImageElement.classList.add("enemy-defeated-animation");
        }, 500);

        playerDamage = currentEnemy.health; // Limit player damage to the enemy's remaining health
        currentEnemy.health = 0; // Set enemy health to 0

        // Increase player XP
        const xpGained = currentEnemy.xp;
        updatedPlayer.xp += xpGained;
        
        const randomStatsNumber = {
          xpToLevelUp: Math.floor(Math.random() * 2) + 8,
          maxHealth: Math.floor(Math.random() * 15) + 5,
          maxMana: Math.floor(Math.random() * 5) + 5,
          attack: Math.floor(Math.random() * 2) + 1
        };
        const newMessage = `You defeated the ${currentEnemy.name} and gained ${xpGained} XP.`;
        playDefeated();
  
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

  }, [isPlayerTurn, gameOver, player, enemies, currentEnemyIndex]);

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


      setTimeout(() => {
        enemyImageElement.classList.add("enemy-damage-animation");
        playerImageElement.classList.remove("magic-attack-animation");
      }, 500);


      const updatedEnemies = [...enemies];
      const currentEnemy = updatedEnemies[currentEnemyIndex];

      const magicDamage = player.attack * 3; // Calculate the magic damage
      setTimeout(() => {
        currentEnemy.health -= magicDamage; // Subtract the magic damage from enemy's health
        if (currentEnemy.health <= 0) {
          // Enemy defeated
          currentEnemy.health = 0; // Ensure health doesn't go below 0
          // Increase player XP
          const xpGained = currentEnemy.xp;
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            xp: prevPlayer.xp + xpGained,
          }));
          setTimeout(() => {
            enemyImageElement.classList.remove("enemy-damage-animation");
            enemyImageElement.classList.add("enemy-defeated-animation");
          }, 500);
          // Check if player levels up
          if (player.xp >= player.xpToLevelUp) {
            setPlayer((prevPlayer) => ({
              ...prevPlayer,
              xp: prevPlayer.xp - prevPlayer.xpToLevelUp,
              level: prevPlayer.level + 1,
              xpToLevelUp: prevPlayer.xpToLevelUp + 20,
              maxHealth: prevPlayer.maxHealth + 10,
              health: prevPlayer.maxHealth + 10,
              maxMana: prevPlayer.maxMana + 5,
              mana: prevPlayer.maxMana + 5,
              attack: prevPlayer.attack + 2,
            }));
            const newMessage =
              `Congratulations! You leveled up to Level ${player.level + 1}!`;
            updateMessage(newMessage);
            console.log('lvl up - magic')
          } else {
            const newMessage =
              `You defeated the ${currentEnemy.name} and gained ${xpGained} XP.`;

            updateMessage(newMessage);
            console.log(`${currentEnemy.name} defeated by magic: ${xpGained}`)
            setIsPlayerTurn(false);

          }
          setTimeout(() => {
            enemyImageElement.classList.add("enemy-defeated-animation");
          }, 500);
          
          setEnemies(updatedEnemies);
          setTimeout(() => {
            // Continue to the next enemy
            const nextEnemyIndex = currentEnemyIndex + 1;
            setCurrentEnemyIndex(nextEnemyIndex);

            // Reset the health of the next enemy
            enemyImageElement.classList.remove("enemy-defeated-animation");
            
            const nextEnemy = getRandomEnemy();
            updatedEnemies[nextEnemyIndex] = nextEnemy;
            enemyImageElement.classList.add("enemy-appeared-animation");
          }, 1650);
          

          setTimeout(() => {
            setPlayerDamage(magicDamage);
            playDefeated();

          }, 500);

          setTimeout(() => {
            enemyImageElement.classList.remove("enemy-appeared-animation");
            const newMessage = `A new enemy came up! Prepare to fight!`;
            updateMessage(newMessage);
          }, 500); // Delay of 2 seconds before showing the next enemy arrival message
          
          console.log(`new enemy: ${currentEnemy.name}`)

        } else {
          // Enemy still alive
          const newMessage =
            `You used a magic attack and dealt ${magicDamage} damage to the ${currentEnemy.name}.`
            ;
          updateMessage(newMessage);
          setPlayerDamage(magicDamage);
          console.log(`player attacked ${currentEnemy.name} with magic: ${magicDamage}`)
        }
        enemyImageElement.classList.remove("enemy-appeared-animation");
      }, 500);


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
    setMessage,
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
          setIsPlayerTurn(true);
        }, 2000);
      } else {
        const nextEnemyIndex = currentEnemyIndex + 1;
        if (nextEnemyIndex < enemies.length) {
          setCurrentEnemyIndex(nextEnemyIndex);
        }
        setIsPlayerTurn(true);
      }
    } else {
      setIsPlayerTurn(true);
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
      const newMessage = "Welcome Back to Life noble warrior!";
      updateMessage(newMessage);
    }
  }, [gameOver, initialPlayerState]);

  return (
    <StyledHome>
      <ContainerDefault ref={targetRef}>
        <BotoesWrapper>

        </BotoesWrapper>
      </ContainerDefault>
      <Console>
        <div className="frame">
          <Screen>
            <div className="organizador huds">
              <div className="enemy-hud">
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
