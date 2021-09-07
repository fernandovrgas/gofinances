import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard'
import { Register } from '../screens/Register'
import { useTheme } from 'styled-components';

const { Navigator, Screen } = createBottomTabNavigator(); 

export function AppRoutes() {
    const theme = useTheme();

    return(
        <Navigator
            screenOptions={{
                headerTitle: '',
                headerTransparent:true,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 88
                }
            }}
        >
            <Screen 
                name="Listagem"
                component={Dashboard}
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            color={color}
                            name="format-list-bulleted"  
                            size={size} 
                        />
                    ))
                }}
            />
            <Screen 
                name="Cadastrar"
                component={Register} 
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            color={color}
                            name="attach-money"  
                            size={size} 
                        />
                    ))
                }}
            />
            <Screen 
                name="Resumo"
                component={Register} 
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            color={color}
                            name="pie-chart"  
                            size={size} 
                        />
                    ))
                }}
            />
        </Navigator>
    )
}