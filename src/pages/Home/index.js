import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Keyboard, FlatList, View, Text, Image, Alert} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
} from './styles';
import api from '../../services/api';
import PokemonCard from '../../components/PokemonCard';

export default function Home(){
    const [search, setSearch] = useState(null);
    const [pokemons, setPokemons] = useState([]);
    const [pokemon, setPokemon] = useState([])
    const [loading, seTloading] = useState(false);

    async function loadPage(){
        try{
            const { data } = await api.get('pokemon');
            setPokemons(data.results);
        }catch(e){
            Alert.alert('Erro ao consultar' + e);
        }
    }

    useEffect(()=>{
        loadPage();
    }, []);

    async function handleSearchPokemon(){
        seTloading(true);
        const {data} = await api.get(`pokemon/${search}`);
        setPokemon(data);
        setSearch(null);
        seTloading(false);
        Keyboard.dismiss();
    }

    return(
        <Container>
            <Form>
                <Input 
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Buscar Pokemon.."
                    value={search}
                    onChangeText={setSearch}
                    returnKeyType="send"
                    onSubmitEditing={handleSearchPokemon}                 
                />
                <SubmitButton loading={loading} onPress={handleSearchPokemon}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ): (
                        <Icon name="search" size={20} color="#fff" />
                    )}
                </SubmitButton>
            </Form>
            <FlatList 
                data={pokemons}
                keyExtractor ={(item) => item.name}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>(
                    <PokemonCard pokemon={item} />
                )}
            />
        </Container>
    )
}