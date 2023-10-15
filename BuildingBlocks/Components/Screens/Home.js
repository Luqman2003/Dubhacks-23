import { Text, SafeAreaView, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { User } from 'firebase/auth'
import { db } from '../../FirebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import updateDailyScore from '../DatabaseLogic/DailyLogic';
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
})

export default async function Home({user}) {

  return (
    <SafeAreaView style={styles.viewstyle}>
      <Image
      style={styles.progressPyramid}
      source={require('../../assets/testTriangle.jpg')}
    />
    </SafeAreaView>
  )
}