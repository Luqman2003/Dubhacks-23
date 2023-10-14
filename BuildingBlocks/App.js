import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import List from './Components/Screens/List';
import Details from './Components/Screens/Details';
import Login from './Components/Screens/Login';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="My todos" component={List} />
      <InsideStack.Screen name='details' component={Details} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
        <Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: false }}/>
        ) : (
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}
