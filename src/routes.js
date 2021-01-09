import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';
 
const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Home"
                    component={Home}
                    options={{
                        title: 'PokeDex',
                        headerTitleAlign: 'center',
                    }}
                />
                <Stack.Screen
                    name="PokemonDetails"
                    component={PokemonDetails}
                    options={{
                        title:'Detalhes',
                        headerTitleAlign: 'center',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
