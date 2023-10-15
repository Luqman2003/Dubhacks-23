import { View, Text, Button } from 'react-native'
import React from 'react'
import { Share } from 'react-native';

const ShareBtn = ({userVals}) => {

  const onShare = async () => {
    try {
      let text = "Here are my Building Blocks Stats! Daily: " + userVals.num_daily;
      text += ", Weekly: " + userVals.num_weeks + ", Months: " + userVals.num_months;
      text += ", Total Blocks: " +  userVals.num_blocks;
      const result = await Share.share({
        message: text,
        // You can also add a title and URL here:
        // title: 'App link',
        // url: 'https://www.example.com',

      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Here you can handle the shared action type
          console.log(result.activityType);
        } else {
          // Successful share
        }
      } else if (result.action === Share.dismissedAction) {
        // Share was dismissed
      }
    } catch (error) {
      alert('Share failed with error: ' + error.message);
    }
  };
  return (
    <View>
      <Button title='Share' onPress={onShare} />
    </View>
  )
}

export default ShareBtn