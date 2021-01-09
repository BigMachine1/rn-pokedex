import React, {useState, useEffect} from 'react';
import { Alert, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import typecolor from '../../utils/typecolor';
import PokemonType from '../PokemonType';

import {Container, ContainerType, Image, Text, TextId, TextType, Button, ButtonText} from './styles';

export default function PokemonCard({pokemon}){
    const {name} = pokemon;
    const navigation = useNavigation();
    const [poke, setPoke]= useState([]);
    const [loaded, setLoaded] = useState(false);


    async function loadPokemon(){
        try{
            const {data} = await api.get(`pokemon/${name}`);
            setPoke(data);
            setLoaded(true);
        }catch(e){
            Alert.alert('Erro ao ' + e);
        }
    }
    function navigationToDetail(pokemon) {
        navigation.navigate('PokemonDetails', { pokemon });
    }

    useEffect(()=>{
        loadPokemon();
    },[]);

    return(
        <>
            {loaded ? 
                (   
                    <Container key={poke.id}>
                        <TextId>#{poke.id}</TextId>
                        <Image source={{uri: poke.sprites.front_default}} />
                        <Text>{poke.name.toUpperCase()}</Text>
                        <PokemonType types={poke.types} />
                        <Button onPress={()=> navigationToDetail(poke)}>
                            <ButtonText>DETALHES</ButtonText>
                        </Button>
                    </Container>
                )           
            :
                (   
                    <Container>
                        <ActivityIndicator color="#F0001A" size="large" />
                        <Text>Carregando dados aguarde...{loaded}</Text>
                    </Container>
                )
            }
        </>
    )
}