import React, {useState, useEffect} from 'react';
import { Alert, ActivityIndicator} from 'react-native';
import api from '../../services/api';

import {Container, ContainerType, Image, Text, TextId, TextType, Button, ButtonText} from './styles';

export default function PokemonCard({pokemon}){
    const {name} = pokemon;
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
                        {poke.types.length === 2 ?
                            (   
                                <ContainerType>
                                    <TextType>{poke.types[0].type.name.toUpperCase()}</TextType>
                                    <TextType>{poke.types[1].type.name.toUpperCase()}</TextType>
                                </ContainerType>
                            ):(
                                <ContainerType>
                                    <TextType>{poke.types[0].type.name.toUpperCase()}</TextType>
                                </ContainerType>
                            )
                        }
                        <Button onPress={()=>{}}>
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