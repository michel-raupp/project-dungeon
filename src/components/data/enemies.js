const enemyTypes = [
  // Region 1 Enemies
  {
    name: "Goblin",
    region: 1,
    maxHealth: 10 + Math.floor(Math.random() * 5),
    atk: 2 + Math.floor(Math.random() * 2),
    xp: 5 + Math.floor(Math.random() * 2),
    img: "./assets/goblin.png",
  },
  {
    name: "Spider",
    region: 1,
    maxHealth: 12 + Math.floor(Math.random() * 6),
    atk: 3 + Math.floor(Math.random() * 2),
    xp: 6 + Math.floor(Math.random() * 2),
    img: "./assets/spider.png",
  },
  // Region 1.5 Boss
  {
    name: "Dragon",
    region: 1.5,
    maxHealth: 80 + Math.floor(Math.random() * 21),
    atk: 15 + Math.floor(Math.random() * 6),
    xp: 50 + Math.floor(Math.random() * 11),
    img: "./assets/dragon.png",
  },
   // Region 2 Enemies
   {
    name: "Thief",
    region: 2,
    maxHealth: 25 + Math.floor(Math.random() * 11),
    atk: 7 + Math.floor(Math.random() * 4),
    xp: 15 + Math.floor(Math.random() * 6),
    img: "./assets/thief.png",
  },
  {
    name: "Wolf",
    region: 2,
    maxHealth: 18 + Math.floor(Math.random() * 8),
    atk: 5 + Math.floor(Math.random() * 4),
    xp: 10 + Math.floor(Math.random() * 6),
    img: "./assets/wolf.png",
  },
  {
    name: "Dragon",
    region: 2.5,
    maxHealth: 150 + Math.floor(Math.random() * 31),
    atk: 25 + Math.floor(Math.random() * 11),
    xp: 100 + Math.floor(Math.random() * 21),
    img: "./assets/dragon.png",
  },

];
let defeatedEnemyCounter = 8;
function handleEnemyDefeated() {
  defeatedEnemyCounter += 1;
  // Additional logic related to enemy defeated
}

const getRandomEnemy = () => {
  
  // Check if defeatedEnemyCounter is less than 10
  console.log("console: "+ defeatedEnemyCounter)
  if (defeatedEnemyCounter < 10) {
    // Spawn region 1 enemies
    const regionOneEnemies = enemyTypes.filter((enemy) => enemy.region === 1);
    const randomIndex = Math.floor(Math.random() * regionOneEnemies.length);
    const randomEnemy = regionOneEnemies[randomIndex];

    return {
      ...randomEnemy,
      health: randomEnemy.maxHealth,
    };
  } else if (defeatedEnemyCounter === 10) {
    // Spawn the region 1.5 enemy (boss)
    const regionOneEnemies = enemyTypes.filter((enemy) => enemy.region === 1.5);
    const randomIndex = Math.floor(Math.random() * regionOneEnemies.length);
    const randomEnemy = regionOneEnemies[randomIndex];

    return {
      ...randomEnemy,
      health: randomEnemy.maxHealth,
    };
  } else if (defeatedEnemyCounter >= 11 && defeatedEnemyCounter <= 19) {
    // Spawn region 2 enemies
    const regionTwoEnemies = enemyTypes.filter((enemy) => enemy.region === 2);
    const randomIndex = Math.floor(Math.random() * regionTwoEnemies.length);
    const randomEnemy = regionTwoEnemies[randomIndex];
    const scalingFactor = defeatedEnemyCounter - 10;
    const scaledMaxHealth = randomEnemy.maxHealth + scalingFactor * 2;
    const scaledAtk = randomEnemy.atk + scalingFactor;
    const scaledXp = randomEnemy.xp + scalingFactor * 2;

    return {
      ...randomEnemy,
      maxHealth: scaledMaxHealth,
      atk: scaledAtk,
      xp: scaledXp,
      health: scaledMaxHealth,
    };
  } else {
    // Spawn region 2 enemies (after the 20th enemy defeat)
    const regionTwoEnemies = enemyTypes.filter((enemy) => enemy.region === 2);
    const randomIndex = Math.floor(Math.random() * regionTwoEnemies.length);
    const randomEnemy = regionTwoEnemies[randomIndex];

    return {
      ...randomEnemy,
      health: randomEnemy.maxHealth,
    };
  }
};


export { getRandomEnemy, handleEnemyDefeated };