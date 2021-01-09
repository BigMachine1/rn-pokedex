import styled, {css}from 'styled-components/native';
import { Dimensions } from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.ScrollView`
    background: #a9a9a9;
    border-radius: 24px;
    width: 45%;
    border-style: solid;
    border-width: 1px;
    padding: 10px;
    margin: 5px;
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
    font-size: 15px;
    color: white;
`;
export const TextId = styled.Text`
    font-size: 15px;
`;
export const ContainerType = styled.View`
    flex-direction: row;
    justify-content: center;
`;
export const TextType = styled.Text`
    text-align: center;
    border-style: solid;
    border-width: 1px;
    padding-left: 10px;
    padding-right: 10px;
    margin: 5px;
    border-radius: 24px;
    font-size: 10px;
    color: white;
`;

export const Button = styled(RectButton)`
    background: #f04227;
    align-self: center;
    width: 100px;
    height: 30px;
    margin: 5px;
    justify-content: center;
    align-items: center;
    border-radius: 24px;
    opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;

export const ButtonText = styled.Text`
    font-size: 10px;
    color: white;
`;