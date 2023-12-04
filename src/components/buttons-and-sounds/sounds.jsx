import { useEffect, useState } from 'react';

import PlayerAttack from '../../assets/sounds/normal-attack2.mp3';
import CriticalHit from '../../assets/sounds/critical-hit.mp3';
import TookDamage from '../../assets/sounds/took-damage.mp3';
import Reward from '../../assets/sounds/reward.mp3';
import Missed from '../../assets/sounds/missed.mp3';
import Defeated from '../../assets/sounds/enemy-defeated.mp3';
import MagicAttack from '../../assets/sounds/magic-attack.mp3';
import MagicCharge from '../../assets/sounds/magic-charge2.mp3';
import Music from "../../assets/sounds/music.mp3";

let soundVolume = 0.07;

export const playEnemyDamageSFX = () => {
  const sfx = new Audio(PlayerAttack);
  sfx.currentTime = 0.2;
  sfx.volume = soundVolume;
  sfx.play();
};

export const playCriticalHit = () => {
  const sfx = new Audio(CriticalHit);
  sfx.volume = soundVolume;
  sfx.play();
};

export const playTookDamage = () => {
  const sfx = new Audio(TookDamage);
  sfx.volume = soundVolume;
  sfx.play();
};

export const playReward = () => {
  const sfx = new Audio(Reward);
  sfx.currentTime = 0.4;
  sfx.volume = soundVolume;
  setTimeout(() => {
    sfx.play();
  }, 500);
};

export const playMissed = () => {
  const sfx = new Audio(Missed);
  sfx.currentTime = 0.4;
  sfx.volume = soundVolume;
  sfx.play();
};

export const playDefeated = () => {
  const sfx = new Audio(Defeated);
  sfx.currentTime = 0.4;
  sfx.volume = soundVolume;
  setTimeout(() => {
    sfx.play();
  }, 100);
};

export const playMagicAttack = () => {
  const charge = new Audio(MagicCharge);
  charge.volume = soundVolume;
  setTimeout(() => {
    charge.play();
  }, 200);
};

const audio = new Audio(Music);

export const BackgroundMusic = () => {

  audio.play();
  audio.volume = soundVolume;
};

export const stopBackgroundMusic = () => {
  audio.pause();
  audio.currentTime = 0;
};

export const toggleVolume = () => {
  soundVolume = soundVolume === 0 ? 0.07 : 0;
};