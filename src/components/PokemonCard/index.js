import React from 'react';
import {View, Text, Image} from 'react-native';

export default function PokemonCard({pokemon}){
    return(
        <View>
            {/* <Image source={{uri: pokemon.sprites.front_default}} /> */}
            {/* <Image source={{uri: pokemonSprite}} /> */}
            <Text>{pokemon.name}</Text>
        </View>
    )
}