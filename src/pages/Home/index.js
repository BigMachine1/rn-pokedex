import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Keyboard, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    Container,
    Form,
    Input,
    SubmitButton
} from './styles';
import api from '../../services/api';
import PokemonCard from '../../components/PokemonCard';
import { FlatList } from 'react-native-gesture-handler';

export default function Home(){
    const [search, setSearch] = useState(null);
    const navigation = useNavigation();
    const [pokemons, setPokemons] = useState([]);
    const [loading, seTloading] = useState(false);

    async function loadPage(){
        try{
            const { data } = await api.get('pokemon');
            setPokemons(data.results);
        }catch(e){
            Alert.alert('Erro ao consultar' + e);
        }
    }

    function navigationToDetail(pokemon) {
        navigation.navigate('PokemonDetails', { pokemon });
    }

    useEffect(()=>{
        loadPage();
    }, []);

    async function handleSearchPokemon(){
        seTloading(true);
        try{
            const {data} = await api.get(`pokemon/${search}`);
            navigationToDetail(data);
        }catch(e){
            Alert.alert('Não Encontrado');
        }
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
                numColumns={2}
                keyExtractor ={(item) => item.name}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>(
                    <PokemonCard pokemon={item} />
                )}
            />
        </Container>
    )
}