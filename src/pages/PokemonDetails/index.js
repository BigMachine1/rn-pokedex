import React from 'react';
import {useRoute} from '@react-navigation/native';
import PokemonType from '../../components/PokemonType';

import {
    Container, 
    Text,
    Image,
    TextDetails,
} from './styles';

export default function PokemonDetails(){
    const route = useRoute();
    const {pokemon} = route.params;

    return(
        <Container>
            <Text>#{pokemon.id}</Text>
            <Image source={{uri: pokemon.sprites.front_default}} />
            <TextDetails>{pokemon.name.toUpperCase()}</TextDetails>
            <PokemonType types={pokemon.types} />
        </Container>
    )
}