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
import Home from './Components/Screens/Home';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './FirebaseConfig'; // Ensure this import is correct

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
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Check if user exists in Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUser(firebaseUser);
          } else {
            console.log('User does not exist in Firestore.');
            // Optionally: Sign out the user from Firebase Auth if they don't exist in Firestore
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const renderHome = (props) => {
    return <Home user={user} navigation={props.navigation} />;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen
            name='Inside'
            children={renderHome}
            options={{ headerShown: false }}
          />

        ) : (
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}