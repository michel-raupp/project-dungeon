import styled, { keyframes } from "styled-components";

//player attack
const playerAttack = keyframes`
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-50px);
  }
  100% {
    transform: translateX(0);
  }
`;
//player Magic Attack
const magicAttack = keyframes`
  0% {
    transform: translateX(0);
  }
  20%{
    transform: translateX(10px);
  }
  25%{
    filter: brightness(200000) contrast(2000) saturate(0);
  }

  30%{
    filter: grayscale(100%) sepia(100%) hue-rotate(33deg) saturate(6);
  }

  35%{
    filter: brightness(200000) contrast(2000) saturate(0);
  }

  40%{
    filter: grayscale(100%) sepia(100%) hue-rotate(33deg) saturate(6);
  }

  45%{
    filter: brightness(200000) contrast(2000) saturate(0);
  }
  50%{
    filter: grayscale(100%) sepia(100%) hue-rotate(33deg) saturate(6);
    transform: translateX(15px);
  }

  70% {
    filter: grayscale(100%) sepia(100%) hue-rotate(33deg) saturate(6) ;
    transform: translateX(-50px);
  }
  80%{
    filter: grayscale(100%) sepia(100%) hue-rotate(33deg) saturate(6);
  }
  100% {
    
    transform: translateX(0);
  }
`;
//player took damage
const tookDamage = keyframes`
  0% {
    transform: translate(0px, 0px);
  }
  20% {
    filter: brightness(200000) contrast(2000) saturate(0);
    transform: translate(5px, -7px);
  }
  30%{
    transform: translate(6px, 0px);
  }

  40%{
    filter: grayscale(100%) sepia(100%) hue-rotate(33deg) saturate(6);
    transform: translate(7px, 2px);
  }

  50%{
    filter: brightness(200000) contrast(2000) saturate(0);
    transform: translate(8px, -3px);
  }

  70%{
    filter: grayscale(100%) sepia(100%) hue-rotate(33deg) saturate(6);
    transform: translate(8px, 0px);
  }
  100% {
    transform: translate(0px, 0px);
  }
`;

//player dodged
const playerDodged = keyframes`
  0% {
  
    transform: translateY(0);
  }
  10% {
    transform: translateY(5px);
  }

  20%{
    transform: translateY(-5px);
  }

  25%{
    transform: translateY(-15px);
  }

  35%{
    transform: translateY(-25px);
  }
  50%{
    transform: translateY(-10px);
  }

  60%{
    transform: translateY(0px);
  }
  100% {
    transform: translateY(0);
  }
`;

//enemy attack
const enemyAttack = keyframes`
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(50px);
  }
  100% {
    transform: translateX(0);
  }
`;
//enemy took damage
const enemyTookDamage = keyframes`
  0% {
    transform: translate(0px, 0px);
  }
  20% {
    filter: brightness(200000) contrast(2000) saturate(0);
    transform: translate(-5px, -7px);
  }
  30%{
    transform: translate(-6px, 0px);
  }

  40%{
    filter: grayscale(100%) sepia(100%) hue-rotate(33deg) saturate(6);
    transform: translate(-7px, 2px);
  }

  50%{
    filter: brightness(200000) contrast(2000) saturate(0);
    transform: translate(-8px, -3px);
  }

  70%{
    filter: grayscale(100%) sepia(100%) hue-rotate(33deg) saturate(6);
    transform: translate(-8px, 0px);
  }
  100% {
    transform: translate(0px, 0px);
  }
`;
//enemy dodged
const enemyDodged = keyframes`
  0% {
  
    transform: translateY(0);
  }
  10% {
    transform: translateY(5px);
  }

  20%{
    transform: translateY(-5px);
  }

  25%{
    transform: translateY(-15px);
  }

  35%{
    transform: translateY(-25px);
  }
  50%{
    transform: translateY(-10px);
  }

  60%{
    transform: translateY(0px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const Padrao = {
  colors: {
    primary: "#94ff29",
    secondary: "#46878f",
    dark: "#332c50",
    black: "#211e20",
    white: "#e2f3e4",
    red: "#a54371",
    darkred: "#8e2e5b",
    grey: "#555568",
  },
  effects: {
    outline: "box-shadow: inset 0px 2px 2px rgba(0,0,0,0.3);",
  },
};

export const ContainerDefault = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledHome = styled(ContainerDefault)`
  width: 100%;
  height: 100vh;
  background: #fff;
  flex-direction: column;
  gap: 20px;

  .sprites {
    display: flex;
    align-items: flex-end;
    width: 100%;
    justify-content: space-between;
  }
