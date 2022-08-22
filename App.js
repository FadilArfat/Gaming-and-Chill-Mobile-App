import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import React from 'react';

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#0B1320',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{
          title: 'My home',
          headerStyle: {
            backgroundColor: '#0B1320',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Detail"
        component={Detail}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
