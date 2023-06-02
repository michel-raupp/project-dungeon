import styled from "styled-components";

export const Padrao = {
    colors: {
        primary: '#94e344',
        secondary: '#46878f',
        dark: '#332c50',
        black: '#211e20',
        white: '#e2f3e4',
        red: '#a54371',
        grey: '#555568',
    },
    effects: {
        outline:
            'box-shadow: inset 0px 2px 2px rgba(0,0,0,0.3);'
    }
}

export const ContainerDefault = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const StyledHome = styled(ContainerDefault)`
    width: 100%;
    height: 100vh;
    background: ${Padrao.colors.black};
    p{
        font-size: 12px;
    }
`
export const Console = styled(ContainerDefault)`
    scale: 1.4;
    background: ${Padrao.colors.white};
    height: fit-content;
    padding: 20px 15px 100px 15px;
    border-radius: 10px 10px 50px 10px;
    flex-direction: column;
    filter: drop-shadow(5px 5px 0px ${Padrao.colors.grey});
    .frame{
        background: ${Padrao.colors.grey};
        padding: 15px 25px;
        border-radius: 5px 5px 25px 5px;
        margin-bottom: 50px;
        filter: drop-shadow(2px 2px 0px ${Padrao.colors.dark});
    }

    
    .organizador{
        display: flex;
        width: 100%;
        justify-content: space-around;
    }

    .botoes{
        display: flex;
        gap: 10px;
        height: 35px;
        transform: rotate(145deg);
    }

    .arrow-keys{
        line-height: 35px;
        font-size: 120px;
        font-weight: bold;
        color: ${Padrao.colors.grey};
        filter: drop-shadow(2px 2px 0px ${Padrao.colors.dark});
    }
`

export const Button = styled(ContainerDefault)`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: ${Padrao.colors.red};
    filter: drop-shadow(-2px -2px 0px ${Padrao.colors.dark});
`

export const Screen = styled(ContainerDefault)`
    background: ${Padrao.colors.primary};
    width: 160px;
    height: 140px;
    border: 5px solid ${Padrao.colors.black};
    flex-direction: column;
`

export const ActionWindow = styled(ContainerDefault)`
    background: ${Padrao.colors.primary};
    width: 160px;
    height: 140px;
    border: 5px solid ${Padrao.colors.black};
`