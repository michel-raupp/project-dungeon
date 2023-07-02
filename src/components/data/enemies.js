const enemyTypes = [
  {
    name: "Goblin",
    region: 1,
    maxHealth: 12,
    atk: 3,
    xp: 6,
    img: "./assets/goblin.png",
  },
  {
    name: "Goblin",
    region: 1,
    maxHealth: 18,
    atk: 4,
    xp: 10,
    img: "./assets/goblin.png",
  },
  {
    name: "Goblin",
    region: 1,
    maxHealth: 20,
    atk: 5,
    xp: 12,
    img: "./assets/goblin.png",
  },
  {
    name: "Spider",
    region: 1,
    maxHealth: 14,
    atk: 6,
    xp: 8,
    img: "./assets/spider.png",
  },
  {
    name: "Spider",
    region: 1,
    maxHealth: 20,
    atk: 7,
    xp: 10,
    img: "./assets/spider.png",
  },
  {
    name: "Spider",
    region: 1,
    maxHealth: 22,
    atk: 8,
    xp: 12,
    img: "./assets/spider.png",
  },
  {
    name: "Thief",
    region: 2,
    maxHealth: 28,
    atk: 9,
    xp: 20,
    img: "./assets/ppl.png"
  },
  {
    name: "Thief",
    region: 2,
    maxHealth: 28,
    atk: 9,
    xp: 20,
    img: "./assets/ppl.png"
  },
  {
    name: "Thief",
    region: 2,
    maxHealth: 28,
    atk: 9,
    xp: 20,
    img: "./assets/ppl.png"
  },
  {
    name: "Wolf",
    region: 2,
    maxHealth: 16,
    atk: 7,
    xp: 10,
    img: "./assets/wolf.png"
  },
  {
    name: "Wolf",
    region: 2,
    maxHealth: 16,
    atk: 7,
    xp: 10,
    img: "./assets/wolf.png"
  },
  {
    name: "Wolf",
    region: 2,
    maxHealth: 16,
    atk: 7,
    xp: 10,
    img: "./assets/wolf.png"
  },
  {
    name: "Dragon",
    region: 1.5, //boss
    maxHealth: 100,
    atk: 20,
    xp: 300,
    img: "./assets/dragon.png",
  }
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