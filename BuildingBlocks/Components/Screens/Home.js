import { Text, SafeAreaView, Image, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { User } from 'firebase/auth'

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

export class Home extends Component {
  render() {
    return (
      <SafeAreaView style={styles.viewstyle}>
        <Image
        style={styles.progressPyramid}
        source={require('../../assets/testTriangle.jpg')} 
      />
      </SafeAreaView>
    )
  }
}

export default Home