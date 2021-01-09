import React from 'react';
import {ContainerType, TextType} from './styles';
import typecolor from '../../utils/typecolor';

export default function PokemonType({types}){
    return(
        <>
            {types.length === 2 ?
                (   
                    <ContainerType>
                        <TextType style={{backgroundColor: typecolor[types[0].type.name]}}>{types[0].type.name.toUpperCase()}</TextType>
                        <TextType style={{backgroundColor: typecolor[types[1].type.name]}}>{types[1].type.name.toUpperCase()}</TextType>
                    </ContainerType>
                ):(
                    <ContainerType>
                        <TextType style={{backgroundColor: typecolor[types[0].type.name]}}>{types[0].type.name.toUpperCase()}</TextType>
                    </ContainerType>
                )
            }
        </>
    );
}