// Home.js
import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, Image, StyleSheet, View, Button, Text, Share } from 'react-native';
import fetchUserScores from '../DatabaseLogic/FetchLogic';
import Dropdown from '../Dropdown';
import ShareBtn from '../ShareBtn';
import ProfileSummary from '../ProfileSummary';
import updateDailyScore from '../DatabaseLogic/DailyLogic';
import { captureRef }from 'react-native-view-shot';

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
  const profileSummaryRef = useRef(null);

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

  useEffect(() => {
    const fetchDataAndUpdateScore = async () => {
      try {
        const response = await fetchUserScores(user.uid);
        setUserData(response);
        await updateDailyScore(user.uid);
      } catch (error) {
        console.error('Error fetching/updating data:', error);
      }
    };

    fetchDataAndUpdateScore();
  }, [user.uid]);

  const handleUpdateScore = async () => {
    try {
      await updateDailyScore(user.uid);
      const updatedData = await fetchUserScores(user.uid);
      setUserData(updatedData);
      alert('Score updated manually!');
    } catch (error) {
      alert('Failed to update score manually: ' + error.message);
    }
  };

  const shareProfileSummary = async () => {
    try {
      // Capture the ProfileSummary component as an image
      const uri = await captureRef(profileSummaryRef, {
        format: 'png',
        quality: 0.8,
      });

      // Share the captured image
      await Share.share({
        title: "Check out my profile summary!",
        url: uri,
      });
    } catch (error) {
      console.error("Failed to share the profile summary:", error);
    }
  };



  return (
    <SafeAreaView style={styles.viewstyle}>
      <View style={styles.viewstyle}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {/* Placeholder for stats posting */}
          <ProfileSummary ref={profileSummaryRef} userData={userData}></ProfileSummary>
          <Button
            title="Share Profile Summary"
            onPress={shareProfileSummary}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'center'}}>
          <Image
            style={styles.progressPyramid}
            source={require('../../assets/Pyramid.png')}
          />
        </View>
        <View style={{flex: 1}}>
          <Dropdown navigation={navigation}/>
          <Button
            title="Update Score Manually"
            onPress={handleUpdateScore}
          />
          {userData ? (
            <>
              <Text>Daily: {userData.num_daily}</Text>
              {/* Add similar lines for other data points */}
            </>
          ) : (
            <Text>Loading data...</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