`;

export const PlayerImage = styled.img`
  filter: grayscale(100%) sepia(100%) hue-rotate(33deg) saturate(6);
  width: 40px;
  height: 40px;
  padding-bottom: 15px;
  &.player-attack-animation {
    animation: ${playerAttack} 0.5s;
  }
  &.magic-attack-animation {
    animation: ${magicAttack} 0.5s;
  }
  &.player-damage-animation {
    animation: ${tookDamage} 0.5s;
  }
  &.player-dodged-animation {
    animation: ${playerDodged} 0.5s;
  }
`;

export const EnemyImage = styled.img`
  filter: grayscale(100%) sepia(100%) hue-rotate(33deg) saturate(6);
  width: 80px;
  height: 80px;
  &.enemy-attack-animation {
    animation: ${enemyAttack} 0.5s;
  }
  &.enemy-damage-animation {
    animation: ${enemyTookDamage} 0.5s;
  }

  &.enemy-dodged-animation {
    animation: ${enemyDodged} 0.5s;
  }
`;

export const Console = styled(ContainerDefault)`
  /* scale: 1.4; */
  background: ${Padrao.colors.white};
  height: fit-content;
  padding: 20px 15px 40px 15px;
  border-radius: 10px 10px 50px 10px;
  gap: 20px;
  flex-direction: column;
  filter: drop-shadow(5px 5px 0px ${Padrao.colors.grey});
  .frame {
    background: ${Padrao.colors.grey};
    padding: 15px 25px;
    border-radius: 5px 5px 25px 5px;
    filter: drop-shadow(2px 2px 0px ${Padrao.colors.dark});
  }

  .organizador {
    display: flex;
    width: 100%;
    height: 70px;
    align-items: center;
    justify-content: space-between;
  }
  .start {
    height: 40px;
    width: 55%;
    -webkit-box-pack: center;
    justify-content: flex-start;
  }
  .botoes {
    display: flex;
    gap: 10px;
    height: 35px;
    transform: rotate(145deg);
  }

  .arrow-keys {
    line-height: 35px;
    font-size: 120px;
    border-radius: 15px;
    font-weight: bold;
    font-family: sans-serif;
    color: ${Padrao.colors.grey};
    filter: drop-shadow(2px 2px 0px ${Padrao.colors.dark});
  }
.huds{
    align-items: flex-start;
}
  .enemy-hud,
  .player-hud {
    display: flex;
    flex-direction: column;
  }
  .player-hud p {
    width: 100%;
  }
  .message{
    height: 40px;
    font-size: 6px;
    line-height: 1.4;
  }
`;

export const Button = styled(ContainerDefault)`
  transform: rotate(215deg);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "normal")};
  margin: ${(props) => (props.disabled ? "-4px 0 0 1px" : "0")};
  filter: drop-shadow(
    ${(props) =>
    props.disabled
      ? `1px 1px 0px ${Padrao.colors.dark}`
      : `2px 2px 0px ${Padrao.colors.dark}`}
  );
  background: ${(props) =>
    props.disabled ? Padrao.colors.grey : Padrao.colors.red};
  color: ${(props) =>
    props.disabled ? Padrao.colors.dark : Padrao.colors.dark};
`;

export const StartButton = styled(Button)`
  transform: rotate(320deg);
  width: 35px;
  height: 10px;
  border-radius: 15px;
  margin: 0 !important;
  filter: drop-shadow(-1px 2px 0px ${Padrao.colors.dark});
  background: ${(props) =>
    props.disabled ? Padrao.colors.grey : Padrao.colors.red};

  color: ${Padrao.colors.dark};
`;

export const Screen = styled(ContainerDefault)`
  background: ${Padrao.colors.primary};
  width: 160px;
  height: 140px;
  padding: 10px;
  border: 5px solid ${Padrao.colors.black};
  flex-direction: column;
`;

export const ActionWindow = styled(ContainerDefault)`
  background: ${Padrao.colors.primary};
  width: 160px;
  height: 140px;
  border: 5px solid ${Padrao.colors.black};
`;
