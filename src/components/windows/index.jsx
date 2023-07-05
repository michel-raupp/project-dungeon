
import React, { useState } from 'react';
import { ContainerDefault, Padrao } from '../../styles/styles';
import styled from 'styled-components';

const Card = styled(ContainerDefault)`
    margin-left: 34.5rem;
    background: ${Padrao.colors.white};
    border-radius: 8px 8px 61px 8px;
    height: 562px;
    width: 366px;
    position: absolute;
    z-index: 1;
    
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
        color: ${Padrao.colors.grey};
        font-size: 20px;
    }

   
    p{
        color: ${Padrao.colors.grey};
        font-size: 10px;
        line-height: 1.3;
        margin: 10px 0 0 0;
    }
    .organizador-help{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
        p{
            margin: 0;
            color: ${Padrao.colors.red};
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
`
function CloseBtn({ onClose }) {
    return (
      <ButtonWrapper onClick={onClose}>
        X
      </ButtonWrapper>
    );
  }



  const Window = ({ onClose }) => {
    return (
        <Card>
            <div className='conteudo'>
                <div className='title'>
                    <h3>
                        How to Play
                    </h3>
                    <CloseBtn onClose={onClose} />
                </div>
                <div class="organizador-help">
                    <p>A</p>
                    <p>Normal Attack</p>
                </div>
                <p>Does a normal attack on the enemy.
                </p>
                <div class="organizador-help">
                    <p>B</p>
                    <p>Magic Attack</p>
                </div>
                <p>Does 3x damage of player's attack on the enemy.
                    <br />
                    <br />
                    consumes 20 mana
                </p>
                <div class="organizador-help">
                    <p>Enemies</p>
                </div>
                <p>Every 10th enemy is a Boss, defeat the Boss to discover new regions and enemies!
                    <br />
                    <br />
                    Player earns XP every defeated enemy.
                </p>
                <div class="organizador-help">
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
export default Window;