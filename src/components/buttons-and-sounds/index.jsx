
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ContainerDefault, Padrao } from '../../styles/styles'
import sound from "../../assets/sound.svg";
import help from "../../assets/help.svg";
import about from "../../assets/info.svg";
import github from "../../assets/github.svg";
import Music from "../../assets/sounds/music.mp3";
import PlayerAttack from '../../assets/sounds/normal-attack2.mp3';
import CriticalHit from '../../assets/sounds/critical-hit.mp3'
import TookDamage from '../../assets/sounds/took-damage.mp3'
import Reward from '../../assets/sounds/reward.mp3'
import Missed from '../../assets/sounds/missed.mp3'
import Defeated from '../../assets/sounds/enemy-defeated.mp3'
import MagicAttack from '../../assets/sounds/magic-attack.mp3'
import MagicCharge from '../../assets/sounds/magic-charge2.mp3'
import { About, Help } from "../windows/index"
import { playEnemyDamageSFX, playCriticalHit, playTookDamage, playReward, playMissed, playDefeated, playMagicAttack, BackgroundMusic, toggleVolume, stopBackgroundMusic } from './sounds';
import Cookies from 'js-cookie';

// background sound
// https://www.youtube.com/watch?v=uIfD2BKaD2k

//https://www.youtube.com/@soundfx6482

export const Botoes = styled(ContainerDefault)`
  flex-direction: column;
  justify-content: space-between;
  height: 574px;

  @media(max-width: 900px){
    height: 410px;
  }
  @media(max-width: 640px){
    flex-direction: row-reverse;
    margin-top: -80px;
    height: auto;
    width: 328px;
  }
`

export const Botao = styled(ContainerDefault)`
    cursor: pointer;
    flex-direction: column;
    width: ${props => props.isSocial ? '60px' : '120px'};
    height: ${props => props.isSocial ? '60px' : '120px'};
    background: ${props => props.isSocial ? `${Padrao.colors.red}` : `${Padrao.colors.white}`};
    border-radius: 16px;
    gap: 10px;
    box-shadow: ${props => props.isSocial ? `4px 4px 0px 0px ${Padrao.colors.grey}` : `8px 8px 0px 0px ${Padrao.colors.grey}`};

    img{
        height: ${props => props.isSocial ? '30px' : '60px'};
        filter: ${props => props.isSocial ? 'brightness(200)' : 'none'}
    }

    p{
        font-size: 14px;
        color: ${Padrao.colors.grey};
    }

    @media(max-width: 900px){
        width: 80px;
        height: 80px;
        border-radius: 12px;
        box-shadow: 4px 4px 0px 0px ${Padrao.colors.grey};

        img{
            height: 40px;
        }

        p{
            font-size: 10px;
        }
    }
    @media(max-width: 640px){
        transform: ${props => props.isSocial ? 'rotate(0)' : 'rotate(90deg)'} 
    }
    
`

export default function BotoesWrapper() {
  const [isMuted, setIsMuted] = useState(true);
  const [isOpen, setIsOpen] = useState(0);

  useEffect(() => {
    const savedIsMuted = Cookies.get('isMuted');
    if (savedIsMuted === 'false') {
      setIsMuted(false);
      toggleVolume(true);
    }
  }, []);

  useEffect(() => {
    Cookies.set('isMuted', isMuted);
  }, [isMuted]);

  const toggleHelp = () => {
    setIsOpen(isOpen === 1 ? 0 : 1);
  };

  const toggleAbout = () => {
    setIsOpen(isOpen === 2 ? 0 : 2);
  };

  const toggleSound = () => {
    toggleVolume();

    if (isMuted) {
      setIsMuted(false);
      BackgroundMusic();
    } else {
      setIsMuted(true);
      stopBackgroundMusic();
    }
  };

  return (
    <Botoes>

      <Botao onClick={toggleSound}>
        <img src={sound} alt='sound' />
        <p>{isMuted ? 'Mute' : 'Unmute'}</p>
      </Botao>

      <Botao onClick={toggleHelp}>
        <img src={help} alt='help' />
        <p>Help</p>
      </Botao>
      <Botao onClick={toggleAbout}>
        <img src={about} alt='about me' />
        <p>About</p>
      </Botao>
      <a href="https://github.com/michel-raupp" target='_blank' rel='noopener noreferrer'>
        <Botao>
          <img src={github} alt='Github' />
          <p>Github</p>
        </Botao>
      </a>
      {isOpen === 1 && <Help onClose={toggleHelp} />}
      {isOpen === 2 && <About onClose={toggleAbout} />}
      <BackgroundMusic isMuted={isMuted} />
    </Botoes>
  );
}