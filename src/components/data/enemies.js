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
    // console.log("enemyTypes: ", enemyTypes[0])

    const randomIndex = Math.floor(Math.random() * enemyTypes.length);
    const randomEnemy = enemyTypes[randomIndex];

    return {
        ...randomEnemy,
        health: randomEnemy.maxHealth,
        atk: randomEnemy.atk
    };
    
};

export default getRandomEnemy;