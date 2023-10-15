import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Keyboard, Image, ImageBackground } from 'react-native'
import { useState } from 'react';
import React from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../FirebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import SignInUp from '../SignInUp';


// using the firestore databse to fetch data about the user
async function fetchUserScores(uid) {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('User not found');
    }
  } catch(err) {
    alert('Failed to fetch scores: ' + err.message);
    return null;
  }
}


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const uid = response.user.uid;
      console.log(uid);

      // Fetching user scores after successful sign-in
      const userData = await fetchUserScores(uid);
      console.log(userData);

      if(userData) {
        // Navigate to Home if user exists in Firestore
        // Your navigation logic here
      } else {
        alert('User not registered.');
      }

    } catch(err) {
        console.log(err);
        alert('Sign in failed: ' + err.message);
    } finally {
        setLoading(false);
    }
  }



  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const signUp = async () => {
      setLoading(true);
      try {
          if (!emailRegex.test(email)) {
              alert('Please enter a valid email address');
              return;
          }
          const response = await createUserWithEmailAndPassword(auth, email, password);
          const uid = response.user.uid;
          console.log(uid);
          alert('Check your emails!');
          await setDoc(doc(db, 'users', uid), {
            num_blocks: 0,
            num_daily: 0,
            num_months: 0,
            num_weeks: 0
          });
      } catch(err) {
          console.log(err);
          alert('Sign up failed: ' + err.message);
      } finally {
          setLoading(false);
      }
  }


  return (
    <View style={[styles.container, {flexDirection: 'column'}]}>
      <View style={{flex: 8}}>
        <Image
        source={require('../../assets/SignUp1.jpg')}
        style={[styles.image]}
        />
      </View>
      <KeyboardAvoidingView behavior='padding'style={{flex: 16}}>
        {/* Container for the bottom 2/3 */}
        <View style={[styles.container, styles.containerMiddle, {flexDirection: 'column'}]}>
          {/* Getting Started Container */}
          <View style={{flex: 3}}>
            <View style={[styles.container, {flexDirection: 'column'}]}>
              <View style={{flex: 1}}>
                <View style={[styles.container, {flexDirection: 'row'}]}>
                  <Text style={[styles.signUpLabels, {flex: 1}]}>SIGN UP</Text>
                  <Text style={[styles.signUpLabels, {color: 'gray', flex: 1}]}>SIGN IN</Text>
                </View>
              </View>
              <View style={{flex: 2}}>
                {/* Bottom Half, Getting started and subtext */}
                <Text style={[styles.title]}>Getting Started</Text>
                <Text style={[styles.subtitle]}>Sign up or log in to begin your journey.</Text>
              </View>
            </View>
          </View>
          <View style={[styles.inputForm, {flex: 7}]}>
            <View style={[styles.container]}>
              {/* Email input */}
              <Text style={[styles.labels]}>Email</Text>
              <TextInput
                value={email}
                style={styles.input}
                placeholder='Email'
                autoCapitalize='none'
                onChangeText={(text) => setEmail(text)}>
              </TextInput>
              {/* Password input */}
              <Text style={[styles.labels]}>Password</Text>
              <TextInput
                secureTextEntry={true}
                value={password}
                style={styles.input}
                placeholder='Password'
                autoCapitalize='none'
                onChangeText={(text) => setPassword(text)}>
              </TextInput>
              {loading ? (
                <ActivityIndicator size='large' color='#0000ff' />
              ) : (
                <>
                  <Button title='Login' onPress={() => signIn()} />
                  <Button title='Sign Up' onPress={() => signUp()}/>
                </>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={{flex: 4, backgroundColor: 'white'}}>
        {/* Bottom Fifth: Forgot Password */}
        <View style={[styles.container, {flexDirection: 'row'}]}>
          <View style={{flex: 3}}>
            <Image
              style={[styles.image, styles.image3]}
              source={require('../../assets/SignUp3.jpg')}
            />
          </View>
          <View style={{flex: 5}}>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerMiddle: {
    paddingHorizontal: 50,
    backgroundColor: 'white'
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff'
  },
  flexContainer: {
    flex: 1
  },
  inputForm: {
    backgroundColor: 'white'
  },
  labels: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 20
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  title: {
    marginVertical: 5,
    fontSize: 30,
    fontWeight: 'bold'
  },
  subtitle: {
    marginVertical: 5,
    fontSize: 16,
    color: 'gray'
  },
  image3: {
    borderTopRightRadius: 10
  },
  signUpLabels: {
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'center',
    marginLeft: 30
  }
});

export default Login;