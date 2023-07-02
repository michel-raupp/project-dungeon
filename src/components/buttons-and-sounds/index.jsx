
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ContainerDefault, Padrao } from '../../styles/styles'
import sound from "../../assets/sound.svg";
import help from "../../assets/help.svg";
import configs from "../../assets/configs.svg";
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
    flex-direction: column;
    width: 120px;
    height: 120px;
    background: ${Padrao.colors.white};
    border-radius: 16px;
    gap: 10px;
    box-shadow: 8px 8px 0px 0px ${Padrao.colors.grey};

    img{
        height: 60px;
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
        transform: rotate(90deg)
    }
    
`

const playEnemyDamageSFX = () => {
    const sfx = new Audio(PlayerAttack);
    sfx.currentTime = 0.2;
    sfx.volume = .5;
    sfx.play();
};

const playCriticalHit = () => {
    const sfx = new Audio(CriticalHit);
    sfx.volume = .5;
    sfx.play();
};

const playTookDamage = () => {
    const sfx = new Audio(TookDamage);
    sfx.volume = .5;
    sfx.play();
};

const playReward = () => {
    const sfx = new Audio(Reward);
    sfx.currentTime = 0.4;
    sfx.volume = .5;
    setTimeout(() => {
        sfx.play();
    }, 500);
};

const playMissed = () => {
    const sfx = new Audio(Missed);
    sfx.currentTime = 0.4;
    sfx.volume = .5;
    sfx.play();
};

const playDefeated = () => {
    const sfx = new Audio(Defeated);
    sfx.currentTime = 0.4;
    sfx.volume = .5;
    setTimeout(() => {
        sfx.play();
    }, 100);

};

const playMagicAttack = () => {
    const charge = new Audio(MagicCharge);
    charge.volume = .5;
    setTimeout(() => {
        charge.play();
    }, 200);
};

const BackgroundMusic = ({ isMuted }) => {
    useEffect(() => {
        const audio = new Audio(Music);
        audio.loop = true;
        audio.volume = isMuted ? 0 : 0;

        const playMusic = () => {
            if (isMuted) {
                audio.volume = .1;
            }
            audio.play()
                .catch(error => {
                    console.log('Failed to play audio:', error);
                });
        };

        document.addEventListener('click', playMusic);
        return () => {
            document.removeEventListener('click', playMusic);
            audio.volume = 0;
        };
    }, [isMuted]);

    return null;
};

export default function BotoesWrapper() {
    const [isMuted, setIsMuted] = useState(true);

    const toggleMusic = () => {
        setIsMuted(!isMuted);
    };

    return (
        <Botoes>
            {isMuted && <BackgroundMusic isMuted={isMuted} />}
            <Botao onClick={toggleMusic}>
                <img src={sound} alt='sound' />
                <p>{isMuted ? 'Mute' : 'Unmute'}</p>
            </Botao>

            <a href="/">
                <Botao>
                    <img src={help} alt='help' />
                    <p>Help</p>
                </Botao>
            </a>
            <a href="/">
                <Botao>
                    <img src={configs} alt='Configs' />
                    <p>Configs</p>
                </Botao>
            </a>
            <a href="/">
                <Botao>
                    <img src={github} alt='Github' />
                    <p>Github</p>
                </Botao>
            </a>
        </Botoes>
    );
}

export { BackgroundMusic, playEnemyDamageSFX, playCriticalHit, playTookDamage, playReward, playMissed, playDefeated, playMagicAttack };