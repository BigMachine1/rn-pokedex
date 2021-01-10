import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Keyboard, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    Container,
    Form,
    Input,
    SubmitButton,
    Refreshing,
} from './styles';
import api from '../../services/api';
import PokemonCard from '../../components/PokemonCard';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';

export default function Home(){
    const navigation = useNavigation();
    const [search, setSearch] = useState(null);
    const [pokemons, setPokemons] = useState([]);
    const [loading, seTloading] = useState(false);
    const [nextPage, setNextPage] = useState('');
    const [refresh, setRefresh] = useState(false);

    async function loadPage(){
        try{
            const { data } = await api.get('pokemon');
            setPokemons(data.results);
            setNextPage(data.next);
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

    async function handleLoadMore(){
        setRefresh(true);
        try{
            const {data} = await axios.get(nextPage);
            setPokemons([...pokemons, ...data.results]);
            setNextPage(data.next);
        }catch(e){
            Alert.alert('Erro ao ' + e)
        }
        setRefresh(false);
    }    
    return(
        <>
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
            </Container>
            <FlatList 
                data={pokemons}
                numColumns={2}
                keyExtractor ={(item) => item.name}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={refresh && <Refreshing />} 
                renderItem={({item}) =>(
                    <PokemonCard pokemon={item} />
                )}
            />
        </>
    )
}