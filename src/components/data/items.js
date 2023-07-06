import { useEffect, useRef, useState } from 'react';
import { useMessage } from "../game/message"
export const items = [
    {
        id: 1,
        name: "Small Health Potion",
        type: "Consumable",
        attributes: {
            healthRestore: 10
        },
        quantity: 5
    },
    {
        id: 2,
        name: "Small Mana Potion",
        type: "Consumable",
        attributes: {
            manaRestore: 10
        },
        quantity: 5
    },
    {
        id: 3,
        name: "Health Potion",
        type: "Consumable",
        attributes: {
            healthRestore: 15
        },
        quantity: 5
    },
    {
        id: 4,
        name: "Mana Potion",
        type: "Consumable",
        attributes: {
            manaRestore: 15
        },
        quantity: 5
    },
    {
        id: 5,
        name: "Royal Sword",
        type: "sword",
        attributes: {
            damageBonus: 1,
        },
        quantity: 1
    },
    {
        id: 6,
        name: "Royal Shield",
        type: "shield",
        attributes: {
            healthBonus: 4,
        },
        quantity: 1
    },
    {
        id: 7,
        name: "Guardian Blade",
        type: "sword",
        attributes: {
            damageBonus: 2,
        },
        quantity: 1
    },
    {
        id: 8,
        name: "Guardian Shield",
        type: "shield",
        attributes: {
            healthBonus: 3,
        },
        quantity: 1
    },
    {
        id: 9,
        name: "Blade of Justice",
        type: "sword",
        attributes: {
            damageBonus: 4,
        },
        quantity: 1
    },
    {
        id: 10,
        name: "Divine Protector",
        type: "shield",
        attributes: {
            healthBonus: 3,
        },
        quantity: 1
    },
    {
        id: 11,
        name: "Mithril Sword",
        type: "sword",
        attributes: {
            damageBonus: 3,
        },
        quantity: 1
    },
    {
        id: 12,
        name: "Mithril Shield",
        type: "shield",
        attributes: {
            healthBonus: 5,
        },
        quantity: 1
    },
    {
        id: 13,
        name: "Dragon Sword",
        type: "sword",
        attributes: {
            damageBonus: 15,
        },
        quantity: 1
    },
    {
        id: 14,
        name: "Dragon Shield",
        type: "shield",
        attributes: {
            healthBonus: 25,
        },
        quantity: 1
    },
    {
        id: 15,
        name: "Frostbite Sword",
        type: "sword",
        attributes: {
            damageBonus: 20,
        },
        quantity: 1
    },
    {
        id: 16,
        name: "Stormshield",
        type: "shield",
        attributes: {
            healthBonus: 50,
        },
        quantity: 1
    }
];

export const useItemHandling = () => {
    const { message, messageHistory, updateMessage, ulRef } = useMessage();
  
    const handleItem = (foundItem, player) => {
      const updatedPlayer = { ...player }; // Create a copy of the player object
  
      if (foundItem.type === "Consumable") {
        // It's a consumable item (e.g., potion)
        // Apply the attributes to the player's health or mana
        if (foundItem.attributes.healthRestore) {
          updatedPlayer.health += parseInt(foundItem.attributes.healthRestore);
          // Ensure the player's health doesn't exceed the maximum health
          updatedPlayer.health = Math.min(updatedPlayer.health, updatedPlayer.maxHealth);
          const newMessage = `You used a ${foundItem.name} and restored ${foundItem.attributes.healthRestore} health.`;
          updateMessage(newMessage);
        }
        if (foundItem.attributes.manaRestore) {
          updatedPlayer.mana += parseInt(foundItem.attributes.manaRestore);
          // Ensure the player's mana doesn't exceed the maximum mana
          updatedPlayer.mana = Math.min(updatedPlayer.mana, updatedPlayer.maxMana);
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
          const newMessage = `You equipped the (${foundItem.name}) (${foundItem.attributes.damageBonus} ATK)! Your attack has increased to ${updatedPlayer.attack}.`;
          updateMessage(newMessage);
        } else {
          const newMessage = `You found a worse sword (${foundItem.name}) (${foundItem.attributes.damageBonus} ATK)! Your attack remains the same.`;
          updateMessage(newMessage);
        }
      } else if (foundItem.type === "shield") {
        // It's a shield
        // Check if the found shield is better than the current one
        if (foundItem.attributes.healthBonus > player.shieldHealth) {
          updatedPlayer.health -= updatedPlayer.shieldHealth; // Subtract the current shield health
          updatedPlayer.shieldHealth = foundItem.attributes.healthBonus;
          updatedPlayer.maxHealth += updatedPlayer.shieldHealth; // Add the new shield health
          const newMessage = `You equipped the (${foundItem.name}) (${foundItem.attributes.healthBonus} HP)! Your health has increased to ${updatedPlayer.maxHealth}.`;
          updateMessage(newMessage);
        } else {
          const newMessage = `You found a worse shield (${foundItem.name}) (${foundItem.attributes.healthBonus} HP)! Your health remains the same.`;
          updateMessage(newMessage);
        }
      }
  
      // Remove the found item from the list of items
      const updatedItems = items.filter((item) => item.id !== foundItem.id);
  
      return { updatedPlayer, updatedItems };
    };
  
    return { handleItem };
  };
  
  