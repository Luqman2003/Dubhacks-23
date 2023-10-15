import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import fetchUserScores from '../DatabaseLogic/FetchLogic';
// import Dropdown from '../Dropdown';
import DropDownPicker from 'react-native-dropdown-picker';

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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

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
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <Image
        style={styles.progressPyramid}
        source={require('../../assets/Pyramid.png')}
      />
      {/* Optionally render additional UI based on fetched data here */}
    </SafeAreaView>
  );
}
