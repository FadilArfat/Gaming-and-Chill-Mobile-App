import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import Search from './src/screens/Search';
import Login from './src/screens/LoginPage';
import Register from './src/screens/RegisterPage';
import Profile from './src/screens/Profile';
import Edit from './src/screens/EditProfile';
import Reset from './src/screens/ResetPassword';
import About from './src/screens/About';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FavoriteContext} from './src/context/FavoriteContext';
import {Provider} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import {Button, TouchableOpacity} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    console.log('Authorization status(authState):', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  useEffect(() => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(token => {
          return console.log(token);
        });
    } else console.log('Not Authorization status:', authStatus);

    SplashScreen.hide();
  }, []);
  return (
    <Provider store={FavoriteContext}>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Tab1}
        />
        <Stack.Screen
          options={{
            title: 'Login Page',
            headerLeft: () => null,
            headerStyle: {
              backgroundColor: '#151515',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            title: 'Register Page',
            headerStyle: {
              backgroundColor: '#151515',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{
            title: 'Reset Password',
            headerStyle: {
              backgroundColor: '#151515',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="reset"
          component={Reset}
        />

        <Stack.Screen
          options={{
            title: 'My home',
            headerStyle: {
              backgroundColor: '#151515',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="Detail"
          component={Detail}
        />
        <Stack.Screen
          options={{
            title: 'Edit Profile',
            headerStyle: {
              backgroundColor: '#151515',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="Edit"
          component={Edit}
        />
        <Stack.Screen
          options={{
            title: 'About',
            headerStyle: {
              backgroundColor: '#151515',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="About"
          component={About}
        />
      </Stack.Navigator>
    </Provider>
  );
}

function Tab1() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: 'lightgray',
        activeBackgroundColor: 'black',
        inactiveBackgroundColor: '#151515',
        style: {
          backgroundColor: '#0B1320',
        },
      }}>
      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: '#151515',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({size, color}) => (
            <Icon name={'home'} color={color} size={size} />
          ),
        }}
        name="Home "
        component={Home}
      />
      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: '#151515',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({size, color}) => (
            <Icon name={'search'} color={color} size={size} />
          ),
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: '#151515',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({size, color}) => (
            <Icon name={'user-circle'} color={color} size={size} />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() => navigation.navigate('About')}>
              <Icon name={'ellipsis-h'} color={'white'} size={20} />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: {
            justifyContent: 'center',
            alignItems: 'flex-end',
          },
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
