import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import fetchUserScores from '../DatabaseLogic/FetchLogic';

const styles = StyleSheet.create({
  progressPyramid: {
    width: 200,
    height: 200,
  },
  viewstyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default function Home({user}) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserScores(user.uid);
        console.log(response); // Now logs the expected value
        setUserData(response);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [user.uid]);

  return (
    <SafeAreaView style={styles.viewstyle}>
      <Image
        style={styles.progressPyramid}
        source={require('../../assets/testTriangle.jpg')}
      />
      {/* Optionally render additional UI based on fetched data here */}
    </SafeAreaView>
  );
}
