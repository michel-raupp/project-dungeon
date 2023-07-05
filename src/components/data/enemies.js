const enemyTypes = [
  // Region 1 Enemies
  {
    name: "Goblin",
    region: 1,
    maxHealth: 13,
    atk: 2,
    xp: 5,
    img: "./assets/goblin.png",
  },
  {
    name: "Spider",
    region: 1,
    maxHealth: 11,
    atk: 3,
    xp: 6,
    img: "./assets/spider.png",
  },
  {
    name: "Snake",
    region: 1,
    maxHealth: 11,
    atk: 3,
    xp: 6,
    img: "./assets/snake.png",
  },
  // Region 1.5 Boss
  {
    name: "Giant Centipede",
    region: 1.5,
    maxHealth: 90,
    atk: 15,
    xp: 50,
    img: "./assets/centipede.png",
  },
  // Region 2 Enemies
  {
    name: "Thief",
    region: 2,
    maxHealth: 25,
    atk: 7,
    xp: 15,
    img: "./assets/ppl.png",
  },
  {
    name: "Wolf",
    region: 2,
    maxHealth: 18,
    atk: 5,
    xp: 10,
    img: "./assets/wolf.png",
  },
  {
    name: "Troll",
    region: 2,
    maxHealth: 18,
    atk: 5,
    xp: 10,
    img: "./assets/goblin.png",
  },
  // Region 2.5 Boss
  {
    name: "Ogre",
    region: 2.5,
    maxHealth: 170,
    atk: 25,
    xp: 100,
    img: "./assets/ogre.png",
  },
  // Region 3 Enemies
  {
    name: "Unicorn",
    region: 3,
    maxHealth: 60,
    atk: 15,
    xp: 25,
    img: "./assets/unicorn.png",
  },
  {
    name: "Skeleton",
    region: 3,
    maxHealth: 45,
    atk: 15,
    xp: 22,
    img: "./assets/skeleton.png",
  },
  {
    name: "Undead Knight",
    region: 3,
    maxHealth: 55,
    atk: 18,
    xp: 27,
    img: "./assets/knight.png",
  },
  // Region 3.5 Boss
  {
    name: "Green Dragon",
    region: 3.5,
    maxHealth: 320,
    atk: 40,
    xp: 150,
    img: "./assets/dragon-3.png",
  },
  // Region 4 Enemies
  {
    name: "Vampire",
    region: 4,
    maxHealth: 100,
    atk: 25,
    xp: 40,
    img: "./assets/vampire.png",
  },
  {
    name: "Dark Knight",
    region: 4,
    maxHealth: 120,
    atk: 20,
    xp: 35,
    img: "./assets/knight-2.png",
  },
  {
    name: "Bandit",
    region: 4,
    maxHealth: 90,
    atk: 23,
    xp: 30,
    img: "./assets/ppl.png",
  },
  // Region 4.5 Boss
  {
    name: "Blue Dragon",
    region: 4.5,
    maxHealth: 390,
    atk: 52,
    xp: 200,
    img: "./assets/dragon.png",
  },
  // Region 5 Enemies
  {
    name: "Demon",
    region: 5,
    maxHealth: 150,
    atk: 30,
    xp: 60,
    img: "./assets/goblin.png",
  },
  {
    name: "Vampire",
    region: 5,
    maxHealth: 180,
    atk: 25,
    xp: 55,
    img: "./assets/vampire.png",
  },
  {
    name: "Blaze Hound",
    region: 5,
    maxHealth: 170,
    atk: 33,
    xp: 55,
    img: "./assets/wolf.png",
  },
  // Region 5 Boss
  {
    name: "Red Dragon",
    region: 5.5,
    maxHealth: 800,
    atk: 80,
    xp: 300,
    img: "./assets/dragon-4.png",
  },
];

let defeatedEnemyCounter = 1;

function handleEnemyDefeated() {
  defeatedEnemyCounter += 1;
  // Additional logic related to enemy defeated
}

function setDefeatedEnemyCounter(value) {
  defeatedEnemyCounter = value;
}

function getDefeatedEnemyCounter() {
  if (defeatedEnemyCounter % 10 === 0 && defeatedEnemyCounter !== 0) {
    return "BOSS";
  } else {
    return "#" + defeatedEnemyCounter + " enemy";
  }
}

const getRandomEnemy = () => {
  // Check if defeatedEnemyCounter is less than 10
  console.log("console: " + defeatedEnemyCounter);
  if (defeatedEnemyCounter < 10) {
    // Spawn region 1 enemies
    const regionOneEnemies = enemyTypes.filter((enemy) => enemy.region === 1);
    const randomIndex = Math.floor(Math.random() * regionOneEnemies.length);
    const randomEnemy = regionOneEnemies[randomIndex];

    return {
      ...randomEnemy,
      health: randomEnemy.maxHealth,
    };

  } else if (defeatedEnemyCounter % 10 === 0) {
    // Spawn the boss enemy for each 10th defeat
    const currentRegion = Math.floor(defeatedEnemyCounter / 10);
    const bossEnemies = enemyTypes.filter((enemy) => enemy.region === currentRegion + 0.5);
    const randomIndex = Math.floor(Math.random() * bossEnemies.length);
    const randomEnemy = bossEnemies[randomIndex];

    return {
      ...randomEnemy,
      health: randomEnemy.maxHealth,
    };
  } else {
    // Spawn region enemies based on region number
    const currentRegion = Math.floor(defeatedEnemyCounter / 10) + 1;
    const regionEnemies = enemyTypes.filter((enemy) => enemy.region === currentRegion);
    const randomIndex = Math.floor(Math.random() * regionEnemies.length);
    const randomEnemy = regionEnemies[randomIndex];
    const scalingFactor = defeatedEnemyCounter % 10;
    const scaledMaxHealth = randomEnemy.maxHealth + scalingFactor * 5;
    const scaledAtk = randomEnemy.atk + scalingFactor;
    const scaledXp = randomEnemy.xp + scalingFactor * 5;

    return {
      ...randomEnemy,
      maxHealth: scaledMaxHealth,
      atk: scaledAtk,
      xp: scaledXp,
      health: scaledMaxHealth,
    };
  }
};


export { getRandomEnemy, handleEnemyDefeated, getDefeatedEnemyCounter, setDefeatedEnemyCounter };
