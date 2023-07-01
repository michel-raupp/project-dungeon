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

export {getRandomEnemy};