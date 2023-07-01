import { useEffect, useRef, useState } from 'react';
import { useMessage } from "../game/message"
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

const ItemHandling = (foundItem, player, setMessage) => {
    const updatedPlayer = { ...player }; // Create a copy of the player object
    const { message, messageHistory, updateMessage, ulRef } = useMessage();
    
    if (foundItem.type === "Consumable") {
        // It's a consumable item (e.g., potion)
        // Apply the attributes to the player's health or mana
        if (foundItem.attributes.healthRestore) {
            updatedPlayer.health += parseInt(foundItem.attributes.healthRestore);
            // Ensure the player's health doesn't exceed the maximum health
            updatedPlayer.health = Math.min(updatedPlayer.health, updatedPlayer.maxHealth);
            console.log(`You used a ${foundItem.name} and restored ${foundItem.attributes.healthRestore} health.`);
            const newMessage = `You used a ${foundItem.name} and restored ${foundItem.attributes.healthRestore} health.`;
            updateMessage(newMessage);
        }
        if (foundItem.attributes.manaRestore) {
            updatedPlayer.mana += parseInt(foundItem.attributes.manaRestore);
            // Ensure the player's mana doesn't exceed the maximum mana
            updatedPlayer.mana = Math.min(updatedPlayer.mana, updatedPlayer.maxMana);
            console.log(`You used a ${foundItem.name} and restored ${foundItem.attributes.manaRestore} mana.`);
            const newMessage = `You used a ${foundItem.name} and restored ${foundItem.attributes.manaRestore} mana.`;
            updateMessage(newMessage);
        }
    } else if (foundItem.type === "sword") {
        // It's a sword
        // Check if the found sword is better than the current one
        if (foundItem.attributes.damageBonus > player.swordDamage) {
            updatedPlayer.attack -= updatedPlayer.swordDamage; // Subtract the current sword damage
            updatedPlayer.swordDamage = foundItem.attributes.damageBonus;
            updatedPlayer.attack += updatedPlayer.swordDamage; // Add the new sword damage
            console.log(`You equipped the (${foundItem.name}) (${foundItem.attributes.damageBonus} ATK)! Your attack has increased to ${updatedPlayer.attack}.`);
            const newMessage = `You equipped the (${foundItem.name}) (${foundItem.attributes.damageBonus} ATK)! Your attack has increased to ${updatedPlayer.attack}.`;
            updateMessage(newMessage);
        } else {
            console.log(`You found a worse sword (${foundItem.name}) (${foundItem.attributes.damageBonus} ATK)! Your attack remains the same.`);
            const newMessage = `This sword is worse than yours! Your stats remain the same.`;
            updateMessage(newMessage);
        }
    } else if (foundItem.type === "shield") {
        // It's a shield
        // Check if the found shield is better than the current one
        if (foundItem.attributes.healthBonus > player.shieldHealth) {
            updatedPlayer.health -= updatedPlayer.shieldHealth; // Subtract the current shield health
            updatedPlayer.shieldHealth = foundItem.attributes.healthBonus;
            updatedPlayer.maxHealth += updatedPlayer.shieldHealth; // Add the new shield health
            console.log(`You equipped the (${foundItem.name}) (${foundItem.attributes.healthBonus} HP)! Your health has increased to ${updatedPlayer.maxHealth}.`);
            const newMessage = `You equipped the (${foundItem.name}) (${foundItem.attributes.healthBonus} HP)! Your health has increased to ${updatedPlayer.maxHealth}.`;
            updateMessage(newMessage);
        } else {
            console.log(`You found a worse shield (${foundItem.name}) (${foundItem.attributes.healthBonus} HP)! Your health remains the same.`);
            const newMessage = `This shield is worse than yours! Your stats remain the same.`;
            updateMessage(newMessage);
        }
    }

    // Remove the found item from the list of items
    const updatedItems = items.filter((item) => item.id !== foundItem.id);

    return { updatedPlayer, updatedItems };
};

export { items };