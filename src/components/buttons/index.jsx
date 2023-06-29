
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ContainerDefault, Padrao } from '../../styles/styles'
import sound from "../../assets/sound.svg";
import help from "../../assets/help.svg";
import configs from "../../assets/configs.svg";
import github from "../../assets/github.svg";
import Music from "../../assets/music.mp3"

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
    background: #D9D9D9;
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

const BackgroundMusic = ({ isMuted }) => {
    useEffect(() => {
      const audio = new Audio(Music);
      audio.loop = true;
      audio.volume = isMuted ? 0 : 1;
  
      const playMusic = () => {
        if (isMuted) {
          audio.volume = 1;
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
          <Botao  onClick={toggleMusic}>
            <img src={sound} alt='sound' />
            <p>{isMuted ? 'Mute' : 'Unmute'}</p>
          </Botao>

        <a href="">
          <Botao>
            <img src={help} alt='help' />
            <p>Help</p>
          </Botao>
        </a>
        <a href="">
          <Botao>
            <img src={configs} alt='Configs' />
            <p>Configs</p>
          </Botao>
        </a>
        <a href="">
          <Botao>
            <img src={github} alt='Github' />
            <p>Github</p>
          </Botao>
        </a>
      </Botoes>
    );
  }