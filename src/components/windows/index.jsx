
import React, { useState } from 'react';
import { ContainerDefault, Padrao } from '../../styles/styles';
import styled from 'styled-components';
import { Botao } from '../buttons-and-sounds';
import linkedin from '../../assets/linkedin.svg'
import github from '../../assets/github.svg'
import email from '../../assets/email.svg'

const Card = styled(ContainerDefault)`
    margin-left: 34.5rem;
    background: ${Padrao.colors.white};
    border-radius: 8px 8px 61px 8px;
    height: 562px;
    width: 366px;
    position: absolute;
    z-index: 1;
    
    @media (max-width: 900px){
        top: 13rem;
        margin-left: 24.5rem;
        scale: 0.72;
        border-radius: 8px 30px 61px 8px;
    }
    @media (max-width: 640px){
        margin-right: -20px;
        top: 11rem;
        transform: rotate(90deg);
        scale: 0.58;
    }

    .conteudo{
        height: 100%;
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .title{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 80px;
    }

    h3{
        color: ${Padrao.colors.dark};
        font-size: 20px;
    }

   
    p{
        color: ${Padrao.colors.grey};
        font-size: 10px;
        line-height: 1.3;
        margin: 10px 0 0 0;
    }
    .organizador{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;

        p{
            margin: 0;
            color: ${Padrao.colors.dark};
            font-size: 16px;
        }
    }
`
export const ButtonWrapper = styled(ContainerDefault)`
    background: ${Padrao.colors.red};
    color: ${Padrao.colors.white};
    width: 40px;
    height: 40px;
    border-radius: 4px;
    box-shadow: 4px 4px 0px 0px ${Padrao.colors.grey};
    cursor: pointer;
`
function CloseBtn({ onClose }) {
    return (
        <ButtonWrapper onClick={onClose}>
            X
        </ButtonWrapper>
    );
}


const Help = ({ onClose }) => {
    return (
        <Card>
            <div className='conteudo'>
                <div className='title'>
                    <h3>
                        How to Play
                    </h3>
                    <CloseBtn onClose={onClose} />
                </div>
                <div class="organizador">
                    <p>Normal Attack</p>
                </div>
                <p>Press A to dealt a normal attack on the enemy.
                </p>
                <div class="organizador">
                    <p>Magic Attack</p>
                </div>
                <p>Press B to dealt a 3x damage attack on the enemy.
                    <br />
                    <br />
                    Consumes 20 mana each 
                </p>
                <div class="organizador">
                    <p>Enemies</p>
                </div>
                <p>Every 10th enemy is a Boss, defeat the Boss to discover new regions and enemies!
                    <br />
                    <br />
                    Player earns XP every defeated enemy.
                </p>
                <div class="organizador">
                    <p>Items</p>
                </div>
                <p>Each enemy defeated has 25% of dropping an item.
                    <br />
                    <br />
                    Potions are immediately consumed
                    <br />
                    <br />
                    Better equipments are automatically equipped.
                </p>
            </div>
        </Card>
    );
};

const About = ({ onClose }) => {
    return (
        <Card>
            <div className='conteudo'>
                <div className='title'>
                    <h3>
                        About
                    </h3>
                    <CloseBtn onClose={onClose} />
                </div>
                <div class="organizador">
                    <p>The Game</p>
                </div>
                <p>Project Dungeon is a simple turn-based RPG game. The objective of the game is defeat enemies as long as you can.
                </p>

                <div class="organizador">
                    <p>Techonologies</p>
                </div>
                <p>Developed with React.Js and basic CSS animations.
                </p>

                <div class="organizador">
                    <p>Who developed?</p>
                </div>
                <p>The project was designed and developed by me,
                    <br />
                    <br />
                    Michel Raupp de Olivera.
                </p>

                <div class="organizador">
                    <p>Feedback</p>
                </div>
                <p>If you liked the game, have a suggestion or an idea, feel free to Contact me!
                </p>
                <div class="organizador">
                    <a href="https://www.linkedin.com/in/michelraupp/" target="_blank" rel="noopener noreferrer">
                        <Botao isSocial={true}>
                            <img src={linkedin} alt='linkedin' />
                        </Botao>
                    </a>
                    <a href="mailto:michelraupp@outlook.com" target="_blank" rel="noopener noreferrer">
                        <Botao isSocial={true}>
                            <img src={email}  alt='send me an email' />
                        </Botao>
                    </a>
                    <a href="https://github.com/michel-raupp" target="_blank" rel="noopener noreferrer">
                        <Botao isSocial={true}>
                            <img src={github} alt='github' />
                        </Botao>
                    </a>
                </div>


            </div>
        </Card>
    );
};
export { Help, About };