// Home.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Image, StyleSheet, View } from 'react-native';
import fetchUserScores from '../DatabaseLogic/FetchLogic';
import Dropdown from '../Dropdown';
import { Share } from 'react-native';
import ShareBtn from '../ShareBtn';
import ProfileSummary from '../ProfileSummary';

const styles = StyleSheet.create({
  progressPyramid: {
    width: 200,
    height: 200,
    marginTop: 20,  // Added margin to separate dropdown and image
  },
  viewstyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default function Home({user, navigation}) {
  const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetchUserScores(user.uid);
  //       console.log(response); // Now logs the expected value
  //       setUserData(response);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [user.uid]);


  return (
    <SafeAreaView style={styles.viewstyle}>
      <View style={styles.viewstyle}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {/* Placeholder for stats posting */}
          <ProfileSummary userData={userData}></ProfileSummary>
        </View>
        <View style={{ flex: 1, alignItems: 'center'}}>
          <Image
            style={styles.progressPyramid}
            source={require('../../assets/Pyramid.png')}
          />
        </View>
        <View style={{flex: 1}}>
          <Dropdown navigation={navigation}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
