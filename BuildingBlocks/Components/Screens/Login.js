import { View, Text, StyleSheet, TextInput, ActivityIndicator, Button, KeyboardAvoidingView, Keyboard } from 'react-native'
import { useState } from 'react';
import React from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../FirebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';


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
      console.log(userData); // You can see the user data in the console or use it elsewhere

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
      <View style={{flex: 8, backgroundColor: 'gray'}} />
      <KeyboardAvoidingView behavior='padding'style={{flex: 16}}>
        {/* Container for the bottom 2/3 */}
        <View style={[styles.flexContainer, {flexDirection: 'column'}]}>
            {/* Getting Started Container */}
            <View style={{flex: 3, backgroundColor: 'red'}}>
              {/* Top fifth: Getting Started piece */}
              <Text>Getting Started</Text>
              <Text>Sign up or log in to begin your journey.</Text>
            </View>
            <View style={[styles.inputForm, {flex: 7}]}>
              <View style={[styles.flexContainer]}>
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
      <View style={{flex: 3, backgroundColor: 'red'}}>
        {/* Bottom Fifth: Forgot Password */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
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
    paddingHorizontal: 50,
  },
  labels: {
    margin: 10
  }
});

export default Login;