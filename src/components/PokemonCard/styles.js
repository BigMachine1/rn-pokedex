import styled, {css}from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import typecolors from '../../utils/typecolor';
import typecolor from '../../utils/typecolor';

export const Container = styled.View`
    background: #a0a0a0;
    border-radius: 24px;
    border-style: solid;
    border-width: 1px;
    padding: 20px;
    margin: 10px;
`;

export const Image = styled.Image`
    width: 100px;
    height: 100px;
    margin: 10px;
    border-radius: 50px;
    background: white;
    align-self: center;
`;

export const Text = styled.Text`
    text-align: center;
    margin: 10px;
    font-size: 20px;
`;
export const TextId = styled.Text`
    font-size: 25px;
`;
export const ContainerType = styled.View`
    flex-direction: row;
    justify-content: center;
`;
export const TextType = styled.Text`
    text-align: center;
    border-style: solid;
    border-width: 1px;
    padding-left: 15px;
    padding-right: 15px;
    margin: 5px;
    border-radius: 24px;
    font-size: 15px;

    ${props =>
    props.selected &&
    css`
      background: ${typecolor(props.selected)};
    `}

`;

export const Button = styled(RectButton)`
    background: #f04227;
    align-self: center;
    width: 160px;
    height: 30px;
    margin: 5px;
    justify-content: center;
    align-items: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 24px;
    opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;

export const ButtonText = styled.Text`
    font-size: 15px;
`;