import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
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
    const [pokemon, setPokemon] = useState({});
    const [loading, seTloading] = useState(false);


    async function loadPage(){
        try{
            const {data} = await api.get('pokemon');
            setPokemon(data.results);
            console.log(pokemon);
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
        console.log(pokemon);
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
                    placeholder="Procurar Pokemon"
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
                data={pokemon}
                keyExtractor={(item) => String(item.name)}
                renderItem={({item}) => (
                    <View>
                        {/* <PokemonCard pokemon={item}  /> */}
                        <Text>{item.name}</Text>
                    </View>
                )}
            />
        </Container>
    )
}