import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MyVisitsScreen from './src/screens/MyVisitsScreen';
import SiteMapScreen from './src/screens/SiteMapScreen';

const Tab = createBottomTabNavigator();

export default function App() {
return (
<NavigationContainer>
<Tab.Navigator
screenOptions={({ route }) => ({
tabBarIcon: ({ focused, color, size }) => {

        // Return the icon directly so TypeScript knows it's a valid name
        if (route.name === 'Agenda') {
          return <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={size} color={color} />;
        } else if (route.name === 'Map') {
          return <Ionicons name={focused ? 'map' : 'map-outline'} size={size} color={color} />;
        }
        
        // A fallback just in case
        return <Ionicons name="help-circle-outline" size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007BFF',
      tabBarInactiveTintColor: 'gray',
      headerStyle: { backgroundColor: '#007BFF' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' }
    })}
  >
    <Tab.Screen 
      name="Agenda" 
      component={MyVisitsScreen} 
      options={{ title: 'Daily Agenda' }}
    />
    <Tab.Screen 
      name="Map" 
      component={SiteMapScreen} 
      options={{ title: 'Site Map' }}
    />
  </Tab.Navigator>
</NavigationContainer>
);
}